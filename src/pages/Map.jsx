import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { ITEMS } from '../data/items';
import ItemModal from '../components/ItemModal';
import './Map.css';

const CENTER = { lat: 34.0522, lng: -118.2437 };

const CATEGORIES = ['All', ...Array.from(new Set(ITEMS.map((i) => i.category)))];

const CATEGORY_COLORS = {
  Furniture:   '#FF0080',
  Electronics: '#1565c0',
  Structures:  '#2e7d32',
  Equipment:   '#e65100',
};

function makeMarkerIcon(category) {
  const fill = CATEGORY_COLORS[category] ?? '#E8008A';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="38" viewBox="0 0 26 38">
    <path fill="${fill}" stroke="white" stroke-width="1.5"
      d="M13 0C5.82 0 0 5.82 0 13c0 9.75 13 25 13 25S26 22.75 26 13C26 5.82 20.18 0 13 0z"/>
    <circle cx="13" cy="13" r="5" fill="white"/>
  </svg>`;
  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(26, 38),
    anchor: new window.google.maps.Point(13, 38),
  };
}

export default function Map() {
  const [selected, setSelected]             = useState(null);
  const [modalItem, setModalItem]           = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const mapRef = useRef(null);

  useEffect(() => {
    const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    console.log('[Map] REACT_APP_GOOGLE_MAPS_API_KEY:', key ? `${key.slice(0, 8)}…` : 'UNDEFINED');
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const filtered = useMemo(
    () => categoryFilter === 'All'
      ? ITEMS
      : ITEMS.filter((i) => i.category === categoryFilter),
    [categoryFilter]
  );

  const onMapLoad = useCallback((map) => { mapRef.current = map; }, []);

  const handleMarkerClick = useCallback((item) => {
    setSelected(item);
    setModalItem(item);
  }, []);

  const handleSidebarClick = useCallback((item) => {
    setSelected(item);
    setModalItem(item);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: item.lat, lng: item.lng });
      mapRef.current.setZoom(14);
    }
  }, []);

  if (loadError) return <div className="page">Failed to load Google Maps: {loadError.message}</div>;
  if (!isLoaded)  return <div className="page">Loading map...</div>;

  return (
    <div className="map-page">

      {/* Sidebar */}
      <aside className="map-sidebar">

        <div className="map-sidebar-header">
          <h1 className="map-sidebar-title">LA28 Surplus<br />Material Locations</h1>
          <p className="map-sidebar-sub">{filtered.length} of {ITEMS.length} locations</p>
        </div>

        <div className="map-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`map-filter-btn${categoryFilter === cat ? ' active' : ''}`}
              style={categoryFilter === cat && cat !== 'All'
                ? { background: CATEGORY_COLORS[cat], borderColor: CATEGORY_COLORS[cat] }
                : {}
              }
              onClick={() => {
                setCategoryFilter(cat);
                setSelected(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="map-legend">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <span key={cat} className="legend-item">
              <span className="legend-dot" style={{ background: color }} />
              {cat}
            </span>
          ))}
        </div>

        <ul className="map-sidebar-list">
          {filtered.map((item) => (
            <li
              key={item.id}
              className={`map-sidebar-item${selected?.id === item.id ? ' active' : ''}`}
              onClick={() => handleSidebarClick(item)}
            >
              <div className="sidebar-item-row">
                <span
                  className="sidebar-dot"
                  style={{ background: CATEGORY_COLORS[item.category] ?? '#888' }}
                />
                <span className="sidebar-item-name">{item.name}</span>
              </div>
              <div className="sidebar-item-meta">
                <span className="sidebar-category">{item.category}</span>
                <span className="sidebar-quantity">{item.quantity} units</span>
              </div>
              <div className="sidebar-item-location">{item.location}</div>
            </li>
          ))}
        </ul>

      </aside>

      {/* Map */}
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={CENTER}
          zoom={11}
          onLoad={onMapLoad}
          options={{ gestureHandling: 'greedy' }}
        >
          {filtered.map((item) => (
            <Marker
              key={item.id}
              position={{ lat: item.lat, lng: item.lng }}
              icon={makeMarkerIcon(item.category)}
              onClick={() => handleMarkerClick(item)}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Detail modal */}
      {modalItem && (
        <ItemModal
          item={modalItem}
          onClose={() => { setModalItem(null); setSelected(null); }}
          showListingsLink
        />
      )}

    </div>
  );
}
