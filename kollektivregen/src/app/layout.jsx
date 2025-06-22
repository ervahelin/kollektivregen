'use client';

import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isGallery = pathname.startsWith('/gallery');
  return (
    <html lang="de">
      <body className={isGallery ? 'overflow-hidden' : ''}>
        {children}
      </body>
    </html>
  );
}
