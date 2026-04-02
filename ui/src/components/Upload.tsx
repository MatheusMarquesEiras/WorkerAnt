export function Upload() {
  return (
    <section className="flex flex-col gap-12">
      {/* Hero Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-extrabold tracking-tighter text-on-background uppercase">Data Ingestion</h2>
        <p className="text-secondary max-w-md font-body leading-relaxed">Securely upload industrial sensor data, blueprints, and archival logs to the central Worker Ant node.</p>
      </div>

      {/* Asymmetric Grid: Upload Zone vs Pending List */}
      <div className="grid grid-cols-12 gap-10 items-start">
        {/* Large Drag & Drop Zone (7 Column Span) */}
        <div className="col-span-12 lg:col-span-7 group">
          <div className="relative aspect-[4/3] w-full rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center p-12 transition-all duration-300 hover:bg-surface-container hover:border-primary-container overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-on-primary-fixed text-5xl">precision_manufacturing</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-on-surface">Release files to initiate transfer</h3>
                <p className="text-secondary font-body">Supports .DWG, .JSON, .CSV and encrypted ZIP archives up to 2.5GB</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all active:scale-95 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">upload_file</span>
                  Select Files
                </button>
                <button className="px-8 py-3 bg-transparent border border-outline/20 text-on-surface font-semibold rounded-lg hover:bg-surface-container-high transition-all">
                  Browse Folders
                </button>
              </div>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/40"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/40"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/40"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/40"></div>
          </div>
        </div>

        {/* Pending Uploads List (5 Column Span) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg uppercase tracking-tight">Active Queues</h3>
              <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-black rounded-full">03</span>
            </div>
            <button className="text-primary font-bold text-xs uppercase hover:underline">Clear All</button>
          </div>
          
          <div className="flex flex-col gap-3">
            <QueueItem 
              icon="description" 
              name="structural_node_map_v2.dwg" 
              status="14.2 MB • Processing Metadata" 
              progress={72} 
              progressText="72% COMPLETE" 
              meta="2s REMAINING" 
            />
            <QueueItem 
              icon="data_object" 
              name="telemetry_log_2023_Q4.json" 
              status="182.5 KB • Finalizing Security Handshake" 
              progress={98} 
              progressText="98% COMPLETE" 
              meta="OPTIMIZING..." 
              active 
            />
            <QueueItem 
              icon="picture_as_pdf" 
              name="compliance_report_01.pdf" 
              status="4.1 MB • Waiting in Queue" 
              progress={0} 
              progressText="0% QUEUED" 
              meta="PENDING" 
              opacity="opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
            />
          </div>

          {/* Usage Stats Card */}
          <div className="mt-4 p-6 bg-surface-container rounded-xl flex flex-col gap-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-secondary">Node Storage Utility</h4>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold tracking-tighter">84.2</span>
              <span className="text-sm font-bold text-secondary pb-1">GB / 128 GB</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
              <div className="h-full bg-primary w-[65%] border-r border-surface-container"></div>
              <div className="h-full bg-primary/40 w-[15%]"></div>
            </div>
            <p className="text-[10px] text-secondary font-body leading-tight">65% Primary Storage used. 15% System Cache. Archive expansion recommended soon.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <FeatureCard icon="security" title="Encrypted Transit" desc="All file packets are AES-256 encrypted before leaving the local industrial node buffer." />
        <FeatureCard icon="hub" title="Sync-Nodes" desc="Direct synchronization with Hive Cluster Alpha for real-time collaborative engineering workflows." />
        <FeatureCard icon="auto_awesome_motion" title="Batch Parsing" desc="Automatic metadata extraction and classification using Worker Ant AI pattern recognition." />
      </div>
    </section>
  );
}

function QueueItem({ icon, name, status, progress, progressText, meta, active, opacity = "" }: any) {
  return (
    <div className={`p-5 rounded-xl shadow-sm border transition-all flex flex-col gap-4 relative overflow-hidden ${active ? 'bg-primary-fixed border-l-4 border-primary' : 'bg-surface-container-lowest border-outline-variant/10'} ${opacity}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded flex items-center justify-center ${active ? 'bg-primary/10' : 'bg-surface-container-high'}`}>
            <span className={`material-symbols-outlined ${active ? 'text-primary' : 'text-secondary'}`} style={active ? {fontVariationSettings: "'FILL' 1"} : {}}>{icon}</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-sm tracking-tight ${active ? 'text-on-primary-fixed' : 'text-on-surface'}`}>{name}</span>
            <span className={`text-[10px] font-medium ${active ? 'text-on-primary-fixed-variant' : 'text-secondary'}`}>{status}</span>
          </div>
        </div>
        <span className="material-symbols-outlined text-sm text-secondary cursor-pointer hover:text-error transition-colors">{active ? 'pause' : 'close'}</span>
      </div>
      <div className="space-y-2">
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${active ? 'bg-on-primary-fixed/10' : 'bg-surface-container-high'}`}>
          <div className={`h-full bg-primary rounded-full transition-all duration-500 ${active ? '' : 'shadow-[0_0_8px_rgba(255,191,0,0.5)]'}`} style={{ width: `${progress}%` }}></div>
        </div>
        <div className={`flex justify-between items-center text-[10px] font-bold ${active ? 'text-on-primary-fixed-variant' : 'text-secondary'}`}>
          <span>{progressText}</span>
          <span className={active ? 'text-on-primary-fixed' : 'text-primary'}>{meta}</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 bg-surface-container-low rounded-xl border border-transparent hover:border-primary-container transition-all">
      <span className="material-symbols-outlined text-primary mb-3 block" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}
