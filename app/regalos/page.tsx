import type { Metadata } from 'next';
import GiftCatalog from '@/components/gift-catalog';
import SiteFrame from '@/components/site-frame';
export const metadata: Metadata = { title: 'Regalitos · Nuestro Baby Shower' };
export default function Gifts() {
  return <SiteFrame active="regalos"><section className="gifts-page integrated-gifts"><div className="section-wrap"><GiftCatalog/></div></section></SiteFrame>;
}