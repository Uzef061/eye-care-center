import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';

export default function PosterModal({ isOpen, onClose, onBookNow }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only render on mobile devices (width <= 768px)
  if (!isOpen || !isMobile) return null;

  return (
    <div 
      className="modal-backdrop mobile-poster-backdrop" 
      onClick={onClose}
      style={{
        zIndex: 10000,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#ffffff',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          animation: 'posterPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Close Icon Button */}
        <button 
          onClick={onClose}
          aria-label="Close Poster"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            color: '#ffffff',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s ease, backgroundColor 0.2s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d97706'; e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <X size={20} />
        </button>

        {/* Poster Image Container */}
        <div style={{
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#0f172a',
          marginBottom: '1rem'
        }}>
          <img 
            src="/clinic-poster.jpg" 
            alt="VISION X आँखा उपचार केन्द्र - उमेर अहमद सादिक"
            style={{ 
              width: '100%', 
              maxHeight: '68vh', 
              objectFit: 'contain', 
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>

        {/* Action Buttons Below Poster */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-primary"
            style={{ flex: 1.5, padding: '0.75rem 1rem', fontSize: '0.9rem' }}
            onClick={() => {
              onClose();
              onBookNow('Comprehensive Eye Check-Up');
            }}
          >
            <Calendar size={16} /> Book Appointment
          </button>
          <button 
            className="btn btn-secondary"
            style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.875rem' }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
