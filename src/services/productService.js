/**
 * VISION X — Product Service
 * Uses Supabase PostgreSQL as primary store with localStorage fallback.
 */
import { supabase } from '../lib/supabase.js';
import { INITIAL_PRODUCTS } from '../data/products.js';

const TABLE = 'products';
const LS_KEY = 'lumina_eye_care_products';

const toApp = (row) => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: parseFloat(row.price || 0),
  available: row.available,
  rating: parseFloat(row.rating || 5.0),
  reviews: parseInt(row.reviews || 0, 10),
  frameType: row.frame_type,
  description: row.description,
  image: row.image,
  lensOptions: row.lens_options || [],
  availableSizes: row.available_sizes || [],
  tags: row.tags || []
});

const toRow = (p) => ({
  id: p.id || 'eyewear-' + Date.now(),
  name: p.name,
  category: p.category || 'Prescription Glasses',
  price: parseFloat(p.price || 0),
  available: p.available !== undefined ? p.available : true,
  rating: parseFloat(p.rating || 5.0),
  reviews: parseInt(p.reviews || 1, 10),
  frame_type: p.frameType || 'Titanium',
  description: p.description || '',
  image: p.image || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
  lens_options: p.lensOptions || ['Single Vision', 'Blue Light Filter'],
  available_sizes: p.availableSizes || ['Medium'],
  tags: p.tags || ['New Arrival']
});

const lsGet = () => {
  try {
    const data = localStorage.getItem(LS_KEY);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const lsSet = (data) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
};

export const getProducts = async () => {
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).select('*');
    if (!error && data) {
      const prodList = data.map(toApp);
      if (prodList.length > 0) {
        lsSet(prodList);
        return prodList;
      }
    }
    if (error) console.error('[Supabase] getProducts error:', error.message);
  }
  return lsGet();
};

export const saveProduct = async (productData) => {
  const row = toRow(productData);
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).upsert(row).select();
    if (!error && data) return getProducts();
    if (error) console.error('[Supabase] saveProduct error:', error.message);
  }
  const current = lsGet();
  const existingIdx = current.findIndex(p => p.id === row.id);
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = toApp(row);
  } else {
    updated = [toApp(row), ...current];
  }
  lsSet(updated);
  return updated;
};

export const toggleProductAvailability = async (id) => {
  const currentProducts = await getProducts();
  const target = currentProducts.find(p => p.id === id);
  if (!target) return currentProducts;

  const newStatus = !target.available;

  if (supabase) {
    const { error } = await supabase.from(TABLE).update({ available: newStatus }).eq('id', id);
    if (!error) return getProducts();
    if (error) console.error('[Supabase] toggleProductAvailability error:', error.message);
  }

  const updated = lsGet().map(item => item.id === id ? { ...item, available: newStatus } : item);
  lsSet(updated);
  return updated;
};

export const deleteProduct = async (id) => {
  if (supabase) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (!error) return getProducts();
    if (error) console.error('[Supabase] deleteProduct error:', error.message);
  }
  const updated = lsGet().filter(item => item.id !== id);
  lsSet(updated);
  return updated;
};
