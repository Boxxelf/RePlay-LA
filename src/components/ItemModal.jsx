import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONDITION_COLORS } from '../data/items';
import './ItemModal.css';

const EMPTY_FORM = { orgName: '', contactName: '', email: '', phone: '', units: '', message: '' };

function DetailView({ item, onClose, onRequest, showListingsLink }) {
  const directionsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`;

  return (
    <>
      <div className="modal-header">
        <div className="modal-badges">
          <span className="modal-category">{item.category}</span>
          <span className="modal-condition" style={{ background: CONDITION_COLORS[item.condition] }}>
            {item.condition}
          </span>
        </div>
        <h2 className="modal-name">{item.name}</h2>
        <p className="modal-description">{item.description}</p>
      </div>

      <div className="modal-section">
        <h3 className="modal-section-title">Item Details</h3>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Quantity Available</span>
          <span className="modal-detail-value">{item.quantity} units</span>
        </div>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Category</span>
          <span className="modal-detail-value">{item.category}</span>
        </div>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Condition</span>
          <span className="modal-detail-value">{item.condition}</span>
        </div>
      </div>

      <div className="modal-section">
        <h3 className="modal-section-title">Pickup Venue</h3>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Venue</span>
          <span className="modal-detail-value">{item.location}</span>
        </div>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Address</span>
          <span className="modal-detail-value">{item.address}</span>
        </div>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="modal-directions-link">
          Get Directions
        </a>
      </div>

      <div className="modal-section">
        <h3 className="modal-section-title">Venue Coordinator</h3>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Name</span>
          <span className="modal-detail-value">{item.coordinator}</span>
        </div>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Email</span>
          <a href={`mailto:${item.email}`} className="modal-contact-link">{item.email}</a>
        </div>
        <div className="modal-detail-row">
          <span className="modal-detail-label">Phone</span>
          <a href={`tel:${item.phone}`} className="modal-contact-link">{item.phone}</a>
        </div>
      </div>

      <div className="modal-actions">
        <button className="modal-request-btn" onClick={onRequest}>Request This Item</button>
        {showListingsLink && (
          <Link to="/listings" className="modal-listings-link" onClick={onClose}>
            View in Listings
          </Link>
        )}
      </div>
    </>
  );
}

function RequestForm({ item, onBack, onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.orgName.trim())     e.orgName     = 'Required';
    if (!form.contactName.trim()) e.contactName = 'Required';
    if (!form.email.trim())       e.email       = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.units || form.units < 1) e.units  = 'Enter a quantity';
    if (!form.message.trim())     e.message     = 'Required';
    return e;
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800)); // simulate network
    setSubmitting(false);
    onSuccess(form);
  }

  return (
    <form className="request-form" onSubmit={handleSubmit} noValidate>
      <div className="request-form-header">
        <button type="button" className="request-back-btn" onClick={onBack} disabled={submitting}>
          &larr; Back
        </button>
        <div>
          <h2 className="request-title">Request This Item</h2>
          <p className="request-subtitle">{item.name} &mdash; {item.location}</p>
        </div>
      </div>

      <div className="request-fields">
        <div className={`request-field${errors.orgName ? ' error' : ''}`}>
          <label htmlFor="rf-orgName">Organization Name</label>
          <input id="rf-orgName" name="orgName" value={form.orgName} onChange={handleChange}
            placeholder="e.g. Eastside Youth Sports Foundation" disabled={submitting} />
          {errors.orgName && <span className="field-error">{errors.orgName}</span>}
        </div>

        <div className={`request-field${errors.contactName ? ' error' : ''}`}>
          <label htmlFor="rf-contactName">Your Name</label>
          <input id="rf-contactName" name="contactName" value={form.contactName} onChange={handleChange}
            placeholder="First and last name" disabled={submitting} />
          {errors.contactName && <span className="field-error">{errors.contactName}</span>}
        </div>

        <div className="request-field-row">
          <div className={`request-field${errors.email ? ' error' : ''}`}>
            <label htmlFor="rf-email">Email</label>
            <input id="rf-email" name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="you@org.org" disabled={submitting} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="request-field">
            <label htmlFor="rf-phone">Phone <span className="optional">(optional)</span></label>
            <input id="rf-phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
              placeholder="(213) 555-0100" disabled={submitting} />
          </div>
        </div>

        <div className={`request-field${errors.units ? ' error' : ''}`}>
          <label htmlFor="rf-units">Units Needed (of {item.quantity} available)</label>
          <input id="rf-units" name="units" type="number" min="1" max={item.quantity}
            value={form.units} onChange={handleChange}
            placeholder={`1 – ${item.quantity}`} disabled={submitting} />
          {errors.units && <span className="field-error">{errors.units}</span>}
        </div>

        <div className={`request-field${errors.message ? ' error' : ''}`}>
          <label htmlFor="rf-message">How will your organization use these items?</label>
          <textarea id="rf-message" name="message" rows={4} value={form.message}
            onChange={handleChange} disabled={submitting}
            placeholder="Describe your program, how you plan to use the items, and any pickup logistics." />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>
      </div>

      <div className="modal-actions">
        <button type="submit" className="modal-request-btn" disabled={submitting}>
          {submitting ? <span className="btn-spinner" /> : null}
          {submitting ? 'Submitting…' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
}

function SuccessView({ item, form, onClose }) {
  return (
    <div className="success-view">
      <div className="success-icon-wrap">
        <svg className="success-check" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="26" cy="26" r="25" stroke="#E8008A" strokeWidth="2" />
          <path d="M14 27l8 8 16-16" stroke="#E8008A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="success-title">Request Submitted</h2>
      <p className="success-body">
        Your request for <strong>{form.units} unit{form.units > 1 ? 's' : ''}</strong> of{' '}
        <strong>{item.name}</strong> has been sent to {item.coordinator} at {item.location}.
      </p>
      <div className="success-steps">
        <div className="success-step">
          <span className="success-step-num">1</span>
          <span>Expect a response from {item.coordinator} at <strong>{item.email}</strong> within 2–3 business days.</span>
        </div>
        <div className="success-step">
          <span className="success-step-num">2</span>
          <span>You will receive a confirmation email at <strong>{form.email}</strong> with request details.</span>
        </div>
        <div className="success-step">
          <span className="success-step-num">3</span>
          <span>Once approved, coordinate pickup directly with the venue at {item.address}.</span>
        </div>
      </div>
      <div className="modal-actions">
        <button className="modal-request-btn" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

export default function ItemModal({ item, onClose, showListingsLink = false }) {
  const [step, setStep] = useState('details'); // 'details' | 'form' | 'success'
  const [submittedForm, setSubmittedForm] = useState(null);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleSuccess(form) {
    setSubmittedForm(form);
    setStep('success');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">&#x2715;</button>

        {step === 'details' && (
          <DetailView
            item={item}
            onClose={onClose}
            onRequest={() => setStep('form')}
            showListingsLink={showListingsLink}
          />
        )}
        {step === 'form' && (
          <RequestForm
            item={item}
            onBack={() => setStep('details')}
            onSuccess={handleSuccess}
          />
        )}
        {step === 'success' && (
          <SuccessView item={item} form={submittedForm} onClose={onClose} />
        )}
      </div>
    </div>
  );
}
