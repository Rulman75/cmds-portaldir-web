import React, { useEffect, useState } from 'react';
import { AlertCircle, Award, Download } from 'lucide-react';
import { exportToCSV, exportToExcel } from '../utils/exportUtils';

export const RiesgoDesempenoNotas: React.FC = () => {
  const [tab, setTab] = useState<'riesgo' | 'desempeno'>('riesgo');
  const [data, setData] = useState<any>({ consolidado: [], nivelesDesempeno: [] });

  useEffect(() => {
    fetch('/api/riesgo-desempeno')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#016098]/10 text-[#016098]">
              EJES 2 Y 3 PORTAL DIRECTOR • PDIR_DB_RIESGO_01, PDIR_DB_DESEMP_02 & PDIR_DB_NOTAS_01
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Alerta Temprana de Riesgo Escolar, Niveles de Desempeño y Promedios Académicos
          </h2>
          <p className="text-xs text-slate-500">
            Tableros `dashboard_riesgo_cosolidado_sostenedor_blank`, `dashboard_desempeno_consolidado_sostenedor` y `dashboard_promedios_x_estab`
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportToCSV(data.consolidado || [], 'riesgo_y_promedios_portaldir')}
            className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={() => exportToExcel(data.consolidado || [], 'riesgo_y_promedios_portaldir')}
            className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTab('riesgo')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
            tab === 'riesgo' ? 'bg-[#016098] text-white shadow' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-rose-400" />
          Casos de Riesgo y Promedios por Establecimiento ({data.consolidado?.length || 0})
        </button>
        <button
          onClick={() => setTab('desempeno')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
            tab === 'desempeno' ? 'bg-[#016098] text-white shadow' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-[#39BABD]" />
          Estándares de Desempeño Agencia Calidad (`PDIR_DB_DESEMP_02`)
        </button>
      </div>

      {tab === 'riesgo' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="text-left py-3 px-3 font-bold">Establecimiento (RBD)</th>
                  <th className="text-center py-3 px-3 font-bold">Matrícula</th>
                  <th className="text-center py-3 px-3 font-bold">% Asistencia</th>
                  <th className="text-center py-3 px-3 font-bold">Casos en Riesgo (`PDIR_DB_RIESGO_01`)</th>
                  <th className="text-center py-3 px-3 font-bold">% Tasa Riesgo</th>
                  <th className="text-center py-3 px-3 font-bold">Promedio Anual (`PDIR_DB_NOTAS_01`)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data.consolidado || []).map((r: any) => (
                  <tr key={r.eeso_cod} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{r.establecimiento}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{r.matricula}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">{r.pct_asistencia}%</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200">
                        {r.casos_riesgo} alumnos
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">{r.tasa_riesgo_pct}%</td>
                    <td className="py-2.5 px-3 text-center font-mono font-extrabold text-sm text-[#016098]">{r.promedio_anual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'desempeno' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="text-left py-3 px-3 font-bold">Establecimiento</th>
                  <th className="text-left py-3 px-3 font-bold">Nivel de Aprendizaje (`TIPO`)</th>
                  <th className="text-center py-3 px-3 font-bold">% Estudiantes (`ESCALA`)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data.nivelesDesempeno || []).slice(0, 60).map((n: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-bold text-slate-900">{n.establecimiento}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          n.nivel_desempeno.includes('ADECUADO')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : n.nivel_desempeno.includes('ELEMENTAL')
                            ? 'bg-sky-50 text-[#016098] border border-sky-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {n.nivel_desempeno}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center font-mono font-extrabold">{n.porcentaje}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
