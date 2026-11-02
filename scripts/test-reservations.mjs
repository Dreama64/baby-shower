// Run only against a dedicated NEW test project with the migration applied.
// Creates one gift, races two anonymous requests, verifies privacy, then cleans up.
import assert from 'node:assert/strict';
import {createClient} from '@supabase/supabase-js';
const {NEXT_PUBLIC_SUPABASE_URL:url,NEXT_PUBLIC_SUPABASE_ANON_KEY:key,TEST_ADMIN_EMAIL:email,TEST_ADMIN_PASSWORD:password}=process.env;
assert(url&&key&&email&&password,'Set public Supabase configuration and TEST_ADMIN_EMAIL / TEST_ADMIN_PASSWORD in .env.local. Use a dedicated test project.');
const options={auth:{persistSession:false,autoRefreshToken:false}};
const admin=createClient(url,key,options),anon=createClient(url,key,options);
assert.equal((await admin.auth.signInWithPassword({email,password})).error,null);
assert.equal((await admin.rpc('is_admin')).data,true);
const {data:gift,error}=await admin.from('gifts').insert({name:'TEST concurrent reservation',image_url:'/gifts/body.svg'}).select().single();assert.equal(error,null);
let reservationId;
try{
 const make=guest=>({p_gift_id:gift.id,p_guest_name:guest,p_request_id:crypto.randomUUID()});
 const a=make('Test Guest One'),b=make('Test Guest Two');
 const results=await Promise.all([anon.rpc('reserve_gift',a),anon.rpc('reserve_gift',b)]);
 assert.equal(results.filter(r=>!r.error).length,1,'Exactly one concurrent request must succeed');
 assert.equal(results.find(r=>r.error)?.error.code,'23505');
 const winner=results[0].error?b:a;
 assert.equal((await anon.rpc('reserve_gift',winner)).error,null,'Retry must be idempotent');
 const rows=await admin.from('reservations').select('*').eq('gift_id',gift.id);assert.equal(rows.data.length,1);reservationId=rows.data[0].id;
 const privateRows=await anon.from('reservations').select('*');assert(privateRows.error||privateRows.data.length===0,'Guest names must stay private');
 const catalog=await anon.from('gift_catalog').select('*').eq('id',gift.id).single();assert.equal(catalog.data.reserved,true);assert.equal(catalog.data.guest_name,undefined);
 const direct=await anon.from('reservations').insert({gift_id:gift.id,guest_name:'Bypass',request_id:crypto.randomUUID()});assert(direct.error,'Direct anonymous inserts must be denied');
 console.log('PASS: atomic duplicate prevention, idempotency, persisted state, guest privacy, direct-write protection.');
}finally{
 await admin.from('reservations').delete().eq('gift_id',gift.id);
 // No gift delete grant by design: archive the test gift.
 await admin.from('gifts').update({active:false}).eq('id',gift.id);
 await admin.auth.signOut();
}
