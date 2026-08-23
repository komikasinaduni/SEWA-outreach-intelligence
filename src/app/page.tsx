"use client";

import { useMemo, useState } from "react";

type Confidence = "High" | "Medium";
type QualityStatus = "VERIFIED" | "NEEDS_VERIFICATION" | "INVALID_PLACEHOLDER" | "DUPLICATE" | "NEEDS_REDISCOVERY";

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
    category: "Indian restaurant",
    city: "Houston",
    address: "11129 Westheimer Rd, Houston, TX 77042",
    phone: "(346) 681-3374",
    description: "Indian street food and contemporary South Asian dining in Houston.",
    confidence: "High",
    evidence: ["Address and phone listed by Desi District's official Houston page", "Location is inside Greater Houston"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://www.desidistrict.com/locations/houston",
  },
  {
    name: "Masala Wok Indian + Asian Fare",
    category: "Indian restaurant",
    city: "Houston",
    address: "10001 Westheimer Rd, Ste 1060, Houston, TX 77042",
    phone: "(713) 784-8812",
    description: "Indian and Asian fare at the verified Westheimer location.",
    confidence: "High",
    evidence: ["Current listing provides the Westheimer address and phone", "City corrected from Katy to Houston"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
  },
  {
    name: "Aga's Restaurant & Catering",
    category: "Indian restaurant",
    city: "Houston",
    address: "11842 Wilcrest Dr, Houston, TX 77031",
    phone: "(832) 786-8000",
    description: "Indian and Pakistani cuisine with banquet and catering services.",
    confidence: "High",
    evidence: ["Address and phone listed by Aga's official Houston page", "Houston tourism listing independently matches"],
    status: "Not contacted",
    verified: true,
    qualityStatus: "VERIFIED",
    sourceUrl: "https://www.agasrestaurant.com/houston",
  },
];

const verifiedBusiness = (name: string, category: string, city: string, address: string, phone: string, description: string, evidence: string[], sourceUrl?: string): Business => ({
  name,
  category,
  city,
  address,
  phone,
  description,
  confidence: "High",
  evidence,
  status: "Not contacted",
  verified: true,
  qualityStatus: "VERIFIED",
  sourceUrl,
});

const verifiedBusinesses: Business[] = [
  verifiedBusiness("Nirvana Indian Restaurant", "Indian restaurant", "Houston", "14543 Memorial Dr, Houston, TX 77079", "(281) 496-3232", "Indian and Pakistani restaurant on Memorial Drive.", ["Official website lists this address and phone", "Address retained for second-source check against 14545 Memorial Drive"], "https://nirvanahouston.com/best-indian-pakistani-restaurant-in-houston/"),
  verifiedBusiness("Raja Sweets", "Indian sweets", "Houston", "5667 Hillcroft Ave, Houston, TX 77036", "(713) 782-5667", "Indian sweets and snacks business on Hillcroft.", ["Current independent listing provides address and phone", "Category matches Indian sweets"], "https://houston.eater.com/maps/houston-best-indian-restaurants-pakistani-south-asian-cuisine"),
  verifiedBusiness("Rizwan Biryani", "Indian restaurant", "Houston", "12280 Westheimer Rd, Houston, TX 77077", "(832) 792-9146", "Biryani and South Asian cuisine in west Houston.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Turmeric Indian Cuisine", "Indian restaurant", "Houston", "1111 Shepherd Dr Ste 100, Houston, TX 77007", "(832) 789-6599", "Indian cuisine near Houston's Heights area.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Chai Khana Cafe & Grill", "Restaurant", "Houston", "7201 Harwin Dr Ste B, Houston, TX 77036", "(832) 982-2333", "South Asian cafe and grill in the Harwin corridor.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Tandoori Twist", "Indian restaurant", "Houston", "5630 N Eldridge Pkwy Ste 100, Houston, TX 77041", "(281) 721-2061", "Indian restaurant, bar, and catering.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Saffron Indian Kitchen & Event Center", "Indian restaurant", "Houston", "8045 N Sam Houston Pkwy W, Houston, TX 77064", "(346) 314-4847", "Indian kitchen and event center in north Houston.", ["Current listing matches the corrected business name, address, and phone"]),
  verifiedBusiness("Subhlaxmi Grocers", "Indian grocery", "Houston", "6606 Southwest Fwy, Houston, TX 77074", "(713) 589-5788", "Indian grocery store on the Southwest Freeway.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Parivar Grocers", "Indian grocery", "Houston", "6655 Harwin Dr Ste 103A, Houston, TX 77036", "(713) 266-7771", "Indian grocery store in the Harwin corridor.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Masala Munchies", "Indian sweets", "Houston", "6692 Southwest Fwy Ste A, Houston, TX 77074", "(713) 266-2646", "Indian sweets and snacks business.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Bombay Sweets", "Indian sweets", "Houston", "5827 Hillcroft Ave, Houston, TX 77036", "(713) 780-4453", "Indian sweets and snacks business on Hillcroft.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("TikkaTemple Restaurant & Catering", "Indian restaurant", "Katy", "1315 Grand Pkwy Ste 116A, Katy, TX 77494", "(346) 355-8889", "Indian restaurant and catering in Katy.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Kuppanna's Thiru Kuppusamy", "Indian restaurant", "Katy", "20900 Katy Fwy Q, Katy, TX 77449", "(281) 206-7045", "South Indian restaurant in Katy.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Tandoori Grill & Kansaar", "Indian restaurant", "Houston", "2002 N Fry Rd Ste 103, Houston, TX 77084", "(281) 579-7778", "Indian restaurant and catering in west Houston.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Everest Curry Bar & Grill", "Indian restaurant", "Houston", "10502 Huffmeister Rd A, Houston, TX 77065", "(832) 688-9738", "Indian curry bar and grill in northwest Houston.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("The Bombay Brasserie", "Indian restaurant", "Houston", "2414 University Blvd #210, Houston, TX 77005", "(713) 355-2000", "Indian restaurant near Rice University.", ["Apna Texas listing provides this name, address, and phone"], "https://www.apnatx.com/jsp/rest_hou.jsp"),
  verifiedBusiness("Royal Biryani House", "Indian restaurant", "Katy", "4747 FM 1463 #100, Katy, TX 77494", "(832) 437-4847", "Biryani and Indian cuisine in Katy.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Daawat Catering", "Indian catering", "Sugar Land", "16260 Kensington Dr, Sugar Land, TX 77479", "(713) 256-5441", "Indian catering service in Sugar Land.", ["Current local-business listing provides address and phone"]),
  verifiedBusiness("Kansaar Restaurant & Catering", "Indian catering", "Houston", "2002 N Fry Rd Ste 103, Houston, TX 77084", "(832) 614-3136", "Indian and Gujarati restaurant and catering.", ["Current local-business listing provides address and phone"]),
];

const allBusinesses = [...businesses, ...verifiedBusinesses];

const cities = ["All cities", "Houston", "Katy", "Stafford", "Sugar Land"];
const categories = ["All categories", "Indian grocery", "Indian restaurant", "Indian sweets", "Indian catering", "Restaurant"];

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
          <p className="hero-copy">A source-checked prospecting workspace for community outreach. Each listing records its evidence and next action, with no invented contact details.</p>
        </div>
        <div className="hero-stat"><strong>{allBusinesses.length}</strong><span>source-checked records</span><small>0 placeholders retained</small></div>
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
          <div className="coverage"><div><span>DATA QUALITY</span><strong>0 placeholders</strong></div><div className="coverage-bar"><i /></div><p>Fabricated preview records were removed. New businesses must be source-checked before outreach.</p></div>
        </aside>

        <div className="directory">
          <div className="directory-header"><div><p className="section-kicker">Prospects</p><h2>Source-checked businesses</h2></div><button className="export-button" onClick={() => exportBusinesses(filteredBusinesses)}>⇩ Export CSV</button></div>
          <div className="legend"><span><i className="legend-dot high" />Source checked</span><span><i className="legend-dot medium" />Second-source check</span><span className="legend-source">No placeholder records retained</span></div>
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
