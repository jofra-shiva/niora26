import Link from 'next/link';
import { HelpCircle, Mail, MessageSquare } from 'lucide-react';

const FAQS = [
  { q: 'How do I complete my registration?', a: 'Go to the Registration page in your dashboard and complete all required steps including team creation, member addition, and payment.' },
  { q: 'Can I change my team members after payment?', a: 'Team member changes after payment confirmation are not allowed. Contact the organizers if you have an emergency situation.' },
  { q: 'When will the problem statements be revealed?', a: 'Problem statements will be revealed at the inauguration ceremony on 09 October 2026 at 10:00 AM IST.' },
  { q: 'What should I bring to the venue?', a: 'Bring your laptop, charger, college ID, and any hardware you plan to use. Food and accommodation are provided.' },
  { q: 'How do I submit my project?', a: 'Use the Submission page in your dashboard to submit your project GitHub URL, demo link, and presentation.' },
  { q: 'What if I face technical issues?', a: 'Contact the organizing team via email or use the contact form. On-site help will be available during the event.' },
];

export default function HelpPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Help & Support</h1>
          <p className="text-sm text-slate-500">Find answers and get in touch</p>
        </div>
      </div>

      {/* Quick contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <a href="mailto:hackspark26@niitm.ac.in" className="glass-card-hover rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Mail className="w-4 h-4 text-indigo-500" />
          </div>
          <div>
            <p className="font-semibold text-sm text-slate-800">Email Support</p>
            <p className="text-xs text-slate-400">hackspark26@niitm.ac.in</p>
          </div>
        </a>
        <Link href="/#contact" className="glass-card-hover rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-violet-500" />
          </div>
          <div>
            <p className="font-semibold text-sm text-slate-800">Contact Form</p>
            <p className="text-xs text-slate-400">Send us a message</p>
          </div>
        </Link>
      </div>

      {/* FAQs */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-heading font-semibold text-slate-800">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {FAQS.map((faq, i) => (
            <div key={i} className="px-6 py-4">
              <p className="font-semibold text-sm text-slate-800 mb-2">{faq.q}</p>
              <p className="text-sm text-slate-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
