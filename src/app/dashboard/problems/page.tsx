'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProblemStatements, logActivity } from '@/lib/firebase/firestore';
import type { ProblemStatement } from '@/lib/types';
import { Search, Code2, ChevronRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const DIFFICULTY_COLORS = {
  Easy: 'badge-success',
  Medium: 'badge-warning',
  Hard: 'badge-danger',
};

export default function ProblemsPage() {
  const { user, profile } = useAuth();
  const [problems, setProblems] = useState<ProblemStatement[]>([]);
  const [filtered, setFiltered] = useState<ProblemStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getProblemStatements().then(p => {
      setProblems(p);
      setFiltered(p);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = problems;
    if (search) result = result.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    if (theme) result = result.filter(p => p.theme === theme);
    setFiltered(result);
  }, [search, theme, problems]);

  const themes = [...new Set(problems.map(p => p.theme))];

  const handleView = async (p: ProblemStatement) => {
    setExpanded(expanded === p.problemId ? null : p.problemId);
    if (user && expanded !== p.problemId) {
      await logActivity({
        userId: user.uid,
        userName: profile?.fullName,
        activityType: 'PROBLEM_VIEWED',
        description: `Viewed problem: ${p.title}`,
        metadata: { problemId: p.problemId },
      });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading font-bold text-2xl text-slate-800">Problem Statements</h1>
        <p className="text-sm text-slate-500 mt-1">Browse and explore hackathon challenges</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems..."
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="input-field pl-10 pr-8 appearance-none w-full sm:w-48"
          >
            <option value="">All Themes</option>
            {themes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-20 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Code2 className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400">
            {problems.length === 0
              ? 'Problem statements will be revealed at the event inauguration!'
              : 'No problems match your search'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p, i) => (
            <motion.div
              key={p.problemId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                onClick={() => handleView(p)}
                className="w-full p-5 flex items-start justify-between gap-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="badge-neutral text-[10px]">{p.theme}</span>
                    <span className={`badge text-[10px] ${DIFFICULTY_COLORS[p.difficulty]}`}>{p.difficulty}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-slate-800">{p.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform mt-1 ${expanded === p.problemId ? 'rotate-90' : ''}`} />
              </button>
              {expanded === p.problemId && (
                <div className="border-t border-slate-100 p-5 bg-slate-50/50">
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{p.description}</p>
                  {p.expectedOutcome && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Expected Outcome</p>
                      <p className="text-sm text-slate-600">{p.expectedOutcome}</p>
                    </div>
                  )}
                  {p.technologySuggestions?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tech Suggestions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.technologySuggestions.map(t => (
                          <span key={t} className="badge-neutral text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
