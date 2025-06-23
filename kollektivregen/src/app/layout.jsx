'use client';

import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isGallery = pathname.startsWith('/gallery');
  const isSuccess = pathname.startsWith('/form/success');
  return (
    <html lang="de">
      <head>
        <title>KollektivRegen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://use.typekit.net/vrt6azc.css" />
      </head>
      <body className={(isGallery || isSuccess) ? 'overflow-hidden' : ''}>
        {children}
      </body>
    </html>
  );
}
