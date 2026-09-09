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
  linkedin?: string;
  phone?: string;
  headline?: string;
  about?: string;
  skills?: string[];
  education?: string;
};

const ADVISORY_BOARD: Member[] = [
  {
    name: 'Adv. Dr. P. Krishnadas',
    role: 'Chief Patron / Advisory Board',
    image: '/team/krishnadas.jpg',
    headline: 'Chancellor, P K Das Deemed to be University, Tamilnadu',
    about: 'Chancellor, P K Das Deemed to be University, Tamilnadu. Honorary Trade Commissioner of Mauritius - India. Chairman and Managing Trustee, NGI.',
    education: 'Nehru Group of Institutions',
  },
  {
    name: 'Dr. P. Krishnakumar',
    role: 'Patron / Advisory Board',
    image: '/team/krishnakumar.jpg',
    headline: 'Pro-Chancellor, P K Das Deemed to be University · CEO & Secretary, NGI',
    about: 'Pro-Chancellor, P K Das Deemed to be University. CEO & Secretary, NGI.',
    education: 'Nehru Group of Institutions',
  },
  {
    name: 'Prof. Dr. H. N. Nagaraja',
    role: 'Executive Director / Advisory Board',
    image: '/team/nagaraja.png',
    headline: 'Executive Director - Academics and Administration · NGI',
    about: 'Academician with 37 years of experience as a teacher, administrator, and researcher. Instrumental in NAAC/NBA accreditations, NIRF and QS-I-Gauge rankings. Published 95+ research papers in reputed journals.',
    education: 'Nehru Group of Institutions',
  },
  {
    name: 'Dr. K. Ravikumar',
    role: 'Principal / NIITM',
    image: '/team/ravikumar.jpg',
    headline: 'Principal · Nehru Institute of Information Technology & Management',
    about: 'Principal of Nehru Institute of Information Technology & Management (NIITM). Providing academic excellence, administrative leadership, and strategic direction.',
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Dr. R. Moses Daniel',
    role: 'Principal / NCM',
    image: '/team/moses.jpg',
    headline: 'Principal · Nehru College of Management',
    about: 'Principal of Nehru College of Management (NCM). Guiding institutional development, management education, and student empowerment.',
    education: 'Nehru College of Management, Coimbatore',
  },
  {
    name: 'Dr. S. Menaka',
    role: 'HOD / NIITM',
    image: '/team/menaka.jpg',
    headline: 'Head of Department · Nehru Institute of Information Technology & Management',
    about: 'Head of Department at Nehru Institute of Information Technology & Management (NIITM). Guiding academic excellence, technical innovation, and student mentorship.',
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Dr. M. Sengaliappan',
    role: 'HOD / NCM',
    image: '/team/sengaliappan.jpg',
    headline: 'Head of Department · Nehru College of Management',
    about: 'Head of Department at Nehru College of Management (NCM). Guiding management education, student leadership, and event coordination.',
    education: 'Nehru College of Management, Coimbatore',
  },
];

const CONVENORS: Member[] = [
  {
    name: 'Mrs. Meera Bai C',
    role: 'Convenor',
    image: '/team/indulekha.jpg',
    phone: '9944560889',
    headline: 'Faculty · PG Dept. of Computer Applications',
    about: 'A dedicated academician and researcher with deep expertise in computer science and application development. Leads the PG Department of Computer Applications at NIITM, guiding students toward excellence in technology.',
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Mrs. Indulekha K V',
    role: 'Convenor',
    image: '/team/meera_bai.jpg',
    phone: '7561078733',
    headline: 'Faculty · PG Dept. of Computer Applications',
    about: 'Passionate educator and event organizer with a strong background in software engineering. Plays a key role in shaping the technical curriculum and mentoring students through industry-relevant projects.',
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Dr. A. Nandhini',
    role: 'Convenor',
    image: '/team/nandhini.jpg',
    phone: '7561078733',
    headline: 'Assistant Professor (Senior Grade) · Nehru College of Management',
    about: 'Expert in Computer Science Information Systems with over 15 years of academic experience. Holds a Doctor of Philosophy and has authored multiple scholarly publications, including research on Explainable AI and Image Analysis.',
    education: 'Doctor of Philosophy',
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
    image: 'https://media.licdn.com/dms/image/v2/D5603AQG_XcJrNuFQEA/profile-displayphoto-crop_800_800/B56aBEAP_hKkAI-/0/1787847313126?e=1790208000&v=beta&t=74JPbFH8nb4JqvhgBSmfc4CXDO6yUWLEvK07cm23SNI',
    linkedin: 'https://www.linkedin.com/in/logendiran-r-24567a295/',
    headline: 'MCA Student · UI/UX & Web Developer',
    about: 'Enthusiastic about creating seamless user experiences and contributing to open-source projects. Coordinating logistics and participant experience for HackSpark \'26.',
    skills: ['Figma', 'React', 'TailwindCSS', 'JavaScript'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Jeevanantha Perumal M',
    role: 'Student Coordinator',
    image: '/team/jeevanantha.jpg',
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
  {
    name: 'Gayathiri S',
    role: 'Student Coordinator',
    image: '/team/gayathiri.jpg',
    linkedin: 'https://www.linkedin.com/in/gayathri-s-5546002b5',
    headline: 'MCA Student · Student Coordinator',
    about: 'Pursuing Master of Computer Applications. Dedicated student coordinator assisting with event operations and participant management for HackSpark \'26.',
    skills: ['Management', 'Coordination', 'Communication'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Jeevika R',
    role: 'Student Coordinator',
    image: '/team/jeevika.jpg',
    linkedin: 'https://www.linkedin.com/in/jeevika-rajasekaran-0a0369291',
    headline: 'MCA Student · Student Coordinator',
    about: 'Pursuing Master of Computer Applications. Dedicated student coordinator assisting with event operations and participant management for HackSpark \'26.',
    skills: ['Management', 'Coordination', 'Communication'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Athul U K',
    role: 'Student Coordinator',
    image: '/team/athul.jpg',
    linkedin: 'https://www.linkedin.com/in/athul-u-k-641273265',
    headline: 'MCA Student · Student Coordinator',
    about: 'Pursuing Master of Computer Applications at NIITM. Dedicated student coordinator assisting with event management and participant support for HackSpark \'26.',
    skills: ['Management', 'Coordination'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Kumaran M',
    role: 'Student Coordinator',
    image: '/team/kumaran.jpg',
    linkedin: 'https://www.linkedin.com/in/kumaran-m-290ab0434',
    headline: 'MCA Student · Student Coordinator',
    about: 'Pursuing Master of Computer Applications at NIITM. Dedicated student coordinator assisting with event management and participant support for HackSpark \'26.',
    skills: ['Management', 'Coordination'],
    education: 'NIITM, Coimbatore',
  },
];

const STUDENT_ORGANIZERS: Member[] = [
  {
    name: 'Harsath Ganesan',
    role: 'Student Organizer',
    image: '/team/harsath.jpg',
    linkedin: 'https://www.linkedin.com/in/harsathganesan05/',
    phone: '9047023266',
    headline: 'Versatile Full Stack Developer',
    about: 'Proficient in React, Node, Python, Flask, HTML, CSS & JS. Developer at Ak technologies. Instrumental in organizing and running HackSpark \'26.',
    skills: ['React', 'Node.js', 'Python', 'Flask', 'HTML/CSS/JS'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'Sivaprakash M',
    role: 'Student Organizer',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQEk0GczFKrgpA/profile-displayphoto-scale_400_400/B56ZpogW_NHkAk-/0/1762689906770?e=1789603200&v=beta&t=6RxeiYtTWPFnJxTbKEeE4x9o5QBbCeBaj6cCvLnpgIs',
    linkedin: 'https://www.linkedin.com/in/sivaprakash-m-dev/',
    phone: '8838939801',
    headline: 'Full Stack Developer | Java | Python',
    about: 'Frontend Developer at AK Technologies. Full Stack developer with experience in Next.js, Java, and Python. Built projects like Time Lion and LeoChat. Active organizer behind HackSpark \'26.',
    skills: ['Java', 'Python', 'Next.js', 'React', 'Node.js'],
    education: 'NIITM, Coimbatore',
  },
  {
    name: 'V. K. Girithar',
    role: 'Student Organizer',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHFvqEfNXJ3xw/profile-displayphoto-crop_800_800/B56Z0PkT9yJgAI-/0/1774082674949?e=1790208000&v=beta&t=rDXOavyApI9RwmuRYgbxGHGFRX9ty9iubDVsV46aYmI',
    linkedin: 'https://www.linkedin.com/in/v-k-girithar-699711321/',
    headline: 'MCA Student · CEO at GV INFO PARK',
    about: 'A proactive MCA student at Nehru College of Management with a passion for leadership and startups. Chief Executive Officer at GV INFO PARK.',
    skills: ['Leadership', 'Sales', 'Python', 'Presentations'],
    education: 'Nehru College of Management',
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative bg-[#070D22] border border-blue-500/40 rounded-[28px] shadow-[0_0_50px_rgba(0,240,255,0.2)] w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="relative h-28 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 border-b border-blue-500/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.15),transparent)]" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Avatar — overlaps banner */}
        <div className="absolute left-6 top-14 w-24 h-32 rounded-[22px] overflow-hidden border-[3px] border-[#070D22] shadow-[0_0_20px_rgba(0,240,255,0.3)] z-10 bg-[#0B1536]">
          {!imgError ? (
            <Image src={member.image} alt={member.name} fill sizes="96px" className="object-cover object-top" onError={() => setImgError(true)} unoptimized={member.image.startsWith('http://')} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
              <span className="font-black text-3xl text-[#00F0FF]">{member.name.charAt(0)}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 pt-20 pb-6">
          {/* Name + role */}
          <div className="mb-1">
            <h2 className="text-xl font-black text-white leading-tight">{member.name}</h2>
            <p className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest mt-0.5">{member.role}</p>
          </div>

          {/* Headline */}
          {member.headline && (
            <div className="flex items-center gap-2 mt-2 mb-4">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <p className="text-sm text-slate-300 font-medium">{member.headline}</p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-blue-500/20 mb-4" />

          {/* About */}
          {member.about && (
            <div className="mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">About</p>
              <p className="text-sm text-slate-300 leading-relaxed">{member.about}</p>
            </div>
          )}

          {/* Skills */}
          {member.skills && member.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Skills</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {member.skills.map(s => (
                  <span key={s} className="text-xs font-semibold text-cyan-300 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full">
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
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Education</p>
              </div>
              <p className="text-sm text-slate-300 font-medium">{member.education}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold py-2.5 rounded-2xl transition-colors border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                View LinkedIn
              </a>
            )}
            {member.phone && (
              <a
                href={`https://wa.me/91${member.phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026.`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 text-sm font-bold py-2.5 rounded-2xl border border-emerald-500/40 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
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
        className="absolute left-0 bottom-full mb-2 z-50 w-48 bg-[#070D22] rounded-xl border border-blue-500/40 shadow-2xl overflow-hidden text-white"
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-blue-500/20">
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest truncate">{name.split(' ')[0]}</p>
          <button onClick={onClose}><X className="w-3 h-3 text-slate-400 hover:text-white transition-colors" /></button>
        </div>
        <a
          href={`https://wa.me/91${phone}?text=Hi%2C%20I%20have%20a%20query%20regarding%20HACKSPARK%2026%20Hackathon.`}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2.5 hover:bg-emerald-950/40 transition-colors border-b border-blue-500/20 text-emerald-400"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-3 h-3 text-emerald-400" />
          </div>
          <p className="text-xs font-semibold text-emerald-300">WhatsApp</p>
        </a>
        <a
          href={`tel:+91${phone}`}
          className="flex items-center gap-2 px-3 py-2.5 hover:bg-blue-950/40 transition-colors text-cyan-300"
          onClick={onClose}
        >
          <div className="w-6 h-6 rounded-lg bg-blue-900/50 flex items-center justify-center flex-shrink-0">
            <Phone className="w-3 h-3 text-cyan-400" />
          </div>
          <p className="text-xs font-semibold text-cyan-300">Call</p>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

/* -- Team card -------------------------------------- */
function TeamCard({ member, index }: { member: Member; index: number }) {
  const [imgError, setImgError] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isStudentCoordinator = member.role === 'Student Coordinator';

  return (
    <>
      <AnimatePresence>
        {profileOpen && <ProfileModal member={member} onClose={() => setProfileOpen(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -6, scale: 1.02 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.5, delay: (index % 4) * 0.08, type: 'spring', stiffness: 120, damping: 15 }}
        onClick={() => setProfileOpen(true)}
        className="relative rounded-[20px] sm:rounded-[24px] p-[1.5px] overflow-hidden group cursor-pointer w-full shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex flex-col"
      >
        {/* Glowing Gradient Border */}
        <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-purple-500/40 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Inner Card Content */}
        {isStudentCoordinator ? (
          <div className="relative z-10 bg-[#070D22]/85 backdrop-blur-2xl group-hover:bg-[#0A1230]/95 transition-all duration-500 rounded-[16px] sm:rounded-[22px] p-2.5 xs:p-3 sm:p-4 flex flex-col items-center justify-center text-center aspect-square h-full w-full border border-blue-500/30">
            {/* Top: Square Avatar */}
            <div className="relative w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 aspect-square flex-shrink-0 z-10 mb-1.5 xs:mb-2 sm:mb-3">
              <div className="relative w-full h-full rounded-lg sm:rounded-2xl overflow-hidden bg-[#0B1536] border-2 border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 z-10">
                {!imgError && (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    onError={() => setImgError(true)}
                    sizes="(max-width: 640px) 64px, 96px"
                    unoptimized={member.image.startsWith('http://')}
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center ${!imgError ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  <span className="font-heading font-black text-xl sm:text-3xl text-[#00F0FF]">{member.name.charAt(0)}</span>
                </div>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-heading font-bold text-white text-[10px] xs:text-xs sm:text-base group-hover:text-[#00F0FF] transition-colors leading-snug mb-0.5 sm:mb-1 text-center line-clamp-1">
              {member.name}
            </h3>

            {/* Subtitle: MCA, NIITM */}
            <p className="text-[8px] xs:text-[9.5px] sm:text-xs text-cyan-400 font-mono font-semibold uppercase tracking-[0.1em] sm:tracking-[0.12em] text-center mb-0.5">
              MCA, NIITM
            </p>
            <p className="text-[7px] xs:text-[8px] sm:text-[9px] text-slate-400 font-mono font-semibold uppercase tracking-[0.08em] text-center mb-1 sm:mb-2">
              Student Coordinator
            </p>

            {/* View Details hint at bottom */}
            <div className="flex items-center gap-1 text-[7.5px] xs:text-[9px] sm:text-[10px] font-semibold text-cyan-400 opacity-80 group-hover:opacity-100 transition-all duration-300 mt-auto pt-1 border-t border-blue-500/20 w-full justify-center">
              <span>View Details</span>
              <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>
        ) : (
          <div className="relative z-10 bg-[#070D22]/85 backdrop-blur-2xl group-hover:bg-[#0A1230]/95 transition-all duration-500 rounded-[18px] sm:rounded-[22px] p-3 xs:p-3.5 sm:p-4 flex items-center gap-3 sm:gap-4 text-left h-full w-full border border-blue-500/30">

            {/* Left: Avatar (Prominent Square Avatar) */}
            <div className="relative w-18 xs:w-22 sm:w-28 aspect-square flex-shrink-0 z-10">
              <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-[#0B1536] border-2 border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 z-10">
                {!imgError && (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    onError={() => setImgError(true)}
                    sizes="(max-width: 640px) 80px, 96px"
                    unoptimized={member.image.startsWith('http://')}
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center ${!imgError ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  <span className="font-heading font-black text-xl sm:text-2xl text-[#00F0FF]">{member.name.charAt(0)}</span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col flex-1 h-full min-h-[90px] xs:min-h-[105px] sm:min-h-[115px] justify-between z-10 min-w-0">
              <div>
                <h3 className="font-heading font-bold text-white text-xs xs:text-sm sm:text-base group-hover:text-[#00F0FF] transition-colors leading-snug mb-0.5">
                  {member.name}
                </h3>
                <p className="text-[8.5px] sm:text-[9.5px] text-cyan-400 font-mono font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-1 line-clamp-1">
                  {member.role}
                </p>
                {member.about && (
                  <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 line-clamp-2 leading-relaxed mb-1 font-medium">
                    {member.about}
                  </p>
                )}
              </div>

              {/* "View Profile" hint */}
              <div className="flex items-center justify-between pt-1 border-t border-blue-500/20 mt-auto">
                <div className="flex items-center gap-1 sm:gap-1.5 text-[8.5px] sm:text-[9.5px] font-semibold text-cyan-400 opacity-80 group-hover:opacity-100 transition-all duration-300">
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>View Full Profile</span>
                </div>
                <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-blue-950/80 border border-blue-500/30 flex items-center justify-center group-hover:bg-[#00F0FF] group-hover:text-black transition-all">
                  <span className="text-cyan-400 group-hover:text-black text-xs leading-none transform group-hover:translate-x-0.5 transition-all">→</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* -- Team group ------------------------------------- */
function AdvisoryBoardGroup({ delay = 0.05 }: { delay?: number }) {
  const topThree = [ADVISORY_BOARD[0], ADVISORY_BOARD[1], ADVISORY_BOARD[2]]; // Krishnadas, Krishnakumar, Nagaraja (Row of 3)
  const principals = [ADVISORY_BOARD[3], ADVISORY_BOARD[4]]; // Ravikumar & Moses Daniel
  const hods = [ADVISORY_BOARD[5], ADVISORY_BOARD[6]]; // Menaka & Sengaliappan

  return (
    <div className="mb-10 sm:mb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.5, delay }}
        className="flex items-center gap-2 sm:gap-4 mb-5 sm:mb-8"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-black font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#00F0FF] border border-blue-500/40 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#070D22]/90 whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-xl">
          Advisory Board
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500/40 to-transparent" />
      </motion.div>

      <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-[1320px] mx-auto">
        {/* Row 1: Top 3 Wide Horizontal Rectangle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 w-full">
          {topThree.map((m, i) => (
            <div key={m.name} className="w-full flex">
              <TeamCard member={m} index={i} />
            </div>
          ))}
        </div>

        {/* Subtle Light Divider Line under the top 3 */}
        <div className="w-full my-2 sm:my-3 flex items-center justify-center">
          <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
        </div>

        {/* Row 2: Principals (Ravikumar & Moses Daniel) */}
        <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5 w-full max-w-4xl mx-auto">
          {principals.map((m, i) => (
            <div key={m.name} className="w-full md:w-[calc(50%-0.625rem)] flex">
              <TeamCard member={m} index={i + 3} />
            </div>
          ))}
        </div>

        {/* Row 3: HODs (Menaka & Sengaliappan) */}
        <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5 w-full max-w-4xl mx-auto">
          {hods.map((m, i) => (
            <div key={m.name} className="w-full md:w-[calc(50%-0.625rem)] flex">
              <TeamCard member={m} index={i + 5} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamGroup({ title, members, delay = 0 }: { title: string; members: Member[]; delay?: number }) {
  const isEight = members.length === 8;
  const useThreeGrid = members.length % 3 === 0;

  return (
    <div className="mb-10 sm:mb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, margin: '-40px' }}
        transition={{ duration: 0.5, delay }}
        className="flex items-center gap-2 sm:gap-4 mb-5 sm:mb-8"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-black font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#00F0FF] border border-blue-500/40 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#070D22]/90 whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.2)] backdrop-blur-xl">
          {title}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-blue-500/40 to-transparent" />
      </motion.div>

      {isEight ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full max-w-5xl mx-auto">
          {members.map((m, i) => (
            <div key={m.name} className="w-full flex">
              <TeamCard member={m} index={i} />
            </div>
          ))}
        </div>
      ) : useThreeGrid ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 w-full max-w-[1320px] mx-auto">
          {members.map((m, i) => (
            <div key={m.name} className="w-full flex">
              <TeamCard member={m} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5 max-w-4xl mx-auto">
          {members.map((m, i) => (
            <div key={m.name} className="w-full md:w-[calc(50%-0.625rem)] flex">
              <TeamCard member={m} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* -- Main section ----------------------------------- */
export default function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team-section" className="pt-8 pb-12 sm:pb-24 relative overflow-hidden bg-[#050914] text-white">
      {/* Background Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.12),transparent_65%),radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_60%)]" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10 max-w-[1360px] mx-auto px-4" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-2 rounded-full bg-[#070D22]/85 border border-blue-500/30 mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)] backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-cyan-300">
              The Circuit Behind the Circuit
            </span>
          </div>
          <h2 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight mb-3 sm:mb-4">
            Who&apos;s behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#00F0FF] to-[#8B5CF6]">HackSpark &apos;26</span>
          </h2>
        </motion.div>

        <div id="advisory" className="scroll-mt-28" />
        <AdvisoryBoardGroup delay={0.05} />
        
        <div id="team" className="scroll-mt-28" />
        <TeamGroup title="Convenors"           members={CONVENORS}            delay={0.1} />
        <TeamGroup title="Student Organizers"   members={STUDENT_ORGANIZERS}   delay={0.2} />
        <TeamGroup title="Student Coordinators" members={STUDENT_COORDINATORS} delay={0.3} />
      </div>
    </section>
  );
}
