import { Link } from 'react-router-dom';
import './Home.css';

const STEPS = [
  {
    number: '01',
    title: 'Browse Materials',
    description: 'Explore post-Games surplus from 40+ LA28 venues — athlete village furniture, temporary seating, broadcast gear, field equipment, and more.',
  },
  {
    number: '02',
    title: 'Describe Your Needs',
    description: 'Tell our AI matching engine what your organization needs. It finds the best fits from available inventory and explains why each item suits you.',
  },
  {
    number: '03',
    title: 'Claim & Coordinate',
    description: "Claim your match and arrange pickup directly with the venue. No middlemen, no cost — just materials going where they're needed most.",
  },
];

const FEATURED = [
  {
    id: 1,
    name: 'Modular Folding Tables',
    category: 'Furniture',
    quantity: 120,
    location: 'LA Memorial Coliseum',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600',
  },
  {
    id: 4,
    name: 'Event Canopy Structures',
    category: 'Structures',
    quantity: 45,
    location: 'UCLA Olympic Village',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
  },
  {
    id: 6,
    name: 'PA Speaker Systems',
    category: 'Electronics',
    quantity: 30,
    location: 'Rose Bowl',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600',
  },
];

const CONDITION_COLORS = {
  'Like New': '#2e7d32',
  Good:       '#1565c0',
  Fair:       '#e65100',
};

const WHO_CAN_CLAIM = [
  {
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop',
    label: 'Public Schools',
    desc: 'LAUSD and charter schools needing furniture, AV equipment, or outdoor structures for events and classrooms.',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
    label: 'Youth Sports Leagues',
    desc: 'Organizations like PlayLA, LA84, and FIYA running programs for the 90,000+ kids in city-sponsored leagues.',
  },
  {
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop',
    label: 'Community Centers',
    desc: "Rec centers, senior centers, and neighborhood hubs across LA's 88 cities that need durable, practical gear.",
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&auto=format&fit=crop',
    label: 'Nonprofits & Charities',
    desc: 'The 76,000+ nonprofits in the LA metro area — shelters, food banks, arts programs, and social service orgs.',
  },
];

export default function Home() {
  return (
    <>
      <main>

        {/* Hero */}
        <section className="home-hero">
          <div className="home-hero-content">
            <p className="home-eyebrow">Post-LA28 Olympics — 2028 &amp; Beyond</p>
            <h1 className="home-title">Surplus<br />Reimagined.</h1>
            <p className="home-sub">
              After the Games end, thousands of tonnes of furniture, equipment, and infrastructure will need a new home.
              RePlay LA connects that surplus directly to the LA community organizations that need it most — at no cost.
            </p>
            <div className="home-cta">
              <Link to="/listings" className="btn-primary">Browse Listings</Link>
              <Link to="/match" className="btn-secondary">Find Your Match</Link>
            </div>
          </div>
          <div className="home-accent-block" />
        </section>

        {/* Stats */}
        <section className="home-stats">
          <div className="stat">
            <span className="stat-number">600K+</span>
            <span className="stat-label">Est. Surplus Items</span>
            <span className="stat-note">Projected from Paris 2024 scale</span>
          </div>
          <div className="stat">
            <span className="stat-number">40+</span>
            <span className="stat-label">LA28 Venues</span>
            <span className="stat-note">Across Southern California</span>
          </div>
          <div className="stat">
            <span className="stat-number">76K+</span>
            <span className="stat-label">LA Nonprofits</span>
            <span className="stat-note">In the LA metro area</span>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="home-why">
          <div className="home-section-inner">
            <p className="home-section-eyebrow">The Problem We're Solving</p>
            <h2 className="home-section-title">Why It Matters</h2>
            <div className="why-body">
              <p>
                Mega-events like the Olympics generate enormous quantities of temporary infrastructure —
                seating, furniture, broadcast equipment, modular structures, and field gear — most of which
                is discarded or dismantled within weeks of the closing ceremony. Rio 2016 distributed
                46,000 items to 450+ organizations; Tokyo 2020 redistributed 65,000 computers and 19,000
                pieces of office furniture. LA28 has committed to a 90% material reuse target, but
                connecting that surplus to local communities at scale requires coordination.
              </p>
              <p>
                Los Angeles has over 76,000 nonprofits, hundreds of underfunded public schools, and
                youth sports programs serving tens of thousands of kids — all of which could benefit
                directly from well-maintained, high-quality Olympic-grade materials. RePlay LA is
                exploring how an AI-powered matching platform could make that connection fast, fair, and free.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="home-how">
          <div className="home-section-inner">
            <p className="home-section-eyebrow">The Process</p>
            <h2 className="home-section-title">How It Works</h2>
            <div className="steps-grid">
              {STEPS.map((step) => (
                <div key={step.number} className="step-card">
                  <span className="step-number">{step.number}</span>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Claim */}
        <section className="home-who">
          <div className="home-section-inner">
            <p className="home-section-eyebrow">Eligible Organizations</p>
            <h2 className="home-section-title">Who Can Claim</h2>
            <div className="who-grid">
              {WHO_CAN_CLAIM.map((org) => (
                <div key={org.label} className="who-card">
                  <img src={org.image} alt={org.label} className="who-img" />
                  <div className="who-card-body">
                    <h3 className="who-label">{org.label}</h3>
                    <p className="who-desc">{org.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="home-featured">
          <div className="home-section-inner">
            <p className="home-section-eyebrow">Available Now</p>
            <h2 className="home-section-title">Featured Listings</h2>
            <div className="featured-grid">
              {FEATURED.map((item) => (
                <div key={item.id} className="featured-card">
                  <div
                    className="featured-card-image"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <div className="featured-card-top">
                    <span className="featured-category">{item.category}</span>
                    <span
                      className="featured-condition"
                      style={{ background: CONDITION_COLORS[item.condition] }}
                    >
                      {item.condition}
                    </span>
                  </div>
                  <h3 className="featured-name">{item.name}</h3>
                  <div className="featured-meta">
                    <div className="featured-meta-row">
                      <span className="featured-meta-label">Quantity</span>
                      <span className="featured-meta-value">{item.quantity} units</span>
                    </div>
                    <div className="featured-meta-row">
                      <span className="featured-meta-label">Location</span>
                      <span className="featured-meta-value">{item.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="featured-cta">
              <Link to="/listings" className="btn-primary">View All Listings</Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="home-footer">
        <span className="footer-left">RePlay LA — Built for LA28. Designed for the community.</span>
        <span className="footer-center">Browse surplus materials → Get AI-matched → Claim &amp; coordinate pickup</span>
        <span className="footer-right">
          Powered by{' '}
          <a
            href="https://recreation.parks.lacity.gov/play-la"
            target="_blank"
            rel="noopener noreferrer"
          >
            LA Recreation &amp; Parks
          </a>
        </span>
      </footer>
      <div className="home-disclaimer">
        RePlay LA is an independent concept platform exploring how post-LA28 surplus materials could benefit
        Los Angeles communities. This is not an official LA28 or Play LA initiative.
      </div>
    </>
  );
}
