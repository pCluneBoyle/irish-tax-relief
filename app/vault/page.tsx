'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  FolderOpen,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import type { Document, DocumentCategory, DocumentStatus } from '@/lib/types';

const CATEGORIES: { value: DocumentCategory; label: string }[] = [
  { value: 'medical-receipts', label: 'Medical Receipts' },
  { value: 'dental-receipts', label: 'Dental Receipts' },
  { value: 'rent-proof', label: 'Rent Proof' },
  { value: 'tuition-receipts', label: 'Tuition Receipts' },
  { value: 'payslips', label: 'Payslips' },
  { value: 'employment-details', label: 'Employment Details' },
  { value: 'utility-bills', label: 'Utility Bills' },
  { value: 'other', label: 'Other' },
];

const TAX_YEARS = [2024, 2023, 2022, 2021, 2020];

const statusConfig: Record<DocumentStatus, { label: string; icon: React.FC<{ className?: string }>; variant: string }> = {
  uploaded: { label: 'Uploaded', icon: CheckCircle2, variant: 'green' },
  missing: { label: 'Missing', icon: AlertCircle, variant: 'red' },
  'needs-review': { label: 'Needs review', icon: Clock, variant: 'amber' },
};

function formatSize(bytes?: number) {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VaultPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Document>>({ category: 'other', taxYear: 2024, status: 'uploaded' });
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('documents');
    if (saved) setDocs(JSON.parse(saved));
  }, []);

  function saveDocs(updated: Document[]) {
    setDocs(updated);
    localStorage.setItem('documents', JSON.stringify(updated));
  }

  function handleFile(file: File) {
    const doc: Document = {
      id: crypto.randomUUID(),
      name: file.name,
      category: (form.category as DocumentCategory) ?? 'other',
      taxYear: form.taxYear ?? 2024,
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
      size: file.size,
    };
    saveDocs([...docs, doc]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function addManual() {
    if (!form.name) return;
    const doc: Document = {
      id: crypto.randomUUID(),
      name: form.name,
      category: (form.category as DocumentCategory) ?? 'other',
      taxYear: form.taxYear ?? 2024,
      uploadedAt: new Date().toISOString(),
      status: (form.status as DocumentStatus) ?? 'missing',
    };
    saveDocs([...docs, doc]);
    setForm({ category: 'other', taxYear: 2024, status: 'uploaded' });
    setShowForm(false);
  }

  function deleteDoc(id: string) {
    saveDocs(docs.filter((d) => d.id !== id));
  }

  function updateStatus(id: string, status: DocumentStatus) {
    saveDocs(docs.map((d) => (d.id === id ? { ...d, status } : d)));
  }

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    docs: docs.filter((d) => d.category === cat.value),
  })).filter((g) => g.docs.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
            <p className="text-slate-500 text-sm mt-1">Organise your receipts and proof before claiming.</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add document
          </Button>
        </div>

        {/* Upload zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors mb-6 ${
            dragOver ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600">Drop files here or click to upload</p>
          <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG — max 20 MB</p>
          <input ref={fileRef} type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.jpg,.jpeg,.png" />
        </div>

        {/* Quick add form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Add document manually</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-500 mb-1 block">Document name</label>
                <input
                  type="text"
                  value={form.name ?? ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. GP receipt Jan 2024"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as DocumentCategory })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                >
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Tax year</label>
                <select
                  value={form.taxYear}
                  onChange={(e) => setForm({ ...form, taxYear: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                >
                  {TAX_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as DocumentStatus })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="uploaded">Uploaded</option>
                  <option value="missing">Missing</option>
                  <option value="needs-review">Needs review</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={addManual} size="sm" disabled={!form.name}>Save</Button>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Summary stats */}
        {docs.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {(['uploaded', 'missing', 'needs-review'] as DocumentStatus[]).map((s) => {
              const count = docs.filter((d) => d.status === s).length;
              const cfg = statusConfig[s];
              return (
                <div key={s} className="bg-white rounded-xl p-3 text-center border border-slate-100">
                  <div className="text-xl font-bold text-slate-900">{count}</div>
                  <div className="text-xs text-slate-500">{cfg.label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Document groups */}
        {grouped.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-slate-500">No documents yet</p>
            <p className="text-sm mt-1">Upload receipts and proof documents to organise your claim.</p>
          </div>
        ) : (
          grouped.map(({ label, docs: catDocs }) => (
            <div key={label} className="mb-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</h3>
              <div className="space-y-2">
                {catDocs.map((doc) => {
                  const cfg = statusConfig[doc.status];
                  const Icon = cfg.icon;
                  return (
                    <div key={doc.id} className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm">
                      <FileText className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-slate-800 truncate">{doc.name}</span>
                          <span className="text-xs text-slate-400 shrink-0">{doc.taxYear}</span>
                          {doc.size && <span className="text-xs text-slate-400">{formatSize(doc.size)}</span>}
                        </div>
                      </div>
                      <select
                        value={doc.status}
                        onChange={(e) => updateStatus(doc.id, e.target.value as DocumentStatus)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-400 bg-white"
                      >
                        <option value="uploaded">Uploaded</option>
                        <option value="missing">Missing</option>
                        <option value="needs-review">Needs review</option>
                      </select>
                      <Badge variant={cfg.variant as 'green' | 'red' | 'amber'}>
                        <Icon className="w-3 h-3 mr-1" />{cfg.label}
                      </Badge>
                      <button onClick={() => deleteDoc(doc.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
