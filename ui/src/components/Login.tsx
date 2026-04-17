import { useState } from 'react';
import { login } from '../api';

interface LoginProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
}

export function Login({ onLogin, onNavigateToRegister }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      onLogin();
    } catch (err: any) {
      setError(err.message ?? 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-surface font-body text-on-surface overflow-hidden flex items-center justify-center p-6 md:p-12">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: 'linear-gradient(to right, rgba(121, 89, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(121, 89, 0, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      <div className="fixed top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-tertiary/5 blur-[100px] rounded-full"></div>
      </div>

      <main className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl rounded-xl overflow-hidden bg-surface-container-lowest z-10">
        {/* Left Branding Column */}
        <div className="lg:col-span-5 bg-on-background relative p-10 md:p-16 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <img
              className="w-full h-full object-cover grayscale mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1YnitoAb4rL69_hAWguKQufZaEnt1GIdHXl3HCbhk88R-g3fnDYNEEcVOn8r5bnfxO_dIHThRxz2rldGF4EfjEpapMb3HbJQ2EChZi52MGtNts5Hi4-bFBuNuA08kDnMCZ6Dv0cB5RWJpmQcuS5EqrViIdcH0kNuN57BLrBiW9MPlx4r5bEBmJaDhZl-aAhKRqSYHCR8KemK87GG8yqJL18fqD4EwEhFUrlFjMxXVGJYeFDJ6Z5Oye_2yrt1q_jcKnxdJL0ABpF2n"
              alt="Industrial Background"
            />
          </div>
          <div className="relative z-10">
            <h1 className="font-headline font-black text-4xl md:text-5xl text-white tracking-widest uppercase mb-4">Worker Ant</h1>
            <div className="h-1 w-24 bg-primary-container mb-8"></div>
            <p className="text-surface-variant font-light text-lg max-w-xs leading-relaxed">
              Precision-engineered high-density file server for industrial data orchestration.
            </p>
          </div>
          <div className="relative z-10 mt-20">
            <div className="flex items-center gap-4 text-surface-variant mb-6">
              <span className="material-symbols-outlined text-primary-fixed-dim">precision_manufacturing</span>
              <span className="text-xs font-headline uppercase tracking-widest">Node Protocol V4.2</span>
            </div>
            <div className="text-surface-variant/40 text-[10px] font-mono leading-tight">
              SYSTEM_STATUS: STABLE<br/>
              ACTIVE_NODES: 1,284<br/>
              ENCRYPTION: AES-256-GCM
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 p-10 md:p-20 flex flex-col justify-center bg-surface-container-lowest">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-12">
              <h2 className="font-headline font-bold text-3xl text-on-background tracking-tight mb-2 uppercase">Initialize Session</h2>
              <p className="text-secondary text-sm font-medium italic">Authorized operators only. Access is logged.</p>
            </header>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2 group">
                <label className="block text-[10px] font-headline font-bold uppercase tracking-widest text-secondary group-focus-within:text-primary transition-colors">Node ID</label>
                <div className="relative">
                  <input
                    className="w-full bg-transparent px-0 py-3 text-on-background placeholder:text-stone-400 border-none focus:ring-0 border-b-2 border-stone-200 focus:border-primary transition-all outline-none"
                    placeholder="node-alpha-712"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 text-lg">person</span>
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="block text-[10px] font-headline font-bold uppercase tracking-widest text-secondary group-focus-within:text-primary transition-colors">Access Key</label>
                <div className="relative">
                  <input
                    className="w-full bg-transparent px-0 py-3 text-on-background placeholder:text-stone-400 border-none focus:ring-0 border-b-2 border-stone-200 focus:border-primary transition-all outline-none"
                    placeholder="••••••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 material-symbols-outlined text-stone-400 text-lg">key</span>
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-xs font-bold uppercase tracking-wide">{error}</p>
              )}
              <div className="pt-6">
                <button
                  className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-headline font-extrabold uppercase tracking-widest flex items-center justify-center gap-3 rounded shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:pointer-events-none"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Authenticate'}
                  <span className="material-symbols-outlined text-xl">login</span>
                </button>
              </div>
            </form>
            <footer className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <button className="text-secondary text-xs font-medium hover:text-primary transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">help</span>
                Trouble accessing?
              </button>
              <div className="h-px w-8 bg-stone-200 hidden md:block"></div>
              <button
                onClick={onNavigateToRegister}
                className="text-primary font-headline font-bold text-xs uppercase tracking-widest hover:text-amber-700 transition-colors"
              >
                Request Node Access
              </button>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
