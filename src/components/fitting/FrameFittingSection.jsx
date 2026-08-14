import React from 'react';
import { Sliders, Maximize, UserCheck, Shield, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export default function FrameFittingSection({ onBookFitting }) {
  const steps = [
    {
      num: "01",
      title: "Anthropometric Frame Selection",
      desc: "Analyzing your cheekbone structure, pupil center alignment, and temple width to select frame proportions that complement your face geometry."
    },
    {
      num: "02",
      title: "Face-Fit & Optical Center Marking",
      desc: "Digital laser pupillometer measurement to align the optical center of your prescription lenses directly over your pupil axis."
    },
    {
      num: "03",
      title: "Custom Size & Bridge Adjustment",
      desc: "Precise frame bridge contouring to prevent slippage and ensure balanced weight distribution across the nasal bridge."
    },
    {
      num: "04",
      title: "Nose-Pad Customization",
      desc: "Replacing or angling silicone/titanium nose-pads to eliminate pressure points, red marks, and uneven frame tilt."
    },
    {
      num: "05",
      title: "Temple & Ear Curve Shaping",
      desc: "Warming thermo-plastic or flexing titanium temple arms behind the ear to create a secure, non-pinch grip."
    },
    {
      num: "06",
      title: "Final Comfort & Pantoscopic Check",
      desc: "Verifying pantoscopic tilt angle (8-12°) and vertex distance so reading corridors and progressive focal points feel natural."
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-teal">Precision Fitting Services</div>
          <h2>Custom Frame Fitting & Ergonomics</h2>
          <p>
            Even the highest quality prescription lenses will cause visual fatigue if the frame is misaligned. Our master opticians tailor every angle for absolute visual clarity and pressure-free comfort.
          </p>
        </div>

        {/* 6 Step Interactive Process Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {steps.map((item, idx) => (
            <div key={idx} className="card" style={{ position: 'relative' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span className="badge badge-primary">Step {item.num}</span>
                <Sliders size={20} color="var(--color-accent-primary)" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Fitting Benefits & Book CTA */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Why Choose Professional Frame Fitting?</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--color-teal-primary)" /> Eliminates headaches and nose pressure marks
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--color-teal-primary)" /> Keeps progressive lenses aligned with line of sight
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--color-teal-primary)" /> Prevents glasses from sliding down when reading or typing
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-secondary)' }}>
                <CheckCircle2 size={18} color="var(--color-teal-primary)" /> Includes complimentary ultrasonic frame maintenance
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', backgroundColor: 'var(--color-accent-light)', padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '1.25rem', color: 'var(--color-accent-hover)', marginBottom: '0.5rem' }}>
              Schedule Your In-Store Custom Fitting Session
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Complimentary with any frame purchase, or book a standalone adjustment session.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => onBookFitting("Frame Fitting")}
              style={{ width: '100%' }}
            >
              <Calendar size={18} /> Book Fitting Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
