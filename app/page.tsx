import Countdown from '@/components/countdown';
import GiftCatalog from '@/components/gift-catalog';
import { sitePath } from '@/lib/site-path';

const art = sitePath('/invitation/');

export default function Home() {
  return <div className="baby-site">
    <header className="site-nav">
      <a className="brand" href="#inicio"><img src={art+'651c0f454a3392f41f01879a42d0c0ef.png'} alt=""/>Nuestro baby shower</a>
      <nav aria-label="Navegación principal"><a href="#celebracion">La celebración</a><a href="#regalos">Regalitos</a><a className="nav-rsvp" href="#asistencia">Confirmar asistencia</a></nav>
    </header>
    <main>
      <section className="web-hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">DOS PEQUEÑOS · UN AMOR INFINITO</span>
          <h1>Un poquito de cielo<br/>está por llegar.</h1>
          <p className="hero-intro">Nuestro baby shower</p>
          <p>Hay corazones que llegan para transformarlo todo. Acompáñanos a celebrar la llegada de nuestros dos bebés.</p>
          <div className="hero-actions"><a className="primary" href="#regalos">Elegir un regalito ↗</a><a className="text-link" href="#celebracion">Conoce los detalles ↓</a></div>
          <div className="hero-date"><span>12</span><div>SÁBADO · DICIEMBRE 2026<small>14:30 hrs · La Punta, Mostazal</small></div></div>
        </div>
        <div className="hero-art" aria-label="Dos elefantitos de acuarela bajo un lazo celeste">
          <img className="hero-frame" src={art+'frame.svg'} alt=""/>
          <img className="hero-bow" src={art+'651c0f454a3392f41f01879a42d0c0ef.png'} alt=""/>
          <div className="hero-names">Con mucho amor,<strong>Valentina<br/><i>&</i> Sergio</strong></div>
          <img className="hero-elephant first" src={art+'3ad155e06e15bed641ff39c144b6bb8b.png'} alt=""/>
          <img className="hero-elephant second" src={art+'3ad155e06e15bed641ff39c144b6bb8b.png'} alt=""/>
          <img className="hero-cloud" src={art+'2efd6e8414bb5df7912539d7ebc54a11.png'} alt=""/>
          <span className="hero-star" aria-hidden="true">✦</span>
        </div>
      </section>
      <section className="love-note"><span aria-hidden="true">✧</span><p>“Nuestros corazones ya laten por dos bebés que aún no conocemos,<br/>pero que ya amamos con toda el alma.”</p></section>
      <section className="event-section section-wrap" id="celebracion">
        <div className="section-heading"><span className="eyebrow">GUARDA ESTA FECHA</span><h2>Un día para recordar</h2><p>Tenemos el agrado de invitarte a una fecha muy especial.</p></div>
        <div className="event-layout"><div className="event-details"><div className="detail-card"><span className="detail-icon">12</span><div><h3>Sábado 12 de diciembre</h3><p>2026 · Desde las 14:30 hrs</p></div></div><div className="detail-card"><img src={art+'pin.svg'} alt=""/><div><h3>Sede Callejón Los Cofres</h3><p>La Punta, Mostazal</p><a href="https://maps.app.goo.gl/fqgTfjXQ5Eos5D1HA" target="_blank" rel="noopener noreferrer" className="text-link">Cómo llegar ↗</a></div></div></div><div className="web-countdown"><span className="eyebrow">CADA VEZ FALTA MENOS</span><Countdown/><p>para celebrar juntos</p></div></div>
      </section>
      <section className="integrated-gifts" id="regalos"><div className="section-wrap"><GiftCatalog/></div></section>
      <section className="attendance section-wrap" id="asistencia"><img src={art+'366a36349d519b2ff81f93fa8accd8a2.png'} alt="Elefantito con globos celestes"/><div><span className="eyebrow">TU PRESENCIA ES LO MÁS IMPORTANTE</span><h2>¡Te esperamos!</h2><p>Nos hará muy felices compartir este día contigo.<br/>Confirma tu asistencia con mamá o papá.</p><div className="hero-actions"><a className="primary" href="https://wa.me/56941369931?text=Hola%2C%20quiero%20confirmar%20mi%20asistencia%20al%20baby%20shower" target="_blank" rel="noopener noreferrer">Escribir a mamá ↗</a><a className="secondary" href="https://wa.me/56961977317?text=Hola%2C%20quiero%20confirmar%20mi%20asistencia%20al%20baby%20shower" target="_blank" rel="noopener noreferrer">Escribir a papá ↗</a></div></div></section>
    </main>
    <footer className="site-footer"><span>Con cariño, Valentina y Sergio ♡</span><a href={sitePath('/admin/')}>Acceso anfitriones</a></footer>
  </div>;
}
