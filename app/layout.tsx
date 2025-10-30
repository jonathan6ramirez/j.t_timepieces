import type { Metadata } from 'next';
import './global.css'

export const metadata: Metadata = {
  title: 'J.T Timepieces',
  description: 'Luxury watches and exceptional service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=''>
      <body className='bg-slate-900 '>{children}</body>
    </html>
  );
}
