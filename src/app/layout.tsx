import type { Metadata } from "next";
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const meta = {
  title: 'answers, how they should be displayed.',
  description:
    'anwser engine built by developers digest',
};
export const metadata: Metadata = {
  ...meta,
  title: {
    default: 'answer website',
    template: `%s - answer website`,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  twitter: {
    ...meta,
    card: 'summary_large_image',
    site: '@vercel',
  },
  openGraph: {
    ...meta,
    locale: 'en-US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
