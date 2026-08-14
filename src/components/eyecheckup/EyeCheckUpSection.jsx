import React from 'react';
import MedicalDisclaimer from '../common/MedicalDisclaimer';
import { Eye, Stethoscope, Sliders, Calendar, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function EyeCheckUpSection({ onBookCheckUp }) {
  const { t } = useLanguage();

  const steps = [
    {
      step: "01",
      title: t('checkup_feat_1'),
      desc: "Digital Snellen chart testing to measure distance and near visual clarity, identifying myopia, hyperopia, and astigmatism.",
      icon: Eye
    },
    {
      step: "02",
      title: t('checkup_feat_2'),
      desc: "Computerized auto-refractor & phoropter alignment to pinpoint precise sphere (SPH), cylinder (CYL), and axis values.",
      icon: Sliders
    },
    {
      step: "03",
      title: t('checkup_feat_3'),
      desc: "High-magnification slit-lamp biomicroscopy of cornea, sclera, lens, and non-contact tonometer pressure check for early glaucoma detection.",
      icon: Stethoscope
    },
    {
      step: "04",
      title: t('checkup_feat_4'),
      desc: "Expert review of your visual demands (computer work, driving, reading) to recommend single vision, progressive, or blue-light protective optics.",
      icon: FileText
    },
    {
      step: "05",
      title: "Frame & Lens Recommendation",
      desc: "Anthropometric facial contouring and Pupillary Distance (PD) measurement to pair your prescription with perfectly aligned frames.",
      icon: CheckCircle2
    },
    {
      step: "06",
      title: "Follow-Up & Preventive Care",
      desc: "Scheduled check-ins to evaluate visual comfort, lens adaptation, tear film hydration, and annual eye wellness tracking.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Prominent Medical & Ophthalmic Disclaimer */}
        <MedicalDisclaimer />

        {/* Section Header */}
        <div className="section-header">
          <div className="badge badge-teal">{t('checkup_badge')}</div>
          <h2>{t('checkup_title')}</h2>
          <p>{t('checkup_desc')}</p>
        </div>

        {/* Examination Process Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.25rem',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--color-bg-tertiary)',
                  lineHeight: 1
                }}>
                  {item.step}
                </div>

                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-teal-light)',
                  color: 'var(--color-teal-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.6rem', paddingRight: '2rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.55' }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call-to-Action Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-text-primary) 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              {t('checkup_title')}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: '1.6' }}>
              {t('checkup_desc')}
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => onBookCheckUp("Comprehensive Eye Check-Up")}
            style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }}
          >
            <Calendar size={20} /> {t('checkup_book_now')}
          </button>
        </div>
      </div>
    </section>
  );
}
