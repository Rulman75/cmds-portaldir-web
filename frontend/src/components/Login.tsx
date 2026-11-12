import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Server, Building2, AlertCircle, LayoutDashboard } from 'lucide-react';
import { APP_VERSION, SYSTEM_NAME, SYSTEM_CODE } from '../version';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('10633447');
  const [password, setPassword] = useState('2114');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || 'Error de autenticación');
      } else {
        onLoginSuccess(data.user);
      }
    } catch {
      setError('No fue posible conectar con el servidor Portal Director.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      <div
        className="md:w-7/12 p-8 md:p-14 flex flex-col justify-between text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #016098 0%, #013d63 60%, #0f172a 100%)' }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <img src="/logo.png" alt="CMDS Antofagasta" className="h-14 w-auto bg-white rounded-xl p-1.5 shadow-lg" />
            <div>
              <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#39BABD]/25 text-[#39BABD] border border-[#39BABD]/40">
                {SYSTEM_CODE}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-tight">
                {SYSTEM_NAME}
              </h1>
              <p className="text-sm text-sky-200">
                Corporación Municipal de Desarrollo Social de Antofagasta
              </p>
            </div>
          </div>

          <div className="space-y-6 max-w-xl mt-10">
            <h2 className="text-xl md:text-2xl font-bold leading-snug text-white">
              Data Mart Analítico para Directores y Sostenedor (53 Establecimientos RBD) + Motor de Encuestas y Evaluación (`ADMETA`)
            </h2>
            <p className="text-sm text-sky-100/90 leading-relaxed">
              Sistema corporativo migrado desde `cmds-portal-director.pad.cl:2443` (`ADM_PORTALDIR` + `ADMETA`) hacia React 19 + PostgreSQL 18.6 sobre el servidor dedicado <strong>192.168.30.48:5432 (`bd_cmds_portaldir`)</strong> con las <strong>225 tablas</strong> (`129` en `adm_portaldir`, `75` en `admeta` y `21` en `adm_auth`).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                <div className="text-xs font-semibold text-[#39BABD] uppercase">24 Dashboards Portal Director</div>
                <div className="text-sm font-bold mt-1">Asistencia, Subvenciones, Riesgo Escolar, Niveles de Desempeño y Firmas Libro Digital</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
                <div className="text-xs font-semibold text-[#EB567F] uppercase">36 Aplicaciones ADMETA</div>
                <div className="text-sm font-bold mt-1">Encuestas Normales y Anónimas, Plantillas Likert y Evaluación de Convenios Directivos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-sky-200">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-[#39BABD]" />
            <span>PostgreSQL 18.6 • 192.168.30.48:5432 / bd_cmds_portaldir (225 tablas)</span>
          </div>
          <span>Versión {APP_VERSION} • Puerto 3008</span>
        </div>
      </div>

      <div className="md:w-5/12 bg-white flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#016098] text-xs font-semibold mb-3 border border-sky-200">
              <ShieldCheck className="w-4 h-4" />
              Acceso Sostenedor y Directores (53 Colegios CMDS)
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Ingreso a Portal Director</h2>
            <p className="text-sm text-slate-500 mt-1">
              Inteligencia de Negocios Escolar (`ADM_PORTALDIR`) y Encuestas (`ADMETA`)
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                RUT Director / Sostenedor
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#016098]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                Contraseña Portal Director
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#016098]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2"
              style={{ backgroundColor: '#016098' }}
            >
              <LayoutDashboard className="w-4 h-4" />
              {loading ? 'Conectando a bd_cmds_portaldir...' : 'Ingresar a Portal Director'}
            </button>
          </form>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#016098]" />
              Credenciales Oficiales Homologadas:
            </div>
            <div>• Usuario: <code className="font-mono font-bold text-[#016098]">10633447</code> (Raúl Hormazábal Figueroa)</div>
            <div>• Clave: <code className="font-mono font-bold text-[#016098]">2114</code> (o <code className="font-mono font-bold text-[#016098]">7888</code>)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
