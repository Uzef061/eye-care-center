import React, { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus, deleteAppointment } from '../../services/appointmentService';
import { getProducts, saveProduct, toggleProductAvailability, deleteProduct } from '../../services/productService';
import {
  getCustomersDB, saveCustomerDB, deleteCustomerDB,
  getStocksDB, updateStockQuantityDB, saveStockDB, deleteStockDB
} from '../../services/databaseService';
import { logoutAdmin } from '../../services/authService';
import { SERVICES_DATA } from '../../data/services';
import { useLanguage } from '../../context/LanguageContext';
import {
  LayoutDashboard, Calendar, Glasses, Stethoscope, Users, Settings, PackageCheck,
  Plus, Edit, Trash2, Search, ArrowLeft, X, LogOut
} from 'lucide-react';
import '../../styles/admin.css';

/* ---- Reusable Status Badge ---- */
function StatusBadge({ status }) {
  const map = {
    'In Stock': 'badge-success',
    'Low Stock': 'badge-danger',
    'Reorder Required': 'badge-danger',
    'Out of Stock': 'badge-danger',
    Confirmed: 'badge-success',
    Pending: 'badge-primary',
    Completed: 'badge-teal',
    Cancelled: 'badge-danger',
  };
  return <span className={`badge ${map[status] || 'badge-primary'}`}>{status}</span>;
}

/* ---- Responsive Customers Table / Cards ---- */
function CustomersTable({ customers, onDelete }) {
  return (
    <>
      {/* Desktop Table */}
      <div className="db-table-wrapper">
        <table className="db-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Patient Name & Contact</th>
              <th>Vision Prescription (OD / OS / PD)</th>
              <th>Last Visit</th>
              <th>Purchases</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>No customer records found.</td></tr>
            )}
            {customers.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{c.id}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{c.fullName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{c.phone} | {c.email}</div>
                </td>
                <td style={{ fontSize: '0.82rem' }}>
                  <div><b>OD:</b> SPH {c.prescription?.sphOD} | CYL {c.prescription?.cylOD} | Axis {c.prescription?.axisOD}</div>
                  <div><b>OS:</b> SPH {c.prescription?.sphOS} | CYL {c.prescription?.cylOS} | Axis {c.prescription?.axisOS}</div>
                  <div style={{ color: 'var(--color-accent-primary)', fontWeight: 700 }}>PD: {c.prescription?.pd}</div>
                </td>
                <td>{c.lastVisit}</td>
                <td style={{ fontWeight: 700 }}>{c.totalPurchases}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn icon-btn-danger" onClick={() => onDelete(c.id)}><Trash2 size={17} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="db-mobile-cards">
        {customers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No customer records found.</div>
        )}
        {customers.map(c => (
          <div className="db-mobile-card" key={c.id}>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">ID</span>
              <span style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{c.id}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Name</span>
              <span className="db-mobile-card-value" style={{ fontWeight: 700 }}>{c.fullName}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Phone</span>
              <span className="db-mobile-card-value">{c.phone}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Rx OD</span>
              <span className="db-mobile-card-value">SPH {c.prescription?.sphOD} | CYL {c.prescription?.cylOD} | {c.prescription?.axisOD}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Rx OS</span>
              <span className="db-mobile-card-value">SPH {c.prescription?.sphOS} | CYL {c.prescription?.cylOS} | {c.prescription?.axisOS}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">PD</span>
              <span style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>{c.prescription?.pd}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Last Visit</span>
              <span className="db-mobile-card-value">{c.lastVisit}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Purchases</span>
              <span style={{ fontWeight: 700 }}>{c.totalPurchases}</span>
            </div>
            <div className="db-mobile-card-actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', color: 'var(--color-danger)' }} onClick={() => onDelete(c.id)}>
                <Trash2 size={15} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---- Responsive Stocks Table / Cards ---- */
function StocksTable({ stocks, onAdjust, onDelete }) {
  const { formatPrice } = useLanguage();
  return (
    <>
      {/* Desktop Table */}
      <div className="db-table-wrapper">
        <table className="db-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Item Name & Category</th>
              <th>Cost / Price</th>
              <th>Qty in Stock</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>No stock items found.</td></tr>
            )}
            {stocks.map(s => (
              <tr key={s.sku}>
                <td style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{s.sku}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.category} | {s.supplier}</div>
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{formatPrice(parseFloat(s.unitPrice || 0))}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Cost: {formatPrice(parseFloat(s.unitCost || 0))}</div>
                </td>
                <td>
                  <div className="stock-qty-control">
                    <button className="stock-qty-btn" onClick={() => onAdjust(s.sku, -1)}>−</button>
                    <span className="stock-qty-value">{s.quantity}</span>
                    <button className="stock-qty-btn" onClick={() => onAdjust(s.sku, 1)}>+</button>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Reorder @ {s.reorderLevel}</div>
                </td>
                <td><StatusBadge status={s.status} /></td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn icon-btn-danger" onClick={() => onDelete(s.sku)}><Trash2 size={17} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="db-mobile-cards">
        {stocks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No stock items found.</div>
        )}
        {stocks.map(s => (
          <div className="db-mobile-card" key={s.sku}>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">SKU</span>
              <span style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{s.sku}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Item</span>
              <span className="db-mobile-card-value" style={{ fontWeight: 700 }}>{s.name}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Category</span>
              <span className="db-mobile-card-value">{s.category}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Price</span>
              <span style={{ fontWeight: 700 }}>{formatPrice(parseFloat(s.unitPrice || 0))}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Qty</span>
              <div className="stock-qty-control">
                <button className="stock-qty-btn" onClick={() => onAdjust(s.sku, -1)}>−</button>
                <span className="stock-qty-value">{s.quantity}</span>
                <button className="stock-qty-btn" onClick={() => onAdjust(s.sku, 1)}>+</button>
              </div>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Status</span>
              <StatusBadge status={s.status} />
            </div>
            <div className="db-mobile-card-actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', color: 'var(--color-danger)' }} onClick={() => onDelete(s.sku)}>
                <Trash2 size={15} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---- Responsive Appointments Table / Cards ---- */
function AppointmentsTable({ appointments, onStatusChange, onDelete }) {
  return (
    <>
      <div className="db-table-wrapper">
        <table className="db-table">
          <thead>
            <tr>
              <th>Ref #</th>
              <th>Patient Details</th>
              <th>Service</th>
              <th>Date / Time</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>No appointments found.</td></tr>
            )}
            {appointments.map(app => (
              <tr key={app.id}>
                <td style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{app.id}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{app.fullName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{app.phone}</div>
                </td>
                <td>{app.service}</td>
                <td>{app.date}<br /><small style={{ color: 'var(--color-text-muted)' }}>{app.time}</small></td>
                <td>
                  <select
                    className="status-select"
                    value={app.status}
                    onChange={e => onStatusChange(app.id, e.target.value)}
                    style={{ backgroundColor: app.status === 'Confirmed' ? '#d1fae5' : app.status === 'Pending' ? '#fef3c7' : '#f1f5f9' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn icon-btn-danger" onClick={() => onDelete(app.id)}><Trash2 size={17} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="db-mobile-cards">
        {appointments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No appointments found.</div>
        )}
        {appointments.map(app => (
          <div className="db-mobile-card" key={app.id}>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Ref</span>
              <span style={{ fontWeight: 800, color: 'var(--color-accent-primary)' }}>{app.id}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Patient</span>
              <span className="db-mobile-card-value" style={{ fontWeight: 700 }}>{app.fullName}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Phone</span>
              <span className="db-mobile-card-value">{app.phone}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Service</span>
              <span className="db-mobile-card-value">{app.service}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Date</span>
              <span className="db-mobile-card-value">{app.date} at {app.time}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Status</span>
              <select
                className="status-select"
                value={app.status}
                onChange={e => onStatusChange(app.id, e.target.value)}
                style={{ backgroundColor: app.status === 'Confirmed' ? '#d1fae5' : '#fef3c7' }}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="db-mobile-card-actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', color: 'var(--color-danger)' }} onClick={() => onDelete(app.id)}>
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---- Responsive Products Table / Cards ---- */
function ProductsTable({ products, onToggle, onDelete }) {
  const { formatPrice } = useLanguage();
  return (
    <>
      <div className="db-table-wrapper">
        <table className="db-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>No products found.</td></tr>
            )}
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.image} alt={p.name} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                  </div>
                </td>
                <td><span className="badge badge-primary" style={{ fontSize: '0.72rem' }}>{p.category}</span></td>
                <td style={{ fontWeight: 700 }}>{formatPrice(p.price)}</td>
                <td>
                  <button onClick={() => onToggle(p.id)} className={`badge ${p.available ? 'badge-success' : 'badge-danger'}`} style={{ cursor: 'pointer' }}>
                    {p.available ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn icon-btn-danger" onClick={() => onDelete(p.id)}><Trash2 size={17} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="db-mobile-cards">
        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>No products found.</div>
        )}
        {products.map(p => (
          <div className="db-mobile-card" key={p.id}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <img src={p.image} alt={p.name} style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{p.category}</div>
              </div>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Price</span>
              <span style={{ fontWeight: 800 }}>{formatPrice(p.price)}</span>
            </div>
            <div className="db-mobile-card-row">
              <span className="db-mobile-card-label">Stock</span>
              <button onClick={() => onToggle(p.id)} className={`badge ${p.available ? 'badge-success' : 'badge-danger'}`} style={{ cursor: 'pointer' }}>
                {p.available ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
            <div className="db-mobile-card-actions">
              <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', color: 'var(--color-danger)' }} onClick={() => onDelete(p.id)}>
                <Trash2 size={15} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   MAIN ADMIN DASHBOARD COMPONENT
   ============================================================ */
export default function AdminDashboard({ onExitAdmin, onLogout }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [appointmentFilter, setAppointmentFilter] = useState('All');
  const [productSearch, setProductSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [stockSearch, setStockSearch] = useState('');

  // Product Add Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '', category: 'Prescription Glasses', price: '', available: true,
    frameType: 'Titanium', description: '',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
  });

  // Customer Add Modal
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    fullName: '', phone: '', email: '', address: '',
    prescription: { sphOD: '-1.50', cylOD: '-0.50', axisOD: '90°', sphOS: '-1.25', cylOS: '0.00', axisOS: '-', pd: '62mm' },
    notes: ''
  });

  // Stock Add Modal
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockForm, setStockForm] = useState({
    sku: '', name: '', category: 'Prescription Frames',
    unitCost: '', unitPrice: '', quantity: 10, reorderLevel: 5,
    supplier: 'VISION X Optical Supplies'
  });

  useEffect(() => { refreshData(); }, []);

  const refreshData = async () => {
    const [appts, prods, custs, stks] = await Promise.all([
      getAppointments(),
      getProducts(),
      getCustomersDB(),
      getStocksDB()
    ]);
    setAppointments(appts || []);
    setProducts(prods || []);
    setCustomers(custs || []);
    setStocks(stks || []);
  };

  // Handlers
  const handleStatusChange = async (id, s) => {
    const updated = await updateAppointmentStatus(id, s);
    setAppointments(updated);
  };

  const handleDeleteAppt = async (id) => {
    if (window.confirm('Delete this appointment?')) {
      const updated = await deleteAppointment(id);
      setAppointments(updated);
    }
  };

  const handleToggleProduct = async (id) => {
    const updated = await toggleProductAvailability(id);
    setProducts(updated);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Remove product from catalog?')) {
      const updated = await deleteProduct(id);
      setProducts(updated);
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Remove this customer record?')) {
      const updated = await deleteCustomerDB(id);
      setCustomers(updated);
    }
  };

  const handleStockAdjust = async (sku, d) => {
    const updated = await updateStockQuantityDB(sku, d);
    setStocks(updated);
  };

  const handleDeleteStock = async (sku) => {
    if (window.confirm('Remove stock item?')) {
      const updated = await deleteStockDB(sku);
      setStocks(updated);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;
    await saveProduct({ ...productForm, price: parseFloat(productForm.price) });
    setIsProductModalOpen(false);
    await refreshData();
  };

  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    if (!customerForm.fullName || !customerForm.phone) return;
    const updated = await saveCustomerDB(customerForm);
    setCustomers(updated);
    setIsCustomerModalOpen(false);
    setCustomerForm({ fullName: '', phone: '', email: '', address: '', prescription: { sphOD: '', cylOD: '', axisOD: '', sphOS: '', cylOS: '', axisOS: '', pd: '' }, notes: '' });
  };

  const handleSaveStock = async (e) => {
    e.preventDefault();
    if (!stockForm.sku || !stockForm.name) return;
    const updated = await saveStockDB({
      ...stockForm,
      unitCost: parseFloat(stockForm.unitCost) || 0,
      unitPrice: parseFloat(stockForm.unitPrice) || 0,
      quantity: parseInt(stockForm.quantity) || 0,
      reorderLevel: parseInt(stockForm.reorderLevel) || 5
    });
    setStocks(updated);
    setIsStockModalOpen(false);
  };

  const handleLogout = () => {
    logoutAdmin();
    onLogout();
  };

  // Filtered data
  const filteredAppts = appointments.filter(a => appointmentFilter === 'All' || a.status === appointmentFilter);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase()));
  const filteredCustomers = customers.filter(c => c.fullName.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone.includes(customerSearch) || c.email.toLowerCase().includes(customerSearch.toLowerCase()));
  const filteredStocks = stocks.filter(s => s.name.toLowerCase().includes(stockSearch.toLowerCase()) || s.sku.toLowerCase().includes(stockSearch.toLowerCase()));

  const lowStockCount = stocks.filter(s => s.quantity <= s.reorderLevel).length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: t('admin_tab_customers'), icon: Users, badge: customers.length },
    { id: 'stocks', label: t('admin_tab_stocks'), icon: PackageCheck, badge: lowStockCount > 0 ? `${lowStockCount} Low` : null, warn: true },
    { id: 'appointments', label: t('admin_tab_appts'), icon: Calendar, badge: pendingCount || null },
    { id: 'products', label: t('admin_tab_catalog'), icon: Glasses },
    { id: 'services', label: t('admin_tab_services'), icon: Stethoscope },
    { id: 'settings', label: t('admin_tab_settings'), icon: Settings }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-secondary)', minHeight: '100vh', padding: '1.5rem 0' }}>
      <div className="container">

        {/* ── Admin Header Bar ── */}
        <div className="admin-header-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.5rem',
          border: '1px solid var(--color-border)',
          flexWrap: 'wrap'
        }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: '0.25rem' }}>
              VISION X Manager Portal
            </span>
            <h2 style={{ fontSize: '1.4rem', marginTop: '0.2rem' }}>{t('admin_dashboard_title')}</h2>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={onExitAdmin}>
              <ArrowLeft size={15} /> {t('admin_back_btn')}
            </button>
            <button className="btn btn-sm" onClick={handleLogout}
              style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)', border: 'none' }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* ── Metrics ── */}
        <div className="admin-metrics-grid">
          {[
            { label: 'Registered Customers', value: customers.length, color: 'var(--color-accent-primary)' },
            { label: 'Stock Items (SKU)', value: stocks.length, color: 'var(--color-text-primary)' },
            { label: 'Low Stock Alerts', value: lowStockCount, color: lowStockCount > 0 ? 'var(--color-danger)' : 'var(--color-success)' },
            { label: 'Pending Appointments', value: pendingCount, color: 'var(--color-warning)' }
          ].map((m, i) => (
            <div key={i} className="metric-card">
              <div className="metric-card-label">{m.label}</div>
              <div className="metric-card-value" style={{ color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* ── Layout: Sidebar + Content ── */}
        <div className="admin-layout">

          {/* Sidebar Navigation */}
          <div className="admin-sidebar">
            <div className="admin-sidebar-label">Control Panels</div>
            <ul className="admin-sidebar-nav">
              {sidebarItems.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.7rem 0.9rem',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        transition: 'all var(--transition-fast)',
                        backgroundColor: activeTab === item.id ? 'var(--color-accent-light)' : 'transparent',
                        color: activeTab === item.id ? 'var(--color-accent-primary)' : 'var(--color-text-secondary)'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Icon size={17} /> {item.label}
                      </span>
                      {item.badge && (
                        <span className={`badge ${item.warn ? 'badge-danger' : 'badge-primary'}`}
                          style={{ padding: '0.12rem 0.45rem', fontSize: '0.68rem' }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Main Content ── */}
          <div>

            {/* DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>VISION X Quick Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)' }}>Recent Customers</h4>
                    {customers.slice(0, 3).map(c => (
                      <div key={c.id} style={{ fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{c.fullName}</strong>
                        <span style={{ color: 'var(--color-accent-primary)', fontWeight: 600 }}>PD: {c.prescription?.pd}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)' }}>Low Stock Alerts</h4>
                    {stocks.filter(s => s.quantity <= s.reorderLevel).length === 0 ? (
                      <div style={{ color: 'var(--color-success)', fontSize: '0.875rem' }}>✓ All stock levels healthy</div>
                    ) : stocks.filter(s => s.quantity <= s.reorderLevel).map(s => (
                      <div key={s.sku} style={{ fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid var(--color-border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{s.name}</span>
                        <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>Qty: {s.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CUSTOMERS DATABASE */}
            {activeTab === 'customers' && (
              <div className="card">
                <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>Customers & Prescription Records</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Manage patient files, vision history, and Rx parameters.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="db-search-field">
                      <Search size={15} className="db-search-icon" color="var(--color-text-muted)" />
                      <input type="text" className="form-input db-search-input" placeholder="Search name / phone..." value={customerSearch} onChange={e => setCustomerSearch(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => setIsCustomerModalOpen(true)}>
                      <Plus size={15} /> Add Customer
                    </button>
                  </div>
                </div>
                <CustomersTable customers={filteredCustomers} onDelete={handleDeleteCustomer} />
              </div>
            )}

            {/* STOCK & INVENTORY */}
            {activeTab === 'stocks' && (
              <div className="card">
                <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>Stock & Inventory Management</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Track SKU quantities, reorder levels, costs, and inventory status.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="db-search-field">
                      <Search size={15} className="db-search-icon" color="var(--color-text-muted)" />
                      <input type="text" className="form-input db-search-input" placeholder="Search SKU / name..." value={stockSearch} onChange={e => setStockSearch(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      setStockForm({ sku: 'STK-' + Math.floor(100 + Math.random() * 900), name: '', category: 'Prescription Frames', unitCost: '', unitPrice: '', quantity: 10, reorderLevel: 5, supplier: 'VISION X Optical Supplies' });
                      setIsStockModalOpen(true);
                    }}>
                      <Plus size={15} /> Add Stock Item
                    </button>
                  </div>
                </div>
                <StocksTable stocks={filteredStocks} onAdjust={handleStockAdjust} onDelete={handleDeleteStock} />
              </div>
            )}

            {/* APPOINTMENTS */}
            {activeTab === 'appointments' && (
              <div className="card">
                <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>Appointments Manager</h3>
                  <div className="filter-tabs">
                    {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                      <button key={s} onClick={() => setAppointmentFilter(s)}
                        className={`filter-tab ${appointmentFilter === s ? 'filter-tab-active' : 'filter-tab-inactive'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <AppointmentsTable appointments={filteredAppts} onStatusChange={handleStatusChange} onDelete={handleDeleteAppt} />
              </div>
            )}

            {/* PRODUCTS */}
            {activeTab === 'products' && (
              <div className="card">
                <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>Eyewear Catalog Products</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="db-search-field">
                      <Search size={15} className="db-search-icon" color="var(--color-text-muted)" />
                      <input type="text" className="form-input db-search-input" placeholder="Search catalog..." value={productSearch} onChange={e => setProductSearch(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => { setProductForm({ name: '', category: 'Prescription Glasses', price: '', available: true, frameType: 'Titanium', description: '', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800' }); setIsProductModalOpen(true); }}>
                      <Plus size={15} /> Add Product
                    </button>
                  </div>
                </div>
                <ProductsTable products={filteredProducts} onToggle={handleToggleProduct} onDelete={handleDeleteProduct} />
              </div>
            )}

            {/* SERVICES */}
            {activeTab === 'services' && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Active Clinical Services ({SERVICES_DATA.length})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                  {SERVICES_DATA.map(s => (
                    <div key={s.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                      <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{s.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>{s.category} | {s.duration}</div>
                      <div style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>{s.estimatedCost}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === 'settings' && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>VISION X Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div className="form-group"><label className="form-label">Business Name</label><input type="text" className="form-input" defaultValue="VISION X Eye Care & Optical Center" /></div>
                  <div className="form-group"><label className="form-label">Support Email</label><input type="email" className="form-input" defaultValue="usadiq79@gmail.com" /></div>
                  <div className="form-group"><label className="form-label">Hotline Phone</label><input type="text" className="form-input" defaultValue="+977 9800559582" /></div>
                  <div className="form-group"><label className="form-label">Opening Hours</label><input type="text" className="form-input" defaultValue="Sun-Fri: 04:00 PM - 09:00 PM | Sat: 10:00 AM - 09:00 PM" /></div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary">Save Settings</button>
                  <button className="btn btn-secondary" onClick={handleLogout} style={{ color: 'var(--color-danger)' }}>
                    <LogOut size={16} /> Logout of Manager Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add Product Modal ── */}
      {isProductModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsProductModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <button className="modal-close-btn" onClick={() => setIsProductModalOpen(false)}><X size={18} /></button>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Add Catalog Product</h3>
            <form onSubmit={handleSaveProduct}>
              <div className="form-group"><label className="form-label">Product Name *</label>
                <input type="text" className="form-input" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} required /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label className="form-label">Category</label>
                  <select className="form-select" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                    {['Prescription Glasses', 'Power Glasses', 'Sunglasses', 'Reading Glasses', 'Computer Glasses', "Kids' Frames", 'Contact Lenses'].map(c => <option key={c}>{c}</option>)}
                  </select></div>
                <div className="form-group"><label className="form-label">Price ($) *</label>
                  <input type="number" step="0.01" className="form-input" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} required /></div>
              </div>
              <div className="form-group"><label className="form-label">Description</label>
                <textarea className="form-textarea" rows={3} value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} /></div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsProductModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Customer Modal ── */}
      {isCustomerModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsCustomerModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <button className="modal-close-btn" onClick={() => setIsCustomerModalOpen(false)}><X size={18} /></button>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Add Patient Customer File</h3>
            <form onSubmit={handleSaveCustomer}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Full Name *</label>
                  <input type="text" className="form-input" value={customerForm.fullName} onChange={e => setCustomerForm({ ...customerForm, fullName: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">Phone *</label>
                  <input type="text" className="form-input" value={customerForm.phone} onChange={e => setCustomerForm({ ...customerForm, phone: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">Email</label>
                  <input type="email" className="form-input" value={customerForm.email} onChange={e => setCustomerForm({ ...customerForm, email: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">SPH (OD)</label>
                  <input type="text" className="form-input" value={customerForm.prescription.sphOD} onChange={e => setCustomerForm({ ...customerForm, prescription: { ...customerForm.prescription, sphOD: e.target.value } })} /></div>
                <div className="form-group"><label className="form-label">CYL / AXIS (OD)</label>
                  <input type="text" className="form-input" placeholder="e.g. -0.75 / 90°" value={customerForm.prescription.cylOD} onChange={e => setCustomerForm({ ...customerForm, prescription: { ...customerForm.prescription, cylOD: e.target.value } })} /></div>
                <div className="form-group"><label className="form-label">SPH (OS)</label>
                  <input type="text" className="form-input" value={customerForm.prescription.sphOS} onChange={e => setCustomerForm({ ...customerForm, prescription: { ...customerForm.prescription, sphOS: e.target.value } })} /></div>
                <div className="form-group"><label className="form-label">Pupillary Distance (PD)</label>
                  <input type="text" className="form-input" value={customerForm.prescription.pd} onChange={e => setCustomerForm({ ...customerForm, prescription: { ...customerForm.prescription, pd: e.target.value } })} /></div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Notes</label>
                  <textarea className="form-textarea" rows={2} value={customerForm.notes} onChange={e => setCustomerForm({ ...customerForm, notes: e.target.value })} /></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsCustomerModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Customer Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Stock Modal ── */}
      {isStockModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsStockModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <button className="modal-close-btn" onClick={() => setIsStockModalOpen(false)}><X size={18} /></button>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Add Stock Inventory Item</h3>
            <form onSubmit={handleSaveStock}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label className="form-label">SKU Code *</label>
                  <input type="text" className="form-input" value={stockForm.sku} onChange={e => setStockForm({ ...stockForm, sku: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">Category</label>
                  <select className="form-select" value={stockForm.category} onChange={e => setStockForm({ ...stockForm, category: e.target.value })}>
                    {['Prescription Frames', 'Optical Lens Stock', 'Sunglasses', 'Computer Glasses', 'Contact Lenses', 'Accessories'].map(c => <option key={c}>{c}</option>)}
                  </select></div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Item Name *</label>
                  <input type="text" className="form-input" value={stockForm.name} onChange={e => setStockForm({ ...stockForm, name: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">Quantity *</label>
                  <input type="number" className="form-input" value={stockForm.quantity} onChange={e => setStockForm({ ...stockForm, quantity: e.target.value })} required /></div>
                <div className="form-group"><label className="form-label">Reorder Level</label>
                  <input type="number" className="form-input" value={stockForm.reorderLevel} onChange={e => setStockForm({ ...stockForm, reorderLevel: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Unit Cost ($)</label>
                  <input type="number" step="0.01" className="form-input" value={stockForm.unitCost} onChange={e => setStockForm({ ...stockForm, unitCost: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Retail Price ($)</label>
                  <input type="number" step="0.01" className="form-input" value={stockForm.unitPrice} onChange={e => setStockForm({ ...stockForm, unitPrice: e.target.value })} /></div>
                <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Supplier</label>
                  <input type="text" className="form-input" value={stockForm.supplier} onChange={e => setStockForm({ ...stockForm, supplier: e.target.value })} /></div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsStockModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Stock Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
