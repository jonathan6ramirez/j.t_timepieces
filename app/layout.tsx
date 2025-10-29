import type { Metadata } from 'next';
import './global.css'

export const metadata: Metadata = {
  title: 'Next.js on GitHub Pages',
  description: 'Deploy your static Next.js site to GitHub Pages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full w-full'>
      <body className='h-full w-full'>{children}</body>
    </html>
  );
}
