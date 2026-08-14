import React, { useState } from 'react';
import { loginAdmin } from '../../services/authService';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('visionx2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsSubmitting(false);

      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: 'var(--color-bg-secondary)'
    }}>
      <div className="card" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative'
      }}>
        {/* Header Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-light)',
          color: 'var(--color-accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <Lock size={28} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={14} /> {t('admin_login_badge')}
          </span>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-text-primary)' }}>{t('admin_login_title')}</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            {t('admin_login_desc')}
          </p>
        </div>

        {/* Demo Credentials Hint Box */}
        <div style={{
          backgroundColor: 'var(--color-accent-light)',
          borderLeft: '4px solid var(--color-accent-primary)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          fontSize: '0.825rem',
          color: 'var(--color-accent-hover)'
        }}>
          <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <KeyRound size={14} /> Demo Manager Credentials:
          </div>
          <div>Username: <strong>admin</strong> | Password: <strong>visionx2026</strong></div>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form-group">
            <label className="form-label">{t('admin_username')}</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                required
              />
              <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">{t('admin_password')}</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                required
              />
              <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', fontSize: '1rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : t('admin_login_btn')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={onCancel}
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ArrowLeft size={16} /> {t('admin_back_btn')}
          </button>
        </div>
      </div>
    </div>
  );
}
