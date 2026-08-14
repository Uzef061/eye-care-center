import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="disclaimer-banner" role="alert">
      <AlertTriangle className="flex-shrink-0" size={22} />
      <div>
        <strong>Medical & Ophthalmic Notice:</strong> Information provided on this website is for educational and appointment scheduling purposes only. It does not replace professional medical diagnosis, prescription verification, or treatment by a licensed optometrist or ophthalmologist. Always consult qualified eye care professionals for personal eye health concerns.
      </div>
    </div>
  );
}
