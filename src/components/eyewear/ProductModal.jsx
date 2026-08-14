import React from 'react';
import { X, CheckCircle2, XCircle, ShoppingBag, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductModal({ product, onClose, onEnquire }) {
  const { t, formatPrice } = useLanguage();
  if (!product) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Image Column */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              marginBottom: '1rem',
              backgroundColor: 'var(--color-bg-secondary)'
            }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            
            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {product.tags?.map((tag, idx) => (
                <span key={idx} className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-teal">{product.category}</span>
              {product.available ? (
                <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={14} /> {t('eyewear_in_stock')}
                </span>
              ) : (
                <span className="badge badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <XCircle size={14} /> {t('eyewear_out_of_stock')}
                </span>
              )}
            </div>

            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{product.name}</h2>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent-primary)', marginBottom: '1.25rem' }}>
              {formatPrice(product.price)}
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {product.description}
            </p>

            {/* Specifications Box */}
            <div style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              <div style={{ marginBottom: '0.6rem' }}>
                <strong>Frame Type:</strong> {product.frameType || 'Standard Ergonomic'}
              </div>
              <div style={{ marginBottom: '0.6rem' }}>
                <strong>Lens Options:</strong> {product.lensOptions?.join(', ') || 'Custom Prescription'}
              </div>
              <div>
                <strong>Available Sizes:</strong> {product.availableSizes?.join(', ') || 'Universal'}
              </div>
            </div>

            {/* Prescription Warning Box */}
            <div style={{
              backgroundColor: 'var(--color-accent-light)',
              borderLeft: '3px solid var(--color-accent-primary)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              fontSize: '0.825rem',
              color: 'var(--color-accent-hover)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem'
            }}>
              <HelpCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Prescription Notice:</strong> Final lens power and cylinder specifications will be verified by our certified optometrist during your fitting appointment.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
                Close
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1.5 }}
                disabled={!product.available}
                onClick={() => {
                  onClose();
                  onEnquire(product);
                }}
              >
                <ShoppingBag size={18} /> {product.available ? t('eyewear_enquire') : t('eyewear_out_of_stock')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
