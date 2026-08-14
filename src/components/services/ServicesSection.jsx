import React, { useState } from 'react';
import { SERVICES_DATA } from '../../data/services';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Stethoscope, Glasses, Maximize, RefreshCw, 
  Sun, Eye, Monitor, UserCheck, Clock, Check, ChevronRight, X 
} from 'lucide-react';

const ICON_MAP = {
  Stethoscope, Glasses, Maximize, RefreshCw, Sun, Eye, Monitor, UserCheck
};

export default function ServicesSection({ onBookService, showAllDefault = false }) {
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [displayCount, setDisplayCount] = useState(showAllDefault ? 8 : 6);
  const { t, formatPrice } = useLanguage();

  const visibleServices = SERVICES_DATA.slice(0, displayCount);

  const getServiceCostDisplay = (service) => {
    if (service.priceUSD === 0) {
      return service.estimatedCost;
    }
    const formatted = formatPrice(service.priceUSD);
    if (service.estimatedCost.startsWith('From')) {
      return `From ${formatted}`;
    }
    return formatted;
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-primary">{t('services_badge')}</div>
          <h2>{t('services_title')}</h2>
          <p>{t('services_desc')}</p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {visibleServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Stethoscope;
            return (
              <div key={service.id} className="card" style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent-light)',
                    color: 'var(--color-accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={26} />
                  </div>
                  <span className="badge badge-teal">{service.category}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.6rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {service.shortDesc}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '1rem',
                  marginTop: 'auto',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-muted)' }}>
                    <Clock size={14} /> {service.duration}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--color-accent-primary)' }}>
                    {getServiceCostDisplay(service)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ flex: 1 }}
                    onClick={() => setSelectedServiceModal(service)}
                  >
                    View Details
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => onBookService(service.title)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        {!showAllDefault && displayCount < SERVICES_DATA.length && (
          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => setDisplayCount(SERVICES_DATA.length)}
            >
              View All Services ({SERVICES_DATA.length}) <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="modal-backdrop" onClick={() => setSelectedServiceModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedServiceModal(null)}>
              <X size={20} />
            </button>

            <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
              {selectedServiceModal.category}
            </div>

            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>{selectedServiceModal.title}</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {selectedServiceModal.shortDesc}
            </p>

            <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
              Service Inclusions & Procedures:
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {selectedServiceModal.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.925rem', color: 'var(--color-text-secondary)' }}>
                  <Check size={18} color="var(--color-teal-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Estimated Duration</div>
                <div style={{ fontWeight: 600 }}>{selectedServiceModal.duration}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Consultation Fee</div>
                <div style={{ fontWeight: 700, color: 'var(--color-accent-primary)', fontSize: '1.1rem' }}>
                  {getServiceCostDisplay(selectedServiceModal)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setSelectedServiceModal(null)}>
                Close
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  const title = selectedServiceModal.title;
                  setSelectedServiceModal(null);
                  onBookService(title);
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
