'use client';
import { useEffect, useState } from 'react';
export default function Countdown() {
  const [remaining,setRemaining] = useState<number | null>(null);
  useEffect(()=>{ const tick=()=>setRemaining(Math.max(0,Date.parse('2026-12-12T14:30:00-03:00')-Date.now())); tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id); },[]);
  const seconds=Math.floor((remaining??0)/1000);
  const values=[Math.floor(seconds/86400), Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];
  return <div className="countdown" aria-label="Cuenta regresiva al 12 de diciembre de 2026 a las 14:30"><strong>BABY SHOWER</strong><div className="count-values">{values.map((v,i)=><div key={i}><span>{remaining===null?'—':String(v).padStart(2,'0')}</span><small>{['DAYS','HOURS','MINUTES','SECONDS'][i]}</small></div>)}</div></div>;
}
