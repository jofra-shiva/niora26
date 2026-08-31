import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import RippleEffect from '@/components/ui/RippleEffect';
import SmoothScroller from '@/components/layout/SmoothScroller';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-next-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-next-mono',
  display: 'swap',
});

const headingFont = Inter({
  subsets: ['latin'],
  variable: '--font-next-heading',
  display: 'swap',
});
export const metadata: Metadata = {
  title: {
    default: "HackSpark '26 — Code Beyond Limits. Build the Future.",
    template: "%s | HackSpark '26",
  },
  description:
    "HackSpark '26 is a 24-hour hackathon by Nehru Institute of Information Technology and Management, affiliated to Anna University, Chennai. ₹20,000 Prize Pool. 09–10 October 2026.",
  keywords: [
    "HackSpark '26", 'hackathon', 'NIITM', 'Anna University',
    'coding competition', 'Tamil Nadu hackathon', '2026',
    'MCA hackathon', 'college hackathon',
  ],
  authors: [{ name: 'NIITM PG Department of Computer Applications' }],
  openGraph: {
    type: 'website',
    title: "HackSpark '26",
    description: 'Code Beyond Limits. Build the Future. 24H Hackathon · ₹20,000 Prize Pool · 09–10 Oct 2026',
    siteName: "HackSpark '26",
  },
  twitter: {
    card: 'summary_large_image',
    title: "HackSpark '26",
    description: 'Code Beyond Limits. Build the Future.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${headingFont.variable} font-body antialiased`}>
        <AuthProvider>
          <SmoothScroller>
            <RippleEffect />
            {children}
          </SmoothScroller>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#0F172A',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.25)',
                boxShadow: '0 8px 32px rgba(37,99,235,0.1)',
                fontSize: '14px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: '500',
              },
              success: {
                iconTheme: { primary: '#2563EB', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#DC2626', secondary: '#fff' },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
