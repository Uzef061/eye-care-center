/**
 * VISION X — Appointment Service
 * Uses Supabase PostgreSQL as the primary store.
 * Synchronizes with Cloud Database & provides local fallback.
 */
import { supabase } from '../lib/supabase.js';
import { saveCustomerDB } from './databaseService.js';

const TABLE = 'appointments';
const LS_KEY = 'visionx_appointments';

const DEFAULT_APPOINTMENTS = [
  {
    id: 'VX-94821', fullName: 'Eleanor Vance',   phone: '+1 (555) 234-5678', email: 'eleanor.vance@example.com',
    date: '2026-08-16', time: '10:30 AM', service: 'Comprehensive Eye Check-Up',
    notes: 'Requires updated prescription for progressive lenses.', status: 'Confirmed', createdAt: new Date().toISOString()
  },
  {
    id: 'VX-94822', fullName: 'Marcus Sterling', phone: '+1 (555) 876-5432', email: 'm.sterling@example.com',
    date: '2026-08-17', time: '02:15 PM', service: 'Power Glasses',
    notes: 'High cylinder astigmatism check.', status: 'Pending', createdAt: new Date().toISOString()
  },
  {
    id: 'VX-94823', fullName: 'Sophia Chen',     phone: '+1 (555) 345-6789', email: 'sophia.chen@example.com',
    date: '2026-08-18', time: '11:00 AM', service: 'Frame Fitting',
    notes: 'New titanium frame bridge adjustment.', status: 'Confirmed', createdAt: new Date().toISOString()
  }
];

/* ── Row ↔ App object mappers ── */
const toApp = (row) => ({
  id: row.id,
  fullName: row.full_name,
  phone: row.phone,
  email: row.email,
  date: row.date,
  time: row.time,
  service: row.service,
  notes: row.notes,
  status: row.status,
  createdAt: row.created_at
});

const toRow = (app) => ({
  id: app.id || 'VX-' + Math.floor(10000 + Math.random() * 90000),
  full_name: app.fullName,
  phone: app.phone || '',
  email: app.email || '',
  date: app.date || '',
  time: app.time || '',
  service: app.service || '',
  notes: app.notes || '',
  status: app.status || 'Pending'
});

/* ── localStorage helpers ── */
const lsGet = () => {
  try {
    const d = localStorage.getItem(LS_KEY);
    return d ? JSON.parse(d) : DEFAULT_APPOINTMENTS;
  } catch { return DEFAULT_APPOINTMENTS; }
};
const lsSet = (data) => { try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {} };

/* ════════════════════════════════════════════
   PUBLIC API — all functions return Promises
   ════════════════════════════════════════════ */

export const getAppointments = async () => {
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
    if (!error && data) {
      const apptList = data.map(toApp);
      if (apptList.length > 0) {
        lsSet(apptList);
        return apptList;
      }
    }
    if (error) console.warn('[Supabase] getAppointments warning:', error.message);
  }
  return lsGet();
};

export const saveAppointment = async (appointmentData) => {
  const row = toRow(appointmentData);
  if (supabase) {
    const { data, error } = await supabase.from(TABLE).upsert(row).select();
    if (!error && data && data.length > 0) {
      const savedAppt = toApp(data[0]);
      const current = lsGet();
      lsSet([savedAppt, ...current.filter(a => a.id !== savedAppt.id)]);
      
      // Auto-sync customer to database
      try {
        await saveCustomerDB({
          fullName: savedAppt.fullName,
          phone: savedAppt.phone,
          email: savedAppt.email,
          notes: `Appointment: ${savedAppt.service} on ${savedAppt.date}`
        });
      } catch (e) {
        console.warn('[Supabase] Auto-customer sync note:', e);
      }

      return savedAppt;
    }
    if (error) console.error('[Supabase] saveAppointment error:', error.message);
  }

  // localStorage fallback
  const current = lsGet();
  const newAppt = { ...appointmentData, id: row.id, status: 'Pending', createdAt: new Date().toISOString() };
  lsSet([newAppt, ...current]);
  return newAppt;
};

export const updateAppointmentStatus = async (id, newStatus) => {
  if (supabase) {
    const { error } = await supabase.from(TABLE).update({ status: newStatus }).eq('id', id);
    if (!error) return getAppointments();
    if (error) console.error('[Supabase] updateAppointmentStatus error:', error.message);
  }
  const updated = lsGet().map(a => a.id === id ? { ...a, status: newStatus } : a);
  lsSet(updated);
  return updated;
};

export const deleteAppointment = async (id) => {
  if (supabase) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (!error) return getAppointments();
    if (error) console.error('[Supabase] deleteAppointment error:', error.message);
  }
  const updated = lsGet().filter(a => a.id !== id);
  lsSet(updated);
  return updated;
};
