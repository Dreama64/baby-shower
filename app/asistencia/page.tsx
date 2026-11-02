import type { Metadata } from 'next';
import SiteFrame from '@/components/site-frame';
import { sitePath } from '@/lib/site-path';

export const metadata: Metadata = { title: 'Confirma tu asistencia · Nuestro Baby Shower' };

export default function Attendance() {
  return <SiteFrame active="asistencia">
    <section className="attendance-page section-wrap">
      <div className="attendance-letter"><img className="letter-bow" src={sitePath('/invitation/651c0f454a3392f41f01879a42d0c0ef.png')} alt=""/><span className="eyebrow">TU PRESENCIA ES LO MÁS IMPORTANTE</span><h1 className="page-title">Hay un lugarcito<br/><em>para ti.</em></h1><p>Nos hará muy felices compartir este día contigo.<br/>Confirma tu asistencia escribiendo a mamá o papá.</p><div className="contact-cards"><a href="https://wa.me/56941369931?text=Hola%2C%20quiero%20confirmar%20mi%20asistencia%20al%20baby%20shower" target="_blank" rel="noopener noreferrer"><span>ESCRÍBELE A MAMÁ</span><strong>Valentina <i>↗</i></strong><small>+56 9 4136 9931 · WhatsApp</small></a><a href="https://wa.me/56961977317?text=Hola%2C%20quiero%20confirmar%20mi%20asistencia%20al%20baby%20shower" target="_blank" rel="noopener noreferrer"><span>ESCRÍBELE A PAPÁ</span><strong>Sergio <i>↗</i></strong><small>+56 9 6197 7317 · WhatsApp</small></a></div><p className="letter-signature">¡Te esperamos con mucho cariño!<br/><strong>Valentina y Sergio</strong></p><img className="letter-elephant" src={sitePath('/invitation/366a36349d519b2ff81f93fa8accd8a2.png')} alt="Elefantito con globos"/></div>
      <a className="text-link" href={sitePath('/celebracion/')}>Consultar fecha y ubicación →</a>
    </section>
  </SiteFrame>;
}
