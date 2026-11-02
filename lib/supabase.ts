import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { sitePath } from './site-path';
let instance: SupabaseClient | null = null;
export function database() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  instance ??= createClient(url, key);
  return instance;
}
export type Gift = { id:string; name:string; description:string; image_url:string; active:boolean; sort_order:number; reserved:boolean };
export function safeImage(url:string) {
  if (/^https:\/\//i.test(url)) return url;
  return sitePath(/^\/gifts\/[a-z0-9-]+\.svg$/.test(url) ? url : '/gifts/body.svg');
}
