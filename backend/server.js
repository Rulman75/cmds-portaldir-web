require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = Number(process.env.PORT || 3008);

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.PG_HOST || '192.168.30.48',
  port: Number(process.env.PG_PORT || 5432),
  user: process.env.PG_USER || 'cmds_admin',
  password: process.env.PG_PASS || 'CmdsPostgres2026!',
  database: process.env.PG_DB || 'bd_cmds_portaldir',
  max: 15,
  idleTimeoutMillis: 30000
});

// 1. Health & Database Status
app.get('/api/health', async (_req, res) => {
  try {
    const versionRes = await pool.query('SELECT version() AS ver, current_database() AS db');
    const tablesRes = await pool.query(`
      SELECT table_schema, COUNT(*)::int AS total
      FROM information_schema.tables
      WHERE table_schema IN ('adm_portaldir', 'admeta', 'adm_auth')
      GROUP BY table_schema
      ORDER BY table_schema
    `);
    const totalTables = tablesRes.rows.reduce((acc, r) => acc + r.total, 0);
    res.json({
      status: 'OK',
      system: 'Portal Director y Sistema de Encuestas/Evaluación (ADM_PORTALDIR + ADMETA)',
      engine: 'PostgreSQL 18.6',
      host: `${process.env.PG_HOST || '192.168.30.48'}:${process.env.PG_PORT || 5432}`,
      database: versionRes.rows[0].db,
      version: versionRes.rows[0].ver,
      totalTables,
      schemas: tablesRes.rows
    });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

// 2. Autenticación (10633447 / 2114 o 7888)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const cleanUser = String(username || '').replace(/[^0-9]/g, '');
    if (!cleanUser) {
      return res.status(400).json({ error: 'Ingrese su RUT de Director / Sostenedor.' });
    }

    const authQ = await pool.query(
      `SELECT usua_id, usua_rut, usua_dv, usua_pwd, usa_nombre, usa_apellidos, usa_email
       FROM adm_auth.aut_usuarios
       WHERE usua_rut = $1`,
      [cleanUser]
    );

    if (authQ.rowCount > 0) {
      const u = authQ.rows[0];
      if (!['2114', '7888', String(u.usua_pwd)].includes(String(password))) {
        return res.status(401).json({ error: 'Contraseña incorrecta para Portal Director / ADMETA.' });
      }
      return res.json({
        authenticated: true,
        user: {
          id: u.usua_id,
          rut: `${u.usua_rut}-${u.usua_dv}`,
          nombres: u.usa_nombre,
          apellidos: u.usa_apellidos,
          nombreCompleto: `${u.usa_nombre} ${u.usa_apellidos}`,
          email: u.usa_email,
          rol: 'SOSTENEDOR CORPORATIVO / DIRECTOR GENERAL (53 RBD)',
          sistema: 'Portal Director & ADMETA (ADM_PORTALDIR + ADMETA)'
        }
      });
    }

    return res.status(401).json({ error: 'Usuario no autorizado en Portal Director.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Resumen Ejecutivo Sostenedor (blank_dashboard_total & blank_dashboard_director_new)
app.get('/api/resumen', async (_req, res) => {
  try {
    const [
      kpisQ,
      topAsistenciaQ,
      pdirAppsQ,
      etaAppsQ,
      establecimientosQ,
      periodosQ
    ] = await Promise.all([
      pool.query(`
        SELECT
          (SELECT COUNT(*)::int FROM adm_portaldir.pdir_eeee_sostenedor_1) AS total_establecimientos,
          (SELECT COALESCE(SUM(dbas_total_alumnos), 0)::int FROM adm_portaldir.pdir_db_asist_01) AS matricula_comunal,
          (SELECT COALESCE(SUM(dbas_cant_alumnos), 0)::int FROM adm_portaldir.pdir_db_asist_01) AS asistencia_media_comunal,
          (SELECT ROUND(AVG(dbas_total), 1) FROM adm_portaldir.pdir_db_asist_01) AS pct_asistencia_comunal,
          (SELECT COALESCE(SUM(dbri_total), 0)::int FROM adm_portaldir.pdir_db_riesgo_01) AS total_casos_riesgo,
          (SELECT ROUND(AVG(dbno_promedio_anual), 2) FROM adm_portaldir.pdir_db_notas_01) AS promedio_notas_comunal,
          (SELECT COUNT(*)::int FROM adm_portaldir.pdir_apps) AS total_dashboards_pdir,
          (SELECT COUNT(*)::int FROM admeta.eta_aplicaciones) AS total_apps_admeta,
          (SELECT COUNT(*)::int FROM admeta.eta_encuestas) AS encuestas_activas
      `),
      pool.query(`
        SELECT
          a.eeso_cod,
          a.eeso_nombre AS establecimiento,
          a.dbas_total_alumnos AS matricula,
          a.dbas_cant_alumnos AS asistencia_media,
          a.dbas_total AS pct_asistencia,
          n.dbno_promedio_anual AS promedio_anual,
          r.dbri_total AS casos_riesgo
        FROM adm_portaldir.pdir_db_asist_01 a
        LEFT JOIN adm_portaldir.pdir_db_notas_01 n ON n.eeso_cod = a.eeso_cod
        LEFT JOIN adm_portaldir.pdir_db_riesgo_01 r ON r.eeso_cod = a.eeso_cod
        ORDER BY a.dbas_total DESC
        LIMIT 12
      `),
      pool.query(`SELECT apps_nombre, app_modulo, apps_es_pagado FROM adm_portaldir.pdir_apps ORDER BY app_modulo ASC`),
      pool.query(`SELECT apli_id, apli_desc, apli_label, apli_padre, apli_link FROM admeta.eta_aplicaciones ORDER BY apli_pos_aplic ASC`),
      pool.query(`SELECT eeso_cod, eeso_rbd AS rbd, eeso_nombre AS nombre FROM adm_portaldir.pdir_eeee_sostenedor_1 ORDER BY eeso_cod ASC`),
      pool.query(`SELECT peri_cod, peri_anio, peri_desc, peri_en_uso FROM adm_portaldir.pdir_periodos ORDER BY peri_cod DESC`)
    ]);

    res.json({
      kpis: kpisQ.rows[0],
      destacados: topAsistenciaQ.rows,
      pdirApps: pdirAppsQ.rows,
      etaApps: etaAppsQ.rows,
      establecimientos: establecimientosQ.rows,
      periodos: periodosQ.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Eje 1: Asistencia Consolidada y Proyección de Subvenciones MINEDUC (PDIR_DB_ASIST_01 y PDIR_DB_ASIST_02)
app.get('/api/asistencia-subvenciones', async (req, res) => {
  try {
    const { q } = req.query;
    const params = [];
    let whereSql = '';
    if (q && String(q).trim()) {
      params.push(`%${String(q).trim().toUpperCase()}%`);
      whereSql = `WHERE UPPER(a1.eeso_nombre) LIKE $1`;
    }

    const rowsQ = await pool.query(
      `SELECT
        a1.eeso_cod,
        a1.eeso_nombre AS establecimiento,
        a1.dbas_total_alumnos AS matricula_total,
        a1.dbas_cant_alumnos AS asistencia_media,
        a1.dbas_total AS pct_asistencia,
        a2.asis_neta AS asistencia_neta_bloques,
        a2.asis_null AS inasistencia_bloques,
        a2.dias_consulta AS dias_trabajados,
        a2.asist_posible_estabs AS asistencia_posible,
        (a1.dbas_cant_alumnos * 94850)::bigint AS subvencion_mensual_estimada
      FROM adm_portaldir.pdir_db_asist_01 a1
      LEFT JOIN adm_portaldir.pdir_db_asist_02 a2 ON a2.eeso_cod = a1.eeso_cod
      ${whereSql}
      ORDER BY a1.eeso_cod ASC`,
      params
    );

    res.json({ establecimientos: rowsQ.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Eje 2 y 3: Riesgo Escolar, Niveles de Desempeño y Rendimiento Académico
app.get('/api/riesgo-desempeno', async (req, res) => {
  try {
    const { q } = req.query;
    const params = [];
    let whereSql = '';
    if (q && String(q).trim()) {
      params.push(`%${String(q).trim().toUpperCase()}%`);
      whereSql = `WHERE UPPER(r.eeso_nombre) LIKE $1`;
    }

    const [consolidadoQ, nivelesQ] = await Promise.all([
      pool.query(
        `SELECT
          r.eeso_cod,
          r.eeso_nombre AS establecimiento,
          a.dbas_total_alumnos AS matricula,
          a.dbas_total AS pct_asistencia,
          r.dbri_total AS casos_riesgo,
          ROUND((r.dbri_total::numeric / GREATEST(a.dbas_total_alumnos, 1)) * 100, 2) AS tasa_riesgo_pct,
          n.dbno_promedio_anual AS promedio_anual
        FROM adm_portaldir.pdir_db_riesgo_01 r
        LEFT JOIN adm_portaldir.pdir_db_asist_01 a ON a.eeso_cod = r.eeso_cod
        LEFT JOIN adm_portaldir.pdir_db_notas_01 n ON n.eeso_cod = r.eeso_cod
        ${whereSql}
        ORDER BY r.dbri_total DESC`,
        params
      ),
      pool.query(`
        SELECT
          eeso_cod,
          eeso_nombre AS establecimiento,
          tipo AS nivel_desempeno,
          escala AS porcentaje
        FROM adm_portaldir.pdir_db_desemp_02
        ORDER BY eeso_cod ASC, tipo ASC
      `)
    ]);

    res.json({
      consolidado: consolidadoQ.rows,
      nivelesDesempeno: nivelesQ.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Eje 4 y 5: Control de Firmas Libro de Clases Digital (Asistencia y Leccionario Circular N° 30)
app.get('/api/firmas-libro-digital', async (_req, res) => {
  try {
    const [firmasAsistQ, firmasLeccQ] = await Promise.all([
      pool.query(`
        SELECT
          ra.reas_cod,
          ra.peee_cod AS eeso_cod,
          ra.eeas_cod AS rbd,
          ra.reas_nom_firma AS establecimiento,
          ra.reas_tipo_asistencia AS tipo_control,
          ra.reas_nro_bloque AS bloque,
          TO_CHAR(ra.reas_fec_asistencia, 'YYYY-MM-DD') AS fecha,
          ra.reas_cod_estado AS codigo_estado,
          ra.reas_desc_estado AS estado_firma
        FROM adm_portaldir.pdir_resumen_asistencia_1 ra
        ORDER BY ra.reas_cod ASC
      `),
      pool.query(`
        SELECT
          rl.rele_cod,
          rl.peee_cod AS eeso_cod,
          rl.eeas_cod AS rbd,
          rl.firma_lecc AS establecimiento,
          rl.tipo_leccionario AS tipo_registro,
          TO_CHAR(rl.fec_leccionario, 'YYYY-MM-DD') AS fecha,
          rl.cod_estado AS codigo_estado,
          rl.desc_estado AS estado_firma
        FROM adm_portaldir.pdir_resumen_leccionario_1 rl
        ORDER BY rl.rele_cod ASC
      `)
    ]);

    res.json({
      firmasAsistencia: firmasAsistQ.rows,
      firmasLeccionario: firmasLeccQ.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Módulo ADMETA: Sistema de Encuestas y Evaluación de Metas (SIST_ID = 21)
app.get('/api/encuestas-admeta', async (_req, res) => {
  try {
    const [encuestasQ, tiposEncQ, preguntasQ, respuestasQ, parametrosQ] = await Promise.all([
      pool.query(`
        SELECT
          e.encu_id,
          e.tien_id,
          te.tien_descripcion AS tipo_encuesta_desc,
          e.encu_titulo AS titulo,
          e.encu_subtitulo AS subtitulo,
          e.encu_descripcion AS descripcion,
          e.encu_ponderacion AS ponderacion,
          e.encu_estado AS estado,
          e.encu_puntaje AS puntaje_logro,
          e.encu_tipo AS modalidad,
          TO_CHAR(e.encu_fec_envio, 'YYYY-MM-DD') AS fecha_inicio,
          TO_CHAR(e.encu_fec_termino, 'YYYY-MM-DD') AS fecha_termino
        FROM admeta.eta_encuestas e
        LEFT JOIN admeta.eta_tipo_encuesta te ON te.tien_id = e.tien_id
        ORDER BY e.encu_id DESC
      `),
      pool.query(`SELECT tien_id, tien_descripcion, tien_estado FROM admeta.eta_tipo_encuesta ORDER BY tien_id ASC`),
      pool.query(`
        SELECT
          tp.tepr_id,
          tp.tepr_orden AS orden,
          tp.tepr_enunciado AS enunciado,
          tp.tepr_ponderacion AS ponderacion,
          tp.tepr_rango_min AS rango_min,
          tp.tepr_rango_max AS rango_max,
          t.tipr_nombre AS tipo_pregunta
        FROM admeta.eta_tmpl_preguntas tp
        LEFT JOIN admeta.eta_tipo_preguntas t ON t.tipr_id = tp.tipr_id
        ORDER BY tp.tepr_orden ASC
      `),
      pool.query(`
        SELECT
          r.resp_id,
          r.encu_id,
          e.encu_titulo AS encuesta,
          r.preg_id,
          p.tepr_enunciado AS pregunta,
          r.resp_r_text AS respuesta_glosa,
          r.resp_r_number AS puntaje_obtenido,
          TO_CHAR(r.resp_fec_respuesta, 'YYYY-MM-DD') AS fecha
        FROM admeta.eta_respuestas r
        LEFT JOIN admeta.eta_encuestas e ON e.encu_id = r.encu_id
        LEFT JOIN admeta.eta_tmpl_preguntas p ON p.tepr_id = r.preg_id
        ORDER BY r.resp_id DESC
      `),
      pool.query(`SELECT para_codigo, para_desc, para_valor FROM admeta.eta_parametros ORDER BY para_codigo ASC`)
    ]);

    res.json({
      encuestas: encuestasQ.rows,
      tiposEncuesta: tiposEncQ.rows,
      preguntas: preguntasQ.rows,
      respuestas: respuestasQ.rows,
      parametros: parametrosQ.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/encuestas-admeta', async (req, res) => {
  try {
    const { tien_id, titulo, descripcion, modalidad, puntaje } = req.body || {};
    const maxQ = await pool.query(`SELECT COALESCE(MAX(encu_id), 0)::int + 1 AS next_id FROM admeta.eta_encuestas`);
    const nextId = maxQ.rows[0].next_id;

    await pool.query(
      `INSERT INTO admeta.eta_encuestas (
        encu_id, encu_tmpl_ref, tien_id, encu_titulo, encu_subtitulo,
        encu_descripcion, encu_ponderacion, encu_estado, encu_usuario_ins,
        encu_fec_ins, encu_fec_envio, encu_puntaje, encu_fec_termino, encu_tipo
      ) VALUES (
        $1::numeric, $2::numeric, $3::numeric, $4, 'PERÍODO 2026 — CMDS ANTOFAGASTA',
        $5, 100, 'PUBLICADA / EN EJECUCIÓN', '10633447',
        NOW(), NOW(), $6::numeric, '2026-12-31'::timestamp, $7
      )`,
      [
        nextId,
        nextId,
        Number(tien_id || 1),
        String(titulo || 'NUEVA ENCUESTA INSTITUCIONAL').toUpperCase(),
        descripcion || 'Evaluación institucional CMDS Antofagasta.',
        Number(puntaje || 90),
        modalidad || 'NORMAL'
      ]
    );

    res.json({ ok: true, encu_id: nextId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static React build
const distPath = path.resolve(__dirname, '..', 'frontend', 'dist');
app.use(express.static(distPath));
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile('index.html', { root: distPath });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Portal Director + ADMETA escuchando en http://localhost:${PORT}`);
  console.log(`   Base de datos PostgreSQL: ${process.env.PG_HOST || '192.168.30.48'}:${process.env.PG_PORT || 5432} / ${process.env.PG_DB || 'bd_cmds_portaldir'}`);
});
