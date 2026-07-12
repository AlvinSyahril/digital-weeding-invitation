"use client";

import { useState } from 'react';
import { RSVPFormData, SubmitStatus } from './types';
import styles from './RSVP.module.css';
import { Card, Button } from '../ui';

export default function RSVPForm() {
  const [form, setForm] = useState<RSVPFormData>({
    name: "",
    attendance: "",
    guestCount: 1,
  });

  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.name.trim() || !form.attendance) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    const isAttending = form.attendance === 'yes';
    const attendanceText = isAttending ? 'Hadir' : 'Tidak Hadir';
    
    // Construct WhatsApp Message
    const message = `Halo, saya ingin mengonfirmasi kehadiran untuk acara pernikahan Hanief & Dwi.\n\nNama: ${form.name.trim()}\nKehadiran: ${attendanceText}${isAttending ? `\nJumlah Tamu: ${form.guestCount} orang` : ''}\n\nTerima kasih.`;
    
    const whatsappNumber = "6289647630730";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Simulate small delay for UX before redirecting
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setStatus('success');
    }, 800);
  };

  // Success State (Feedback Mechanism)
  if (status === 'success') {
    return (
      <div className={styles.formCard}>
        <Card>
          <div className={styles.feedbackMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3 className={styles.successTitle}>Thank You!</h3>
            <p className={styles.successText}>
              Your RSVP has been successfully received. We look forward to celebrating with you!
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <Card>
        <form onSubmit={handleSubmit} className={styles.formContent} noValidate>
          {status === 'error' && (
            <p className={styles.errorText} role="alert">Please fill in your name and attendance.</p>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your full name"
              required
              disabled={status === 'loading'}
              aria-invalid={status === 'error' && !form.name.trim()}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="attendance" className={styles.label}>Will you attend?</label>
            <select
              id="attendance"
              name="attendance"
              value={form.attendance}
              onChange={handleChange}
              className={styles.select}
              required
              disabled={status === 'loading'}
              aria-invalid={status === 'error' && !form.attendance}
            >
              <option value="" disabled>Select attendance</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">Sorry, I cannot attend</option>
            </select>
          </div>

          {form.attendance === 'yes' && (
            <div className={styles.formGroup}>
              <label htmlFor="guestCount" className={styles.label}>Number of Guests</label>
              <select
                id="guestCount"
                name="guestCount"
                value={form.guestCount}
                onChange={handleChange}
                className={styles.select}
                disabled={status === 'loading'}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
                <option value="5">5 Persons</option>
              </select>
            </div>
          )}

          <div className={styles.submitAction}>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={status === 'loading'}
            >
              {status === 'loading' ? "Sending..." : "Confirm RSVP"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
