import React, { useState } from 'react';
import { loginAdmin } from '../../services/authService';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft, KeyRound, Building2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const { t } = useLanguage();
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await loginAdmin(emailOrId, password);
    setIsSubmitting(false);

    if (res.success) {
      onLoginSuccess();
    } else {
      setError(res.message || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div style={{
      minHeight: '88vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: '#0f172a',
      color: '#ffffff'
    }}>
      <div className="card" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        backgroundColor: '#1e293b',
        border: '1px solid #334155'
      }}>
        {/* Header Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(217, 119, 6, 0.15)',
          color: 'var(--color-accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          border: '1px solid rgba(217, 119, 6, 0.3)'
        }}>
          <ShieldCheck size={32} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem', backgroundColor: 'var(--color-accent-primary)', color: '#ffffff' }}>
            <Building2 size={13} /> VISION X Administrative Portal
          </span>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.35rem' }}>Manager Sign In</h2>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            Access clinical patient records, stock inventory, and database systems.
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Manager Email / ID */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 600 }}>Manager ID / Email Address *</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text"
                className="form-input"
                placeholder="manager@visionx.com or manager_id"
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                style={{ 
                  paddingLeft: '2.5rem', 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  color: '#ffffff' 
                }}
                required
              />
              <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ color: '#cbd5e1', fontWeight: 600 }}>Password *</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  paddingLeft: '2.5rem', 
                  paddingRight: '2.5rem',
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  color: '#ffffff' 
                }}
                required
              />
              <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 700 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating with Supabase...' : 'Sign In to Manager Portal'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <button 
            onClick={onCancel}
            style={{
              fontSize: '0.875rem',
              color: '#94a3b8',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Return to Customer Website
          </button>
        </div>
      </div>
    </div>
  );
}
