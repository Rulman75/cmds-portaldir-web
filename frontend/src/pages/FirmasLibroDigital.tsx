import React, { useEffect, useState } from 'react';
import { FileCheck2, CheckCircle2, Clock } from 'lucide-react';

export const FirmasLibroDigital: React.FC = () => {
  const [data, setData] = useState<any>({ firmasAsistencia: [], firmasLeccionario: [] });

  useEffect(() => {
    fetch('/api/firmas-libro-digital')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#016098]/10 text-[#016098]">
            EJES 4 Y 5 PORTAL DIRECTOR • CIRCULAR N° 30 SUPEREDUC (PDIR_FIRMA_ASIST & PDIR_FIRMA_LECCIONARIO)
          </span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mt-1">
          Auditoría Comunal de Firmas Digitales del Libro de Clases (Asistencia y Leccionario)
        </h2>
        <p className="text-xs text-slate-500">
          Tableros `dashboard_libro_class_asis_conso_x_sost_blank` y `dashboard_libro_class_lecc_conso_x_sost_blank`
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#016098]" />
            Firmas Digitales de Asistencia por Bloque (`PDIR_RESUMEN_ASISTENCIA_1`)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="text-left py-2.5 px-2.5 font-bold">Establecimiento</th>
                  <th className="text-center py-2.5 px-2.5 font-bold">Bloque</th>
                  <th className="text-center py-2.5 px-2.5 font-bold">Estado Token OTP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data.firmasAsistencia || []).map((f: any) => (
                  <tr key={f.reas_cod} className="hover:bg-slate-50">
                    <td className="py-2 px-2.5 font-semibold text-slate-800">{f.establecimiento}</td>
                    <td className="py-2 px-2.5 text-center font-mono">Bloque #{f.bloque}</td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          f.codigo_estado === 'F'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {f.codigo_estado === 'F' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {f.estado_firma}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#39BABD]" />
            Firmas Digitales de Leccionario OA (`PDIR_RESUMEN_LECCIONARIO_1`)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <th className="text-left py-2.5 px-2.5 font-bold">Establecimiento</th>
                  <th className="text-left py-2.5 px-2.5 font-bold">Tipo Registro</th>
                  <th className="text-center py-2.5 px-2.5 font-bold">Estado Firma Docente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(data.firmasLeccionario || []).map((l: any) => (
                  <tr key={l.rele_cod} className="hover:bg-slate-50">
                    <td className="py-2 px-2.5 font-semibold text-slate-800">{l.establecimiento}</td>
                    <td className="py-2 px-2.5 text-slate-600">{l.tipo_registro}</td>
                    <td className="py-2 px-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          l.codigo_estado === 'F'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {l.codigo_estado === 'F' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {l.estado_firma}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
