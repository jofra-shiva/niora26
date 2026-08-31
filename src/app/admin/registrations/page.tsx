'use client';

import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { FIRESTORE_COLLECTIONS } from '@/lib/utils/constants';
import type { Registration } from '@/lib/types';
import { Search, ClipboardList, Download } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filtered, setFiltered] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDocs(query(collection(db, FIRESTORE_COLLECTIONS.REGISTRATIONS), orderBy('createdAt', 'desc')))
      .then(snap => {
        const regs = snap.docs.map(d => ({ ...d.data(), registrationId: d.id } as Registration));
        setRegistrations(regs);
        setFiltered(regs);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(registrations); return; }
    const q = search.toLowerCase();
    setFiltered(registrations.filter(r =>
      r.teamName?.toLowerCase().includes(q) ||
      r.registrationId?.toLowerCase().includes(q)
    ));
  }, [search, registrations]);

  const exportCSV = () => {
    const headers = ['Registration ID', 'Team Name', 'Members', 'Status', 'Payment', 'Registered On'];
    const rows = registrations.map(r => [
      r.registrationId || '',
      r.teamName,
      r.memberCount,
      r.registrationStatus,
      r.paymentStatus,
      r.createdAt?.toDate ? format(r.createdAt.toDate(), 'dd/MM/yyyy') : '',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hackspark26-registrations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Registrations</h1>
          <p className="text-sm text-slate-500 mt-1">{registrations.length} total registrations</p>
        </div>
        <button onClick={exportCSV} className="btn-secondary text-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by team name or registration ID..."
              className="input-field pl-10 py-2 text-sm" />
          </div>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList className="w-10 h-10 text-slate-200 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                  <th className="px-6 py-3 text-left">Reg. ID</th>
                  <th className="px-6 py-3 text-left">Team Name</th>
                  <th className="px-6 py-3 text-left">Members</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Payment</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(r => (
                  <tr key={r.registrationId || r.teamId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3 font-mono text-xs text-indigo-600 font-semibold">
                      {r.registrationId || '—'}
                    </td>
                    <td className="px-6 py-3 font-medium text-slate-800">{r.teamName}</td>
                    <td className="px-6 py-3 text-slate-500">{r.memberCount}</td>
                    <td className="px-6 py-3">
                      <span className="badge-neutral text-[10px]">{r.registrationStatus}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`badge text-[10px] ${r.paymentStatus === 'PAID' ? 'badge-success' : r.paymentStatus === 'FAILED' ? 'badge-danger' : 'badge-warning'}`}>
                        {r.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-slate-400 text-xs">
                      {r.createdAt?.toDate ? format(r.createdAt.toDate(), 'dd MMM yyyy') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
