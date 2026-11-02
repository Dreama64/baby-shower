import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Nuestro Baby Shower · Valentina y Sergio', description: 'Te esperamos el 12 de diciembre de 2026. Celebremos juntos la llegada de nuestros pequeños.', robots: { index: false, follow: false } };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}</body></html>; }
