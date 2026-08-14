import React, { useState, useRef, useEffect } from 'react';
import { Eye, Menu, X, Calendar, ShieldCheck, ChevronDown, ChevronRight, Globe, Glasses, Stethoscope, Sliders, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar({ activePage, setActivePage, isAdminView, setIsAdminView }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const dropdownRef = useRef(null);
  const { lang, changeLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
  ];

  // Services Dropdown Sub-Items
  const serviceSubItems = [
    {
      id: 'eyecheckup',
      titleKey: 'nav_dropdown_eyecheckup',
      desc: 'Digital Snellens, Auto-Refraction & Glaucoma Triage',
      icon: Eye,
      color: '#d97706'
    },
    {
      id: 'eyewear',
      titleKey: 'nav_dropdown_eyewear',
      desc: 'High-Power Lenses, Anti-Blue Optics & Titanium Frames',
      icon: Glasses,
      color: '#0284c7'
    },
    {
      id: 'fitting',
      titleKey: 'nav_dropdown_fitting',
      desc: '3D Pupillary Distance (PD) & Ergonomic Bridge Adjustment',
      icon: Sliders,
      color: '#0d9488'
    },
    {
      id: 'services',
      titleKey: 'nav_all_services',
      desc: 'View complete clinical & optical care directory',
      icon: Stethoscope,
      color: '#4f46e5'
    }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsAdminView(false);
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdmin = () => {
    setIsAdminView(!isAdminView);
    setMobileMenuOpen(false);
    setLangMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLangObj = languages.find(l => l.code === lang) || languages[0];
  const isServicesActive = ['services', 'eyecheckup', 'eyewear', 'fitting'].includes(activePage) && !isAdminView;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">

          {/* Minimalist VISION X Brand Logo */}
          <div 
            className="brand-logo" 
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div className="brand-icon-wrapper">
              <Eye size={22} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              VISION <span style={{ color: 'var(--color-accent-primary)' }}>X</span>
            </span>
          </div>

          {/* Minimalist Top Navigation Links */}
          <ul className="nav-links">
            {/* Home Link */}
            <li>
              <span 
                className={`nav-link ${activePage === 'home' && !isAdminView ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                {t('nav_home')}
              </span>
            </li>

            {/* Services Link with Minimalist Dropdown Menu */}
            <li 
              ref={dropdownRef} 
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`nav-link ${isServicesActive ? 'active' : ''}`}
                onClick={() => handleNavClick('services')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: 'none', background: 'none' }}
              >
                <span>{t('nav_services')}</span>
                <ChevronDown size={14} style={{ transition: 'transform var(--transition-fast)', transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              {/* Mega Minimalist Dropdown Card */}
              {servicesDropdownOpen && (
                <div className="services-dropdown-card">
                  <div className="services-dropdown-inner">
                    {serviceSubItems.map((sub) => {
                      const Icon = sub.icon;
                      const isSubActive = activePage === sub.id && !isAdminView;
                      return (
                        <div
                          key={sub.id}
                          className={`dropdown-item ${isSubActive ? 'dropdown-item-active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick(sub.id);
                          }}
                        >
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: `${sub.color}15`,
                            color: sub.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: isSubActive ? 'var(--color-accent-primary)' : 'var(--color-text-primary)' }}>
                              {t(sub.titleKey)}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
                              {sub.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>

            {/* About Link */}
            <li>
              <span 
                className={`nav-link ${activePage === 'about' && !isAdminView ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                {t('nav_about')}
              </span>
            </li>

            {/* Contact Link */}
            <li>
              <span 
                className={`nav-link ${activePage === 'contact' && !isAdminView ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                {t('nav_contact')}
              </span>
            </li>
          </ul>

          {/* Minimalist Action Controls */}
          <div className="nav-actions">
            
            {/* Language Switcher Pill */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="lang-switcher-pill"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                title="Select Language / भाषा छान्नुहोस् / भाषा चुनें"
              >
                <Globe size={14} color="var(--color-accent-primary)" />
                <span>{activeLangObj.flag} {activeLangObj.code.toUpperCase()}</span>
                <ChevronDown size={12} color="var(--color-text-muted)" />
              </button>

              {langMenuOpen && (
                <div className="lang-dropdown-card">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`lang-option-btn ${lang === l.code ? 'active' : ''}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Manager Panel Toggle Button */}
            <button 
              className={`admin-toggle-btn ${isAdminView ? 'active' : ''}`}
              onClick={handleToggleAdmin}
              title="Toggle Manager & Database Dashboard"
            >
              <ShieldCheck size={16} />
              <span className="admin-btn-text">{isAdminView ? t('nav_customer_site') : t('nav_manager')}</span>
            </button>

            {/* Minimalist Book Appointment CTA */}
            <button 
              className="btn btn-primary btn-sm nav-cta-btn"
              onClick={() => handleNavClick('appointments')}
            >
              <Calendar size={15} />
              <span>{t('nav_book')}</span>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer with Accordion Services */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Language selector pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => changeLanguage(l.code)}
              style={{
                flex: 1,
                padding: '0.45rem 0',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                backgroundColor: lang === l.code ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
                color: lang === l.code ? '#fff' : 'var(--color-text-primary)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>

        <ul className="mobile-nav-links">
          {/* Home */}
          <li>
            <div className="mobile-nav-link" onClick={() => handleNavClick('home')}>
              <span>{t('nav_home')}</span>
              <ChevronRight size={18} color="var(--color-text-muted)" />
            </div>
          </li>

          {/* Services Group Dropdown */}
          <li>
            <div 
              className="mobile-nav-link" 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}
            >
              <span>{t('nav_services')}</span>
              <ChevronDown size={18} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform var(--transition-fast)' }} />
            </div>

            {/* Nested Services Links */}
            {mobileServicesOpen && (
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                {serviceSubItems.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <div 
                      key={sub.id} 
                      onClick={() => handleNavClick(sub.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.6rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: activePage === sub.id ? 'var(--color-accent-light)' : 'var(--color-bg-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      <Icon size={18} color={sub.color} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{t(sub.titleKey)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </li>

          {/* About */}
          <li>
            <div className="mobile-nav-link" onClick={() => handleNavClick('about')}>
              <span>{t('nav_about')}</span>
              <ChevronRight size={18} color="var(--color-text-muted)" />
            </div>
          </li>

          {/* Contact */}
          <li>
            <div className="mobile-nav-link" onClick={() => handleNavClick('contact')}>
              <span>{t('nav_contact')}</span>
              <ChevronRight size={18} color="var(--color-text-muted)" />
            </div>
          </li>
        </ul>

        {/* Drawer Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary"
            onClick={() => handleNavClick('appointments')}
          >
            <Calendar size={18} />
            {t('nav_book')}
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={handleToggleAdmin}
          >
            <ShieldCheck size={18} />
            {isAdminView ? t('nav_customer_site') : t('nav_manager')}
          </button>
        </div>
      </div>
    </nav>
  );
}
