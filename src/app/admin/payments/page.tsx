'use client';

import { useEffect, useState } from 'react';
import { getDocs, collection, query, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { FIRESTORE_COLLECTIONS } from '@/lib/utils/constants';
import type { Payment } from '@/lib/types';
import { CreditCard, Search, Download, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filtered, setFiltered] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = async () => {
    const snap = await getDocs(query(collection(db, FIRESTORE_COLLECTIONS.PAYMENTS), orderBy('createdAt', 'desc')));
    const ps = snap.docs.map(d => ({ ...d.data(), paymentId: d.id } as Payment));
    setPayments(ps);
    setFiltered(ps);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!search) { setFiltered(payments); return; }
    const q = search.toLowerCase();
    setFiltered(payments.filter(p =>
      p.teamName?.toLowerCase().includes(q) ||
      p.razorpayPaymentId?.toLowerCase().includes(q)
    ));
  }, [search, payments]);

  const handleManualVerify = async (paymentId: string) => {
    if (!confirm('Mark this payment as PAID manually?')) return;
    try {
      await updateDoc(doc(db, FIRESTORE_COLLECTIONS.PAYMENTS, paymentId), {
        paymentStatus: 'PAID',
        verifiedBy: 'admin-manual',
        verifiedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast.success('Payment verified');
      await load();
    } catch { toast.error('Failed to verify'); }
  };

  const exportCSV = () => {
    const headers = ['Payment ID', 'Team', 'Amount', 'Status', 'Razorpay ID', 'Date'];
    const rows = payments.map(p => [
      p.paymentId,
      p.teamName,
      p.amount,
      p.paymentStatus,
      p.razorpayPaymentId || '',
      p.createdAt?.toDate ? format(p.createdAt.toDate(), 'dd/MM/yyyy') : '',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'hackspark26-payments.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const totalRevenue = payments.filter(p => p.paymentStatus === 'PAID').reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Payments</h1>
          <p className="text-sm text-slate-500 mt-1">Total revenue: <strong className="text-emerald-600">₹{totalRevenue.toLocaleString()}</strong></p>
        </div>
        <button onClick={exportCSV} className="btn-secondary text-sm">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by team or Razorpay ID..."
              className="input-field pl-10 py-2 text-sm" />
          </div>
        </div>

        {loading ? (
          <div className="p-8 flex justify-center"><div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center"><CreditCard className="w-10 h-10 text-slate-200 mx-auto mb-2" /><p className="text-slate-400 text-sm">No payments</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                  <th className="px-6 py-3 text-left">Team</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Razorpay ID</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.paymentId} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3 font-medium text-slate-800">{p.teamName || '—'}</td>
                    <td className="px-6 py-3 font-semibold text-slate-700">₹{p.amount || '—'}</td>
                    <td className="px-6 py-3">
                      <span className={`badge text-[10px] ${p.paymentStatus === 'PAID' ? 'badge-success' : p.paymentStatus === 'FAILED' ? 'badge-danger' : 'badge-warning'}`}>
                        {p.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono text-xs text-slate-400">{p.razorpayPaymentId || '—'}</td>
                    <td className="px-6 py-3 text-xs text-slate-400">
                      {p.createdAt?.toDate ? format(p.createdAt.toDate(), 'dd MMM yyyy') : '—'}
                    </td>
                    <td className="px-6 py-3">
                      {p.paymentStatus !== 'PAID' && (
                        <button onClick={() => handleManualVerify(p.paymentId)} className="btn-ghost text-xs text-emerald-500 hover:bg-emerald-50">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verify
                        </button>
                      )}
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
