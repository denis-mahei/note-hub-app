import React from 'react';
import type { Metadata } from 'next';
import { Figtree, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';
import { cn } from '@/lib/utils';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub App',
  description: 'Developed by Denys Mahei',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable,
      )}
    >
      <body className="h-full bg-muted p-2 flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
