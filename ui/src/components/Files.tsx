import { useState, useEffect } from 'react';
import { getUserFiles, downloadFile, type FileItem } from '../api';

export function Files() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    getUserFiles()
      .then(setFiles)
      .catch(() => setError('Failed to load files'))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (file: FileItem) => {
    setDownloading(file.fileUuid);
    try {
      await downloadFile(file.fileUuid, file.file_name);
    } catch {
      // silently fail — could add toast here
    } finally {
      setDownloading(null);
    }
  };

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
        </div>
      </section>

      {/* Main Data Table */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-stone-100">
        {/* Table Controls */}
        <div className="px-8 py-5 flex items-center justify-between bg-surface-container-low border-b border-stone-100">
          <p className="text-xs text-on-surface-variant font-medium">
            Showing <span className="font-bold text-on-surface">{files.length}</span> file{files.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="px-8 py-12 flex items-center gap-3 text-secondary">
            <span className="material-symbols-outlined animate-spin">refresh</span>
            <span className="text-sm font-medium">Loading assets...</span>
          </div>
        )}

        {!loading && error && (
          <div className="px-8 py-12 text-red-500 text-sm font-bold">{error}</div>
        )}

        {!loading && !error && files.length === 0 && (
          <div className="px-8 py-12 text-secondary text-sm font-medium">
            No files uploaded yet. Go to <span className="font-bold text-on-surface">Upload</span> to add files.
          </div>
        )}

        {/* Table */}
        {!loading && files.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary">UUID</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-secondary text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {files.map((file) => (
                  <tr key={file.fileUuid} className="group hover:bg-surface-container transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-highest text-secondary group-hover:bg-primary-fixed/30 group-hover:text-primary">
                          <span className="material-symbols-outlined">{getFileIcon(file.file_name)}</span>
                        </div>
                        <p className="text-sm font-bold tracking-tight text-on-surface">{file.file_name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[10px] font-mono text-secondary">{file.fileUuid}</span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={downloading === file.fileUuid}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-90 bg-primary-container/20 text-primary hover:bg-primary hover:text-white disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined">
                          {downloading === file.fileUuid ? 'hourglass_empty' : 'download'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (!ext) return 'description';
  if (['mp4', 'mkv', 'avi'].includes(ext)) return 'video_file';
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
  if (['zip', 'rar', '7z', 'tar'].includes(ext)) return 'folder_zip';
  if (ext === 'pdf') return 'picture_as_pdf';
  if (['csv', 'json', 'sql'].includes(ext)) return 'database';
  return 'description';
}
