import React, { useState, useEffect } from 'react';
import {
  getSalesDB, saveSaleDB, deleteSaleDB,
  getExpensesDB, saveExpenseDB, deleteExpenseDB,
  calculateFinancialMetrics, exportSalesCSV, exportExpensesCSV
} from '../../services/financeService';
import { useLanguage } from '../../context/LanguageContext';
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard, ShoppingBag, Plus, Trash2,
  FileSpreadsheet, Printer, Calendar, Filter, PieChart, ArrowUpRight, ArrowDownRight, Search, X, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function FinanceManagement() {
  const { formatPrice } = useLanguage();
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Sub-tabs: 'dashboard' | 'sales' | 'expenses' | 'pnl' | 'reports'
  const [financeSubTab, setFinanceSubTab] = useState('dashboard');
  const [periodFilter, setPeriodFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Modals
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Sale Form
  const [saleForm, setSaleForm] = useState({
    customerName: '',
    itemName: 'Titanium Prescription Frames',
    quantity: 1,
    costPrice: '',
    sellingPrice: '',
    discount: '0',
    paymentMethod: 'Cash',
    notes: ''
  });

  // Expense Form
  const [expenseForm, setExpenseForm] = useState({
    category: 'Rent',
    description: '',
    amount: '',
    paymentMethod: 'Bank Transfer',
    notes: ''
  });

  const categories = [
    'Rent', 'Electricity', 'Staff Salary', 'Product Purchase',
    'Equipment', 'Maintenance', 'Marketing', 'Transportation', 'Other'
  ];

  const paymentMethods = ['Cash', 'FonePay / QR', 'Card', 'Bank Transfer', 'Other'];

  useEffect(() => {
    loadFinanceData();
  }, []);

  const showNotify = (msg, isError = false) => {
    setNotification({ msg, isError });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadFinanceData = async () => {
    setLoading(true);
    const [sData, eData] = await Promise.all([getSalesDB(), getExpensesDB()]);
    setSales(sData || []);
    setExpenses(eData || []);
    setLoading(false);
  };

  const metrics = calculateFinancialMetrics(sales, expenses, periodFilter, startDate, endDate);

  // Handlers
  const handleSaveSale = async (e) => {
    e.preventDefault();
    if (!saleForm.itemName || !saleForm.sellingPrice) {
      showNotify('Please fill in required fields (Item Name & Selling Price).', true);
      return;
    }

    const res = await saveSaleDB(saleForm);
    if (res.data) setSales(res.data);

    setIsSaleModalOpen(false);
    setSaleForm({ customerName: '', itemName: 'Titanium Prescription Frames', quantity: 1, costPrice: '', sellingPrice: '', discount: '0', paymentMethod: 'Cash', notes: '' });
    showNotify('Sale transaction recorded successfully!');
  };

  const handleDeleteSale = async (saleItem) => {
    if (!saleItem || !saleItem.id) return;
    if (window.confirm(`Are you sure you want to delete Sale Invoice ${saleItem.id} (${saleItem.itemName})?`)) {
      const res = await deleteSaleDB(saleItem.id);
      if (res.success && res.data) {
        setSales(res.data);
        showNotify(`Sale Invoice ${saleItem.id} deleted successfully.`);
      } else {
        showNotify(res.message || 'Failed to delete sale.', true);
      }
    }
  };

  const handleSaveExpense = async (e) => {
    e.preventDefault();
    if (!expenseForm.description || !expenseForm.amount) {
      showNotify('Please enter Description and Amount.', true);
      return;
    }

    const res = await saveExpenseDB(expenseForm);
    if (res.data) setExpenses(res.data);

    setIsExpenseModalOpen(false);
    setExpenseForm({ category: 'Rent', description: '', amount: '', paymentMethod: 'Bank Transfer', notes: '' });
    showNotify('Expense entry recorded successfully!');
  };

  const handleDeleteExpense = async (expenseItem) => {
    if (!expenseItem || !expenseItem.id) return;
    if (window.confirm(`Are you sure you want to delete Expense '${expenseItem.description}' (ID: ${expenseItem.id})?`)) {
      const res = await deleteExpenseDB(expenseItem.id);
      if (res.success && res.data) {
        setExpenses(res.data);
        showNotify(`Expense '${expenseItem.description}' deleted successfully.`);
      } else {
        showNotify(res.message || 'Failed to delete expense.', true);
      }
    }
  };

  const calculatedFormFinal = Math.max(0, (parseFloat(saleForm.sellingPrice || 0) * parseInt(saleForm.quantity || 1, 10)) - parseFloat(saleForm.discount || 0));

  return (
    <div style={{ color: 'var(--color-text-primary)' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: notification.isError ? 'var(--color-danger)' : 'var(--color-success)',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          {notification.isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* ── Sub Navigation Controls ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', label: 'Overview' },
            { id: 'sales', label: `Sales (${sales.length})` },
            { id: 'expenses', label: `Expenses (${expenses.length})` },
            { id: 'pnl', label: 'Profit & Loss' },
            { id: 'reports', label: 'Reports & Export' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFinanceSubTab(tab.id)}
              className={`btn btn-sm ${financeSubTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Filter Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Filter size={13} /> Filter:
          </span>
          {['All', 'Today', 'Weekly', 'Monthly', 'Yearly', 'Custom'].map(p => (
            <button
              key={p}
              onClick={() => setPeriodFilter(p)}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                backgroundColor: periodFilter === p ? 'var(--color-accent-primary)' : 'var(--color-bg-secondary)',
                color: periodFilter === p ? '#ffffff' : 'var(--color-text-secondary)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}

          {periodFilter === 'Custom' && (
            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <input type="date" className="form-input" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} value={startDate} onChange={e => setStartDate(e.target.value)} />
              <span style={{ fontSize: '0.75rem' }}>to</span>
              <input type="date" className="form-input" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          )}
        </div>
      </div>

      {/* ── Summary Financial Metrics Cards ── */}
      <div className="admin-metrics-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '1.75rem' }}>
        {/* Total Revenue */}
        <div className="metric-card" style={{ borderLeft: '4px solid var(--color-accent-primary)' }}>
          <div className="metric-card-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Sales Revenue <DollarSign size={16} color="var(--color-accent-primary)" />
          </div>
          <div className="metric-card-value" style={{ color: 'var(--color-accent-primary)' }}>
            {formatPrice(metrics.totalRevenue)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
            {metrics.salesCount} transactions ({metrics.totalItemsSold} items)
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="metric-card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
          <div className="metric-card-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Expenses <CreditCard size={16} color="var(--color-danger)" />
          </div>
          <div className="metric-card-value" style={{ color: 'var(--color-danger)' }}>
            {formatPrice(metrics.totalExpenses)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
            COGS: {formatPrice(metrics.totalCOGS)}
          </div>
        </div>

        {/* Gross Profit */}
        <div className="metric-card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div className="metric-card-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Gross Profit <TrendingUp size={16} color="#0284c7" />
          </div>
          <div className="metric-card-value" style={{ color: '#0284c7' }}>
            {formatPrice(metrics.grossProfit)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
            Revenue minus COGS
          </div>
        </div>

        {/* Net Profit / Loss */}
        <div className="metric-card" style={{ borderLeft: `4px solid ${metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)'}` }}>
          <div className="metric-card-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {metrics.isProfit ? 'Net Profit' : 'Net Loss'} 
            {metrics.isProfit ? <ArrowUpRight size={16} color="var(--color-success)" /> : <ArrowDownRight size={16} color="var(--color-danger)" />}
          </div>
          <div className="metric-card-value" style={{ color: metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {formatPrice(Math.abs(metrics.netProfit))}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)', marginTop: '0.2rem' }}>
            {metrics.isProfit ? 'PROFITABLE' : 'NET LOSS OPERATING'} ({metrics.profitMargin.toFixed(1)}% Margin)
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
         TAB 1: FINANCIAL OVERVIEW / DASHBOARD
         ════════════════════════════════════════════════════════════ */}
      {financeSubTab === 'dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Profit & Loss Visual Summary Card */}
          <div className="card" style={{ borderTop: `4px solid ${metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)'}` }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--color-accent-primary)" /> Profit & Loss Gauge
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--color-border)' }}>
                <span>Sales Revenue (+)</span>
                <strong style={{ color: 'var(--color-success)' }}>{formatPrice(metrics.totalRevenue)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--color-border)' }}>
                <span>Cost of Goods Sold (COGS) (−)</span>
                <strong style={{ color: 'var(--color-danger)' }}>−{formatPrice(metrics.totalCOGS)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', padding: '0.5rem', borderRadius: '4px' }}>
                <span style={{ fontWeight: 700 }}>Gross Profit</span>
                <strong style={{ fontWeight: 800, color: '#0284c7' }}>{formatPrice(metrics.grossProfit)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px dashed var(--color-border)' }}>
                <span>Operating Expenses (−)</span>
                <strong style={{ color: 'var(--color-danger)' }}>−{formatPrice(metrics.totalExpenses)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderRadius: 'var(--radius-sm)', backgroundColor: metrics.isProfit ? 'var(--color-success-light)' : 'var(--color-danger-light)', color: metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>{metrics.isProfit ? 'Net Profit' : 'Net Loss'}</span>
                <strong style={{ fontWeight: 900, fontSize: '1.15rem' }}>{formatPrice(Math.abs(metrics.netProfit))}</strong>
              </div>
            </div>
          </div>

          {/* Best Selling Optical Products / Services */}
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={18} color="var(--color-accent-primary)" /> Best Selling Items
            </h3>
            {metrics.bestSellingProducts.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>No sales items recorded for this filter period.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {metrics.bestSellingProducts.slice(0, 5).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.qty} units sold</div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--color-accent-primary)', fontSize: '0.9rem' }}>
                      {formatPrice(item.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
         TAB 2: SALES MANAGEMENT
         ════════════════════════════════════════════════════════════ */}
      {financeSubTab === 'sales' && (
        <div className="card">
          <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Optical Sales & Invoices</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Record patient transactions, discounts, and payment methods.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => exportSalesCSV(metrics.filteredSales)}>
                <FileSpreadsheet size={15} /> Export CSV
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setIsSaleModalOpen(true)}>
                <Plus size={15} /> Record New Sale
              </button>
            </div>
          </div>

          {/* Sales Table */}
          <div className="db-table-wrapper">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Customer & Item</th>
                  <th>Qty</th>
                  <th>Cost / Price</th>
                  <th>Discount</th>
                  <th>Final Amount</th>
                  <th>Payment</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {metrics.filteredSales.length === 0 && (
                  <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>No sales records found.</td></tr>
                )}
                {metrics.filteredSales.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{s.id}</td>
                    <td>{s.date}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{s.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{s.itemName}</div>
                    </td>
                    <td>{s.quantity}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{formatPrice(s.sellingPrice)}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Cost: {formatPrice(s.costPrice)}</div>
                    </td>
                    <td style={{ color: 'var(--color-danger)' }}>{s.discount > 0 ? `−${formatPrice(s.discount)}` : '—'}</td>
                    <td style={{ fontWeight: 800, color: 'var(--color-success)', fontSize: '0.95rem' }}>{formatPrice(s.finalAmount)}</td>
                    <td><span className="badge badge-primary">{s.paymentMethod}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="icon-btn icon-btn-danger" 
                        onClick={() => handleDeleteSale(s)}
                        title="Delete Sale Invoice"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
         TAB 3: EXPENSE MANAGEMENT
         ════════════════════════════════════════════════════════════ */}
      {financeSubTab === 'expenses' && (
        <div className="card">
          <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Operating Expenses</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Log facility rent, electricity, salaries, marketing & stock purchases.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => exportExpensesCSV(metrics.filteredExpenses)}>
                <FileSpreadsheet size={15} /> Export CSV
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setIsExpenseModalOpen(true)}>
                <Plus size={15} /> Add Expense
              </button>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="db-table-wrapper">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Expense ID</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {metrics.filteredExpenses.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>No expense records found.</td></tr>
                )}
                {metrics.filteredExpenses.map(e => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 800, color: 'var(--color-danger)' }}>{e.id}</td>
                    <td>{e.date}</td>
                    <td><span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>{e.category}</span></td>
                    <td style={{ fontWeight: 600 }}>{e.description}</td>
                    <td style={{ fontWeight: 800, color: 'var(--color-danger)' }}>{formatPrice(e.amount)}</td>
                    <td><span className="badge badge-primary">{e.paymentMethod}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="icon-btn icon-btn-danger" 
                        onClick={() => handleDeleteExpense(e)}
                        title="Delete Expense Entry"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
         TAB 4: PROFIT & LOSS STATEMENT
         ════════════════════════════════════════════════════════════ */}
      {financeSubTab === 'pnl' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem' }}>Formal Profit & Loss Statement</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Period: {periodFilter} {startDate && endDate ? `(${startDate} to ${endDate})` : ''}</p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
              <Printer size={16} /> Print P&L Statement
            </button>
          </div>

          <div style={{ maxWidth: '720px', margin: '0 auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem', backgroundColor: 'var(--color-bg-primary)' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid var(--color-accent-primary)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>VISION X Eye Care & Optical Center</h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Nepalgunj-3, Banke, Nepal</div>
              <div style={{ fontWeight: 700, marginTop: '0.35rem', color: 'var(--color-accent-primary)' }}>FINANCIAL PROFIT & LOSS STATEMENT</div>
            </div>

            <table style={{ width: '100%', fontSize: '0.925rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: 700 }}>Total Sales Revenue</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--color-success)' }}>{formatPrice(metrics.totalRevenue)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0', color: 'var(--color-text-secondary)', paddingLeft: '1rem' }}>Less: Cost of Goods Sold (COGS)</td>
                  <td style={{ textAlign: 'right', color: 'var(--color-danger)' }}>({formatPrice(metrics.totalCOGS)})</td>
                </tr>
                <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 800 }}>GROSS PROFIT</td>
                  <td style={{ textAlign: 'right', fontWeight: 900, color: '#0284c7', padding: '0.85rem' }}>{formatPrice(metrics.grossProfit)}</td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ padding: '0.75rem 0', fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>OPERATING EXPENSES</td>
                </tr>
                {Object.entries(metrics.categoryBreakdown).map(([cat, amt]) => (
                  <tr key={cat} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '0.4rem 0 0.4rem 1.25rem', color: 'var(--color-text-secondary)' }}>{cat}</td>
                    <td style={{ textAlign: 'right', color: 'var(--color-danger)' }}>({formatPrice(amt)})</td>
                  </tr>
                ))}
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.75rem 0', fontWeight: 700, paddingLeft: '1rem' }}>Total Operating Expenses</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-danger)' }}>({formatPrice(metrics.totalExpenses)})</td>
                </tr>

                <tr style={{ borderTop: '3px double var(--color-border)', borderBottom: '3px double var(--color-border)', backgroundColor: metrics.isProfit ? 'var(--color-success-light)' : 'var(--color-danger-light)' }}>
                  <td style={{ padding: '1rem', fontWeight: 900, fontSize: '1.1rem', color: metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)' }}>
                    NET {metrics.isProfit ? 'PROFIT' : 'LOSS'}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 900, fontSize: '1.25rem', color: metrics.isProfit ? 'var(--color-success)' : 'var(--color-danger)', padding: '1rem' }}>
                    {formatPrice(Math.abs(metrics.netProfit))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
         MODAL: RECORD NEW SALE
         ════════════════════════════════════════════════════════════ */}
      {isSaleModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsSaleModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <button className="modal-close-btn" onClick={() => setIsSaleModalOpen(false)}><X size={20} /></button>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Record Optical Sale / Invoice</h3>
            
            <form onSubmit={handleSaveSale}>
              <div className="form-group">
                <label className="form-label">Customer Name (Optional)</label>
                <input type="text" className="form-input" placeholder="e.g. Marcus Sterling" value={saleForm.customerName} onChange={e => setSaleForm({ ...saleForm, customerName: e.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label">Item / Service Sold *</label>
                <input type="text" className="form-input" placeholder="e.g. Titanium Blue-Light Glasses" value={saleForm.itemName} onChange={e => setSaleForm({ ...saleForm, itemName: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Qty *</label>
                  <input type="number" min="1" className="form-input" value={saleForm.quantity} onChange={e => setSaleForm({ ...saleForm, quantity: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Cost Price (रु / NPR)</label>
                  <input type="number" step="0.01" className="form-input" placeholder="3000" value={saleForm.costPrice} onChange={e => setSaleForm({ ...saleForm, costPrice: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Selling Price (रु / NPR) *</label>
                  <input type="number" step="0.01" className="form-input" placeholder="8500" value={saleForm.sellingPrice} onChange={e => setSaleForm({ ...saleForm, sellingPrice: e.target.value })} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Discount (रु / NPR)</label>
                  <input type="number" step="0.01" className="form-input" value={saleForm.discount} onChange={e => setSaleForm({ ...saleForm, discount: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select" value={saleForm.paymentMethod} onChange={e => setSaleForm({ ...saleForm, paymentMethod: e.target.value })}>
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-accent-light)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-accent-hover)' }}>Calculated Final Sale Amount:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--color-accent-primary)' }}>{formatPrice(calculatedFormFinal)}</strong>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Save Sale Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
         MODAL: ADD EXPENSE ENTRY
         ════════════════════════════════════════════════════════════ */}
      {isExpenseModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsExpenseModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="modal-close-btn" onClick={() => setIsExpenseModalOpen(false)}><X size={20} /></button>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Record Business Expense</h3>

            <form onSubmit={handleSaveExpense}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" value={expenseForm.category} onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Expense Description *</label>
                <input type="text" className="form-input" placeholder="e.g. Clinic rent payment for Nepalgunj-3" value={expenseForm.description} onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Amount (रु / NPR) *</label>
                  <input type="number" step="0.01" className="form-input" placeholder="15000" value={expenseForm.amount} onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Method</label>
                  <select className="form-select" value={expenseForm.paymentMethod} onChange={e => setExpenseForm({ ...expenseForm, paymentMethod: e.target.value })}>
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}>
                Record Expense Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
