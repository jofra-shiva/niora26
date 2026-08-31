'use client';

import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { FIRESTORE_COLLECTIONS } from '@/lib/utils/constants';
import type { Team } from '@/lib/types';
import { Search, Users, Download } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filtered, setFiltered] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getDocs(query(collection(db, FIRESTORE_COLLECTIONS.TEAMS), orderBy('createdAt', 'desc')))
      .then(snap => {
        const ts = snap.docs.map(d => ({ ...d.data(), teamId: d.id } as Team));
        setTeams(ts);
        setFiltered(ts);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(teams); return; }
    const q = search.toLowerCase();
    setFiltered(teams.filter(t =>
      t.teamName?.toLowerCase().includes(q) ||
      t.collegeName?.toLowerCase().includes(q) ||
      t.leaderName?.toLowerCase().includes(q)
    ));
  }, [search, teams]);

  const exportCSV = () => {
    const headers = ['Team ID', 'Team Name', 'Leader', 'Email', 'College', 'Course', 'Members', 'Status'];
    const rows = teams.map(t => [
      t.teamId, t.teamName, t.leaderName, t.leaderEmail, t.collegeName, t.course, t.memberCount, t.status,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'hackspark26-teams.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Teams</h1>
          <p className="text-sm text-slate-500 mt-1">{teams.length} registered teams</p>
        </div>
        <button onClick={exportCSV} className="btn-secondary text-sm"><Download className="w-4 h-4" /> Export CSV</button>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teams..."
              className="input-field pl-10 py-2 text-sm" />
          </div>
        </div>
        {loading ? (
          <div className="p-8 flex justify-center"><div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><Users className="w-10 h-10 text-slate-200 mx-auto mb-2" /><p className="text-slate-400 text-sm">No teams</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                  <th className="px-6 py-3 text-left">Team</th>
                  <th className="px-6 py-3 text-left">Leader</th>
                  <th className="px-6 py-3 text-left">College</th>
                  <th className="px-6 py-3 text-left">Members</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(t => (
                  <tr key={t.teamId} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-semibold text-slate-800">{t.teamName}</td>
                    <td className="px-6 py-3">
                      <div><p className="font-medium text-slate-700">{t.leaderName}</p>
                      <p className="text-xs text-slate-400">{t.leaderEmail}</p></div>
                    </td>
                    <td className="px-6 py-3 text-slate-500 text-xs">{t.collegeName}</td>
                    <td className="px-6 py-3 text-slate-500">{t.memberCount}</td>
                    <td className="px-6 py-3">
                      <span className={`badge text-[10px] ${t.status === 'registered' ? 'badge-success' : 'badge-neutral'}`}>{t.status}</span>
                    </td>
                    <td className="px-6 py-3 text-xs text-slate-400">
                      {t.createdAt?.toDate ? format(t.createdAt.toDate(), 'dd MMM') : '—'}
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
