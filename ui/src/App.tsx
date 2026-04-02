import { useState } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { Upload } from './components/Upload';
import { Files } from './components/Files';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { Register } from './components/Register';

type Tab = 'dashboard' | 'upload' | 'files' | 'settings' | 'login' | 'register';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('login'); // Começar no login por padrão

  // Função para lidar com o login (leva ao dashboard)
  const handleAuthSuccess = () => setActiveTab('dashboard');
  
  // Função para logout (leva ao login)
  const handleLogout = () => setActiveTab('login');

  // Se estiver em uma tela de autenticação, não mostrar Sidebar/Header
  if (activeTab === 'login') {
    return <Login onLogin={handleAuthSuccess} onNavigateToRegister={() => setActiveTab('register')} />;
  }

  if (activeTab === 'register') {
    return <Register onRegister={handleAuthSuccess} onNavigateToLogin={() => setActiveTab('login')} />;
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar (Rail) */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-stone-100 dark:bg-neutral-900 flex flex-col py-6 z-50">
        <div className="px-6 mb-10">
          <h1 className="text-xl font-bold tracking-tighter text-stone-900 dark:text-amber-500 uppercase">Worker Ant</h1>
          <p className="text-[10px] uppercase tracking-widest text-secondary font-bold opacity-70">Industrial Node 01</p>
        </div>
        <nav className="flex-1 space-y-1">
          <NavItem 
            icon="dashboard" 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon="cloud_upload" 
            label="Upload" 
            active={activeTab === 'upload'} 
            onClick={() => setActiveTab('upload')} 
          />
          <NavItem 
            icon="folder_open" 
            label="Files" 
            active={activeTab === 'files'} 
            onClick={() => setActiveTab('files')} 
          />
          <NavItem 
            icon="settings" 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </nav>
        <div className="mt-auto border-t border-stone-200/50 pt-4">
          <NavItem icon="help" label="Help" onClick={() => {}} />
          <NavItem icon="logout" label="Logout" onClick={handleLogout} />
          <div className="px-4 py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
              <img 
                alt="User Profile Avatar" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCD96PR0d81ofMk7XszRvV6_dacBjrSer4oXAaGYVJ_lywppE9TQH0gTsku_qNBJFFsNQA9dwCww14WAdF9lEvREnL3HELkKE0iXCII-3H146awUie40ZlLGoHGJ1ixjc5fdH99cuSvGm1Zk9oI8PQRniNM8NkJmWht_C2KGFDInHqlD3jlCF02lPHhjF_mHv-fj6r1jv4YQ6xPMxEsfezOfSf91gHtzoWYjHAm1hCDXtuPI5ZBJBvrJUw0WN-FtjpZhtyYJgewlLsF"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">Operator 702</span>
              <span className="text-[10px] text-secondary">Active Status</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen flex flex-col bg-surface overflow-y-auto">
        {/* TopAppBar */}
        <header className="h-16 sticky top-0 z-40 bg-white dark:bg-neutral-950 border-b border-stone-100 dark:border-neutral-900 flex items-center justify-between px-8 w-full font-inter text-sm">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary scale-90">search</span>
              <input 
                className="w-full bg-surface-container-high border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/20 transition-all" 
                placeholder="Search industrial assets..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 text-secondary hover:text-on-surface transition-all active:scale-95">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-secondary hover:text-on-surface transition-all active:scale-95">
                <span className="material-symbols-outlined">grid_view</span>
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant/20"></div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-xs tracking-tight">NODE_SEC_ALPHA</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="p-12 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'upload' && <Upload />}
          {activeTab === 'files' && <Files />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: string, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 transition-all active:scale-95 duration-150 font-manrope tracking-tight text-sm font-semibold ${
        active 
          ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-400 border-l-4 border-amber-600 dark:border-amber-500' 
          : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-200 dark:hover:bg-neutral-800'
      }`}
    >
      <span 
        className="material-symbols-outlined" 
        style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default App;
