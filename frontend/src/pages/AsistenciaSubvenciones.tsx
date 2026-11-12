import React, { useEffect, useState } from 'react';
import { TrendingUp, Search, Download } from 'lucide-react';
import { exportToCSV, exportToExcel } from '../utils/exportUtils';

const fmtCLP = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(Number(n || 0));

export const AsistenciaSubvenciones: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState('');

  const loadData = () => {
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    fetch(`/api/asistencia-subvenciones?${params.toString()}`)
      .then(r => r.json())
      .then(d => setRows(d.establecimientos || []));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  const totalSubvencion = rows.reduce((acc, r) => acc + Number(r.subvencion_mensual_estimada || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#016098]/10 text-[#016098]">
              EJE 1 PORTAL DIRECTOR • PDIR_DB_ASIST_01 & PDIR_DB_ASIST_02 (1.196 Accesos en 2026)
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Asistencia Consolidada, Media Mensual y Proyección de Subvenciones MINEDUC
          </h2>
          <p className="text-xs text-slate-500">
            Tableros `dashboard_asistencia_consolidada_blank`, `dashboard_asis_media_mensual_blank` y `dashboard_reporte_subve_mensual_blank`
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <span className="text-emerald-800 font-semibold">Proyección Subvención Mensual (53 RBD): </span>
            <strong className="font-mono text-emerald-900">{fmtCLP(totalSubvencion)}</strong>
          </div>
          <button
            onClick={() => exportToCSV(rows, 'asistencia_subvenciones_portaldir')}
            className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={() => exportToExcel(rows, 'asistencia_subvenciones_portaldir')}
            className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Filtrar por RBD o nombre de Liceo / Escuela / Jardín..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl bg-[#016098] text-white text-xs font-bold cursor-pointer flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4" />
          Filtrar Colegios
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="text-left py-3 px-3 font-bold">Establecimiento Educacional (`PDIR_EEEE_SOSTENEDOR`)</th>
                <th className="text-center py-3 px-3 font-bold">Matrícula Total</th>
                <th className="text-center py-3 px-3 font-bold">Asistencia Media</th>
                <th className="text-center py-3 px-3 font-bold">% Asistencia</th>
                <th className="text-right py-3 px-3 font-bold">Bloques Asistidos</th>
                <th className="text-right py-3 px-3 font-bold">Inasistencias</th>
                <th className="text-right py-3 px-3 font-bold">Subvención Estimada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r: any) => (
                <tr key={r.eeso_cod} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{r.establecimiento}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold">{r.matricula_total}</td>
                  <td className="py-2.5 px-3 text-center font-mono text-[#016098] font-bold">{r.asistencia_media}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                        Number(r.pct_asistencia) >= 92
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {r.pct_asistencia}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    {Number(r.asistencia_neta_bloques || 0).toLocaleString('es-CL')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-rose-700">
                    {Number(r.inasistencia_bloques || 0).toLocaleString('es-CL')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-extrabold text-emerald-700">
                    {fmtCLP(r.subvencion_mensual_estimada)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
