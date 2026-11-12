import React, { useEffect, useState } from 'react';
import { BookOpen, PlusCircle, CheckCircle2, Download, X } from 'lucide-react';
import { exportToCSV, exportToExcel } from '../utils/exportUtils';

export const EncuestasAdmeta: React.FC = () => {
  const [tab, setTab] = useState<'encuestas' | 'preguntas' | 'respuestas'>('encuestas');
  const [data, setData] = useState<any>({ encuestas: [], tiposEncuesta: [], preguntas: [], respuestas: [] });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    tien_id: '1',
    titulo: '',
    descripcion: '',
    modalidad: 'NORMAL',
    puntaje: '92'
  });

  const loadData = () => {
    fetch('/api/encuestas-admeta')
      .then(r => r.json())
      .then(d => setData(d));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await fetch('/api/encuestas-admeta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (resp.ok) {
      setShowModal(false);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#016098]/10 text-[#016098]">
              ESQUEMA ADMETA (SIST_ID = 21 • 75 TABLAS Y 36 APLICACIONES)
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Sistema de Encuestas, Plantillas Likert y Evaluación de Convenios (`ADMETA`)
          </h2>
          <p className="text-xs text-slate-500">
            Gestión de encuestas normales y anónimas (`grid_encuestas`, `grid_encuestas_anonima`), plantillas (`ETA_TMPL_PREGUNTAS`) y exportación de respuestas (`ETA_RESPUESTAS`)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => exportToCSV(data.respuestas || [], 'respuestas_encuestas_admeta')}
            className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            CSV Respuestas
          </button>
          <button
            onClick={() => exportToExcel(data.respuestas || [], 'respuestas_encuestas_admeta')}
            className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Excel (`respuestas_anonimas_exel_grid`)
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl bg-[#016098] text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Nueva Encuesta Institucional
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTab('encuestas')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
            tab === 'encuestas' ? 'bg-[#016098] text-white shadow' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Encuestas Activas (`ETA_ENCUESTAS`) ({data.encuestas?.length || 0})
        </button>
        <button
          onClick={() => setTab('preguntas')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
            tab === 'preguntas' ? 'bg-[#016098] text-white shadow' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Plantilla de Preguntas (`ETA_TMPL_PREGUNTAS`) ({data.preguntas?.length || 0})
        </button>
        <button
          onClick={() => setTab('respuestas')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
            tab === 'respuestas' ? 'bg-[#016098] text-white shadow' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          Respuestas y Evaluación (`ETA_RESPUESTAS`) ({data.respuestas?.length || 0})
        </button>
      </div>

      {tab === 'encuestas' && (
        <div className="grid grid-cols-1 gap-4">
          {(data.encuestas || []).map((e: any) => (
            <div key={e.encu_id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#016098]">ENCU-{e.encu_id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-[#016098] border border-sky-200">
                    MODALIDAD: {e.modalidad}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {e.estado}
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">{e.titulo}</h3>
                <div className="text-xs font-semibold text-teal-800">{e.tipo_encuesta_desc}</div>
                <p className="text-xs text-slate-600">{e.descripcion}</p>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <div className="text-xs text-slate-500">Índice de Logro / Satisfacción</div>
                <div className="text-2xl font-extrabold font-mono text-[#016098]">{e.puntaje_logro}%</div>
                <div className="text-[11px] font-mono text-slate-500">Vigencia hasta {e.fecha_termino}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'preguntas' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="text-center py-3 px-3 font-bold">Orden</th>
                <th className="text-left py-3 px-3 font-bold">Enunciado Oficial (`ETA_TMPL_PREGUNTAS`)</th>
                <th className="text-left py-3 px-3 font-bold">Tipo de Escala (`ETA_TIPO_PREGUNTAS`)</th>
                <th className="text-center py-3 px-3 font-bold">Ponderación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data.preguntas || []).map((p: any) => (
                <tr key={p.tepr_id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 text-center font-mono font-bold">#{p.orden}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{p.enunciado}</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.tipo_pregunta}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-[#016098]">{p.ponderacion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'respuestas' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="text-left py-3 px-3 font-bold">ID</th>
                <th className="text-left py-3 px-3 font-bold">Instrumento (`ETA_ENCUESTAS`)</th>
                <th className="text-left py-3 px-3 font-bold">Pregunta Evaluada</th>
                <th className="text-left py-3 px-3 font-bold">Resultado / Glosa</th>
                <th className="text-center py-3 px-3 font-bold">Puntaje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data.respuestas || []).map((r: any) => (
                <tr key={r.resp_id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold">RESP-{r.resp_id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{r.encuesta}</td>
                  <td className="py-2.5 px-3 text-slate-600">{r.pregunta}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {r.respuesta_glosa}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-extrabold text-[#016098]">{r.puntaje_obtenido}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Crear Encuesta en `ADMETA.ETA_ENCUESTAS`</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 mb-1">Título de la Encuesta / Evaluación</label>
                <input
                  type="text"
                  required
                  value={form.titulo}
                  onChange={e => setForm({ ...form, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Tipo de Instrumento</label>
                  <select
                    value={form.tien_id}
                    onChange={e => setForm({ ...form, tien_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    {(data.tiposEncuesta || []).map((t: any) => (
                      <option key={t.tien_id} value={t.tien_id}>
                        {t.tien_descripcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-1">Modalidad</label>
                  <select
                    value={form.modalidad}
                    onChange={e => setForm({ ...form, modalidad: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  >
                    <option value="NORMAL">NORMAL (NOMINADA)</option>
                    <option value="ANONIMA">ANÓNIMA (CONFIDENCIAL)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-600 mb-1">Descripción / Alcance</label>
                <textarea
                  rows={3}
                  required
                  value={form.descripcion}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 rounded-xl bg-[#016098] text-white text-xs font-bold cursor-pointer">
                Publicar Encuesta
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
