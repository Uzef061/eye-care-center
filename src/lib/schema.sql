-- =============================================================
-- VISION X Eye Care Center — Complete Supabase SQL Migration
-- Paste this entire script into: Supabase Dashboard → SQL Editor → Run
-- =============================================================

-- ==================== 1. APPOINTMENTS TABLE ====================
create table if not exists public.appointments (
  id            text primary key,
  full_name     text not null,
  phone         text,
  email         text,
  date          text,
  time          text,
  service       text,
  notes         text,
  status        text default 'Pending',
  created_at    timestamptz default now()
);

-- ==================== 2. CUSTOMERS TABLE ====================
create table if not exists public.customers (
  id              text primary key,
  full_name       text not null,
  phone           text,
  email           text,
  address         text,
  last_visit      text,
  total_purchases text default '$0.00',
  notes           text,
  rx_sph_od       text,
  rx_cyl_od       text,
  rx_axis_od      text,
  rx_sph_os       text,
  rx_cyl_os       text,
  rx_axis_os      text,
  rx_pd           text,
  created_at      timestamptz default now()
);

-- ==================== 3. STOCKS INVENTORY TABLE ====================
create table if not exists public.stocks (
  sku            text primary key,
  name           text not null,
  category       text,
  unit_cost      numeric(10,2) default 0,
  unit_price     numeric(10,2) default 0,
  quantity       integer default 0,
  reorder_level  integer default 5,
  supplier       text,
  status         text default 'In Stock',
  updated_at     timestamptz default now()
);

-- ==================== 4. PRODUCTS CATALOG TABLE ====================
create table if not exists public.products (
  id               text primary key,
  name             text not null,
  category         text,
  price            numeric(10,2) default 0,
  available        boolean default true,
  rating           numeric(3,1) default 5.0,
  reviews          integer default 0,
  frame_type       text,
  description      text,
  image            text,
  lens_options     text[],
  available_sizes  text[],
  tags             text[]
);

-- =============================================================
-- ROLE GRANTS (MANDATORY FOR SUPABASE ANON API ACCESS)
-- =============================================================
grant usage on schema public to anon, authenticated, service_role;

grant all on public.appointments to anon, authenticated, service_role;
grant all on public.customers to anon, authenticated, service_role;
grant all on public.stocks to anon, authenticated, service_role;
grant all on public.products to anon, authenticated, service_role;

-- =============================================================
-- ROW LEVEL SECURITY & PUBLIC POLICIES
-- =============================================================
alter table public.appointments enable row level security;
alter table public.customers    enable row level security;
alter table public.stocks       enable row level security;
alter table public.products     enable row level security;

-- Drop old policies if re-running
drop policy if exists "allow_all_appointments" on public.appointments;
drop policy if exists "allow_all_customers" on public.customers;
drop policy if exists "allow_all_stocks" on public.stocks;
drop policy if exists "allow_all_products" on public.products;

-- Create open access policies for app functionality
create policy "allow_all_appointments" on public.appointments for all using (true) with check (true);
create policy "allow_all_customers"    on public.customers    for all using (true) with check (true);
create policy "allow_all_stocks"       on public.stocks       for all using (true) with check (true);
create policy "allow_all_products"     on public.products     for all using (true) with check (true);

-- =============================================================
-- SEED DATA — Appointments
-- =============================================================
insert into public.appointments (id, full_name, phone, email, date, time, service, notes, status)
values
  ('VX-94821', 'Eleanor Vance',   '+1 (555) 234-5678', 'eleanor.vance@example.com', '2026-08-16', '10:30 AM', 'Comprehensive Eye Check-Up', 'Requires updated prescription for progressive lenses.', 'Confirmed'),
  ('VX-94822', 'Marcus Sterling', '+1 (555) 876-5432', 'm.sterling@example.com',    '2026-08-17', '02:15 PM', 'Power Glasses',              'High cylinder astigmatism check.',                     'Pending'),
  ('VX-94823', 'Sophia Chen',     '+1 (555) 345-6789', 'sophia.chen@example.com',   '2026-08-18', '11:00 AM', 'Frame Fitting',              'New titanium frame bridge adjustment.',                 'Confirmed')
on conflict (id) do nothing;

-- =============================================================
-- SEED DATA — Customers
-- =============================================================
insert into public.customers (id, full_name, phone, email, address, last_visit, total_purchases, notes, rx_sph_od, rx_cyl_od, rx_axis_od, rx_sph_os, rx_cyl_os, rx_axis_os, rx_pd)
values
  ('CUST-1001', 'Eleanor Vance',   '+1 (555) 234-5678', 'eleanor.vance@example.com', '742 Evergreen Terrace, Cityville', '2026-07-20', '$485.00', 'Prefers ultra-lightweight titanium frames.', '-2.50', '-0.75', '90 deg', '-2.25', '-0.50', '85 deg', '63mm'),
  ('CUST-1002', 'Marcus Sterling', '+1 (555) 876-5432', 'm.sterling@example.com',    '108 Ocean Drive, Bay City',        '2026-08-01', '$210.00', 'High cylinder astigmatism. Blue-light filter added.', '+1.75', '-1.25', '180 deg', '+1.50', '-1.00', '175 deg', '66mm'),
  ('CUST-1003', 'Sophia Chen',     '+1 (555) 345-6789', 'sophia.chen@example.com',   '42 Wall Street, Suite 900',        '2026-08-10', '$340.00', 'Purchased high-index 1.67 progressive power glasses.', '-4.00', '0.00', '-', '-3.75', '-0.25', '45 deg', '61mm')
on conflict (id) do nothing;

-- =============================================================
-- SEED DATA — Stocks
-- =============================================================
insert into public.stocks (sku, name, category, unit_cost, unit_price, quantity, reorder_level, supplier, status)
values
  ('STK-FRM-101', 'VISION X Apex Titanium Frame',            'Prescription Frames', 65.00,  185.00, 18, 5,  'Lumina Craft Optics Ltd.',   'In Stock'),
  ('STK-LNS-202', 'HD High Index 1.67 Aspheric Lens Blank', 'Optical Lens Stock',  45.00,  210.00, 4,  10, 'Precision Wavefront Optics', 'Low Stock'),
  ('STK-SUN-303', 'Solar Shield Polarized Aviator',          'Sunglasses',          50.00,  165.00, 22, 8,  'Solaris UV Eyewear',         'In Stock'),
  ('STK-BLU-404', 'OptiBlue 450nm Digital Shield Glasses',  'Computer Glasses',    35.00,  120.00, 3,  6,  'Digital Care Corp',          'Low Stock'),
  ('STK-CNT-505', 'AcuMoist Daily Contact Lenses (30 Box)', 'Contact Lenses',      18.00,  48.00,  45, 15, 'Hydrogel Care Inc.',         'In Stock'),
  ('STK-ACC-606', 'Ultrasonic Lens Cleaning Microfiber Kit', 'Accessories',         4.50,   15.00,  2,  10, 'OptiClean Supplies',         'Reorder Required')
on conflict (sku) do nothing;

-- =============================================================
-- SEED DATA — Products
-- =============================================================
insert into public.products (id, name, category, price, available, rating, reviews, frame_type, description, image, lens_options, available_sizes, tags)
values
  ('eyewear-101', 'Lumina Apex Titanium Frame',           'Prescription Glasses', 185.00, true,  4.9, 28, 'Full Rim Titanium',
   'Ultra-lightweight aerospace-grade titanium frame with ergonomic flex-hinges.',
   'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
   ARRAY['Single Vision','Progressive','Blue Light Shield'], ARRAY['Medium (51-18-140)','Large (54-19-145)'], ARRAY['Best Seller','Titanium','Prescription']),
  ('eyewear-102', 'Precision HD Power Clarity Lenses',   'Power Glasses', 210.00, true, 4.8, 42, 'Handcrafted Acetate',
   'Designed for strong cylinder/spherical prescriptions. Aspheric geometry reduces edge magnification.',
   'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800',
   ARRAY['Single Vision High Index 1.67','Anti-Reflective Hydrophobic Coating'], ARRAY['Narrow (49-17-138)','Medium (52-18-140)'], ARRAY['High Power','Custom Lens']),
  ('eyewear-103', 'Solar Shield Polarized Aviator',       'Sunglasses', 165.00, true, 4.9, 35, 'Monel Metal Frame',
   '100% UVA/UVB blockage with glare elimination technology, perfect for driving.',
   'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
   ARRAY['Category 3 UV400 Polarized','Prescription Sun Tint Option'], ARRAY['Standard (58-14-140)'], ARRAY['UV400','Polarized','Sunglasses']),
  ('eyewear-104', 'OptiBlue Digital Strain Shield',       'Computer Glasses', 120.00, true, 4.7, 53, 'TR90 Flexible Polymer',
   'Filters harmful high-energy blue-violet light from screens to reduce eye fatigue.',
   'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
   ARRAY['Non-Prescription 450nm Blue Light Filter','Anti-Glare Coating'], ARRAY['Universal Fit (50-18-142)'], ARRAY['Blue Light','Digital Care']),
  ('eyewear-105', 'Classic Executive Progressive Reader', 'Reading Glasses', 95.00, true, 4.6, 19, 'Full Rim Acetate',
   'Crystal-clear near-vision reading optics with scratch-resistant hard coat.',
   'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800',
   ARRAY['+1.00','+1.50','+2.00','+2.50','+3.00'], ARRAY['Medium (50-19-140)'], ARRAY['Reading','Presbyopia Care']),
  ('eyewear-106', 'Junior Flex Impact-Resistant Frame',  'Kids Frames', 89.00, true, 4.9, 21, 'BPA-Free Flexible Silicone and TR90',
   'Built for active children. Non-toxic, bendable hinge-free design.',
   'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
   ARRAY['Polycarbonate Shatterproof Lenses','UV Protect'], ARRAY['Small (44-15-125)','Medium (46-16-130)'], ARRAY['Kids','Shatterproof']),
  ('eyewear-107', 'AcuMoist Daily Hydration Contact Lenses', 'Contact Lenses', 48.00, true, 4.8, 64, 'Soft Hydrogel Contact Lens',
   'High oxygen permeability daily disposable lenses for 16 hours of moisture comfort.',
   'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
   ARRAY['Daily Disposable','Spherical OD/OS Custom Power'], ARRAY['Base Curve 8.5mm / 8.7mm'], ARRAY['Contact Lenses','Daily Moisture']),
  ('eyewear-108', 'Velvet Matte Wayfarer Power Frame',   'Power Glasses', 175.00, false, 4.7, 14, 'Matte Black Acetate',
   'Bold styling with precision optical alignment for custom prescription requirements.',
   'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=800',
   ARRAY['Single Vision','Bifocal D-Seg'], ARRAY['Large (54-20-145)'], ARRAY['Wayfarer','Out of Stock'])
on conflict (id) do nothing;
