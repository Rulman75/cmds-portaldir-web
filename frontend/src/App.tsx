import React, { useState } from 'react';
import { Login } from './components/Login';
import { Layout, PortalDirModuleId } from './components/Layout';
import { InicioPortalDir } from './pages/InicioPortalDir';
import { AsistenciaSubvenciones } from './pages/AsistenciaSubvenciones';
import { RiesgoDesempenoNotas } from './pages/RiesgoDesempenoNotas';
import { FirmasLibroDigital } from './pages/FirmasLibroDigital';
import { EncuestasAdmeta } from './pages/EncuestasAdmeta';

export function App() {
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('cmds_portaldir_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeModule, setActiveModule] = useState<PortalDirModuleId>('inicio');

  const handleLogin = (loggedUser: any) => {
    setUser(loggedUser);
    localStorage.setItem('cmds_portaldir_user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cmds_portaldir_user');
  };

  if (!user) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <Layout
      activeModule={activeModule}
      onSelectModule={setActiveModule}
      user={user}
      onLogout={handleLogout}
    >
      {activeModule === 'inicio' && <InicioPortalDir onNavigate={setActiveModule} />}
      {activeModule === 'asistencia-subvenciones' && <AsistenciaSubvenciones />}
      {activeModule === 'riesgo-desempeno' && <RiesgoDesempenoNotas />}
      {activeModule === 'firmas-libro' && <FirmasLibroDigital />}
      {activeModule === 'encuestas-admeta' && <EncuestasAdmeta />}
    </Layout>
  );
}

export default App;
