import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar }  from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer }  from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default  : 'DSA Mastery — Master Algorithms & Crack Interviews',
    template : '%s | DSA Mastery',
  },
  description: 'Master 15 DSA patterns with 450 LeetCode problems, AI tutor, algorithm visualizers, and interview simulator.',
};

export const viewport: Viewport = {
  themeColor   : '#0a0a0f',
  colorScheme  : 'dark',
  width        : 'device-width',
  initialScale : 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="bg-[#080810] text-[#e8e8f0] antialiased min-h-screen flex flex-col">

        {/* Fixed top navbar */}
        <Navbar />

        {/* Below navbar */}
        <div className="flex flex-1 pt-16">

          {/* Sidebar — in flow (sticky), NOT fixed */}
          <Sidebar />

          {/* Main content — takes remaining space */}
          <main className="flex-1 min-w-0 min-h-[calc(100vh-4rem)]">
            {children}
          </main>

        </div>

        <Footer />
      </body>
    </html>
  );
}