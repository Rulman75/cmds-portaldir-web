# Portal Director + ADMETA (`ADM_PORTALDIR` + `ADMETA`) — Inteligencia Escolar y Encuestas CMDS

Plataforma ejecutiva de Business Intelligence Educacional para Directores y Sostenedor (53 Establecimientos RBDs) integrada con el Motor Institucional de Encuestas y Evaluación (`ADMETA`), respaldada por **PostgreSQL 18.6**.

## Características Principales
- **Puerto por defecto:** `3008` (`http://localhost:3008`)
- **Base de Datos PostgreSQL 18.6 (`192.168.30.48:5432`):** `bd_cmds_portaldir` (**225 tablas**, **190.737 filas reales** en `adm_portaldir`, `admeta` y `adm_auth`)
- **Módulos Implementados:**
  1. **Resumen Ejecutivo Sostenedor (53 RBDs):** KPIs comunales de matrícula, asistencia media, riesgo de deserción, promedio de notas y catálogo oficial de 24 tableros (`PDIR_APPS`).
  2. **Asistencia MINEDUC y Proyección de Subvenciones:** Monitor por establecimiento (`PDIR_DB_ASIST_01`, `PDIR_RPT_ASISTENCIA`).
  3. **Riesgo Escolar, Deserción y Rendimiento Académico:** Alertas tempranas (`PDIR_DB_RIESGO_01`) y distribución de calificaciones (`PDIR_DB_NOTAS_01`).
  4. **Auditoría de Firmas Libro Digital (Circular N°30):** Fiscalización de firmas OTP de asistencia y leccionario (`PDIR_RESUMEN_FIRMA_ASIST`, `PDIR_RESUMEN_FIRMA_LECC`).
  5. **Motor Institucional de Encuestas y Clima (`ADMETA`):** Instrumentos normales y anónimos (`ETA_ENCUESTAS`), banco de preguntas Likert (`ETA_TMPL_PREGUNTAS`) y resultados (`ETA_RESPUESTAS`).

## Ejecución Rápida
```powershell
cd backend
node server.js
```
