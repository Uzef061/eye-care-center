import React from 'react';
import { Award, Stethoscope, MapPin, Calendar, CheckCircle2, Building2 } from 'lucide-react';

export default function DoctorProfile({ onBookClick }) {
  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center'
        }}>
          {/* Doctor Portrait Image Card - Perfectly Aligned */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--color-border)',
              backgroundColor: '#f8fafc',
              position: 'relative'
            }}>
              {/* Clean Image Display without harsh text overlay covering the face */}
              <div style={{ width: '100%', height: '480px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' }}>
                <img 
                  src="/dr-umer-sadiq.jpg" 
                  alt="UMER AHMAD SADIQ - Senior Ophthalmologist"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center 15%',
                    display: 'block' 
                  }}
                />
              </div>

              {/* Doctor Quick Badge Below Photo */}
              <div style={{ 
                padding: '1.25rem 1.5rem', 
                backgroundColor: '#ffffff', 
                borderTop: '1px solid var(--color-border-subtle)',
                textAlign: 'center'
              }}>
                <span className="badge badge-primary" style={{ marginBottom: '0.4rem', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-primary)' }}>
                  Senior Ophthalmologist
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-text-primary)', marginBottom: '0.2rem', fontWeight: 800 }}>
                  UMER AHMAD SADIQ
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                  <Building2 size={16} color="var(--color-accent-primary)" /> Fateh Bal EYE Hospital
                </p>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '-15px',
              backgroundColor: 'var(--color-accent-primary)',
              color: '#ffffff',
              padding: '0.75rem 1.15rem',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 8px 20px rgba(217, 119, 6, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontWeight: 700,
              zIndex: 2
            }}>
              <Award size={26} />
              <div>
                <div style={{ fontSize: '1.15rem', lineHeight: 1 }}>28+ Years</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 500, opacity: 0.95 }}>Clinical Practice</div>
              </div>
            </div>
          </div>

          {/* Doctor Bio & Clinical Qualifications */}
          <div>
            <div className="badge badge-teal" style={{ marginBottom: '1rem' }}>
              <Stethoscope size={14} /> Lead Ophthalmic Specialist
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
              UMER AHMAD SADIQ
            </h2>

            <div style={{
              fontSize: '1.05rem',
              color: 'var(--color-accent-primary)',
              fontWeight: 700,
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Building2 size={20} /> Senior Ophthalmologist — Fateh Bal EYE Hospital
            </div>

            <p style={{ fontSize: '1.025rem', color: 'var(--color-text-secondary)', lineHeight: '1.65', marginBottom: '1.75rem' }}>
              With over <strong>28 years of clinical and surgical eye care experience</strong> at <strong>Fateh Bal EYE Hospital</strong>, Dr. UMER AHMAD SADIQ provides specialized ophthalmic examinations, advanced refraction testing, glaucoma triage, and personalized vision correction solutions for patients across Nepalgunj and Banke district.
            </p>

            {/* Specialties & Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                "28+ Years Medical Practice",
                "Fateh Bal EYE Hospital Specialist",
                "Comprehensive Refraction Exams",
                "Advanced Retinal Diagnostics",
                "Prescription Power Optics",
                "Nepalgunj-3, Banke Center"
              ].map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={18} color="var(--color-accent-primary)" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Direct Consultation Schedule */}
            <div style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--color-accent-primary)" /> Clinic Location & Hours:
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                <div>📍 <strong>Location:</strong> <a href="https://maps.app.goo.gl/tH34rbEju7Ts3YNw6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-primary)', fontWeight: 600 }}>Nepalgunj-3, Banke (Open Pin ↗)</a></div>
                <div>🕒 <strong>Sun - Fri:</strong> 04:00 PM - 09:00 PM | <strong>Sat:</strong> 10:00 AM - 09:00 PM</div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              className="btn btn-primary"
              onClick={() => onBookClick('Ophthalmology Consult with Dr. Umer Ahmad Sadiq')}
              style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}
            >
              <Calendar size={18} /> Book Consultation with Dr. Sadiq
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
