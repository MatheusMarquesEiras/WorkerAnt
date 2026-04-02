import { useState } from 'react';

export function Settings() {
  const [activeSubTab, setActiveTab] = useState('Profile');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-headline font-black text-on-surface tracking-tighter uppercase">System Settings</h2>
        <p className="text-secondary font-body mt-1 uppercase tracking-[0.2em] text-[10px] font-bold opacity-70">Industrial Node 01 Configuration</p>
      </div>

      {/* Internal Tabs */}
      <div className="flex gap-8 border-b border-stone-200 dark:border-stone-800 mb-12 overflow-x-auto pb-0.5 no-scrollbar">
        {['Profile', 'System', 'Security', 'API'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold font-headline transition-colors relative ${
              activeSubTab === tab 
                ? 'text-amber-700 dark:text-amber-400' 
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {tab}
            {activeSubTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600"></div>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* Left Column: Profile & Security */}
        <div className="col-span-12 lg:col-span-7 space-y-12">
          {/* Profile Section */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-white/50 shadow-sm">
            <h3 className="font-headline font-bold text-lg mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">account_circle</span>
              Profile Configuration
            </h3>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative group">
                <img 
                  className="w-32 h-32 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANyI0nL80b9WuGzRVKmOYbSC6PcBGo5HkD-fEPdH8CoM71RHHiT7ptKKSkUDAcV5OWJoHNt6uvDosJo2R70l1BMyh_upOS2UGkqGylmGQoMZwWFvNIsPm6CpO7SmL0NHttUCpU64phesXBII9YTJ_AkDBaEuxrAkRGp7IXgDz3O8VjTsspdQlbHofzPM5usBsF1VamQvxlfhqP3lzTbLcUXWgDsTmyDNbLEDIGq5tsb4BmXHlWzda4qz8IhKl1dFwREyoGn1O8q_Mn"
                  alt="Operator Portrait"
                />
                <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-on-primary rounded-lg shadow-lg hover:scale-105 transition-transform active:scale-95">
                  <span className="material-symbols-outlined text-sm">upload</span>
                </button>
              </div>
              <div className="flex-1 w-full space-y-6">
                <InputGroup label="Display Name" value="Operator_742" />
                <InputGroup label="Node ID / Email" value="op742@workerant.industrial" type="email" />
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section className="bg-surface-container-low rounded-xl p-8 border border-white/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">shield</span>
            </div>
            <h3 className="font-headline font-bold text-lg mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
              Node Security
            </h3>
            <div className="flex items-center justify-between p-6 bg-surface-container rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-secondary">Encryption Status</p>
                  <p className="text-lg font-headline font-extrabold text-on-surface">Encrypted (AES-256)</p>
                </div>
              </div>
              <button className="px-6 py-2.5 outline outline-1 outline-primary/30 text-primary text-xs font-bold uppercase tracking-widest rounded hover:bg-primary hover:text-white transition-all active:scale-95">
                Manage Keys
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: System Preferences */}
        <div className="col-span-12 lg:col-span-5">
          <section className="bg-stone-900 text-stone-100 rounded-xl p-8 shadow-2xl h-full flex flex-col">
            <h3 className="font-headline font-bold text-lg mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">settings_input_component</span>
              System Preferences
            </h3>
            <div className="space-y-8 flex-1">
              <ToggleRow title="Interface Dark Mode" desc="Low-light industrial UI optimization" />
              <ToggleRow title="Desktop Notifications" desc="Critical node status alerts" checked />
              <ToggleRow title="Automatic Sync" desc="Real-time node-to-cloud relay" checked />
            </div>
            <div className="mt-12 pt-8 border-t border-stone-800">
              <div className="bg-stone-800/50 p-4 rounded-lg flex items-center gap-4 border border-stone-700/50">
                <span className="material-symbols-outlined text-amber-500">info</span>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Node-01 is currently operating at <span className="text-stone-100 font-bold">98.4% Efficiency</span>. Changes to sync frequency may impact local storage capacity.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-12 flex justify-end gap-4">
        <button className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-secondary hover:text-on-surface transition-colors">
          Discard Changes
        </button>
        <button className="px-10 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed text-xs font-black uppercase tracking-[0.15em] rounded shadow-lg shadow-primary/10 transition-transform active:scale-95">
          Save Configuration
        </button>
      </div>
    </div>
  );
}

function InputGroup({ label, value, type = "text" }: { label: string, value: string, type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{label}</label>
      <input 
        className="w-full bg-stone-100 dark:bg-stone-800 border-none rounded px-4 py-3 text-sm font-medium focus:ring-2 ring-primary/20 transition-all outline-none" 
        type={type} 
        defaultValue={value} 
      />
    </div>
  );
}

function ToggleRow({ title, desc, checked = false }: { title: string, desc: string, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-bold text-sm">{title}</p>
        <p className="text-[11px] text-stone-500">{desc}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
        <div className="w-11 h-6 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
      </label>
    </div>
  );
}
