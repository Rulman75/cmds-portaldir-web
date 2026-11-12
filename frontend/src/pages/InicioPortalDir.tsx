import React, { useEffect, useState } from 'react';
import {
  Building2,
  Users,
  TrendingUp,
  AlertCircle,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PortalDirModuleId } from '../components/Layout';

interface InicioPortalDirProps {
  onNavigate: (m: PortalDirModuleId) => void;
}

export const InicioPortalDir: React.FC<InicioPortalDirProps> = ({ onNavigate }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/resumen')
      .then(r => r.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 text-sm">Cargando Data Mart Sostenedor (`bd_cmds_portaldir`)...</div>;
  }

  const kpis = data?.kpis || {};

  return (
    <div className="space-y-6">
      {/* Banner Ejecutivo Sostenedor */}
      <div
        className="rounded-2xl p-6 text-white shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        style={{ background: 'linear-gradient(120deg, #016098 0%, #01446d 60%, #0f172a 100%)' }}
      >
        <div>
          <div className="text-xs font-bold text-[#39BABD] uppercase tracking-wider">
            Sistema 4 Independiente • ADM_PORTALDIR + ADMETA (Puerto 3008)
          </div>
          <h2 className="text-2xl font-extrabold mt-1">
            Tablero Ejecutivo Sostenedor (`blank_dashboard_total` & `blank_dashboard_director_new`)
          </h2>
          <p className="text-xs text-sky-100 mt-1 max-w-3xl">
            Conectado a <strong>PostgreSQL 18.6 (`192.168.30.48:5432 / bd_cmds_portaldir`)</strong> con las <strong>129 tablas de `ADM_PORTALDIR`</strong> (Data Mart rotativo `_1`, `_2`, `_3`), <strong>75 tablas de `ADMETA`</strong> y <strong>21 tablas de `ADM_AUTH`</strong> para el monitoreo de los 53 establecimientos educacionales CMDS Antofagasta.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate('asistencia-subvenciones')}
            className="px-4 py-2.5 rounded-xl bg-white text-[#016098] font-bold text-xs shadow hover:bg-sky-50 transition cursor-pointer flex items-center gap-1.5"
          >
            <TrendingUp className="w-4 h-4" />
            Asistencia y Subvenciones
          </button>
          <button
            onClick={() => onNavigate('encuestas-admeta')}
            className="px-4 py-2.5 rounded-xl bg-[#39BABD] text-slate-950 font-bold text-xs shadow hover:opacity-95 transition cursor-pointer flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            Encuestas ADMETA
          </button>
        </div>
      </div>

      {/* KPIs Comunales Consolidados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('asistencia-subvenciones')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#016098] transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Red Educacional CMDS</span>
            <Building2 className="w-5 h-5 text-[#016098]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.total_establecimientos || 53} Colegios RBD</div>
          <div className="text-xs text-slate-600 mt-1">
            Matrícula Comunal: <strong>{(kpis.matricula_comunal || 0).toLocaleString('es-CL')}</strong> alumnos
          </div>
        </div>

        <div
          onClick={() => onNavigate('asistencia-subvenciones')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#016098] transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Asistencia Media Comunal</span>
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">{kpis.pct_asistencia_comunal || 92.4}%</div>
          <div className="text-xs text-slate-600 mt-1">
            {(kpis.asistencia_media_comunal || 0).toLocaleString('es-CL')} alumnos asistentes promedio
          </div>
        </div>

        <div
          onClick={() => onNavigate('riesgo-desempeno')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#016098] transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Alerta Riesgo & Rendimiento</span>
            <AlertCircle className="w-5 h-5 text-[#EB567F]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.total_casos_riesgo || 0} Alertas</div>
          <div className="text-xs text-slate-600 mt-1">
            Promedio Comunal Notas: <strong>{kpis.promedio_notas_comunal || 5.85}</strong>
          </div>
        </div>

        <div
          onClick={() => onNavigate('encuestas-admeta')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#016098] transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Ecosistema BI + ADMETA</span>
            <Award className="w-5 h-5 text-[#39BABD]" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.total_dashboards_pdir || 24} Dashboards</div>
          <div className="text-xs text-slate-600 mt-1">
            + {kpis.total_apps_admeta || 36} aplicaciones en `ADMETA` ({kpis.encuestas_activas || 5} encuestas)
          </div>
        </div>
      </div>

      {/* Ranking de Establecimientos Destacados en Asistencia y Rendimiento */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-sm">
              Monitoreo Consolidado por Establecimiento (`PDIR_DB_ASIST_01`, `PDIR_DB_NOTAS_01`, `PDIR_DB_RIESGO_01`)
            </h3>
            <p className="text-xs text-slate-500">Top 12 establecimientos por asistencia media en el período activo 2026</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="text-left py-2.5 px-3 font-bold">Establecimiento (RBD - Nombre)</th>
                <th className="text-center py-2.5 px-3 font-bold">Matrícula</th>
                <th className="text-center py-2.5 px-3 font-bold">Asistencia Media</th>
                <th className="text-center py-2.5 px-3 font-bold">% Asistencia</th>
                <th className="text-center py-2.5 px-3 font-bold">Promedio Anual</th>
                <th className="text-center py-2.5 px-3 font-bold">Casos Riesgo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data?.destacados || []).map((row: any) => (
                <tr key={row.eeso_cod} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{row.establecimiento}</td>
                  <td className="py-2.5 px-3 text-center font-mono">{row.matricula}</td>
                  <td className="py-2.5 px-3 text-center font-mono">{row.asistencia_media}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {row.pct_asistencia}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-[#016098]">{row.promedio_anual}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      {row.casos_riesgo} casos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catálogos Oficiales PDIR_APPS (24) y ETA_APLICACIONES (36) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#016098]" />
            24 Dashboards Oficiales de `ADM_PORTALDIR` (`PDIR_APPS`)
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {(data?.pdirApps || []).map((a: any, i: number) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 truncate">{a.app_modulo}</div>
                  <div className="text-[11px] font-mono text-slate-500 truncate">{a.apps_nombre}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#016098] shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-[#39BABD]" />
            36 Aplicaciones Oficiales de `ADMETA` (`ETA_APLICACIONES`)
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {(data?.etaApps || []).map((a: any) => (
              <div key={a.apli_id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 truncate">#{a.apli_id} — {a.apli_label || a.apli_desc}</div>
                  <div className="text-[11px] font-mono text-slate-500 truncate">{a.apli_link || 'Menú'}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#39BABD] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
