import { createClient } from '@supabase/supabase-js';

// Очищаем URL от пробелов, кавычек и случайных слэшей на конце
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, '').replace(/\/+$/, '');

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
