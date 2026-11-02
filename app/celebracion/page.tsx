import type { Metadata } from 'next';
import SiteFrame from '@/components/site-frame';
import Countdown from '@/components/countdown';
import { sitePath } from '@/lib/site-path';

export const metadata: Metadata = { title: 'La celebración · Nuestro Baby Shower' };

export default function Celebration() {
  return <SiteFrame active="celebracion">
    <section className="celebration-page section-wrap">
      <div className="page-intro"><span className="eyebrow">UNA FECHA MUY ESPECIAL</span><h1 className="page-title">Un día para<br/><em>recordar juntos.</em></h1><p>Mis padres, Valentina y Sergio, tienen el agrado de invitarte a celebrar nuestra llegada.</p></div>
      <div className="celebration-grid">
        <div className="date-keepsake"><img className="keepsake-bow" src={sitePath('/invitation/651c0f454a3392f41f01879a42d0c0ef.png')} alt=""/><span>SÁBADO</span><strong>12</strong><span className="keepsake-month">diciembre</span><small>2026 · 14:30 hrs</small><img className="keepsake-cloud" src={sitePath('/invitation/2efd6e8414bb5df7912539d7ebc54a11.png')} alt=""/></div>
        <div className="venue-details"><span className="eyebrow">NOS ENCONTRAMOS EN</span><img className="venue-elephant" src={sitePath('/invitation/76ad68cc8518e861bebf779638043368.png')} alt="Elefantito con un corazón celeste"/><h2>Sede Callejón<br/>Los Cofres</h2><p>La Punta, Mostazal</p><p className="venue-description">Una tarde para compartir, sonreír y llenar de amor la espera de nuestros pequeños.</p><a className="primary" href="https://maps.app.goo.gl/fqgTfjXQ5Eos5D1HA" target="_blank" rel="noopener noreferrer">Ver ubicación en el mapa ↗</a></div>
      </div>
      <div className="celebration-bottom"><div className="web-countdown"><span className="eyebrow">CADA VEZ FALTA MENOS</span><Countdown/><p>para celebrar juntos</p></div><div className="next-page-note"><span>¿Nos acompañas?</span><p>Nos encantará saber que estarás con nosotros.</p><a className="text-link" href={sitePath('/asistencia/')}>Confirmar mi asistencia →</a></div></div>
    </section>
  </SiteFrame>;
}
