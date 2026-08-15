/**
 * VISION X — Financial Management & Accounting Service
 * Manages Sales, Operating Expenses, Profit & Loss Statements, and Reports.
 * Connects directly to Supabase Cloud Database (`sales` & `expenses` tables).
 * Uses exact primary key targeting (`id`) for safe single-record operations.
 * 
 * 🔒 RESTRICTED TO MANAGER PORTAL ONLY.
 */

import { supabase } from '../lib/supabase.js';

const SALES_TABLE = 'sales';
const EXPENSES_TABLE = 'expenses';

const SALES_LS_KEY = 'visionx_sales_db_v3';
const EXPENSES_LS_KEY = 'visionx_expenses_db_v3';

// ── Default Initial Financial Data ──
const INITIAL_SALES = [
  {
    id: 'INV-2026-901',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    customerName: 'Marcus Sterling',
    itemName: 'Titanium Blue-Light Glasses',
    quantity: 1,
    costPrice: 45.00,
    sellingPrice: 120.00,
    discount: 10.00,
    finalAmount: 110.00,
    paymentMethod: 'Cash',
    notes: 'Prescription progressive lenses included',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'INV-2026-902',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    customerName: 'Sophia Chen',
    itemName: 'Comprehensive Eye Examination',
    quantity: 1,
    costPrice: 15.00,
    sellingPrice: 50.00,
    discount: 0.00,
    finalAmount: 50.00,
    paymentMethod: 'FonePay / QR',
    notes: 'Glaucoma screening & digital refractometry',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

const INITIAL_EXPENSES = [
  {
    id: 'EXP-2026-801',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0],
    category: 'Rent',
    description: 'Clinic Premises Rent (Nepalgunj-3)',
    amount: 250.00,
    paymentMethod: 'Bank Transfer',
    notes: 'Monthly property lease payment',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'EXP-2026-802',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    category: 'Electricity',
    description: 'Clinic Utility & Power Supply',
    amount: 45.00,
    paymentMethod: 'FonePay / QR',
    notes: 'Air conditioning & diagnostic machinery power',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

/* ── Mappers ── */
const toSaleApp = (row) => ({
  id: String(row.id),
  date: row.date || row.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  customerName: row.customer_name || 'Walk-in Patient',
  itemName: row.item_name || 'Eye Care Product',
  quantity: parseInt(row.quantity || 1, 10),
  costPrice: parseFloat(row.cost_price || 0),
  sellingPrice: parseFloat(row.selling_price || 0),
  discount: parseFloat(row.discount || 0),
  finalAmount: parseFloat(row.final_amount || 0),
  paymentMethod: row.payment_method || 'Cash',
  notes: row.notes || '',
  createdAt: row.created_at || new Date().toISOString()
});

const toSaleRow = (s) => {
  const qty = parseInt(s.quantity || 1, 10);
  const selling = parseFloat(s.sellingPrice || 0);
  const disc = parseFloat(s.discount || 0);
  const calculatedFinal = (selling * qty) - disc;

  return {
    id: String(s.id || 'INV-2026-' + Math.floor(1000 + Math.random() * 9000)),
    date: s.date || new Date().toISOString().split('T')[0],
    customer_name: s.customerName || 'Walk-in Patient',
    item_name: s.itemName || 'Optical Service / Product',
    quantity: qty,
    cost_price: parseFloat(s.costPrice || 0),
    selling_price: selling,
    discount: disc,
    final_amount: s.finalAmount !== undefined ? parseFloat(s.finalAmount) : calculatedFinal,
    payment_method: s.paymentMethod || 'Cash',
    notes: s.notes || ''
  };
};

const toExpenseApp = (row) => ({
  id: String(row.id),
  date: row.date || row.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
  category: row.category || 'Other',
  description: row.description || '',
  amount: parseFloat(row.amount || 0),
  paymentMethod: row.payment_method || 'Cash',
  notes: row.notes || '',
  createdAt: row.created_at || new Date().toISOString()
});

const toExpenseRow = (e) => ({
  id: String(e.id || 'EXP-2026-' + Math.floor(1000 + Math.random() * 9000)),
  date: e.date || new Date().toISOString().split('T')[0],
  category: e.category || 'Other',
  description: e.description || '',
  amount: parseFloat(e.amount || 0),
  payment_method: e.paymentMethod || 'Cash',
  notes: e.notes || ''
});

/* ── LocalStorage Cache Helpers ── */
const lsGetSales = () => {
  try {
    const data = localStorage.getItem(SALES_LS_KEY);
    return data ? JSON.parse(data) : INITIAL_SALES;
  } catch { return INITIAL_SALES; }
};
const lsSetSales = (d) => { try { localStorage.setItem(SALES_LS_KEY, JSON.stringify(d)); } catch {} };

const lsGetExpenses = () => {
  try {
    const data = localStorage.getItem(EXPENSES_LS_KEY);
    return data ? JSON.parse(data) : INITIAL_EXPENSES;
  } catch { return INITIAL_EXPENSES; }
};
const lsSetExpenses = (d) => { try { localStorage.setItem(EXPENSES_LS_KEY, JSON.stringify(d)); } catch {} };


/* ════════════════════════════════════════════
   1. SALES CONTROLLER
   ════════════════════════════════════════════ */

export const getSalesDB = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from(SALES_TABLE).select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const list = data.map(toSaleApp);
        lsSetSales(list);
        return list;
      }
      if (error) console.warn('[Supabase] getSalesDB warning:', error.message);
    } catch (e) {
      console.warn('[Supabase] getSalesDB exception:', e);
    }
  }
  return lsGetSales();
};

export const saveSaleDB = async (saleData) => {
  const row = toSaleRow(saleData);
  const appObj = toSaleApp(row);

  // 1. Immediately update local storage so UI state is guaranteed to display
  const current = lsGetSales();
  const existingIdx = current.findIndex(s => String(s.id) === String(appObj.id));
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = appObj;
  } else {
    updated = [appObj, ...current];
  }
  lsSetSales(updated);

  // 2. Persist to Supabase Cloud Database
  if (supabase) {
    try {
      const { data, error } = await supabase.from(SALES_TABLE).insert([row]).select();
      if (!error && data && data.length > 0) {
        const cloudList = await supabase.from(SALES_TABLE).select('*').order('created_at', { ascending: false });
        if (!cloudList.error && cloudList.data) {
          const mapped = cloudList.data.map(toSaleApp);
          lsSetSales(mapped);
          return { success: true, data: mapped };
        }
      }
      if (error) {
        console.warn('[Supabase] saveSaleDB note:', error.message);
        return { success: true, data: updated, warning: error.message };
      }
    } catch (e) {
      console.warn('[Supabase] saveSaleDB exception:', e);
    }
  }

  return { success: true, data: updated };
};

export const deleteSaleDB = async (id) => {
  if (!id) return { success: false, message: 'Invalid Sale ID.' };
  const targetId = String(id);

  if (supabase) {
    try {
      const { error } = await supabase.from(SALES_TABLE).delete().eq('id', targetId);
      if (!error) {
        const cloudList = await supabase.from(SALES_TABLE).select('*').order('created_at', { ascending: false });
        if (!cloudList.error && cloudList.data) {
          const mapped = cloudList.data.map(toSaleApp);
          lsSetSales(mapped);
          return { success: true, data: mapped };
        }
      }
      if (error) console.error('[Supabase] deleteSaleDB error:', error.message);
    } catch (e) {
      console.error('[Supabase] deleteSaleDB exception:', e);
    }
  }

  // Exact ID filtering
  const current = lsGetSales();
  const updated = current.filter(s => String(s.id) !== targetId);
  lsSetSales(updated);
  return { success: true, data: updated };
};


/* ════════════════════════════════════════════
   2. EXPENSES CONTROLLER
   ════════════════════════════════════════════ */

export const getExpensesDB = async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase.from(EXPENSES_TABLE).select('*').order('created_at', { ascending: false });
      if (!error && data) {
        const list = data.map(toExpenseApp);
        lsSetExpenses(list);
        return list;
      }
      if (error) console.warn('[Supabase] getExpensesDB warning:', error.message);
    } catch (e) {
      console.warn('[Supabase] getExpensesDB exception:', e);
    }
  }
  return lsGetExpenses();
};

export const saveExpenseDB = async (expenseData) => {
  const row = toExpenseRow(expenseData);
  const appObj = toExpenseApp(row);

  // 1. Immediately update local storage so UI state is guaranteed to display
  const current = lsGetExpenses();
  const existingIdx = current.findIndex(e => String(e.id) === String(appObj.id));
  let updated;
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = appObj;
  } else {
    updated = [appObj, ...current];
  }
  lsSetExpenses(updated);

  // 2. Persist to Supabase Cloud Database
  if (supabase) {
    try {
      const { data, error } = await supabase.from(EXPENSES_TABLE).insert([row]).select();
      if (!error && data && data.length > 0) {
        const cloudList = await supabase.from(EXPENSES_TABLE).select('*').order('created_at', { ascending: false });
        if (!cloudList.error && cloudList.data) {
          const mapped = cloudList.data.map(toExpenseApp);
          lsSetExpenses(mapped);
          return { success: true, data: mapped };
        }
      }
      if (error) {
        console.warn('[Supabase] saveExpenseDB note:', error.message);
        return { success: true, data: updated, warning: error.message };
      }
    } catch (e) {
      console.warn('[Supabase] saveExpenseDB exception:', e);
    }
  }

  return { success: true, data: updated };
};

export const deleteExpenseDB = async (id) => {
  if (!id) return { success: false, message: 'Invalid Expense ID.' };
  const targetId = String(id);

  if (supabase) {
    try {
      const { error } = await supabase.from(EXPENSES_TABLE).delete().eq('id', targetId);
      if (!error) {
        const cloudList = await supabase.from(EXPENSES_TABLE).select('*').order('created_at', { ascending: false });
        if (!cloudList.error && cloudList.data) {
          const mapped = cloudList.data.map(toExpenseApp);
          lsSetExpenses(mapped);
          return { success: true, data: mapped };
        }
      }
      if (error) console.error('[Supabase] deleteExpenseDB error:', error.message);
    } catch (e) {
      console.error('[Supabase] deleteExpenseDB exception:', e);
    }
  }

  // Exact ID filtering
  const current = lsGetExpenses();
  const updated = current.filter(e => String(e.id) !== targetId);
  lsSetExpenses(updated);
  return { success: true, data: updated };
};


/* ════════════════════════════════════════════
   3. PROFIT & LOSS AND FINANCIAL CALCULATIONS
   ════════════════════════════════════════════ */

export const calculateFinancialMetrics = (sales = [], expenses = [], filterPeriod = 'All', startDate = '', endDate = '') => {
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredSales = sales.filter(s => {
    if (!s.date) return true;
    if (filterPeriod === 'Today') return s.date === todayStr;
    if (filterPeriod === 'Weekly') {
      const saleTime = new Date(s.date).getTime();
      const weekAgo = Date.now() - (86400000 * 7);
      return saleTime >= weekAgo;
    }
    if (filterPeriod === 'Monthly') {
      const sDate = new Date(s.date);
      const now = new Date();
      return sDate.getMonth() === now.getMonth() && sDate.getFullYear() === now.getFullYear();
    }
    if (filterPeriod === 'Yearly') {
      return new Date(s.date).getFullYear() === new Date().getFullYear();
    }
    if (filterPeriod === 'Custom' && startDate && endDate) {
      return s.date >= startDate && s.date <= endDate;
    }
    return true;
  });

  const filteredExpenses = expenses.filter(e => {
    if (!e.date) return true;
    if (filterPeriod === 'Today') return e.date === todayStr;
    if (filterPeriod === 'Weekly') {
      const expTime = new Date(e.date).getTime();
      const weekAgo = Date.now() - (86400000 * 7);
      return expTime >= weekAgo;
    }
    if (filterPeriod === 'Monthly') {
      const eDate = new Date(e.date);
      const now = new Date();
      return eDate.getMonth() === now.getMonth() && eDate.getFullYear() === now.getFullYear();
    }
    if (filterPeriod === 'Yearly') {
      return new Date(e.date).getFullYear() === new Date().getFullYear();
    }
    if (filterPeriod === 'Custom' && startDate && endDate) {
      return e.date >= startDate && e.date <= endDate;
    }
    return true;
  });

  // Financial Computations
  const totalRevenue = filteredSales.reduce((sum, s) => sum + (s.finalAmount || 0), 0);
  const totalCOGS = filteredSales.reduce((sum, s) => sum + ((s.costPrice || 0) * (s.quantity || 1)), 0);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalItemsSold = filteredSales.reduce((sum, s) => sum + (s.quantity || 1), 0);
  const transactionCount = filteredSales.length;

  const grossProfit = totalRevenue - totalCOGS;
  const netProfit = grossProfit - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  const averageSaleValue = transactionCount > 0 ? totalRevenue / transactionCount : 0;

  // Best Selling Items Breakdown
  const itemMap = {};
  filteredSales.forEach(s => {
    const key = s.itemName || 'Optical Item';
    if (!itemMap[key]) itemMap[key] = { qty: 0, revenue: 0 };
    itemMap[key].qty += s.quantity || 1;
    itemMap[key].revenue += s.finalAmount || 0;
  });

  const bestSellingProducts = Object.entries(itemMap)
    .map(([name, stat]) => ({ name, ...stat }))
    .sort((a, b) => b.revenue - a.revenue);

  // Expense Category Breakdown
  const categoryMap = {};
  filteredExpenses.forEach(e => {
    const cat = e.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + (e.amount || 0);
  });

  return {
    period: filterPeriod,
    salesCount: transactionCount,
    totalItemsSold,
    totalRevenue,
    totalCOGS,
    totalExpenses,
    grossProfit,
    netProfit,
    profitMargin,
    averageSaleValue,
    isProfit: netProfit >= 0,
    bestSellingProducts,
    categoryBreakdown: categoryMap,
    filteredSales,
    filteredExpenses
  };
};

/* ════════════════════════════════════════════
   4. EXPORT UTILITIES (CSV & REPORT)
   ════════════════════════════════════════════ */

export const exportSalesCSV = (sales = []) => {
  const headers = ['Sale ID', 'Date', 'Customer Name', 'Item Sold', 'Qty', 'Cost Price (NPR / रु)', 'Selling Price (NPR / रु)', 'Discount (NPR / रु)', 'Final Amount (NPR / रु)', 'Payment Method', 'Notes'];
  const rows = sales.map(s => [
    s.id,
    s.date,
    `"${(s.customerName || '').replace(/"/g, '""')}"`,
    `"${(s.itemName || '').replace(/"/g, '""')}"`,
    s.quantity,
    s.costPrice,
    s.sellingPrice,
    s.discount,
    s.finalAmount,
    s.paymentMethod,
    `"${(s.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `VISION_X_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportExpensesCSV = (expenses = []) => {
  const headers = ['Expense ID', 'Date', 'Category', 'Description', 'Amount (NPR / रु)', 'Payment Method', 'Notes'];
  const rows = expenses.map(e => [
    e.id,
    e.date,
    e.category,
    `"${(e.description || '').replace(/"/g, '""')}"`,
    e.amount,
    e.paymentMethod,
    `"${(e.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `VISION_X_Expenses_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
