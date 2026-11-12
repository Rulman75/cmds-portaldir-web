import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  AlertCircle,
  FileCheck2,
  BookOpen,
  LogOut,
  Database,
  ShieldCheck
} from 'lucide-react';
import { APP_VERSION, SYSTEM_CODE } from '../version';

export type PortalDirModuleId =
  | 'inicio'
  | 'asistencia-subvenciones'
  | 'riesgo-desempeno'
  | 'firmas-libro'
  | 'encuestas-admeta';

interface LayoutProps {
  activeModule: PortalDirModuleId;
  onSelectModule: (m: PortalDirModuleId) => void;
  user: any;
  onLogout: () => void;
  children: React.ReactNode;
}

const MENU_ITEMS: { id: PortalDirModuleId; label: string; subtitle: string; icon: React.ComponentType<any>; badge?: string }[] = [
  {
    id: 'inicio',
    label: 'Dashboard Sostenedor (53 RBD)',
    subtitle: 'Resumen Comunal y 24 Tableros',
    icon: LayoutDashboard,
    badge: '2026'
  },
  {
    id: 'asistencia-subvenciones',
    label: 'Asistencia y Subvenciones',
    subtitle: 'Asistencia Media y Proyección MINEDUC',
    icon: TrendingUp,
    badge: '1.196 usos'
  },
  {
    id: 'riesgo-desempeno',
    label: 'Riesgo Escolar, Desempeño y Notas',
    subtitle: 'Alertas Deserción, Agencia y Promedios',
    icon: AlertCircle,
    badge: '666 usos'
  },
  {
    id: 'firmas-libro',
    label: 'Firmas Libro Digital (Circ. 30)',
    subtitle: 'Auditoría Token Asistencia y Leccionario',
    icon: FileCheck2,
    badge: '318 usos'
  },
  {
    id: 'encuestas-admeta',
    label: 'Encuestas y Metas (ADMETA)',
    subtitle: 'Clima Escolar, Convenios ADP y Likert',
    icon: BookOpen,
    badge: '36 Apps'
  }
];

export const Layout: React.FC<LayoutProps> = ({
  activeModule,
  onSelectModule,
  user,
  onLogout,
  children
}) => {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside
        className="w-72 text-white flex flex-col shrink-0 shadow-xl"
        style={{ background: 'linear-gradient(180deg, #016098 0%, #013d63 100%)' }}
      >
        <div className="p-5 border-b border-white/15 flex items-center gap-3">
          <img src="/logo.png" alt="CMDS" className="h-11 w-auto bg-white rounded-lg p-1 shadow" />
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#39BABD]">
              {SYSTEM_CODE}
            </div>
            <div className="font-extrabold text-base leading-tight truncate">
              PORTAL DIRECTOR
            </div>
            <div className="text-[11px] text-sky-200 truncate">
              BI Escolar & Encuestas ADMETA
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {MENU_ITEMS.map(item => {
            const Icon = item.icon;
            const active = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                  active
                    ? 'bg-white text-[#016098] shadow-md font-bold'
                    : 'text-sky-100 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${active ? 'text-[#016098]' : 'text-[#39BABD]'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${
                          active
                            ? 'bg-[#016098]/10 text-[#016098]'
                            : 'bg-[#39BABD]/20 text-[#39BABD]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] truncate ${active ? 'text-slate-500' : 'text-sky-200/80'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/15 bg-black/20 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <Database className="w-4 h-4 shrink-0" />
            <span className="truncate">PG 192.168.30.48 • bd_cmds_portaldir</span>
          </div>
          <div className="flex items-center justify-between text-sky-200 text-[11px]">
            <span>225 Tablas (PDIR + ADMETA)</span>
            <span>v{APP_VERSION}</span>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2 px-3 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#016098]/10 text-[#016098]">
                CMDS ANTOFAGASTA • 53 COLEGIOS Y LICEOS RBD
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#39BABD]/15 text-teal-800">
                DATA MART _1 / _2 / _3 + ADMETA
              </span>
            </div>
            <h1 className="text-lg font-extrabold text-slate-800 mt-0.5">
              Portal Director (`ADM_PORTALDIR`) y Sistema de Evaluación de Encuestas (`ADMETA`)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-800 flex items-center justify-end gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#016098]" />
                {user?.nombreCompleto || 'RAÚL HORMAZÁBAL FIGUEROA'}
              </div>
              <div className="text-[11px] text-slate-500">
                RUT {user?.rut || '10633447-1'} • {user?.rol || 'SOSTENEDOR CORPORATIVO'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
