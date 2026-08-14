import React from 'react';
import { Calendar, Glasses, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero({ onBookClick, onExploreClick }) {
  const { t } = useLanguage();

  return (
    <section style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #fffbe0 50%, #fef3c7 100%)',
      padding: '5rem 0 4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Warm Golden Glow Orb */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '480px',
        height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Left Column Text Content */}
          <div>
            <div className="badge badge-primary" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} /> {t('hero_badge')}
            </div>

            <h1 style={{
              fontSize: 'clamp(2.3rem, 5vw, 3.5rem)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}>
              {t('hero_title_1')}<span style={{ color: 'var(--color-accent-primary)' }}>{t('hero_title_highlight')}</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2.25rem',
              maxWidth: '560px'
            }}>
              {t('hero_desc')}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button className="btn btn-primary" onClick={onBookClick}>
                <Calendar size={18} />
                {t('hero_book_btn')}
              </button>
              
              <button className="btn btn-secondary" onClick={onExploreClick}>
                <Glasses size={18} />
                {t('hero_explore_btn')}
              </button>
            </div>

            {/* Micro Trust Highlights */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '1.5rem',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-accent-primary)" /> {t('hero_accuracy')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="var(--color-accent-primary)" /> {t('hero_certified')}
              </div>
            </div>
          </div>

          {/* Right Column Image Visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '4px solid #ffffff',
              position: 'relative'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=900" 
                alt="Doctor performing digital eye check up exam"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(28, 25, 23, 0.4) 0%, transparent 60%)'
              }} />
            </div>

            {/* Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '20px',
              background: '#ffffff',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'var(--color-accent-light)',
                color: 'var(--color-accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                15k+
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{t('hero_patients_count')}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{t('hero_retinal_diag')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
