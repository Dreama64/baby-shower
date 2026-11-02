import GiftCatalog from '@/components/gift-catalog';
import { sitePath } from '@/lib/site-path';
export default function Gifts(){ return <main className="app-page"><div className="app-container"><a className="back-link" href={sitePath('/')}>← Volver a la invitación</a><GiftCatalog/></div></main>; }
