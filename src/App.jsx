import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Customer Pages & Sections
import Hero from './components/home/Hero';
import TrustFeatures from './components/home/TrustFeatures';
import DoctorProfile from './components/home/DoctorProfile';
import ServicesSection from './components/services/ServicesSection';
import EyeCheckUpSection from './components/eyecheckup/EyeCheckUpSection';
import AppointmentBooking from './components/appointments/AppointmentBooking';
import EyewearSection from './components/eyewear/EyewearSection';
import FrameFittingSection from './components/fitting/FrameFittingSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';

// Manager Portal Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ManagerPortalHeader from './components/admin/ManagerPortalHeader';

// Auth & Data Services
import { isAuthenticatedAdmin } from './services/authService';
import { getProducts } from './services/productService';
import { getCustomersDB, getStocksDB } from './services/databaseService';

import WhatsAppButton from './components/common/WhatsAppButton';
import PosterModal from './components/common/PosterModal';

import './styles/main.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isManagerPortal, setIsManagerPortal] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.startsWith('/manager') || window.location.hash === '#manager';
    }
    return false;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [products, setProducts] = useState([]);
  const [showPosterModal, setShowPosterModal] = useState(true);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  // Sync URL history state
  const navigateTo = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      const isMgr = path.startsWith('/manager') || path === '#manager';
      setIsManagerPortal(isMgr);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setIsAuthenticated(isAuthenticatedAdmin());
    getCustomersDB();
    getStocksDB();
    loadProducts();

    const handlePopState = () => {
      const isMgr = window.location.pathname.startsWith('/manager') || window.location.hash === '#manager';
      setIsManagerPortal(isMgr);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Refresh products when switching views
  useEffect(() => {
    loadProducts();
  }, [activePage, isManagerPortal]);

  const handleNavigateToBooking = (serviceName = 'Eye Check-Up') => {
    setPreselectedService(serviceName);
    setActivePage('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireProduct = (product) => {
    setPreselectedService(`Power Glasses / ${product.category}: ${product.name}`);
    setActivePage('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigateTo('/');
  };

  // ════════════════════════════════════════════════════════════
  // 1. MANAGER PORTAL (/manager)
  // Completely isolated admin interface requiring authentication
  // ════════════════════════════════════════════════════════════
  if (isManagerPortal) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f172a', color: '#f8fafc' }}>
        {!isAuthenticated ? (
          /* Unauthenticated Manager -> Redirected to Manager Login Gate */
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => navigateTo('/')}
          />
        ) : (
          /* Authenticated Manager -> Full Manager Portal Dashboard */
          <>
            <ManagerPortalHeader 
              onLogout={handleLogout} 
              onNavigateToCustomer={() => navigateTo('/')} 
            />
            <main style={{ flex: 1 }}>
              <AdminDashboard
                onExitAdmin={() => navigateTo('/')}
                onLogout={handleLogout}
              />
            </main>
          </>
        )}
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // 2. PUBLIC CUSTOMER WEBSITE (/)
  // Pure customer experience with zero manager controls or toggles
  // ════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Customer Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <>
            <Hero
              onBookClick={() => handleNavigateToBooking('Comprehensive Eye Check-Up')}
              onExploreClick={() => { setActivePage('eyewear'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
            <TrustFeatures />
            <DoctorProfile onBookClick={handleNavigateToBooking} />
            <EyeCheckUpSection onBookCheckUp={handleNavigateToBooking} />
            <EyewearSection products={products} onEnquireProduct={handleEnquireProduct} />
            <ServicesSection onBookService={handleNavigateToBooking} />
          </>
        )}

        {activePage === 'eyecheckup' && (
          <EyeCheckUpSection onBookCheckUp={handleNavigateToBooking} />
        )}

        {activePage === 'eyewear' && (
          <EyewearSection products={products} onEnquireProduct={handleEnquireProduct} />
        )}

        {activePage === 'fitting' && (
          <FrameFittingSection onBookFitting={handleNavigateToBooking} />
        )}

        {activePage === 'services' && (
          <ServicesSection showAllDefault={true} onBookService={handleNavigateToBooking} />
        )}

        {activePage === 'appointments' && (
          <AppointmentBooking preselectedService={preselectedService} />
        )}

        {activePage === 'about' && <AboutSection />}
        {activePage === 'contact' && <ContactSection />}
      </main>

      {/* Customer Footer & Global Overlays */}
      <Footer setActivePage={setActivePage} />
      <WhatsAppButton />
      <PosterModal 
        isOpen={showPosterModal} 
        onClose={() => setShowPosterModal(false)} 
        onBookNow={handleNavigateToBooking} 
      />
    </div>
  );
}
