'use client';

import { useState } from 'react';
import { CreditCard, Shield, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logActivity, updateRegistration } from '@/lib/firebase/firestore';
import toast from 'react-hot-toast';

interface Props {
  registrationId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ registrationId, onNext, onBack }: Props) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  // Razorpay placeholder payment handler
  const handlePayment = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await logActivity({
        userId: user.uid,
        userName: profile?.fullName,
        registrationId,
        activityType: 'PAYMENT_STARTED',
        description: 'Payment initiated',
      });

      // Call API to create Razorpay order
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId }),
      });
      const { orderId, amount, currency, keyId } = await response.json();

      if (!orderId) {
        toast.error('Failed to initiate payment. Please try again.');
        setLoading(false);
        return;
      }

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: keyId,
          amount,
          currency,
          name: "HackSpark '26",
          description: 'Hackathon Registration Fee',
          order_id: orderId,
          handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
            // Verify payment via secure API
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                registrationId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });
            const { success } = await verifyRes.json();
            if (success) {
              toast.success('Payment successful! 🎉');
              onNext();
            } else {
              toast.error('Payment verification failed. Contact support.');
            }
          },
          prefill: {
            name: profile?.fullName,
            email: profile?.email,
            contact: profile?.phone,
          },
          theme: { color: '#4F46E5' },
          modal: {
            ondismiss: () => {
              setLoading(false);
              toast('Payment cancelled');
            },
          },
        };

        // @ts-ignore — Razorpay global
        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      };

      script.onerror = () => {
        toast.error('Failed to load payment gateway');
        setLoading(false);
      };
    } catch {
      toast.error('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <h2 className="font-heading font-bold text-xl text-slate-800 mb-1">Complete Payment</h2>
      <p className="text-sm text-slate-500 mb-6">Secure payment powered by Razorpay</p>

      {/* Fee card */}
      <div className="rounded-2xl overflow-hidden mb-6"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
        <div className="p-6 text-white">
          <p className="text-indigo-200 text-sm font-medium mb-1">Registration Fee</p>
          <p className="font-heading font-black text-4xl">₹500</p>
          <p className="text-indigo-200 text-xs mt-1">Per team · One-time payment</p>
        </div>
        <div className="bg-white/10 px-6 py-3 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-indigo-200" />
          <span className="text-indigo-100 text-xs">256-bit SSL encrypted payment</span>
        </div>
      </div>

      {/* What's included */}
      <div className="rounded-xl bg-slate-50 p-4 mb-6">
        <p className="font-semibold text-sm text-slate-700 mb-3">Includes</p>
        <ul className="space-y-2">
          {[
            '24-hour hackathon participation',
            'Food & accommodation at venue',
            'Participant kit & goodies',
            'Mentorship & networking',
            'Certificates for all members',
          ].map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Security badges */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          Secure Payment
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
          All Cards Accepted
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={handlePayment} disabled={loading} className="btn-primary flex-1 py-3">
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
          ) : (
            <><CreditCard className="w-4 h-4" />Pay ₹500 Now</>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
        <AlertCircle className="w-3 h-3" />
        Payment is non-refundable after 30 days of registration
      </p>
    </div>
  );
}
