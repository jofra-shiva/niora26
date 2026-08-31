'use client';

import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { FIRESTORE_COLLECTIONS } from '@/lib/utils/constants';
import type { TeamMember } from '@/lib/types';
import { Search, User, Download } from 'lucide-react';

export default function AdminParticipantsPage() {
  const [participants, setParticipants] = useState<TeamMember[]>([]);
  const [filtered, setFiltered] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDocs(query(collection(db, FIRESTORE_COLLECTIONS.TEAM_MEMBERS), orderBy('createdAt', 'desc')))
      .then(snap => {
        const ms = snap.docs.map(d => ({ ...d.data(), memberId: d.id } as TeamMember)).filter(m => m.status === 'active');
        setParticipants(ms);
        setFiltered(ms);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(participants); return; }
    const q = search.toLowerCase();
    setFiltered(participants.filter(m =>
      m.fullName?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.collegeName?.toLowerCase().includes(q)
    ));
  }, [search, participants]);

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'Team', 'Role'];
    const rows = participants.map(m => [m.fullName, m.email, m.phone, m.collegeName, m.course, m.year, m.teamName, m.role]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'hackspark26-participants.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Participants</h1>
          <p className="text-sm text-slate-500 mt-1">{participants.length} total participants</p>
        </div>
        <button onClick={exportCSV} className="btn-secondary text-sm"><Download className="w-4 h-4" /> Export CSV</button>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search participants..."
              className="input-field pl-10 py-2 text-sm" />
          </div>
        </div>
        {loading ? (
          <div className="p-8 flex justify-center"><div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><User className="w-10 h-10 text-slate-200 mx-auto mb-2" /><p className="text-slate-400 text-sm">No participants</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">College</th>
                  <th className="px-6 py-3 text-left">Team</th>
                  <th className="px-6 py-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(m => (
                  <tr key={m.memberId} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: m.role === 'LEADER' ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#94A3B8' }}>
                          {m.fullName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{m.fullName}</p>
                          <p className="text-xs text-slate-400">{m.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{m.email}</td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{m.collegeName}</td>
                    <td className="px-6 py-3 text-slate-600 text-xs">{m.teamName}</td>
                    <td className="px-6 py-3">
                      <span className={`badge text-[10px] ${m.role === 'LEADER' ? 'badge-primary' : 'badge-neutral'}`}>{m.role}</span>
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
