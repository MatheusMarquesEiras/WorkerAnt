import { useState } from 'react';
import { register } from '../api';

interface RegisterProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [nodeId, setNodeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(nodeId, password);
      onRegister();
    } catch (err: any) {
      setError(err.message ?? 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Abstract Industrial Background Element */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-primary rounded-full"></div>
        <div className="absolute top-1/2 left-3/4 w-[600px] h-px bg-primary transform rotate-45"></div>
        <div className="absolute top-1/3 right-0 w-64 h-64 border-8 border-primary rotate-12"></div>
      </div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10 lg:w-3/4">
        <div className="w-full max-w-xl">
          {/* Brand Anchor Header */}
          <div className="mb-10 text-center">
            <span className="font-headline font-black uppercase tracking-widest text-on-surface text-2xl block mb-2">Worker Ant</span>
            <div className="h-1 w-12 bg-primary mx-auto"></div>
          </div>

          {/* Provisioning Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(28,27,27,0.06)] overflow-hidden border border-stone-100">
            {/* Card Header */}
            <div className="bg-surface-container-low px-8 py-6 border-b border-outline-variant/15">
              <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface uppercase">New Node Provisioning</h1>
              <p className="text-secondary font-body text-sm mt-1">Register hardware endpoint to the distributed cluster.</p>
            </div>

            {/* Form Content */}
            <form className="p-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Desired Node ID"
                  placeholder="node-042-west"
                  icon="lan"
                  value={nodeId}
                  onChange={setNodeId}
                />
                <InputGroup
                  label="Access Key"
                  placeholder="••••••••••••"
                  icon="key"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
              </div>

              {/* Security Info Box */}
              <div className="flex gap-4 p-4 bg-surface-container border-l-4 border-primary/40 rounded-sm">
                <span className="material-symbols-outlined text-primary shrink-0">info</span>
                <p className="text-xs text-on-secondary-container leading-relaxed">
                  Node IDs must be unique across the cluster. New nodes will enter a 'pending' state until verified by a Regional Administrator via the Command Line Interface.
                </p>
              </div>

              {error && (
                <p className="text-red-500 text-xs font-bold uppercase tracking-wide">{error}</p>
              )}

              {/* Primary Action */}
              <div className="pt-4">
                <button
                  className="bg-gradient-to-br from-primary to-primary-container w-full py-4 rounded-lg font-headline font-extrabold text-on-primary-fixed uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:pointer-events-none"
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? 'Provisioning...' : 'Provision Node'}</span>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </button>
              </div>
            </form>

            {/* Footer Action */}
            <div className="bg-surface-container-low px-8 py-5 text-center border-t border-outline-variant/15">
              <p className="text-sm text-secondary">
                Already have a Node?{' '}
                <button
                  onClick={onNavigateToLogin}
                  className="text-primary font-bold hover:underline ml-1 inline-flex items-center gap-1"
                >
                  Login <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </p>
            </div>
          </div>

          {/* Decorative Asset */}
          <div className="mt-12 flex justify-center gap-8 opacity-40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">verified_user</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">SECURE AES-256</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">cloud_done</span>
              <span className="text-[10px] font-bold uppercase tracking-widest">99.9% UPTIME CLUSTER</span>
            </div>
          </div>
        </div>
      </main>

      {/* Side Graphic (Desktop only) */}
      <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-1/4 bg-stone-900 h-full">
        <div className="h-full w-full relative flex items-center justify-center overflow-hidden">
          <img
            className="absolute inset-0 object-cover opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgE8OU3AQlvZH42TRXrQZdvwvbsRvMnfvT_r_K49qupdq-hpw5O0vqxQB67GxC0sDz2ziiouPxpixe0V9d8gTkLF9E6vycmp5pSicTyr93MAS7aGwM-rNvyf17tUok8wrwVxbJ56OUQ-K2QYMTg0v1yYjyEKAgEyWnQ5eTP8IjIVNCplAue6cOJP3tQVZvgYeEYmeQyHxJH0aTLZos50ySyPnvO6gmvReNMnQuQlBf1u2XlNN5kBfonMGOCMGPLWdj1DbavKhifrLi"
            alt="Server Room"
          />
          <div className="z-10 p-12 space-y-4">
            <div className="text-xs font-black text-primary-container uppercase tracking-[0.4em]">Subsystem Status</div>
            <div className="space-y-3">
              <StatusRow label="Mainframe Alpha" value="OPERATIONAL" active />
              <StatusRow label="Worker Queue" value="SYNCHRONIZED" active />
              <StatusRow label="Latency Floor" value="14ms" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, icon, type = 'text', value, onChange }: {
  label: string;
  placeholder: string;
  icon: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2 text-left">
      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 font-label">{label}</label>
      <div className="relative group">
        <input
          className="w-full bg-stone-100 border-none px-4 py-3 text-on-surface placeholder:text-stone-400 focus:ring-0 focus:bg-white border-b-2 border-transparent focus:border-primary transition-all duration-200 outline-none"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300">
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-12 border-b border-white/5 pb-2">
      <span className="text-[10px] font-bold text-stone-400 uppercase">{label}</span>
      <span className={`text-[10px] font-mono ${active ? 'text-primary-container' : 'text-stone-100'}`}>{value}</span>
    </div>
  );
}
