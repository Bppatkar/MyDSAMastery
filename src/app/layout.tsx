import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DSA Mastery — Master Algorithms & Crack Interviews',
    template: '%s | DSA Mastery',
  },
  description: 'Master 15 DSA patterns with 450 LeetCode problems.',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#080810] text-[#e8e8f0] antialiased min-h-screen">
        {/* Navbar: fixed at top, full width, z-50 */}
        <Navbar />

        {/* Page body: starts below navbar (pt-16 = 64px) */}
        <div className="flex min-h-[calc(100vh-64px)] pt-16">
          {/* Sidebar: sticky, shows only on /patterns and /practice */}
          <Sidebar />

          {/* Main area: flexible, takes remaining width */}
          <div className="flex flex-col flex-1 min-w-0 w-full">
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
