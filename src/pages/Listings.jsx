import { useState, useMemo } from 'react';
import { ITEMS, CONDITION_COLORS } from '../data/items';
import ItemModal from '../components/ItemModal';
import './Listings.css';

const CATEGORIES = ['All', ...Array.from(new Set(ITEMS.map((i) => i.category)))];

export default function Listings() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('All');
  const [modalItem, setModalItem] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ITEMS.filter((item) => {
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="listings-page">
      <div className="listings-header">
        <h1>Surplus Listings</h1>
        <p>Browse available materials from the LA28 Olympics.</p>
      </div>

      <div className="listings-controls">
        <input
          className="listings-search"
          type="search"
          placeholder="Search by name or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="listings-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${category === cat ? ' active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="listings-empty">No items match your search.</p>
      ) : (
        <div className="listings-grid">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="listing-card"
              onClick={() => setModalItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setModalItem(item)}
            >
              <div className="card-top">
                <span className="card-category">{item.category}</span>
                <span
                  className="card-condition"
                  style={{ background: CONDITION_COLORS[item.condition] }}
                >
                  {item.condition}
                </span>
              </div>
              <h2 className="card-name">{item.name}</h2>
              <p className="card-description">{item.description}</p>
              <div className="card-meta">
                <div className="card-meta-row">
                  <span className="meta-label">Quantity</span>
                  <span className="meta-value">{item.quantity} units</span>
                </div>
                <div className="card-meta-row">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalItem && (
        <ItemModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </main>
  );
}
