import React from 'react';
import { DOCTORS_DATA } from '../../data/doctors';
import { Eye, Target, Compass, Award, ShieldCheck, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-primary">About Our Clinic</div>
          <h2>Pioneering Ophthalmic Excellence & Eyewear</h2>
          <p>
            Established with a commitment to visual perfection, Lumina Eye Care Center combines medical expertise with cutting-edge optical technology to deliver unmatched vision care.
          </p>
        </div>

        {/* Introduction & Vision/Mission Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* Mission Card */}
          <div className="card">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-accent-light)',
              color: 'var(--color-accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Our Mission</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              To provide early ocular health detection, sub-millimeter prescription accuracy, and luxury handcrafted eyewear that enhances our patients' quality of life and visual freedom.
            </p>
          </div>

          {/* Vision Card */}
          <div className="card">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-teal-light)',
              color: 'var(--color-teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Compass size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Our Vision</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              To set the benchmark for modern eye care centers worldwide by seamlessly integrating clinical optometry, digital refraction technology, and ergonomic frame design.
            </p>
          </div>

          {/* Customer Focus Card */}
          <div className="card">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warning-light)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Patient-First Philosophy</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Every patient receives unhurried consultations, personalized lens recommendations, and lifetime complimentary frame care to ensure long-term eye health and satisfaction.
            </p>
          </div>
        </div>

        {/* Doctor & Specialist Team Grid */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="badge badge-teal">Our Clinical Specialists</div>
            <h3 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>Meet Our Optometrists & Ophthalmologists</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {DOCTORS_DATA.map((doc) => (
              <div key={doc.id} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1.25rem auto',
                  border: '3px solid var(--color-accent-light)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img src={doc.image} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{doc.name}</h4>
                <div style={{ color: 'var(--color-accent-primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  {doc.title}
                </div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {doc.specialty}
                </div>
                <span className="badge badge-teal" style={{ fontSize: '0.75rem' }}>
                  {doc.experience}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
