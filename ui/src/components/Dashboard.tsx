export function Dashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tighter text-on-background uppercase">Operational Overview</h2>
          <p className="text-secondary font-medium mt-1">Industrial Node 01 • System Status: Nominal</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-bold text-primary bg-primary-fixed hover:bg-primary-container transition-colors flex items-center gap-2 rounded-md">
            <span className="material-symbols-outlined text-sm">add</span>
            NEW ALLOCATION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low p-8 rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[320px]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>database</span>
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Node Storage Capacity</span>
            </div>
            <h3 className="text-6xl font-black tracking-tighter text-on-background">45% <span className="text-2xl font-normal text-stone-400">Utilized</span></h3>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-stone-500">Active Payload: <span className="text-on-background font-bold">450GB</span></p>
                <p className="text-sm font-medium text-stone-500">Total Provisioned: <span className="text-on-background font-bold">1TB</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded">HEALTHY</p>
              </div>
            </div>
            <div className="h-6 w-full bg-stone-200/50 rounded-full overflow-hidden flex p-1">
              <div className="h-full w-[45%] primary-gradient rounded-full shadow-lg shadow-amber-500/20"></div>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 opacity-[0.03] pointer-events-none">
            <span className="material-symbols-outlined text-[240px]">architecture</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary-fixed p-6 rounded-xl flex flex-col justify-between h-full border-l-8 border-primary">
            <h4 className="text-lg font-extrabold tracking-tight text-on-primary-fixed">Optimization Routine</h4>
            <p className="text-sm text-on-primary-fixed-variant mt-2 leading-relaxed">System has identified 12GB of redundant logs. Clear cache to maintain peak performance.</p>
            <button className="mt-6 w-full py-3 bg-on-primary-fixed text-white font-bold text-xs tracking-widest uppercase hover:bg-stone-800 transition-colors">
              Run Scrubbing Sequence
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight">Top Files by Mass</h3>
            <span className="material-symbols-outlined text-stone-400">sort</span>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Surveillance_Archive_Q3.mkv', size: '142.5 GB', progress: 'w-[85%]', icon: 'video_file' },
              { name: 'Production_Database_Backup.sql', size: '88.2 GB', progress: 'w-[60%]', icon: 'database' },
              { name: 'Worker_Ant_Firmware_v4.2.iso', size: '45.0 GB', progress: 'w-[35%]', icon: 'deployed_code' },
              { name: 'Site_Survey_Aerial_4K.zip', size: '12.8 GB', progress: 'w-[15%]', icon: 'image' },
            ].map((file) => (
              <div key={file.name} className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-stone-100 rounded flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                    <span className="material-symbols-outlined">{file.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-on-background">{file.name}</p>
                      <p className="text-xs font-mono text-stone-500">{file.size}</p>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full">
                      <div className={`h-full ${file.progress} bg-stone-400 group-hover:bg-amber-600 transition-all rounded-full`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 bg-surface-container p-8 rounded-xl">
          <h3 className="text-xl font-bold tracking-tight mb-8">Node Telemetry</h3>
          <div className="relative space-y-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-200"></div>
            <LogEntry title="Upload Complete" desc="Encrypted asset H-9921 moved to Deep Storage." time="08:42:15 • LATENCY 14MS" active />
            <LogEntry title="Access Protocol" desc="Operator_742 initiated read request on Secure Partition B." time="07:15:33 • AUTH SUCCESS" />
            <LogEntry title="Sync Sequence" desc="Industrial Node 02 handshake complete. Delta sync: 4.2GB." time="04:00:00 • SYSTEM TASK" />
            <LogEntry title="Security Sweep" desc="Periodic malware scrub complete. No anomalies detected." time="23:59:59 • SYSTEM TASK" opacity="opacity-50" />
          </div>
          <button className="mt-8 w-full py-2 text-xs font-bold text-stone-400 hover:text-on-background border border-stone-200 hover:border-stone-400 rounded transition-all tracking-widest">
            VIEW FULL LOG ARCHIVE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon="speed" label="I/O Speed" value="842 MB/s" />
        <StatCard icon="devices" label="Connected Units" value="14 Nodes" />
        <StatCard icon="security" label="Encryption" value="AES-256" />
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 primary-gradient text-white rounded-xl flex items-center justify-center shadow-xl shadow-amber-500/40 active:scale-95 duration-150 group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
        </button>
      </div>
    </>
  );
}

function LogEntry({ title, desc, time, active, opacity = "" }: { title: string, desc: string, time: string, active?: boolean, opacity?: string }) {
  return (
    <div className={`relative pl-10 ${opacity}`}>
      <div className={`absolute left-0 top-1 w-6 h-6 ${active ? 'bg-white border-2 border-amber-600' : 'bg-stone-200'} rounded-full flex items-center justify-center`}>
        {active && <span className="w-2 h-2 bg-amber-600 rounded-full"></span>}
      </div>
      <p className={`text-xs font-bold ${active ? 'text-amber-700' : 'text-stone-500'} uppercase tracking-widest mb-1`}>{title}</p>
      <p className="text-sm font-medium text-on-background" dangerouslySetInnerHTML={{ __html: desc }}></p>
      <p className="text-[10px] text-stone-500 mt-1 uppercase font-mono">{time}</p>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-stone-100 flex items-center gap-6">
      <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
        <span className="material-symbols-outlined text-stone-400">{icon}</span>
      </div>
      <div>
        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-on-background">{value}</p>
      </div>
    </div>
  );
}
