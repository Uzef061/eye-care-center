import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-primary">Get in Touch</div>
          <h2>Contact VISION X Eye Care Center</h2>
          <p>
            Have a question about your power glasses prescription, appointment availability, or frame fittings? Our vision care team in Nepalgunj is ready to assist you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* Contact Details & Info */}
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Clinic Location & Contact</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Main Optical Center</strong>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Nepalgunj-3, Banke, Nepal</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Phone Appointments & Direct Line</strong>
                    <a href="tel:+9779800559582" style={{ color: 'var(--color-accent-primary)', fontWeight: 700 }}>+977 9800559582</a>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Call or WhatsApp for Direct Consultations</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Email Address</strong>
                    <a href="mailto:usadiq79@gmail.com" style={{ color: 'var(--color-accent-primary)', fontWeight: 600 }}>usadiq79@gmail.com</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)' }}>Clinic Consultation Hours</strong>
                    <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Sunday - Friday: 04:00 PM - 09:00 PM</span>
                    <span style={{ color: 'var(--color-text-secondary)', display: 'block' }}>Saturday: 10:00 AM - 09:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Location Embed for Nepalgunj, Banke */}
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '240px',
              backgroundColor: '#e2e8f0',
              position: 'relative',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border)'
            }}>
              <iframe
                title="VISION X Nepalgunj Map Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Nepalgunj-3,+Banke,+Nepal&t=&z=14&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
              />
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Send Us a Message</h3>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Message Received!</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  Thank you for reaching out to VISION X Eye Care. Our clinic representative will get back to you shortly.
                </p>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSubmitted(false);
                    setContactForm({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ backgroundColor: 'var(--color-danger-light)', color: 'var(--color-danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="Full Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email"
                    className="form-input"
                    placeholder="email@domain.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="e.g. Eye check-up / Prescription help"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea 
                    className="form-textarea"
                    rows={4}
                    placeholder="How can our vision team help you today?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
