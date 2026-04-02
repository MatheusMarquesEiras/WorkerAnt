export function Files() {
  const files = [
    { name: 'structural_blueprint_v4.pdf', project: 'Alpha-Station', type: 'Document', size: '14.2 MB', date: '24 Oct 2023, 14:22', icon: 'picture_as_pdf' },
    { name: 'sensor_log_delta_raw.csv', project: 'Live Feed Node-12', type: 'Dataset', size: '128.5 MB', date: 'Yesterday, 09:15', icon: 'database', active: true },
    { name: 'inspection_drone_f42.mp4', project: 'Maintenance Review', type: 'Media', size: '1.4 GB', date: '21 Oct 2023, 11:04', icon: 'video_file' },
    { name: 'legacy_archive_2022.zip', project: 'Historical Records', type: 'Archive', size: '4.8 GB', date: '15 Oct 2023, 16:50', icon: 'folder_zip' },
    { name: 'facility_render_final.jpg', project: 'Architecture Mockup', type: 'Image', size: '8.4 MB', date: '12 Oct 2023, 10:30', icon: 'image' },
  ];

  return (
    <div className="flex flex-col gap-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-primary font-bold tracking-widest text-[10px] uppercase block mb-2">Central Repository</span>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-background uppercase">Files & Assets</h2>
          <p className="mt-4 text-on-surface-variant max-w-lg leading-relaxed">
            Manage industrial-grade data assets with millisecond precision. Access, filter, and deploy archives across your node network.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-lg border border-outline-variant/30 text-secondary font-semibold text-sm hover:bg-surface-container transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filters
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold text-sm shadow-lg shadow-primary/10 flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            New Upload
          </button>
        </div>
      </section>

      {/* Dynamic Statistics (Asymmetric Bento) */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between border-none relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-on-surface-variant font-medium text-sm">Storage Capacity</p>
            <div className="mt-6">
              <span className="text-5xl font-black font-headline tracking-tighter text-on-background">84.2 <span className="text-2xl text-secondary">TB</span></span>
              <div className="mt-4 h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[68%]"></div>
              </div>
              <p className="mt-3 text-xs text-secondary font-medium uppercase tracking-wider">68% Total Node Usage</p>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[12rem]">precision_manufacturing</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-6">
          <div className="bg-surface-container rounded-xl p-6 border-none flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary mb-4">description</span>
            <p className="text-xs text-secondary font-bold uppercase tracking-tight">Active Files</p>
            <h3 className="text-3xl font-extrabold mt-1">1,204</h3>
          </div>
          <div className="bg-surface-container rounded-xl p-6 border-none flex flex-col justify-center">
            <span className="material-symbols-outlined text-primary mb-4">sync_alt</span>
            <p className="text-xs text-secondary font-bold uppercase tracking-tight">Transfers</p>
            <h3 className="text-3xl font-extrabold mt-1">42</h3>
          </div>
        </div>
      </section>

      {/* Main Data Table Container */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-stone-100">
        {/* Table Controls */}
        <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="flex bg-surface-container-highest p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md bg-white text-xs font-bold shadow-sm">All Files</button>
              <button className="px-4 py-1.5 rounded-md text-secondary text-xs font-bold hover:text-on-surface transition-colors">Shared</button>
              <button className="px-4 py-1.5 rounded-md text-secondary text-xs font-bold hover:text-on-surface transition-colors">Archived</button>
            </div>
            <div className="h-6 w-[1px] bg-outline-variant/30"></div>
            <p className="text-xs text-on-surface-variant font-medium">Showing <span className="font-bold text-on-surface">24</span> of 1,204 items</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-secondary">Sort by:</span>
            <select className="bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer pr-8 outline-none">
              <option>Date Modified</option>
              <option>File Name</option>
              <option>File Size</option>
            </select>
          </div>
        </div>

        {/* Table Implementation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">
                  <div className="flex items-center gap-2">
                    Name <span className="material-symbols-outlined text-xs">expand_more</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary text-right">Size</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary text-right">Uploaded</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {files.map((file, idx) => (
                <tr key={idx} className={`${file.active ? 'bg-primary-fixed' : 'group hover:bg-surface-container'} transition-colors`}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${file.active ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-secondary group-hover:bg-primary-fixed/30 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined">{file.icon}</span>
                      </div>
                      <div>
                        <p className={`text-sm font-bold tracking-tight ${file.active ? 'text-on-primary-fixed' : 'text-on-surface'}`}>{file.name}</p>
                        <p className={`text-[10px] mt-0.5 ${file.active ? 'text-on-primary-fixed-variant/70' : 'text-on-surface-variant/70'}`}>Project: {file.project}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter ${file.active ? 'bg-primary/10 text-on-primary-fixed-variant' : 'bg-surface-container-highest text-secondary'}`}>
                      {file.type}
                    </span>
                  </td>
                  <td className={`px-6 py-5 text-right font-medium text-sm ${file.active ? 'text-on-primary-fixed' : 'text-on-surface'}`}>{file.size}</td>
                  <td className={`px-6 py-5 text-right text-xs ${file.active ? 'text-on-primary-fixed-variant' : 'text-on-surface-variant'}`}>{file.date}</td>
                  <td className="px-8 py-5 text-center">
                    <button className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90 ${file.active ? 'bg-primary text-white shadow-md' : 'bg-primary-container/20 text-primary hover:bg-primary hover:text-white'}`}>
                      <span className="material-symbols-outlined" style={file.active ? { fontVariationSettings: "'FILL' 1" } : {}}>download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="px-8 py-6 bg-surface-container-low flex items-center justify-between border-t border-stone-100">
          <button className="flex items-center gap-2 text-xs font-bold text-secondary hover:text-on-surface transition-colors disabled:opacity-30" disabled>
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-on-primary text-xs font-bold">1</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-xs font-bold cursor-pointer">2</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-xs font-bold cursor-pointer">3</span>
            <span className="px-2 text-secondary">...</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest text-xs font-bold cursor-pointer">48</span>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-secondary hover:text-on-surface transition-colors">
            Next
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
}
