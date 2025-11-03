import type { Metadata } from 'next';
import './global.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'J.T Timepieces',
  description: 'Luxury watches and exceptional service.',
  openGraph: {
    images: "./icon.png",
  },
  icons: {
    icon: "./icon.png",
    apple: "./icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=''>
      <body className='bg-slate-900 '>{children}</body>
      <Analytics />
    </html>
  );
}
