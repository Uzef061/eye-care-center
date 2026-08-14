import React from 'react';
import { UserCheck, Shield, Sparkles, Truck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function TrustFeatures() {
  const { t } = useLanguage();

  const features = [
    {
      icon: UserCheck,
      title: t('trust_certified_doc'),
      desc: t('trust_certified_doc_desc')
    },
    {
      icon: Shield,
      title: t('trust_power_lenses'),
      desc: t('trust_power_lenses_desc')
    },
    {
      icon: Sparkles,
      title: t('trust_titanium'),
      desc: t('trust_titanium_desc')
    },
    {
      icon: Truck,
      title: t('trust_delivery'),
      desc: t('trust_delivery_desc')
    }
  ];

  return (
    <section className="section-padding" style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-subtle)',
                transition: 'transform var(--transition-fast)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-accent-light)',
                  color: 'var(--color-accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
