'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Phone, MessageSquare, X, Code2, GraduationCap, Briefcase } from 'lucide-react';
import Image from 'next/image';

/* -- Data ------------------------------------------- */
type Member = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  phone?: string;
  headline?: string;
  about?: string;
  skills?: string[];
  education?: string;
};

const CONVENORS: Member[] = [
  {
    name: 'Meera Bai C',
    role: 'Convenor',
    image: '/team/meera-bai.jpg',
    linkedin: 'https://linkedin.com',
    phone: '9944560889',
    headline: 'Head of Department · PG Dept. of Computer Applications',
    about: 'A dedicated academician and researcher with deep expertise in computer science and application development. Leads the PG Department of Computer Applications at NIITM, guiding students toward excellence in technology.',
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Indulekha K V',
    role: 'Convenor',
    image: '/team/indulekha.jpg',
    linkedin: 'https://linkedin.com',
    phone: '7561078733',
    headline: 'Faculty · PG Dept. of Computer Applications',
    about: 'Passionate educator and event organizer with a strong background in software engineering. Plays a key role in shaping the technical curriculum and mentoring students through industry-relevant projects.',
    education: 'NIITM, Coimbatore',
  },
];

const STUDENT_COORDINATORS: Member[] = [
  {
    name: 'Venkatesh T R S',
    role: 'Student Coordinator',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGv1gUMhNJhpA/profile-displayphoto-crop_800_800/B56Z46FFf4IsAI-/0/1779090875339?e=1789603200&v=beta&t=vEtQrXlCcKDSP8-mMXBO5N-F3hTAjZgDvc3R4G_3iF8',
    linkedin: 'https://www.linkedin.com/in/venkateshtrs02/',
    headline: 'MCA Student · Full Stack Enthusiast',
    about: 'A motivated MCA student passionate about full-stack development and building scalable applications. Plays a key coordination role for HackSpark \'26.',
    skills: ['React', 'Node.js', 'Python', 'MongoDB'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Logendiran R',
    role: 'Student Coordinator',
    image: 'https://media.licdn.com/dms/image/v2/D4D35AQE08fos83KJGA/profile-framedphoto-shrink_800_800/B4DaAJy59hKIAc-/0/1786870735087?e=1788415200&v=beta&t=j6Nnq4OZhKREL2X1GbAyU3jVZEKMUoAr893rWG-n95g',
    linkedin: 'https://www.linkedin.com/in/logendiran-r-24567a295/',
    headline: 'MCA Student · UI/UX & Web Developer',
    about: 'Enthusiastic about creating seamless user experiences and contributing to open-source projects. Coordinating logistics and participant experience for HackSpark \'26.',
    skills: ['Figma', 'React', 'TailwindCSS', 'JavaScript'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Jeevanantha Perumal M',
    role: 'Student Coordinator',
    image: 'https://media.licdn.com/dms/image/v2/D5635AQHIlLSQZ7QO-w/profile-framedphoto-shrink_800_800/B56Z_7516ZJcAc-/0/1786637672703?e=1788415200&v=beta&t=3GlRV7ewS5FM2_IXnOil6Agk3q-xJINtZIlSTSSUYdA',
    linkedin: 'https://www.linkedin.com/in/jeevanantha-perumal-m-197b78296/',
    headline: 'MCA Student · Backend & Cloud Developer',
    about: 'Focuses on backend systems, cloud infrastructure, and DevOps practices. Managing technical operations for HackSpark \'26.',
    skills: ['AWS', 'Docker', 'Django', 'PostgreSQL'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Pathirinath Kamesh S',
    role: 'Student Coordinator',
    image: '/team/pathirinath.jpg',
    linkedin: 'https://linkedin.com',
    headline: 'MCA Student · AI/ML & Data Science',
    about: 'Passionate about machine learning, data analysis, and building intelligent systems. Handling outreach and partnerships for HackSpark \'26.',
    skills: ['Python', 'TensorFlow', 'Pandas', 'scikit-learn'],
    education: 'NIITM, Coimbatore',
  },
];

const STUDENT_ORGANIZERS: Member[] = [
  {
    name: 'Harsath Ganesan',
    role: 'Student Organizer',
    image: 'https://media.licdn.com/dms/image/v2/D5635AQENLTxOeGe4JQ/profile-framedphoto-shrink_800_800/B56Zt.gsFaKgAg-/0/1767354057319?e=1788415200&v=beta&t=tIruohw1AgyDF7ZBzvD6JA6m6A8CbT-4OnjSj6poaxo',
    linkedin: 'https://www.linkedin.com/in/harsathganesan05/',
    phone: '9047023266',
    headline: 'MCA Student · Web Developer & Designer',
    about: 'A creative developer who blends design sensibility with technical depth. Instrumental in organizing and running HackSpark \'26.',
    skills: ['React', 'Next.js', 'TailwindCSS', 'Figma'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Sivaprakash M',
    role: 'Student Organizer',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQEk0GczFKrgpA/profile-displayphoto-scale_400_400/B56ZpogW_NHkAk-/0/1762689906770?e=1789603200&v=beta&t=6RxeiYtTWPFnJxTbKEeE4x9o5QBbCeBaj6cCvLnpgIs',
    linkedin: 'https://www.linkedin.com/in/sivaprakash-m-dev/',
    phone: '8838939801',
    headline: 'MCA Student · Full Stack Developer',
    about: 'A passionate full-stack developer and problem solver. Building meaningful products with modern web technologies. Active contributor to open-source and a key organizer behind HackSpark \'26.',
    skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB'],
    education: 'NIITM, Coimbatore',
  },
];

/* -- Profile modal ---------------------------------- */
function ProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative bg-white rounded-[28px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="relative h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent)]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Avatar — overlaps banner */}
        <div className="absolute left-6 top-16 w-24 h-24 rounded-[22px] overflow-hidden border-[3px] border-white shadow-lg z-10 bg-slate-100">
          {!imgError ? (
            <Image src={member.image} alt={member.name} fill className="object-cover" onError={() => setImgError(true)} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <span className="font-black text-3xl text-blue-600">{member.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 pt-14 pb-6">
          {/* Name + role */}
          <div className="mb-1">
            <h2 className="text-xl font-black text-slate-900 leading-tight">{member.name}</h2>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">{member.role}</p>
            </div>

            {/* Headline */}
            {member.headline && (
              <div className="flex items-center gap-2 mt-2 mb-4">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <p className="text-sm text-slate-500 font-medium">{member.headline}</p>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-slate-100 mb-4" />

            {/* About */}
            {member.about && (
              <div className="mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">About</p>
                <p className="text-sm text-slate-600 leading-relaxed">{member.about}</p>
              </div>
            )}

            {/* Skills */}
            {member.skills && member.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Skills</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map(s => (
                    <span key={s} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {member.education && (
              <div className="mb-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Education</p>
                </div>
                <p className="text-sm text-slate-600 font-medium">{member.education}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <a
                href={member.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 rounded-2xl transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View LinkedIn
              </a>
              {member.phone && (
                <a
                  href={`https://wa.me/91${member.phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-bold py-2.5 rounded-2xl border border-emerald-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>,
      document.body
  );
}

/* -- Contact popup ---------------------------------- */
function ContactPopup({ name, phone, onClose }: { name: string; phone: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -8 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 bottom-full mb-2 z-50 w-48 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden"
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest truncate">{name.split(' ')[0]}</p>
          <button onClick={onClose}><X className="w-3 h-3 text-slate-400 hover:text-slate-700 transition-colors" /></button>
        </div>
        <a
          href={`https://wa.me/91${phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026%20Hackathon.`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2.5 hover:bg-emerald-50 transition-colors border-b border-slate-100"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-3 h-3 text-emerald-600" />
          </div>
          <p className="text-xs font-semibold text-slate-700">WhatsApp</p>
        </a>
        <a
          href={`tel:+91${phone}`}
          className="flex items-center gap-2 px-3 py-2.5 hover:bg-blue-50 transition-colors"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Phone className="w-3 h-3 text-blue-600" />
          </div>
          <p className="text-xs font-semibold text-slate-700">Call</p>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

/* -- Team card -------------------------------------- */
function TeamCard({ member, index }: { member: Member; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {profileOpen && <ProfileModal member={member} onClose={() => setProfileOpen(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
        whileHover={{ y: -4 }}
        onClick={() => setProfileOpen(true)}
        className="group relative bg-white/80 backdrop-blur-xl rounded-[24px] p-5 border border-slate-200/70 hover:border-blue-300/60 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 flex items-start gap-5 text-left overflow-hidden cursor-pointer"
      >
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-indigo-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Left: Big Avatar */}
        <div className="relative w-28 h-28 flex-shrink-0 z-10">
          <div className="absolute inset-[-4px] rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
          <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100 border-[3px] border-white shadow-sm z-10">
            {!imgError && (
              <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" onError={() => setImgError(true)} sizes="112px" />
            )}
            <div className={`absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center ${!imgError ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
              <span className="font-heading font-black text-3xl text-blue-500">{member.name.charAt(0)}</span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col flex-1 h-full min-h-[112px] z-10">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-tight mb-1">
              {member.name}
            </h3>
            <p className="text-[10px] text-slate-400 font-mono font-semibold uppercase tracking-[0.2em] mb-2">
              {member.role}
            </p>
          </div>

          {member.about && (
            <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3 flex-1">
              {member.about}
            </p>
          )}

          {/* "View Profile" hint */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100/80">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-3 h-3" />
              <span>View Full Profile</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <span className="text-slate-400 group-hover:text-blue-500 text-sm leading-none transform group-hover:translate-x-0.5 transition-all">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* -- Team group ------------------------------------- */
function TeamGroup({ title, members, delay = 0 }: { title: string; members: Member[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
        <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-blue-600 border border-blue-200/70 px-5 py-2 rounded-full bg-blue-50/80 whitespace-nowrap shadow-sm backdrop-blur-sm">
          {title}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-300/60 to-transparent" />
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
        {members.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
      </div>
    </motion.div>
  );
}

/* -- Main section ----------------------------------- */
export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="pt-8 pb-24 relative overflow-hidden bg-slate-50">
      {/* Premium Animated Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-bl from-blue-300/40 via-indigo-300/20 to-purple-300/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-[30%] -left-[15%] w-[700px] h-[700px] bg-gradient-to-tr from-cyan-300/30 via-blue-200/20 to-sky-300/30 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute -bottom-[20%] left-[20%] w-[1000px] h-[600px] bg-gradient-to-r from-violet-200/40 via-fuchsia-200/20 to-blue-200/40 rounded-full blur-[130px]"
        />
      </div>

      {/* Tech/Circuit Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none">
        {/* Decorative Grid Plus Signs */}
        <div className="absolute top-[20%] left-[20%] text-blue-300/40 text-2xl font-light">+</div>
        <div className="absolute top-[60%] right-[15%] text-indigo-300/40 text-2xl font-light">+</div>
        <div className="absolute bottom-[20%] left-[40%] text-purple-300/40 text-2xl font-light">+</div>
        <div className="absolute top-[10%] right-[40%] text-cyan-300/40 text-2xl font-light">+</div>
      </div>
      
      {/* Soft Vignette Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/20 to-slate-50/80 pointer-events-none" />

      <div className="section-container relative z-10" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-blue-100 mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-blue-700">
              The Circuit Behind the Circuit
            </span>
          </div>
          <h2 className="section-heading text-slate-900 mb-4">
            Who's behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">HackSpark '26</span>
          </h2>
          <p className="section-subheading text-slate-600 mx-auto">
            The masterminds behind the event. <span className="text-blue-600 font-semibold">Click any card</span> to view their full profile.
          </p>
        </motion.div>

        <TeamGroup title="Convenors"           members={CONVENORS}            delay={0.1} />
        <TeamGroup title="Student Organizers"   members={STUDENT_ORGANIZERS}   delay={0.2} />
        <TeamGroup title="Student Coordinators" members={STUDENT_COORDINATORS} delay={0.3} />
      </div>
    </section>
  );
}
