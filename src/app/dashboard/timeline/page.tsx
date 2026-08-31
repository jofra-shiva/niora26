import { Clock, Calendar } from 'lucide-react';

const TIMELINE = [
  { time: '09 Oct · 09:00 AM', title: 'Registration & Check-in', type: 'registration', color: 'bg-indigo-500' },
  { time: '09 Oct · 10:00 AM', title: 'Inauguration & Kickoff', type: 'ceremony', color: 'bg-violet-500' },
  { time: '09 Oct · 01:00 PM', title: 'Lunch Break', type: 'meal', color: 'bg-amber-500' },
  { time: '09 Oct · 06:00 PM', title: 'Mentorship Round 1', type: 'event', color: 'bg-cyan-500' },
  { time: '09 Oct · 08:00 PM', title: 'Dinner', type: 'meal', color: 'bg-amber-500' },
  { time: '10 Oct · 02:00 AM', title: 'Midnight Munchies', type: 'break', color: 'bg-orange-500' },
  { time: '10 Oct · 07:00 AM', title: 'Submission Deadline', type: 'deadline', color: 'bg-red-500' },
  { time: '10 Oct · 08:00 AM', title: 'Project Presentations', type: 'event', color: 'bg-indigo-500' },
  { time: '10 Oct · 10:00 AM', title: 'Valedictory & Prize Distribution', type: 'ceremony', color: 'bg-violet-500' },
];

export default function TimelinePage() {
  const now = new Date();
  const eventStart = new Date('2026-10-09T04:30:00Z'); // 10am IST

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-800">Event Timeline</h1>
          <p className="text-sm text-slate-500">09–10 October 2026 · NIITM Campus</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-violet-200 to-transparent" />

          <div className="space-y-6">
            {TIMELINE.map((event, i) => (
              <div key={i} className="flex items-start gap-4 relative">
                <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center flex-shrink-0 z-10 shadow-sm`}>
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-mono text-xs text-slate-400 mb-0.5">{event.time}</p>
                  <p className="font-heading font-semibold text-slate-800">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
