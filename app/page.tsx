import SiteFrame from '@/components/site-frame';
import { sitePath } from '@/lib/site-path';
const art = sitePath('/invitation/');
export default function Home() { return <SiteFrame active="inicio"><section className="web-hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow">DOS PEQUEÑOS · UN AMOR INFINITO</span>
          <h1>Un poquito de cielo<br/>está por llegar.</h1>
          <p className="hero-intro">Nuestro baby shower</p>
          <p>Hay corazones que llegan para transformarlo todo. Acompáñanos a celebrar la llegada de nuestros dos bebés.</p>
          <div className="hero-actions"><a className="primary" href={sitePath('/regalos/')}>Elegir un regalito ↗</a><a className="text-link" href={sitePath('/celebracion/')}>Conoce la celebración →</a></div>
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
      </section><section className="love-note"><span aria-hidden="true">✧</span><p>“Nuestros corazones ya laten por dos bebés que aún no conocemos,<br/>pero que ya amamos con toda el alma.”</p></section></SiteFrame>; }
