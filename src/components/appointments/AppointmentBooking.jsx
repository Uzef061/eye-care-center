import React, { useState, useEffect } from 'react';
import { saveAppointment } from '../../services/appointmentService';
import MedicalDisclaimer from '../common/MedicalDisclaimer';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, AlertCircle, Sparkles, Printer, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AppointmentBooking({ preselectedService = "" }) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '10:00 AM',
    service: preselectedService || 'Eye Check-Up',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationPass, setConfirmationPass] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const serviceOptions = [
    "Eye Check-Up",
    "Power Glasses",
    "Frame Fitting",
    "Lens Consultation",
    "Contact Lens Consultation",
    "Other"
  ];

  const timeSlots = [
    "09:00 AM", "09:45 AM", "10:30 AM", "11:15 AM",
    "01:30 PM", "02:15 PM", "03:00 PM", "04:30 PM", "05:30 PM"
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (formData.phone.replace(/\D/g, '').length < 7) errs.phone = "Please enter a valid phone number";
    
    if (!formData.email.trim()) errs.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Please enter a valid email address";

    if (!formData.date) errs.date = "Preferred appointment date is required";
    else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errs.date = "Appointment date cannot be in the past";
    }

    if (!formData.service) errs.service = "Please select a service";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const created = await saveAppointment(formData);
      setIsSubmitting(false);
      setConfirmationPass(created);
      // Reset Form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        date: '',
        time: '10:00 AM',
        service: 'Eye Check-Up',
        notes: ''
      });
      setErrors({});
    } catch (err) {
      console.error("Failed to save appointment:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <MedicalDisclaimer />

          <div className="section-header" style={{ marginBottom: '2.5rem' }}>
            <div className="badge badge-primary">{t('appt_badge')}</div>
            <h2>{t('appt_title')}</h2>
            <p>{t('appt_desc')}</p>
          </div>

          {/* Form Card */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">{t('form_fullname')}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  {errors.fullName && <div className="form-error"><AlertCircle size={14} /> {errors.fullName}</div>}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label">{t('form_phone')}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="tel"
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <Phone size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  {errors.phone && <div className="form-error"><AlertCircle size={14} /> {errors.phone}</div>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label">{t('form_email')}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email"
                      className="form-input"
                      placeholder="eleanor@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  {errors.email && <div className="form-error"><AlertCircle size={14} /> {errors.email}</div>}
                </div>

                {/* Service Required */}
                <div className="form-group">
                  <label className="form-label">{t('form_service')}</label>
                  <select 
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.service && <div className="form-error">{errors.service}</div>}
                </div>

                {/* Preferred Date */}
                <div className="form-group">
                  <label className="form-label">{t('form_date')}</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ paddingLeft: '2.5rem' }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                  {errors.date && <div className="form-error"><AlertCircle size={14} /> {errors.date}</div>}
                </div>

                {/* Preferred Time */}
                <div className="form-group">
                  <label className="form-label">{t('form_time')}</label>
                  <div style={{ position: 'relative' }}>
                    <select 
                      className="form-select"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ paddingLeft: '2.5rem' }}
                    >
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                    <Clock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              {/* Additional Message / Notes */}
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label">{t('form_notes')}</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  placeholder="e.g. Experiencing blurry vision at night, renewal of power glasses, dry eyes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.05rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('form_submitting') : t('form_submit')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Pass Modal */}
      {confirmationPass && (
        <div className="modal-backdrop" onClick={() => setConfirmationPass(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <button className="modal-close-btn" onClick={() => setConfirmationPass(null)}>
              <X size={20} />
            </button>

            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-light)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>
              Booking Confirmed
            </span>

            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{t('form_success_title')}</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              {t('form_success_desc')}
            </p>

            {/* Ticket Pass Preview */}
            <div style={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '2px dashed var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              textAlign: 'left',
              marginBottom: '1.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{t('ticket_ref')}</span>
                <span style={{ fontWeight: 800, color: 'var(--color-accent-primary)', fontSize: '1.1rem' }}>{confirmationPass.id}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('ticket_patient')}</div>
                  <div style={{ fontWeight: 600 }}>{confirmationPass.fullName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('ticket_service')}</div>
                  <div style={{ fontWeight: 600 }}>{confirmationPass.service}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('ticket_date')}</div>
                  <div style={{ fontWeight: 600 }}>{confirmationPass.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{t('ticket_time')}</div>
                  <div style={{ fontWeight: 600 }}>{confirmationPass.time}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn-secondary" 
                style={{ flex: 1 }}
                onClick={() => window.print()}
              >
                <Printer size={16} /> {t('ticket_print')}
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => setConfirmationPass(null)}
              >
                {t('ticket_done')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
