import { useState, useRef } from 'react';
import { uploadFiles } from '../api';

interface QueuedFile {
  file: File;
  progress: number; // 0 = queued, 100 = done, -1 = error
}

export function Upload() {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: QueuedFile[] = Array.from(files).map((f) => ({ file: f, progress: 0 }));
    setQueue((prev) => [...prev, ...newItems]);
  };

  const removeFile = (idx: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    if (queue.length === 0 || uploading) return;
    setUploading(true);

    // Simulate per-file progress (real progress needs chunked upload)
    const files = queue.map((q) => q.file);
    try {
      // Optimistically animate progress
      setQueue((prev) => prev.map((q) => ({ ...q, progress: 50 })));
      await uploadFiles(files);
      setQueue((prev) => prev.map((q) => ({ ...q, progress: 100 })));
      setTimeout(() => setQueue([]), 1500);
    } catch {
      setQueue((prev) => prev.map((q) => ({ ...q, progress: -1 })));
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="flex flex-col gap-12">
      {/* Hero Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-extrabold tracking-tighter text-on-background uppercase">Data Ingestion</h2>
        <p className="text-secondary max-w-md font-body leading-relaxed">Securely upload industrial sensor data, blueprints, and archival logs to the central Worker Ant node.</p>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid grid-cols-12 gap-10 items-start">
        {/* Drag & Drop Zone */}
        <div className="col-span-12 lg:col-span-7 group">
          <div
            className="relative aspect-[4/3] w-full rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center p-12 transition-all duration-300 hover:bg-surface-container hover:border-primary-container overflow-hidden cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-on-primary-fixed text-5xl">precision_manufacturing</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-on-surface">Release files to initiate transfer</h3>
                <p className="text-secondary font-body">Drag & drop or click to select files</p>
              </div>
              <div className="flex items-center gap-4 mt-4" onClick={(e) => e.stopPropagation()}>
                <button
                  className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg shadow-lg shadow-primary/10 hover:shadow-primary/25 transition-all active:scale-95 flex items-center gap-2"
                  onClick={() => inputRef.current?.click()}
                >
                  <span className="material-symbols-outlined text-lg">upload_file</span>
                  Select Files
                </button>
                {queue.length > 0 && (
                  <button
                    className="px-8 py-3 bg-transparent border border-outline/20 text-on-surface font-semibold rounded-lg hover:bg-surface-container-high transition-all disabled:opacity-50"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : `Upload ${queue.length} file${queue.length > 1 ? 's' : ''}`}
                  </button>
                )}
              </div>
            </div>
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/40"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/40"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/40"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/40"></div>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>

        {/* Queue List */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg uppercase tracking-tight">Active Queues</h3>
              <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-black rounded-full">
                {String(queue.length).padStart(2, '0')}
              </span>
            </div>
            {queue.length > 0 && (
              <button className="text-primary font-bold text-xs uppercase hover:underline" onClick={() => setQueue([])}>
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {queue.length === 0 && (
              <p className="text-secondary text-sm font-body">No files queued. Select files to begin.</p>
            )}
            {queue.map((item, idx) => (
              <QueueItem
                key={idx}
                name={item.file.name}
                size={formatSize(item.file.size)}
                progress={item.progress}
                onRemove={() => removeFile(idx)}
              />
            ))}
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

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function QueueItem({ name, size, progress, onRemove }: {
  name: string;
  size: string;
  progress: number;
  onRemove: () => void;
}) {
  const isActive = progress > 0 && progress < 100;
  const isDone = progress === 100;
  const isError = progress === -1;

  const statusText = isError ? 'ERROR' : isDone ? 'COMPLETE' : isActive ? `${progress}%` : 'QUEUED';
  const meta = isError ? 'FAILED' : isDone ? 'DONE' : isActive ? 'UPLOADING...' : 'PENDING';

  return (
    <div className={`p-5 rounded-xl shadow-sm border transition-all flex flex-col gap-4 relative overflow-hidden ${
      isActive ? 'bg-primary-fixed border-l-4 border-primary' :
      isError ? 'bg-red-50 border-l-4 border-red-400' :
      'bg-surface-container-lowest border-outline-variant/10'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded flex items-center justify-center ${isActive ? 'bg-primary/10' : 'bg-surface-container-high'}`}>
            <span className={`material-symbols-outlined ${isActive ? 'text-primary' : 'text-secondary'}`}>description</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-sm tracking-tight ${isActive ? 'text-on-primary-fixed' : 'text-on-surface'} truncate max-w-[160px]`}>{name}</span>
            <span className={`text-[10px] font-medium ${isActive ? 'text-on-primary-fixed-variant' : 'text-secondary'}`}>{size}</span>
          </div>
        </div>
        <button onClick={onRemove}>
          <span className="material-symbols-outlined text-sm text-secondary hover:text-error transition-colors">close</span>
        </button>
      </div>
      <div className="space-y-2">
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isActive ? 'bg-on-primary-fixed/10' : 'bg-surface-container-high'}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${isError ? 'bg-red-400' : 'bg-primary'}`}
            style={{ width: `${Math.max(0, progress)}%` }}
          ></div>
        </div>
        <div className={`flex justify-between items-center text-[10px] font-bold ${isActive ? 'text-on-primary-fixed-variant' : 'text-secondary'}`}>
          <span>{statusText}</span>
          <span className={isActive ? 'text-on-primary-fixed' : 'text-primary'}>{meta}</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-6 bg-surface-container-low rounded-xl border border-transparent hover:border-primary-container transition-all">
      <span className="material-symbols-outlined text-primary mb-3 block" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-secondary leading-relaxed">{desc}</p>
    </div>
  );
}
