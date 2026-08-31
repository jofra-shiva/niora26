'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Megaphone, Edit3, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  getDocs, collection, query, orderBy,
  doc, addDoc, updateDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { FIRESTORE_COLLECTIONS, PRIORITY_COLORS } from '@/lib/utils/constants';
import type { Announcement } from '@/lib/types';
import toast from 'react-hot-toast';

export default function AdminAnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  type Priority = 'low' | 'medium' | 'high' | 'critical';
const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [form, setForm] = useState<{ title: string; message: string; priority: Priority; published: boolean }>({ title: '', message: '', priority: 'medium', published: false });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const snap = await getDocs(query(
      collection(db, FIRESTORE_COLLECTIONS.ANNOUNCEMENTS),
      orderBy('createdAt', 'desc')
    ));
    setAnnouncements(snap.docs.map(d => ({ ...d.data(), announcementId: d.id } as Announcement)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form.title || !form.message) { toast.error('Title and message are required'); return; }
    setSaving(true);
    try {
      if (editing) {
        await updateDoc(doc(db, FIRESTORE_COLLECTIONS.ANNOUNCEMENTS, editing.announcementId), {
          ...form, updatedAt: serverTimestamp(),
        });
        toast.success('Updated!');
      } else {
        await addDoc(collection(db, FIRESTORE_COLLECTIONS.ANNOUNCEMENTS), {
          ...form,
          status: 'active',
          syncStatus: 'PENDING',
          createdBy: user?.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success('Announcement created!');
      }
      setShowForm(false);
      setEditing(null);
      setForm({ title: '', message: '', priority: 'medium', published: false });
      await load();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const togglePublish = async (a: Announcement) => {
    await updateDoc(doc(db, FIRESTORE_COLLECTIONS.ANNOUNCEMENTS, a.announcementId), {
      published: !a.published, updatedAt: serverTimestamp(),
    });
    toast.success(a.published ? 'Unpublished' : 'Published!');
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    await deleteDoc(doc(db, FIRESTORE_COLLECTIONS.ANNOUNCEMENTS, id));
    toast.success('Deleted');
    await load();
  };

  const PRIORITY_OPTS = ['low', 'medium', 'high', 'critical'] as const;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Announcements</h1>
          <p className="text-sm text-slate-500 mt-1">Publish updates to all participants</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', message: '', priority: 'medium', published: false }); }}
          className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-2xl p-6 mb-6"
          >
            <h2 className="font-heading font-semibold text-slate-800 mb-4">
              {editing ? 'Edit Announcement' : 'New Announcement'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-field" placeholder="Announcement title" />
              </div>
              <div>
                <label className="form-label">Message *</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={3} className="input-field resize-none" placeholder="What do you want to announce?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Priority</label>
                  <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as typeof form.priority }))} className="input-field appearance-none">
                    {PRIORITY_OPTS.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))}
                      className="w-4 h-4 rounded" />
                    <span className="text-sm font-medium text-slate-700">Publish immediately</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="btn-primary">
                  {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}</div>
      ) : announcements.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Megaphone className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400">No announcements yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map(a => (
            <div key={a.announcementId} className="glass-card rounded-xl p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`badge text-[10px] ${PRIORITY_COLORS[a.priority]}`}>{a.priority}</span>
                  {a.published ? (
                    <span className="badge-success text-[10px]">Published</span>
                  ) : (
                    <span className="badge-neutral text-[10px]">Draft</span>
                  )}
                </div>
                <p className="font-semibold text-slate-800">{a.title}</p>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{a.message}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => togglePublish(a)} className="btn-ghost p-1.5" title={a.published ? 'Unpublish' : 'Publish'}>
                  {a.published ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-indigo-500" />}
                </button>
                <button onClick={() => { setEditing(a); setForm({ title: a.title, message: a.message, priority: a.priority, published: a.published }); setShowForm(true); }}
                  className="btn-ghost p-1.5">
                  <Edit3 className="w-4 h-4 text-slate-400" />
                </button>
                <button onClick={() => handleDelete(a.announcementId)} className="btn-ghost p-1.5">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
