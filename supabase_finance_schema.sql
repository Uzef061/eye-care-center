-- ============================================================
-- VISION X — Financial Management Supabase Database Schema
-- Run this script in your Supabase Project SQL Editor
-- (https://tbhmyekzchkjgqvrzwjy.supabase.co -> SQL Editor)
-- ============================================================

-- 1. Create Sales Table
CREATE TABLE IF NOT EXISTS public.sales (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  customer_name TEXT,
  item_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  cost_price NUMERIC DEFAULT 0.00,
  selling_price NUMERIC DEFAULT 0.00,
  discount NUMERIC DEFAULT 0.00,
  final_amount NUMERIC DEFAULT 0.00,
  payment_method TEXT DEFAULT 'Cash',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant full permissions to anon & authenticated roles
GRANT ALL ON TABLE public.sales TO anon, authenticated, service_role;

-- Enable Row Level Security & Public Access Policy
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access on sales" ON public.sales;
CREATE POLICY "Allow all access on sales" ON public.sales
  FOR ALL USING (true) WITH CHECK (true);

-- 2. Create Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC DEFAULT 0.00,
  payment_method TEXT DEFAULT 'Cash',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant full permissions to anon & authenticated roles
GRANT ALL ON TABLE public.expenses TO anon, authenticated, service_role;

-- Enable Row Level Security & Public Access Policy
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all access on expenses" ON public.expenses;
CREATE POLICY "Allow all access on expenses" ON public.expenses
  FOR ALL USING (true) WITH CHECK (true);
