'use client';
import { useCallback, useEffect, useState } from 'react';
import { database, type Gift } from '@/lib/supabase';
import { sitePath } from '@/lib/site-path';
import GiftPhotoPicker from '@/components/gift-photo-picker';
import { prepareGiftPhoto } from '@/lib/gift-photo';
type Reservation={id:string;gift_id:string;guest_name:string;created_at:string};
const empty={name:'',description:'',image_url:'/gifts/body.svg',sort_order:0,active:true};
export default function Admin(){
 const [ready,setReady]=useState(false),[admin,setAdmin]=useState(false),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false),[gifts,setGifts]=useState<Gift[]>([]),[reservations,setReservations]=useState<Reservation[]>([]),[editing,setEditing]=useState<string|null>(null),[form,setForm]=useState(empty);
 const [photo,setPhoto]=useState<File|null>(null);
 const load=useCallback(async()=>{const db=database();if(!db)return;const [g,r]=await Promise.all([db.from('gifts').select('*').order('sort_order'),db.from('reservations').select('id,gift_id,guest_name,created_at').order('created_at',{ascending:false})]);if(g.error||r.error){setMessage('No se pudieron cargar los datos.');return;}setGifts(g.data??[]);setReservations(r.data??[]);},[]);
 const check=useCallback(async()=>{const db=database();if(!db){setReady(true);return;}const {data:{user}}=await db.auth.getUser();if(user){const {data,error}=await db.rpc('is_admin');setAdmin(data===true&&!error);if(data===true&&!error)await load();else setMessage('Esta cuenta no tiene permisos de administración.');}else setAdmin(false);setReady(true);},[load]);
 useEffect(()=>{void check();const db=database();const sub=db?.auth.onAuthStateChange(()=>{setTimeout(()=>void check(),0);});return()=>sub?.data.subscription.unsubscribe();},[check]);
 async function login(e:React.FormEvent){e.preventDefault();setBusy(true);setMessage('');const db=database();if(!db){setMessage('Supabase todavía no está configurado.');setBusy(false);return;}const {error}=await db.auth.signInWithPassword({email,password});setPassword('');if(error)setMessage('No se pudo iniciar sesión. Revisa tus datos.');else await check();setBusy(false);}
 async function save(e:React.FormEvent){
  e.preventDefault();const db=database();if(!db||busy)return;
  setBusy(true);setMessage('');let uploadedPath:string|null=null;
  try{
   let imageUrl=form.image_url;
   if(photo){
    setMessage('Preparando y subiendo foto…');
    const blob=await prepareGiftPhoto(photo);
    const {data:{user},error:authError}=await db.auth.getUser();
    if(authError||!user)throw new Error('Tu sesión terminó. Vuelve a iniciar sesión.');
    const path=`${user.id}/${crypto.randomUUID()}.webp`;
    const {error}=await db.storage.from('baby-shower-gifts').upload(path,blob,{contentType:'image/webp',cacheControl:'31536000',upsert:false});
    if(error)throw new Error('No se pudo subir la foto. Revisa tu conexión e inténtalo nuevamente.');
    uploadedPath=path;
    imageUrl=db.storage.from('baby-shower-gifts').getPublicUrl(path).data.publicUrl;
   }
   const payload={...form,image_url:imageUrl,name:form.name.trim(),description:form.description.trim()};
   const result=editing?await db.from('gifts').update(payload).eq('id',editing):await db.from('gifts').insert(payload);
   if(result.error)throw new Error('No se pudo guardar el regalo. Revisa los campos y tus permisos.');
   uploadedPath=null;setMessage('Regalo guardado.');setForm(empty);setPhoto(null);setEditing(null);await load();
  }catch(error){
   if(uploadedPath)await db.storage.from('baby-shower-gifts').remove([uploadedPath]);
   setMessage(error instanceof Error?error.message:'No pudimos guardar el regalo. Intenta nuevamente.');
  }finally{setBusy(false);}
 }
 async function release(r:Reservation){if(!window.confirm(`¿Liberar el regalo reservado por ${r.guest_name}? Volverá a estar disponible.`))return;const db=database();if(!db)return;setBusy(true);const {error}=await db.from('reservations').delete().eq('id',r.id);setMessage(error?'No se pudo liberar la reserva.':'Reserva liberada.');await load();setBusy(false);}
 if(!ready)return <main className="app-page"><p role="status">Comprobando sesión…</p></main>;
 return <main className="app-page"><div className="app-container"><a href={sitePath('/')} className="back-link">← Volver a la invitación</a>{!admin?<section className="admin-login"><h1 style={{font:'32px Georgia'}}>Administración privada</h1><p>Acceso exclusivo para los anfitriones.</p><form onSubmit={login}><label className="field">Correo electrónico<input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="field">Contraseña<input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary" disabled={busy}>{busy?'Ingresando…':'Iniciar sesión'}</button></form>{message&&<p role="alert">{message}</p>}</section>:<><div className="admin-toolbar"><h1 style={{font:'32px Georgia'}}>Regalos y reservas</h1><button className="secondary" onClick={async()=>{await database()?.auth.signOut();setAdmin(false);setGifts([]);setReservations([]);setPhoto(null);setForm(empty);setEditing(null);}}>Cerrar sesión</button></div>{message&&<p role="status" className="notice">{message}</p>}
 <section className="admin-section"><h2>{editing?'Editar regalo':'Añadir regalo'}</h2><form className="admin-form" onSubmit={save}><fieldset disabled={busy} className="gift-edit-fields"><label className="field">Nombre<input required maxLength={120} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label className="field">Descripción<textarea maxLength={1000} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label><GiftPhotoPicker file={photo} currentUrl={form.image_url} disabled={busy} onChange={setPhoto}/><details className="photo-url-option"><summary>Usar un enlace de imagen</summary><label className="field">Enlace de la imagen<input required disabled={!!photo||busy} pattern="(https://.+|/gifts/[a-z0-9-]+\.svg)" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})}/></label></details><label className="field">Orden<input type="number" min="0" max="10000" required value={form.sort_order} onChange={e=>setForm({...form,sort_order:Number(e.target.value)})}/></label><label className="checkbox"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})}/> Visible en el catálogo</label><div className="actions"><button className="primary" disabled={busy}>Guardar regalo</button>{editing&&<button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(empty);setPhoto(null);}}>Cancelar edición</button>}</div></fieldset></form></section>
 <section className="admin-section"><h2>Catálogo ({gifts.length})</h2>{gifts.map(g=><div className="admin-row" key={g.id}><div><strong>{g.name}</strong><small>{g.active?'Visible':'Oculto'} · {reservations.some(r=>r.gift_id===g.id)?'Reservado':'Disponible'}</small></div><button className="secondary" onClick={()=>{setPhoto(null);setEditing(g.id);setForm({name:g.name,description:g.description,image_url:g.image_url,sort_order:g.sort_order,active:g.active});window.scrollTo({top:0,behavior:'smooth'});}}>Editar</button></div>)}</section>
 <section className="admin-section"><div className="admin-toolbar"><h2>Reservas ({reservations.length})</h2><button className="secondary" onClick={()=>void load()}>Actualizar</button></div>{!reservations.length&&<p>Aún no hay reservas.</p>}{reservations.map(r=><div className="admin-row" key={r.id}><div><strong>{gifts.find(g=>g.id===r.gift_id)?.name??'Regalo'}</strong><div>{r.guest_name}</div><small>{new Date(r.created_at).toLocaleString('es-CL',{timeZone:'America/Santiago'})}</small></div><button className="secondary" disabled={busy} onClick={()=>void release(r)}>Liberar</button></div>)}</section></>}</div></main>;
}
