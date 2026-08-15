import React, { useState } from 'react';
import { ShieldCheck, LogOut, Globe, ExternalLink, Database, ChevronDown } from 'lucide-react';
import { logoutAdmin } from '../../services/authService';
import { useLanguage } from '../../context/LanguageContext';

export default function ManagerPortalHeader({ onLogout, onNavigateToCustomer }) {
  const { lang, changeLanguage } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' }
  ];

  const activeLangObj = languages.find(l => l.code === lang) || languages[0];

  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  return (
    <header style={{
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b',
      color: '#ffffff',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Manager Portal Title Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-accent-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              VISION <span style={{ color: 'var(--color-accent-primary)' }}>X</span>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#1e293b', color: '#cbd5e1', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid #334155', fontWeight: 600 }}>
                MANAGER PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>

          {/* Database Live Sync Status */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            <Database size={13} />
            <span>Supabase Cloud Active</span>
          </div>

          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Globe size={14} color="var(--color-accent-primary)" />
              <span>{activeLangObj.flag} {activeLangObj.code.toUpperCase()}</span>
              <ChevronDown size={12} color="#94a3b8" />
            </button>

            {langMenuOpen && (
              <div className="lang-dropdown-card" style={{ zIndex: 1100 }}>
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

          {/* View Customer Website Link */}
          <button
            onClick={onNavigateToCustomer}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#cbd5e1',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ExternalLink size={14} /> Customer Site
          </button>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
