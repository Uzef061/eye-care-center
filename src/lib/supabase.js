import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[VISION X] Supabase credentials not found in .env — ' +
    'falling back to localStorage. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable cloud database.'
  );
}

// Singleton Supabase client — exported for use by all service modules
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseEnabled = () => !!supabase;
