import type { Metadata } from 'next';
import { Nunito, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import RippleEffect from '@/components/ui/RippleEffect';
import SmoothScroller from '@/components/layout/SmoothScroller';
import Script from 'next/script';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-next-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-next-mono',
  display: 'swap',
});

const headingFont = Nunito({
  subsets: ['latin'],
  variable: '--font-next-heading',
  display: 'swap',
});

const BASE_URL = 'https://hackspark-niitm.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "HackSpark '26 | 24 Hours National Level Hackathon",
    template: "%s | HackSpark '26",
  },
  description:
    "HackSpark '26 is a 24-hour national-level hackathon on Sustainable AI, organized by Nehru Institute of Information Technology & Management (NIITM), Coimbatore, affiliated to Anna University. ₹20,000+ Prize Pool. 09–10 October 2026. Open to all college students.",
  keywords: [
    "HackSpark '26",
    'HackSpark 2026',
    'Hackathon 2026',
    'Coimbatore Hackathon',
    'NIITM Hackathon',
    'National Level Hackathon',
    '24 Hours Hackathon',
    'AI Hackathon',
    'MCA Hackathon',
    'Sustainable AI',
    'Sustainable AI Hackathon',
    'Anna University Hackathon',
    'Tamil Nadu Hackathon',
    'Nehru Institute Hackathon',
    'College Hackathon 2026',
    'Tech Hackathon India',
    'Coding Competition 2026',
  ],
  authors: [{ name: 'Nehru Institute of Information Technology and Management', url: BASE_URL }],
  creator: 'Nehru Institute of Information Technology and Management',
  publisher: 'Nehru Institute of Information Technology and Management',
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: "HackSpark '26",
    title: "HackSpark '26 | 24 Hours National Level Hackathon on Sustainable AI",
    description:
      "Join HackSpark '26 — a 24-hour national-level hackathon on Sustainable AI by NIITM Coimbatore. ₹20,000+ Prize Pool. Open to all college students. 09–10 October 2026.",
    images: [
      {
        url: `${BASE_URL}/logoo.png`,
        width: 1200,
        height: 630,
        alt: "HackSpark '26 — 24 Hours National Level Hackathon on Sustainable AI",
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hackspark26',
    creator: '@hackspark26',
    title: "HackSpark '26 | 24 Hours National Level Hackathon",
    description:
      "24-hour national-level hackathon on Sustainable AI by NIITM Coimbatore. ₹20,000+ Prize Pool. 09–10 Oct 2026. Open to all!",
    images: [`${BASE_URL}/logoo.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
  },
  category: 'technology',
};

// JSON-LD Structured Data for the Event
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: "HackSpark '26",
  description:
    "HackSpark '26 is a 24-hour national-level hackathon on Sustainable AI, organized by Nehru Institute of Information Technology & Management (NIITM), Coimbatore.",
  url: BASE_URL,
  startDate: '2026-10-09T09:00:00+05:30',
  endDate: '2026-10-10T09:00:00+05:30',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Nehru Institute of Information Technology and Management',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'NH 544, Nehru Gardens',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      postalCode: '641105',
      addressCountry: 'IN',
    },
  },
  organizer: {
    '@type': 'EducationalOrganization',
    name: 'Nehru Institute of Information Technology and Management',
    url: 'https://niitm.org',
  },
  image: [`${BASE_URL}/logoo.png`],
  offers: {
    '@type': 'Offer',
    url: `${BASE_URL}/register`,
    price: '200',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-09-01T00:00:00+05:30',
  },
  about: {
    '@type': 'Thing',
    name: 'Sustainable AI',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="canonical" href={BASE_URL} />
        <Script
          id="json-ld-event"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${nunito.variable} ${jetbrainsMono.variable} ${headingFont.variable} font-body antialiased`}>
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
