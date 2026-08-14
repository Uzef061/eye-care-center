import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages / Sections
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

// Admin
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

// Auth & Data Services
import { isAuthenticatedAdmin } from './services/authService';
import { getProducts } from './services/productService';
import { getCustomersDB, getStocksDB } from './services/databaseService';

import './styles/main.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const list = await getProducts();
    setProducts(list);
  };

  // On mount, check existing session
  useEffect(() => {
    setIsAuthenticated(isAuthenticatedAdmin());
    getCustomersDB();
    getStocksDB();
    loadProducts();
  }, []);

  // Refresh products when navigating back from admin
  useEffect(() => {
    loadProducts();
  }, [activePage, isAdminView]);

  const handleNavigateToBooking = (serviceName = 'Eye Check-Up') => {
    setPreselectedService(serviceName);
    setActivePage('appointments');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireProduct = (product) => {
    setPreselectedService(`Power Glasses / ${product.category}: ${product.name}`);
    setActivePage('appointments');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetAdminView = (val) => {
    if (typeof val === 'function') {
      setIsAdminView(val);
    } else {
      setIsAdminView(Boolean(val));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelLogin = () => {
    setIsAdminView(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar — always visible with functional navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        isAdminView={isAdminView}
        setIsAdminView={handleSetAdminView}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {isAdminView ? (
          // ── Admin gate: show login if not authenticated, dashboard if authenticated ──
          isAuthenticated ? (
            <AdminDashboard
              onExitAdmin={() => { setIsAdminView(false); setActivePage('home'); }}
              onLogout={handleLogout}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={handleLoginSuccess}
              onCancel={handleCancelLogin}
            />
          )
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* Footer */}
      {!isAdminView && (
        <Footer setActivePage={setActivePage} setIsAdminView={handleSetAdminView} />
      )}
    </div>
  );
}
