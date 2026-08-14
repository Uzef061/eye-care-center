import React from 'react';
import { Eye, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer({ setActivePage, setIsAdminView }) {
  const { t } = useLanguage();

  const handleLinkClick = (pageId) => {
    setActivePage(pageId);
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#1c1917', color: '#a8a29e', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* VISION X Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Eye size={22} />
              </div>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                VISION <span style={{ color: 'var(--color-accent-primary)' }}>X</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#a8a29e' }}>
              {t('footer_desc')}
            </p>
            <button 
              className="admin-toggle-btn"
              onClick={() => {
                setIsAdminView(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
            >
              <ShieldCheck size={16} /> {t('nav_manager')}
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('home')}>{t('nav_home')}</li>
              <li style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('eyecheckup')}>{t('nav_eyecheckup')}</li>
              <li style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('eyewear')}>{t('nav_eyewear')}</li>
              <li style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('fitting')}>{t('nav_fitting')}</li>
              <li style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('services')}>{t('nav_services')}</li>
              <li style={{ cursor: 'pointer' }} onClick={() => handleLinkClick('appointments')}>{t('nav_book')}</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>{t('footer_hours')}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--color-accent-primary)" /> Sunday - Friday: 04:00 PM - 09:00 PM
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--color-accent-primary)" /> Saturday: 10:00 AM - 09:00 PM
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>{t('footer_contact')}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={18} color="var(--color-accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Nepalgunj-3, Banke</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={18} color="var(--color-accent-primary)" style={{ flexShrink: 0 }} />
                <a href="tel:+9779800559582" style={{ color: '#a8a29e' }}>+977 9800559582</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={18} color="var(--color-accent-primary)" style={{ flexShrink: 0 }} />
                <a href="mailto:usadiq79@gmail.com" style={{ color: '#a8a29e' }}>usadiq79@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1.75rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
          <div>
            © {new Date().getFullYear()} VISION X Eye Care & Optical Center. Nepalgunj-3, Banke.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Powered by <Heart size={14} color="var(--color-accent-primary)" fill="var(--color-accent-primary)" /> Precision Ophthalmic Care.
          </div>
        </div>
      </div>
    </footer>
  );
}
