import { useState } from 'react';
import { getMatches } from '../api/claudeAPI';
import { ITEMS } from '../data/items';
import './Match.css';

const ORG_TYPES = [
  'Youth Sports Program',
  'Community Center',
  'Public School',
  'Non-Profit',
  'Library',
  'Faith-Based Org',
  'Other',
];

const CATEGORY_IMAGES = {
  Furniture:   'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&auto=format&fit=crop',
  Electronics: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop',
  Structures:  'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&auto=format&fit=crop',
  Equipment:   'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&auto=format&fit=crop',
};

const DEFAULT_MATERIALS = ITEMS.map(
  (i) => `${i.name} (${i.quantity} units, ${i.category}) — ${i.location}`
).join('\n');

const HOW_STEPS = [
  {
    num: '01',
    title: 'Describe Your Needs',
    desc: 'Tell us about your organization and what materials would help your programs most.',
  },
  {
    num: '02',
    title: 'AI Analyzes Inventory',
    desc: 'Claude reads all available surplus items and scores each one against your specific needs.',
  },
  {
    num: '03',
    title: 'Get Ranked Matches',
    desc: 'Results are ranked by fit score so you know exactly what to request first.',
  },
];

function getFitColor(score) {
  if (score >= 8) return '#2e7d32';
  if (score >= 5) return '#f57c00';
  return '#c62828';
}

function getCategoryFromMaterial(materialName) {
  const item = ITEMS.find((i) =>
    i.name.toLowerCase() === materialName.toLowerCase()
  );
  return item?.category ?? null;
}

export default function Match() {
  const [orgName, setOrgName]       = useState('');
  const [orgType, setOrgType]       = useState('');
  const [orgNeeds, setOrgNeeds]     = useState('');
  const [materialsText, setMaterialsText] = useState(DEFAULT_MATERIALS);
  const [results, setResults]       = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!orgNeeds.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const orgProfile = {
        name: orgName.trim() || 'Unknown Organization',
        type: orgType || 'Non-Profit',
        needs: orgNeeds,
      };
      const availableMaterials = materialsText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      const data = await getMatches(orgProfile, availableMaterials);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const canSubmit = !loading && orgNeeds.trim().length > 0;

  return (
    <main className="match-page">

      {/* Page header */}
      <h1>Find Your Match</h1>
      <p className="match-subtitle">
        Describe your organization's needs and our AI engine will rank the best available surplus materials for you.
      </p>

      {/* How it works */}
      <section className="match-how">
        <h2 className="match-how-title">How AI Matching Works</h2>
        <div className="match-how-steps">
          {HOW_STEPS.map((step) => (
            <div key={step.num} className="match-how-card">
              <span className="match-how-num">{step.num}</span>
              <h3 className="match-how-step-title">{step.title}</h3>
              <p className="match-how-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <form className="match-form" onSubmit={handleSubmit}>

        <div className="match-form-row">
          <div className="match-form-field">
            <label htmlFor="org-name">Organization Name</label>
            <input
              id="org-name"
              type="text"
              placeholder="e.g. Eastside Youth Sports Foundation"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div className="match-form-field">
            <label htmlFor="org-type">Organization Type</label>
            <select
              id="org-type"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
            >
              <option value="">Select a type…</option>
              {ORG_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="org-needs">Describe Your Needs</label>
        <textarea
          id="org-needs"
          rows={5}
          placeholder="e.g. We're a nonprofit running a free after-school program for 300 middle schoolers across 4 LAUSD campuses in South LA. We need durable furniture for two new multipurpose rooms, shade structures for outdoor programming, and a sound system for assemblies and community events. We have a van for pickup but no loading dock."
          value={orgNeeds}
          onChange={(e) => setOrgNeeds(e.target.value)}
        />

        <label htmlFor="materials">Available Materials</label>
        <textarea
          id="materials"
          rows={8}
          value={materialsText}
          onChange={(e) => setMaterialsText(e.target.value)}
        />

        <button type="submit" disabled={!canSubmit}>
          {loading
            ? <><span className="btn-spinner-sm" /> Finding matches…</>
            : 'Find Matches'}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="match-loading">
          <div className="spinner" />
          <p>Claude is analyzing the inventory for {orgName || 'your organization'}…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="match-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <section className="match-results">
          {results.summary && (
            <p className="match-summary">{results.summary}</p>
          )}
          <div className="match-cards">
            {results.matches.map((match, i) => {
              const category = getCategoryFromMaterial(match.material);
              const image = category ? CATEGORY_IMAGES[category] : null;
              const color = getFitColor(match.fit_score);
              const pct   = Math.round((match.fit_score / 10) * 100);

              return (
                <div key={i} className="match-card">
                  {image && (
                    <div
                      className="match-card-image"
                      style={{ backgroundImage: `url('${image}')` }}
                    />
                  )}
                  <div className="match-card-body">
                    <div className="match-card-header">
                      <span className="match-material">{match.material}</span>
                      <span className="match-score" style={{ background: color }}>
                        {match.fit_score}/10
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="match-bar-track">
                      <div
                        className="match-bar-fill"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>

                    <p className="match-reason">{match.reason}</p>

                    {/* Meta row */}
                    <div className="match-card-meta">
                      {match.quantity && (
                        <span className="match-meta-item">
                          <span className="match-meta-label">Qty</span>
                          {match.quantity}
                          {match.sufficient_quantity === false && (
                            <span className="match-qty-warning" title="Quantity may be insufficient">Low stock</span>
                          )}
                        </span>
                      )}
                      {match.venue && (
                        <span className="match-meta-item">
                          <span className="match-meta-label">Venue</span>
                          {match.venue}
                        </span>
                      )}
                    </div>

                    <button className="match-request-btn">Request This Item</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </main>
  );
}
