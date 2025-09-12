
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Media Generator',
  description: 'Generate realistic images and videos from text prompts.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased font-sans', inter.className)}>
        <main className="min-h-screen bg-gray-900 text-white flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
