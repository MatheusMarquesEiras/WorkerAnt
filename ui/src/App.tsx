import './App.css'

function App() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar (Rail) */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-stone-100 flex flex-col py-6 z-50">
        <div className="px-6 mb-10">
          <h1 className="text-xl font-bold tracking-tighter text-stone-900">Worker Ant</h1>
          <p className="text-xs font-manrope tracking-tight font-semibold text-stone-500">Industrial Node 01</p>
        </div>
        <nav className="flex-1 space-y-1">
          {/* Dashboard Active */}
          <a className="flex items-center gap-3 px-4 py-3 bg-amber-100 text-amber-900 border-l-4 border-amber-600 font-manrope tracking-tight text-sm font-semibold" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-colors font-manrope tracking-tight text-sm font-semibold" href="#">
            <span className="material-symbols-outlined">cloud_upload</span>
            <span>Upload</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-colors font-manrope tracking-tight text-sm font-semibold" href="#">
            <span className="material-symbols-outlined">folder_open</span>
            <span>Files</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-colors font-manrope tracking-tight text-sm font-semibold" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </nav>
        <div className="mt-auto space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-colors font-manrope tracking-tight text-sm font-semibold" href="#">
            <span className="material-symbols-outlined">help</span>
            <span>Help</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 transition-colors font-manrope tracking-tight text-sm font-semibold" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </a>
          <div className="px-4 py-6 mt-4 border-t border-stone-200 flex items-center gap-3">
            <img 
              alt="User Profile Avatar" 
              className="w-10 h-10 rounded-full object-cover grayscale brightness-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0TcNvzBXWrxIiPNmNDwMvt5sEZU5NLL2LbutJ_gjWasXrlnjeNSR6VnBEB46JyKqytlt1992qxIqX5azbDuG53A9_RTZ-AVfEV3-CgXgeqQL2G6qruA1P0wmc55VIo4riu3dMbLM4mwKYReiNAG0RtFDG0i0w0P27OKa4SHwaJF4slHFeaHlJpid8oXNx2ijef-nQaHfTv9L4dPyWJwScHtXTQ_P0c_9G8dnOF3Ck-YHRpgG5qKeAi6fOu7pY2k7I1EQOB5fwO-UA"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Operator_742</p>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">Premium Tier</p>
            </div>
          </div>
        </div>
      </aside>

      {/* TopAppBar */}
      <header className="h-16 sticky top-0 z-40 bg-white border-b border-stone-100 flex items-center justify-between px-8 ml-64 w-[calc(100%-16rem)]">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-amber-500/20 rounded-lg transition-all">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">search</span>
            <input 
              className="w-full bg-stone-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0 placeholder:text-stone-400" 
              placeholder="Search industrial assets..." 
              type="text" 
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-stone-500 hover:text-stone-900 transition-all relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-amber-600 rounded-full border-2 border-white"></span>
          </button>
          <button className="text-stone-500 hover:text-stone-900 transition-all">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 p-8 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tighter text-on-background">Operational Overview</h2>
              <p className="text-secondary font-medium mt-1">Industrial Node 01 • System Status: Nominal</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-bold text-primary bg-primary-fixed hover:bg-primary-container transition-colors flex items-center gap-2 rounded-md">
                <span className="material-symbols-outlined text-sm">add</span>
                NEW ALLOCATION
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Storage Stat Card (Wide) */}
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
                {/* Industrial Progress Bar */}
                <div className="h-6 w-full bg-stone-200/50 rounded-full overflow-hidden flex p-1">
                  <div className="h-full w-[45%] primary-gradient rounded-full shadow-lg shadow-amber-500/20"></div>
                </div>
              </div>
              {/* Decorative Background Element */}
              <div className="absolute -right-16 -top-16 opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[240px]">architecture</span>
              </div>
            </div>

            {/* Fast Actions (Narrow) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-primary-fixed p-6 rounded-xl flex flex-col justify-between h-full border-l-8 border-primary">
                <h4 className="text-lg font-extrabold tracking-tight text-on-primary-fixed">Optimization Routine</h4>
                <p className="text-sm text-on-primary-fixed-variant mt-2 leading-relaxed">System has identified 12GB of redundant logs. Clear cache to maintain peak performance.</p>
                <button className="mt-6 w-full py-3 bg-on-primary-fixed text-white font-bold text-xs tracking-widest uppercase hover:bg-stone-800 transition-colors">
                  Run Scrubbing Sequence
                </button>
              </div>
            </div>

            {/* Top Files by Size (Asymmetric Column) */}
            <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-stone-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold tracking-tight">Top Files by Mass</h3>
                <span className="material-symbols-outlined text-stone-400">sort</span>
              </div>
              <div className="space-y-6">
                {/* File Entry 1 */}
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-stone-100 rounded flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                      <span className="material-symbols-outlined">video_file</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold text-on-background">Surveillance_Archive_Q3.mkv</p>
                        <p className="text-xs font-mono text-stone-500">142.5 GB</p>
                      </div>
                      <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full">
                        <div className="h-full w-[85%] bg-stone-400 group-hover:bg-amber-600 transition-all rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* File Entry 2 */}
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-stone-100 rounded flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                      <span className="material-symbols-outlined">database</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold text-on-background">Production_Database_Backup.sql</p>
                        <p className="text-xs font-mono text-stone-500">88.2 GB</p>
                      </div>
                      <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full">
                        <div className="h-full w-[60%] bg-stone-400 group-hover:bg-amber-600 transition-all rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* File Entry 3 */}
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-stone-100 rounded flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                      <span className="material-symbols-outlined">deployed_code</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold text-on-background">Worker_Ant_Firmware_v4.2.iso</p>
                        <p className="text-xs font-mono text-stone-500">45.0 GB</p>
                      </div>
                      <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full">
                        <div className="h-full w-[35%] bg-stone-400 group-hover:bg-amber-600 transition-all rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* File Entry 4 */}
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-stone-100 rounded flex items-center justify-center text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors">
                      <span className="material-symbols-outlined">image</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm font-bold text-on-background">Site_Survey_Aerial_4K.zip</p>
                        <p className="text-xs font-mono text-stone-500">12.8 GB</p>
                      </div>
                      <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full">
                        <div className="h-full w-[15%] bg-stone-400 group-hover:bg-amber-600 transition-all rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity (Asymmetric Column) */}
            <div className="col-span-12 lg:col-span-5 bg-surface-container p-8 rounded-xl">
              <h3 className="text-xl font-bold tracking-tight mb-8">Node Telemetry</h3>
              <div className="relative space-y-8">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-stone-200"></div>
                {/* Log Entry 1 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-amber-600 rounded-full flex items-center justify-center">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                  </div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">Upload Complete</p>
                  <p className="text-sm font-medium text-on-background">Encrypted asset <span className="font-bold underline decoration-amber-500/30">H-9921</span> moved to Deep Storage.</p>
                  <p className="text-[10px] text-stone-500 mt-1 uppercase font-mono">08:42:15 • LATENCY 14MS</p>
                </div>
                {/* Log Entry 2 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-stone-200 rounded-full"></div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Access Protocol</p>
                  <p className="text-sm font-medium text-on-background">Operator_742 initiated read request on Secure Partition B.</p>
                  <p className="text-[10px] text-stone-500 mt-1 uppercase font-mono">07:15:33 • AUTH SUCCESS</p>
                </div>
                {/* Log Entry 3 */}
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-stone-200 rounded-full"></div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Sync Sequence</p>
                  <p className="text-sm font-medium text-on-background">Industrial Node 02 handshake complete. Delta sync: 4.2GB.</p>
                  <p className="text-[10px] text-stone-500 mt-1 uppercase font-mono">04:00:00 • SYSTEM TASK</p>
                </div>
                {/* Log Entry 4 */}
                <div className="relative pl-10 opacity-50">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-stone-200 rounded-full"></div>
                  <p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Security Sweep</p>
                  <p className="text-sm font-medium text-on-background">Periodic malware scrub complete. No anomalies detected.</p>
                  <p className="text-[10px] text-stone-500 mt-1 uppercase font-mono">23:59:59 • SYSTEM TASK</p>
                </div>
              </div>
              <button className="mt-8 w-full py-2 text-xs font-bold text-stone-400 hover:text-on-background border border-stone-200 hover:border-stone-400 rounded transition-all tracking-widest">
                VIEW FULL LOG ARCHIVE
              </button>
            </div>
          </div>

          {/* Bottom Data Grid Visual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-100 flex items-center gap-6">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-stone-400">speed</span>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">I/O Speed</p>
                <p className="text-2xl font-black text-on-background">842 MB/s</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-100 flex items-center gap-6">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-stone-400">devices</span>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Connected Units</p>
                <p className="text-2xl font-black text-on-background">14 Nodes</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-stone-100 flex items-center gap-6">
              <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-stone-400">security</span>
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Encryption</p>
                <p className="text-2xl font-black text-on-background">AES-256</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Element */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 primary-gradient text-white rounded-xl flex items-center justify-center shadow-xl shadow-amber-500/40 active:scale-95 duration-150 group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
        </button>
      </div>
    </div>
  )
}

export default App
