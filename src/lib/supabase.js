import { createClient } from '@supabase/supabase-js';

const getEnv = (key) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch {}
  return null;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL') || 'https://tbhmyekzchkjgqvrzwjy.supabase.co';
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY') || 'sb_publishable_CtIzc4W5NfWpVFlXVbWsIQ_ebhIVNhz';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[VISION X] Supabase credentials not found — falling back to localStorage.'
  );
}

// Singleton Supabase client — exported for use by all service modules
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseEnabled = () => !!supabase;
