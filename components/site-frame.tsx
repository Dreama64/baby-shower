import { sitePath } from '@/lib/site-path';

type Page = 'inicio' | 'celebracion' | 'regalos' | 'asistencia';
const links: { id: Page; label: string; path: string }[] = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'celebracion', label: 'La celebración', path: '/celebracion/' },
  { id: 'regalos', label: 'Regalitos', path: '/regalos/' },
  { id: 'asistencia', label: 'Asistencia', path: '/asistencia/' },
];

export default function SiteFrame({ active, children }: { active: Page; children: React.ReactNode }) {
  return <div className="baby-site multi-page">
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header className="site-nav">
      <a className="brand" href={sitePath('/')}><img src={sitePath('/invitation/651c0f454a3392f41f01879a42d0c0ef.png')} alt=""/>Nuestro baby shower</a>
      <nav aria-label="Navegación principal">{links.map(link =>
        <a key={link.id} href={sitePath(link.path)} aria-current={active === link.id ? 'page' : undefined}>{link.label}</a>
      )}</nav>
    </header>
    <main id="contenido">{children}</main>
    <footer className="site-footer"><span>Con cariño, Valentina y Sergio ♡</span><a href={sitePath('/admin/')}>Acceso anfitriones</a></footer>
  </div>;
}
