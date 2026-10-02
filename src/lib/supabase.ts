import { createClient } from '@supabase/supabase-js';

// Очищаем URL от пробелов, кавычек, слэшей и дублирующего пути /rest/v1
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const cleanUrl = rawUrl
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/\/+$/, '')
  .replace(/\/rest\/v1\/?$/i, '')
  .replace(/\/rest\/?$/i, '');

const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const cleanAnonKey = rawAnonKey.trim().replace(/^["']|["']$/g, '');

export const supabase = (cleanUrl && cleanAnonKey) 
  ? createClient(cleanUrl, cleanAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }) 
  : null;
