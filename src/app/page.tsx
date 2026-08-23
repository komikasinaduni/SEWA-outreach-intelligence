"use client";

import { useMemo, useState } from "react";

type Confidence = "High" | "Medium";
type QualityStatus = "VERIFIED" | "NEEDS_VERIFICATION" | "INVALID_PLACEHOLDER" | "DUPLICATE";

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
  qualityStatus?: QualityStatus;
  sourceUrl?: string;
};

const businesses: Business[] = [
  {
    name: "Keemat Grocers",
    category: "Indian grocery",
    city: "Sugar Land",
    address: "3311 Hwy 6 S, Sugar Land, TX 77478",
    phone: "(281) 313-4343",
    description: "South Asian grocery, fresh produce, sweets, and community staples.",
    confidence: "High",
    evidence: ["Business description identifies an Indian grocery", "Website lists South Asian products"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://www.keematgrocers.com/contact-us/",
  },
  {
    name: "Keemat Grocers",
    category: "Indian grocery",
    city: "Houston",
    address: "5601 Hillcroft St., Houston, TX 77036",
    phone: "(713) 781-2892",
    description: "Official Keemat Grocers Hillcroft location.",
    confidence: "High",
    evidence: ["Address and phone listed on Keemat's official contact page", "Location is inside Greater Houston"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://www.keematgrocers.com/contact-us/",
  },
  {
    name: "Keemat Grocers",
    category: "Indian grocery",
    city: "Houston",
    address: "6911 FM 1960, Houston, TX 77066",
    phone: "(281) 377-3347",
    description: "Official Keemat Grocers FM 1960 location.",
    confidence: "High",
    evidence: ["Address and phone listed on Keemat's official contact page", "Location is inside Greater Houston"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://www.keematgrocers.com/contact-us/",
  },
  {
    name: "Keemat Grocers",
    category: "Indian grocery",
    city: "Katy",
    address: "2133 Mason Road, Katy, TX 77450",
    phone: "(832) 321-4156",
    description: "Official Keemat Grocers Katy location.",
    confidence: "High",
    evidence: ["Address and phone listed on Keemat's official contact page", "Location is inside Greater Houston"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://www.keematgrocers.com/contact-us/",
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
    qualityStatus: "INVALID_PLACEHOLDER",
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
    qualityStatus: "INVALID_PLACEHOLDER",
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
  qualityStatus: "INVALID_PLACEHOLDER",
}));

const reviewedBusinesses: Business[] = [
  {
    name: "Aga's Restaurant & Catering",
    category: "Indian restaurant",
    city: "Houston",
    address: "Address requires verification",
    phone: "Phone requires verification",
    description: "Listing retained for human verification before outreach.",
    confidence: "Medium",
    evidence: ["Existing details conflicted with current source checks", "Do not contact until address and phone are verified"],
    status: "Not contacted",
    verified: false,
    qualityStatus: "NEEDS_VERIFICATION",
  },
  {
    name: "Masala Wok",
    category: "Indian restaurant",
    city: "Katy",
    address: "Location requires verification",
    phone: "Phone requires verification",
    description: "Real business name found, but this location needs verification before outreach.",
    confidence: "Medium",
    evidence: ["Historical Katy listing exists", "Current location and phone require verification"],
    status: "Not contacted",
    verified: false,
    qualityStatus: "NEEDS_VERIFICATION",
  },
  {
    name: "Raja Sweets",
    category: "Indian sweets",
    city: "Houston",
    address: "5667 Hillcroft St., Houston, TX 77036",
    phone: "(713) 782-5667",
    description: "Indian sweets and snacks business documented by Eater Houston.",
    confidence: "High",
    evidence: ["Address and phone documented by Eater Houston", "Category matches Indian sweets"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://houston.eater.com/maps/houston-best-indian-restaurants-pakistani-south-asian-cuisine",
  },
];

const allBusinesses = [...businesses, ...reviewedBusinesses, ...previewBusinesses];
const quarantinedCount = allBusinesses.filter((business) => business.qualityStatus === "INVALID_PLACEHOLDER").length;

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
  const [includeQuarantined, setIncludeQuarantined] = useState(false);

  const filteredBusinesses = useMemo(() => allBusinesses.filter((business) => {
    const matchesSearch = `${business.name} ${business.category} ${business.city}`.toLowerCase().includes(search.toLowerCase());
    const matchesCity = city === "All cities" || business.city === city;
    const matchesCategory = category === "All categories" || business.category === category;
    const isAllowed = includeQuarantined || business.qualityStatus !== "INVALID_PLACEHOLDER";
    return matchesSearch && matchesCity && matchesCategory && isAllowed && (!verifiedOnly || business.verified) && (!emailOnly || business.email);
  }), [category, city, emailOnly, includeQuarantined, search, verifiedOnly]);

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
        <div className="hero-stat"><strong>{allBusinesses.length}</strong><span>businesses tracked</span><small>{quarantinedCount} quarantined</small></div>
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
          <label className="toggle-row quarantine-toggle"><input type="checkbox" checked={includeQuarantined} onChange={(event) => setIncludeQuarantined(event.target.checked)} /><span>Show quarantined ({quarantinedCount})</span></label>
          <div className="coverage"><div><span>DATA QUALITY</span><strong>{quarantinedCount} quarantined</strong></div><div className="coverage-bar"><i /></div><p>Placeholder records are blocked from outreach until replaced with source-verified data.</p></div>
        </aside>

        <div className="directory">
          <div className="directory-header"><div><p className="section-kicker">Prospects</p><h2>{includeQuarantined ? "Quality audit" : "Ready for review"}</h2></div><button className="export-button" onClick={() => exportBusinesses(filteredBusinesses.filter((business) => business.qualityStatus !== "INVALID_PLACEHOLDER"))}>⇩ Export CSV</button></div>
          <div className="legend"><span><i className="legend-dot high" />High confidence</span><span><i className="legend-dot medium" />Needs verification</span><span className="legend-source">Preview records · source verification pending</span></div>
          <div className="business-list">
            {filteredBusinesses.map((business) => <article className={`business-card ${business.qualityStatus === "INVALID_PLACEHOLDER" ? "quarantined-card" : ""}`} key={`${business.name}-${business.address}`}>
              <div className="card-main"><div className="initial">{business.name.charAt(0)}</div><div className="card-copy"><div className="name-line"><h3>{business.name}</h3><span className={`confidence ${business.confidence.toLowerCase()}`}>{business.confidence}</span><span className={`quality ${business.qualityStatus?.toLowerCase()}`}>{business.qualityStatus?.replaceAll("_", " ")}</span></div><p className="category-line">{business.category} <span>·</span> {business.city}</p><p className="description">{business.description}</p><div className="contact-row"><span>⌖ {business.address}</span><span>☎ {business.phone}</span>{business.email && <span>✉ {business.email}</span>}{business.sourceUrl && <a href={business.sourceUrl} target="_blank" rel="noreferrer">↗ source</a>}</div></div></div>
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
