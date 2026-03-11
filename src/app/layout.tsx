// ============================================
// Root Layout — ThemeProvider integrated
// Supports light / dark mode toggle
// ============================================

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar }        from '@/components/layout/Navbar';
import { Sidebar }       from '@/components/layout/Sidebar';
import { Footer }        from '@/components/layout/Footer';
import { ThemeProvider } from 'next-themes';

const inter = Inter({
  subsets : ['latin'],
  variable: '--font-inter',
  display : 'swap',
});

export const metadata: Metadata = {
  title: {
    default : 'DSA Mastery — Master Algorithms & Crack Interviews',
    template: '%s | DSA Mastery',
  },
  description: 'Master 15 DSA patterns with 450 LeetCode problems.',
};

export const viewport: Viewport = {
  width       : 'device-width',
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
      className={inter.variable}
      suppressHydrationWarning   // required by next-themes
    >
      <body className="antialiased min-h-screen bg-white dark:bg-[var(--bg-base)] text-zinc-900 dark:text-[var(--tx-1)]">
        <ThemeProvider
          attribute="class"       // adds/removes "dark" class on <html>
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Navbar: fixed top, full width */}
          <Navbar />

          {/* Body: below navbar */}
          <div className="flex min-h-[calc(100vh-64px)] pt-16">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 w-full">
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}