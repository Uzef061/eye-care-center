/**
 * VISION X — Database Service (Customers & Stock Inventory)
 * Uses Supabase PostgreSQL as primary database with localStorage fallback.
 */
import { supabase } from '../lib/supabase';
import { INITIAL_CUSTOMERS } from '../data/customers';
import { INITIAL_STOCKS } from '../data/stocks';

const CUSTOMERS_TABLE = 'customers';
const STOCKS_TABLE = 'stocks';

const CUSTOMERS_LS_KEY = "visionx_customers_db";
const STOCKS_LS_KEY = "visionx_stocks_db";

/* ── Customers Mappers ── */
const toCustomerApp = (row) => ({
  id: row.id,
  fullName: row.full_name,
  phone: row.phone,
  email: row.email,
  address: row.address,
  lastVisit: row.last_visit,
  totalPurchases: row.total_purchases,
  notes: row.notes,
  prescription: {
    sphOD: row.rx_sph_od || '',
    cylOD: row.rx_cyl_od || '',
    axisOD: row.rx_axis_od || '',
    sphOS: row.rx_sph_os || '',
    cylOS: row.rx_cyl_os || '',
    axisOS: row.rx_axis_os || '',
    pd: row.rx_pd || ''
  },
  createdAt: row.created_at
});

const toCustomerRow = (c) => ({
  id: c.id || "CUST-" + Math.floor(1000 + Math.random() * 9000),
  full_name: c.fullName,
  phone: c.phone || '',
  email: c.email || '',
  address: c.address || '',
  last_visit: c.lastVisit || new Date().toISOString().split('T')[0],
  total_purchases: c.totalPurchases || '$0.00',
  notes: c.notes || '',
  rx_sph_od: c.prescription?.sphOD || '',
  rx_cyl_od: c.prescription?.cylOD || '',
  rx_axis_od: c.prescription?.axisOD || '',
  rx_sph_os: c.prescription?.sphOS || '',
  rx_cyl_os: c.prescription?.cylOS || '',
  rx_axis_os: c.prescription?.axisOS || '',
  rx_pd: c.prescription?.pd || ''
});

/* ── Stocks Mappers ── */
const toStockApp = (row) => ({
  sku: row.sku,
  name: row.name,
  category: row.category,
  unitCost: parseFloat(row.unit_cost || 0),
  unitPrice: parseFloat(row.unit_price || 0),
  quantity: parseInt(row.quantity || 0, 10),
  reorderLevel: parseInt(row.reorder_level || 5, 10),
  supplier: row.supplier,
  status: row.status
});

const toStockRow = (s) => {
  let status = "In Stock";
  const qty = parseInt(s.quantity || 0, 10);
  const reorder = parseInt(s.reorderLevel || 5, 10);
  if (qty === 0) status = "Out of Stock";
  else if (qty <= reorder) status = "Low Stock";

  return {
    sku: s.sku || "STK-" + Math.floor(100 + Math.random() * 900),
    name: s.name,
    category: s.category || 'Prescription Frames',
    unit_cost: parseFloat(s.unitCost || 0),
    unit_price: parseFloat(s.unitPrice || 0),
    quantity: qty,
    reorder_level: reorder,
    supplier: s.supplier || 'VISION X Optical Supplies',
    status: s.status || status
  };
};

/* ── localStorage helpers ── */
const lsGetCust = () => {
  try {
    const data = localStorage.getItem(CUSTOMERS_LS_KEY);
    return data ? JSON.parse(data) : INITIAL_CUSTOMERS;
  } catch { return INITIAL_CUSTOMERS; }
};
const lsSetCust = (d) => { try { localStorage.setItem(CUSTOMERS_LS_KEY, JSON.stringify(d)); } catch {} };

const lsGetStock = () => {
  try {
    const data = localStorage.getItem(STOCKS_LS_KEY);
    return data ? JSON.parse(data) : INITIAL_STOCKS;
  } catch { return INITIAL_STOCKS; }
};
const lsSetStock = (d) => { try { localStorage.setItem(STOCKS_LS_KEY, JSON.stringify(d)); } catch {} };


/* ════════════════════════════════════════════
   CUSTOMERS DATABASE CONTROLLER
   ════════════════════════════════════════════ */

export const getCustomersDB = async () => {
  if (supabase) {
    const { data, error } = await supabase.from(CUSTOMERS_TABLE).select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map(toCustomerApp);
    }
    if (error) console.error('[Supabase] getCustomersDB error:', error.message);
  }
  return lsGetCust();
};

export const saveCustomerDB = async (customerData) => {
  const row = toCustomerRow(customerData);
  if (supabase) {
    const { error } = await supabase.from(CUSTOMERS_TABLE).upsert(row);
    if (!error) return getCustomersDB();
    if (error) console.error('[Supabase] saveCustomerDB error:', error.message);
  }
  const current = lsGetCust();
  const appObj = toCustomerApp(row);
  const existingIdx = current.findIndex(c => c.id === appObj.id);
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = appObj;
  } else {
    updated = [appObj, ...current];
  }
  lsSetCust(updated);
  return updated;
};

export const deleteCustomerDB = async (id) => {
  if (supabase) {
    const { error } = await supabase.from(CUSTOMERS_TABLE).delete().eq('id', id);
    if (!error) return getCustomersDB();
    if (error) console.error('[Supabase] deleteCustomerDB error:', error.message);
  }
  const updated = lsGetCust().filter(c => c.id !== id);
  lsSetCust(updated);
  return updated;
};


/* ════════════════════════════════════════════
   STOCK INVENTORY DATABASE CONTROLLER
   ════════════════════════════════════════════ */

export const getStocksDB = async () => {
  if (supabase) {
    const { data, error } = await supabase.from(STOCKS_TABLE).select('*');
    if (!error && data && data.length > 0) {
      return data.map(toStockApp);
    }
    if (error) console.error('[Supabase] getStocksDB error:', error.message);
  }
  return lsGetStock();
};

export const updateStockQuantityDB = async (sku, delta) => {
  const currentStocks = await getStocksDB();
  const target = currentStocks.find(s => s.sku === sku);
  if (!target) return currentStocks;

  const newQty = Math.max(0, target.quantity + delta);
  let newStatus = "In Stock";
  if (newQty === 0) newStatus = "Out of Stock";
  else if (newQty <= target.reorderLevel) newStatus = "Low Stock";

  if (supabase) {
    const { error } = await supabase.from(STOCKS_TABLE).update({
      quantity: newQty,
      status: newStatus
    }).eq('sku', sku);
    if (!error) return getStocksDB();
    if (error) console.error('[Supabase] updateStockQuantityDB error:', error.message);
  }

  const updated = lsGetStock().map(item => item.sku === sku ? { ...item, quantity: newQty, status: newStatus } : item);
  lsSetStock(updated);
  return updated;
};

export const saveStockDB = async (stockData) => {
  const row = toStockRow(stockData);
  if (supabase) {
    const { error } = await supabase.from(STOCKS_TABLE).upsert(row);
    if (!error) return getStocksDB();
    if (error) console.error('[Supabase] saveStockDB error:', error.message);
  }

  const appObj = toStockApp(row);
  const current = lsGetStock();
  const existingIdx = current.findIndex(s => s.sku === appObj.sku);
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = appObj;
  } else {
    updated = [appObj, ...current];
  }
  lsSetStock(updated);
  return updated;
};

export const deleteStockDB = async (sku) => {
  if (supabase) {
    const { error } = await supabase.from(STOCKS_TABLE).delete().eq('sku', sku);
    if (!error) return getStocksDB();
    if (error) console.error('[Supabase] deleteStockDB error:', error.message);
  }
  const updated = lsGetStock().filter(s => s.sku !== sku);
  lsSetStock(updated);
  return updated;
};
