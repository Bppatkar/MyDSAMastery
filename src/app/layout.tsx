// ============================================
// Root Layout - Puri app ka wrapper
// Navbar + Sidebar + Footer yahan lagega
// ============================================

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

// Inter font load karo
const inter = Inter({
  subsets  : ['latin'],
  variable : '--font-inter',
  display  : 'swap',
});

export const metadata: Metadata = {
  title: {
    default  : 'DSA Mastery — Master Algorithms & Crack Interviews',
    template : '%s | DSA Mastery',
  },
  description:
    'Master 15 DSA patterns with 450 LeetCode problems, AI tutor, algorithm visualizers, and interview simulator.',
  keywords: [
    'DSA', 'algorithms', 'data structures', 'LeetCode',
    'interview prep', 'coding', 'FAANG', 'competitive programming',
  ],
  authors : [{ name: 'DSA Mastery' }],
};

export const viewport: Viewport = {
  themeColor     : '#0a0a0f',
  colorScheme    : 'dark',
  width          : 'device-width',
  initialScale   : 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="bg-[#0a0a0f] text-[#e8e8f0] antialiased min-h-screen flex flex-col">
        {/* Fixed top navbar */}
        <Navbar />

        {/* Main content area with optional sidebar */}
        <div className="flex flex-1 relative">
          {/* Sidebar (only on /patterns and /practice routes) */}
          <Sidebar />

          {/* Page content — lg:ml-64 adds space for sidebar when present */}
          <main className="flex-1 min-h-[calc(100vh-4rem)] w-full">
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}