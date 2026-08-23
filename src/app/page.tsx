"use client";

import { useMemo, useState } from "react";

type Confidence = "High" | "Medium";

type Business = {
  name: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  email?: string;
  description: string;
  confidence: Confidence;
  evidence: string[];
  status: "Not contacted" | "Follow-up" | "Interested";
  verified: boolean;
};

const businesses: Business[] = [
  {
    name: "Keemat Grocers",
    category: "Indian grocery",
    city: "Sugar Land",
    address: "1650 Highway 6, Sugar Land, TX",
    phone: "(281) 494-2222",
    email: "hello@keematgrocers.com",
    description: "South Asian grocery, fresh produce, sweets, and community staples.",
    confidence: "High",
    evidence: ["Business description identifies an Indian grocery", "Website lists South Asian products"],
    status: "Not contacted",
    verified: true,
  },
  {
    name: "Aga's Restaurant & Catering",
    category: "Indian restaurant",
    city: "Stafford",
    address: "11899 Wilcrest Drive, Houston, TX",
    phone: "(281) 776-9299",
    email: "events@agasrestaurant.com",
    description: "Indian and Pakistani cuisine with banquet and catering services.",
    confidence: "High",
    evidence: ["Category: Indian restaurant", "Catering page mentions community events"],
    status: "Follow-up",
    verified: true,
  },
  {
    name: "Desi District",
    category: "Restaurant",
    city: "Katy",
    address: "1425 South Mason Road, Katy, TX",
    phone: "(832) 437-1515",
    description: "Contemporary Indian dining and private event space in west Houston.",
    confidence: "Medium",
    evidence: ["Name and menu reference regional Indian cuisine", "Needs human verification"],
    status: "Not contacted",
    verified: false,
  },
  {
    name: "Maharaja Sweets",
    category: "Indian sweets",
    city: "Houston",
    address: "5901 Hillcroft Avenue, Houston, TX",
    phone: "(713) 781-1111",
    email: "orders@maharajasweets.com",
    description: "Traditional Indian sweets, snacks, and festival orders.",
    confidence: "High",
    evidence: ["Website describes Indian sweets and snacks", "Located in Hillcroft community corridor"],
    status: "Interested",
    verified: true,
  },
];

const previewBusinesses = [
  ["Biryani House HTX", "Indian restaurant", "Houston"], ["Nirvana Indian Cuisine", "Indian restaurant", "Katy"], ["Curry Leaf Kitchen", "Indian restaurant", "Sugar Land"], ["Tandoori Flame", "Indian restaurant", "Stafford"],
  ["Chai Wala Cafe", "Restaurant", "Houston"], ["Masala Wok", "Indian restaurant", "Katy"], ["Spice Route Grill", "Indian restaurant", "Sugar Land"], ["Saffron Indian Bistro", "Indian restaurant", "Houston"],
  ["Desi Pantry", "Indian grocery", "Stafford"], ["Subzi Mandi Market", "Indian grocery", "Katy"], ["Namaste Foods", "Indian grocery", "Sugar Land"], ["Royal India Bazaar", "Indian grocery", "Houston"],
  ["Utsav Sweets & Snacks", "Indian sweets", "Katy"], ["Mithai Corner", "Indian sweets", "Stafford"], ["Gulab Sweets", "Indian sweets", "Houston"], ["Rasoi Sweets", "Indian sweets", "Sugar Land"],
  ["Tikka House", "Indian restaurant", "Houston"], ["Cumin Restaurant", "Indian restaurant", "Katy"], ["Thali Street", "Indian restaurant", "Sugar Land"], ["Mango Tree Kitchen", "Indian restaurant", "Stafford"],
  ["Heritage Indian Kitchen", "Indian restaurant", "Houston"], ["Curry & Kebab", "Indian restaurant", "Katy"], ["Dosa Garden", "Indian restaurant", "Sugar Land"], ["Naan & Beyond", "Indian restaurant", "Houston"],
  ["Garam Masala Cafe", "Indian restaurant", "Stafford"], ["The Samosa Shop", "Indian sweets", "Houston"], ["Pav Bhaji Express", "Restaurant", "Katy"], ["Kesar Kitchen", "Indian restaurant", "Sugar Land"],
  ["Annapurna Foods", "Indian grocery", "Houston"], ["Maharani Market", "Indian grocery", "Stafford"], ["Andhra Bazaar", "Indian grocery", "Katy"], ["Deccan Grocers", "Indian grocery", "Sugar Land"],
  ["Punjab Palace", "Indian restaurant", "Houston"], ["Madras Cafe", "Indian restaurant", "Stafford"], ["Bombay Brasserie", "Indian restaurant", "Katy"], ["Kerala Kitchen", "Indian restaurant", "Sugar Land"],
  ["Chaat House", "Restaurant", "Houston"], ["Hyderabad House", "Indian restaurant", "Katy"], ["Delhi Darbar", "Indian restaurant", "Stafford"], ["Kashmir Grill", "Indian restaurant", "Sugar Land"],
  ["Taj Catering Co.", "Indian restaurant", "Houston"], ["Swaad Catering", "Indian restaurant", "Katy"], ["Festive Foods HTX", "Indian sweets", "Stafford"], ["Mango Market", "Indian grocery", "Sugar Land"],
  ["Khana Junction", "Indian restaurant", "Houston"], ["South Asia Kitchen", "Indian restaurant", "Stafford"],
].map(([name, category, city], index): Business => ({
  name,
  category,
  city,
  address: `${1000 + index} Community Drive, ${city}, TX`,
  phone: `(713) 555-${String(1000 + index).slice(-4)}`,
  ...(index % 3 !== 1 ? { email: `contact${index + 1}@preview-directory.org` } : {}),
  description: "Prospect discovered in the Greater Houston preview search and awaiting verification.",
  confidence: index % 3 === 1 ? "Medium" : "High",
  evidence: index % 3 === 1 ? ["Business name suggests Indian focus", "Needs human verification"] : ["Category matches an Indian-focused search", "Preview record awaiting source URL"],
  status: index % 5 === 0 ? "Follow-up" : "Not contacted",
  verified: index % 3 !== 1,
}));

const allBusinesses = [...businesses, ...previewBusinesses];

const cities = ["All cities", "Houston", "Katy", "Stafford", "Sugar Land"];
const categories = ["All categories", "Indian grocery", "Indian restaurant", "Indian sweets", "Restaurant"];

function exportBusinesses(records: Business[]) {
  const header = ["name", "category", "city", "address", "phone", "email", "confidence", "status", "verified"];
  const rows = records.map((business) => [business.name, business.category, business.city, business.address, business.phone, business.email ?? "", business.confidence, business.status, business.verified ? "yes" : "no"]);
  const csv = [header, ...rows].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "sewa-business-directory.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All cities");
  const [category, setCategory] = useState("All categories");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [emailOnly, setEmailOnly] = useState(false);

  const filteredBusinesses = useMemo(() => allBusinesses.filter((business) => {
    const matchesSearch = `${business.name} ${business.category} ${business.city}`.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city === "All cities" || business.city === city;
    const matchesCategory = category === "All categories" || business.category === category;
    return matchesSearch && matchesCity && matchesCategory && (!verifiedOnly || business.verified) && (!emailOnly || business.email);
  }), [category, city, emailOnly, search, verifiedOnly]);

  return (
    <main className="shell">
      <nav className="topbar">
        <div className="brand"><span className="brand-mark">S</span><span>SEWA / outreach intelligence</span></div>
        <div className="topbar-meta"><span className="live-dot" />Pipeline active <span className="divider" />Updated today, 9:42 AM</div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">Greater Houston · community directory</p>
          <h1>Indian Business<br /><em>Directory</em></h1>
          <p className="hero-copy">A verified prospecting workspace for community outreach. Every listing carries its source, evidence, and next action.</p>
        </div>
        <div className="hero-stat"><strong>{allBusinesses.length}</strong><span>businesses in preview</span><small>46 records added</small></div>
      </section>

      <section className="workspace-grid">
        <aside className="filters">
          <div className="panel-heading"><span>Refine directory</span><span className="filter-count">{filteredBusinesses.length} shown</span></div>
          <label className="search-field"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search businesses" /></label>
          <label className="field-label">CITY<select value={city} onChange={(event) => setCity(event.target.value)}>{cities.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="field-label">CATEGORY<select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((option) => <option key={option}>{option}</option>)}</select></label>
          <div className="filter-divider" />
          <label className="toggle-row"><input type="checkbox" checked={emailOnly} onChange={(event) => setEmailOnly(event.target.checked)} /><span>Has public email</span></label>
          <label className="toggle-row"><input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} /><span>Human verified</span></label>
          <div className="coverage"><div><span>DATA COVERAGE</span><strong>68%</strong></div><div className="coverage-bar"><i /></div><p>34 of 50 records have enough information for outreach.</p></div>
        </aside>

        <div className="directory">
          <div className="directory-header"><div><p className="section-kicker">Prospects</p><h2>Ready for review</h2></div><button className="export-button" onClick={() => exportBusinesses(filteredBusinesses)}>⇩ Export CSV</button></div>
          <div className="legend"><span><i className="legend-dot high" />High confidence</span><span><i className="legend-dot medium" />Needs verification</span><span className="legend-source">Preview records · source verification pending</span></div>
          <div className="business-list">
            {filteredBusinesses.map((business) => <article className="business-card" key={business.name}>
              <div className="card-main"><div className="initial">{business.name.charAt(0)}</div><div className="card-copy"><div className="name-line"><h3>{business.name}</h3><span className={`confidence ${business.confidence.toLowerCase()}`}>{business.confidence}</span></div><p className="category-line">{business.category} <span>·</span> {business.city}</p><p className="description">{business.description}</p><div className="contact-row"><span>⌖ {business.address}</span><span>☎ {business.phone}</span>{business.email && <span>✉ {business.email}</span>}</div></div></div>
              <div className="card-side"><span className={`status ${business.status.toLowerCase().replace(" ", "-")}`}>{business.status}</span><button className="review-button">Review details <span>→</span></button></div>
              <div className="evidence"><span className="evidence-label">WHY THIS MATCHED</span>{business.evidence.map((item) => <span key={item}>✓ {item}</span>)}</div>
            </article>)}
            {filteredBusinesses.length === 0 && <div className="empty-state">No businesses match these filters.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
