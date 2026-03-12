// ───────────────────────────────────────────────
// MockData.js — All static data for Delhi-Intel 3D
// ───────────────────────────────────────────────

// ── Mapbox Token (replace with real key) ──────
export const MAPBOX_TOKEN = 'pk.REPLACE_WITH_YOUR_MAPBOX_ACCESS_TOKEN';

// ── Map Initial View ──────────────────────────
export const INITIAL_VIEW_STATE = {
  longitude: 77.2167,
  latitude: 28.6139,
  zoom: 13,
  pitch: 60,
  bearing: -20,
};

// ── Healthcare Layer Data ─────────────────────
export const AAROGYA_CLINICS = [
  { id: 'ac1', name: 'Aarogya Clinic – Chandni Chowk', longitude: 77.2310, latitude: 28.6506, patients: 124 },
  { id: 'ac2', name: 'Aarogya Clinic – Karol Bagh', longitude: 77.1908, latitude: 28.6517, patients: 98 },
  { id: 'ac3', name: 'Aarogya Clinic – Paharganj', longitude: 77.2128, latitude: 28.6443, patients: 211 },
  { id: 'ac4', name: 'Aarogya Clinic – Rajinder Nagar', longitude: 77.1788, latitude: 28.6393, patients: 76 },
  { id: 'ac5', name: 'Aarogya Clinic – Civil Lines', longitude: 77.2249, latitude: 28.6798, patients: 143 },
  { id: 'ac6', name: 'Aarogya Clinic – Sadar Bazaar', longitude: 77.2055, latitude: 28.6585, patients: 89 },
];

export const HOSPITALS = [
  { id: 'h1', name: 'AIIMS Delhi', longitude: 77.2098, latitude: 28.5672, beds: 2478 },
  { id: 'h2', name: 'GTB Hospital', longitude: 77.3118, latitude: 28.6862, beds: 1500 },
  { id: 'h3', name: 'Safdarjung Hospital', longitude: 77.2074, latitude: 28.5694, beds: 1531 },
  { id: 'h4', name: 'RML Hospital', longitude: 77.2043, latitude: 28.6265, beds: 1178 },
  { id: 'h5', name: 'Lok Nayak Hospital', longitude: 77.2405, latitude: 28.6393, beds: 2000 },
];

// ── Environment Layer ─────────────────────────
export const FOREST_COVER_GEOJSON = {
  type: 'Feature',
  properties: { name: 'Central Ridge Forest Reserve', area_ha: 887 },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [77.1710, 28.6900],
      [77.1750, 28.7100],
      [77.1900, 28.7200],
      [77.2050, 28.7150],
      [77.2100, 28.6950],
      [77.2000, 28.6780],
      [77.1850, 28.6720],
      [77.1710, 28.6900],
    ]],
  },
};

export const AQI_DATA = {
  value: 142,
  label: 'Moderate',
  color: '#fbbf24',
  pm25: 68.4,
  pm10: 112.3,
  no2: 44.1,
  o3: 38.8,
  stations: [
    { name: 'ITO', aqi: 156 },
    { name: 'Anand Vihar', aqi: 188 },
    { name: 'Lodhi Road', aqi: 115 },
    { name: 'Pusa', aqi: 131 },
  ],
};

// ── Water Layer ───────────────────────────────
export const WATER_DATA = {
  supply: 45,
  unit: 'MGD',
  demand: 62,
  coverage: 73,
  zones: [
    { name: 'Zone A – North Delhi', pressure: 'Optimal', status: 'green' },
    { name: 'Zone B – Central Delhi', pressure: 'Low', status: 'amber' },
    { name: 'Zone C – South Delhi', pressure: 'Optimal', status: 'green' },
    { name: 'Zone D – West Delhi', pressure: 'Critical', status: 'red' },
  ],
};

export const WATER_GEOJSON = {
  type: 'Feature',
  properties: { name: 'Yamuna Water Treatment Zone' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [77.2600, 28.6000], [77.2850, 28.6000],
      [77.2850, 28.6250], [77.2600, 28.6250],
      [77.2600, 28.6000]
    ]],
  },
};

// ── Education Layer ───────────────────────────
export const EDUCATION_DATA = {
  // ... metrics ...
  schools: 1024,
  avgAttendance: 87.4,
  digitalClassrooms: 642,
  highlights: [
    { name: 'Govt. Sarvodaya Bal Vidyalaya', ward: 'Ward 42', rating: 4.6, students: 1240 },
    { name: 'Delhi Model Virtual School', ward: 'Ward 18', rating: 4.8, students: 3200 },
    { name: 'Shaheed Bhagat Singh College', ward: 'Ward 55', rating: 4.3, students: 8700 },
  ],
};

// A mock bounding area for a cluster of schools
export const EDUCATION_GEOJSON = {
  type: 'Feature',
  properties: { name: 'Education Hub' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [77.0900, 28.6950], [77.1150, 28.6950],
      [77.1150, 28.7150], [77.0900, 28.7150],
      [77.0900, 28.6950]
    ]],
  },
};

// ── Security Layer ───────────────────────────
export const SECURITY_DATA = {
  cameras: 1847,
  activePatrols: 124,
  incidents24h: 7,
  resolvedPct: 85,
  alerts: [
    { type: 'Traffic', location: 'ITO Junction', time: '21:04', severity: 'medium' },
    { type: 'Crowd', location: 'Chandni Chowk', time: '20:47', severity: 'low' },
    { type: 'Incident', location: 'Connaught Place', time: '19:22', severity: 'high' },
  ],
};

export const SECURITY_GEOJSON = {
  type: 'Feature',
  properties: { name: 'High Security Zone VIPS' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [77.1900, 28.6100], [77.2300, 28.6100],
      [77.2300, 28.6400], [77.1900, 28.6400],
      [77.1900, 28.6100]
    ]],
  },
};

// ── Tenders ─────────────────────────────────
export const TENDERS_DATA = [
  {
    id: 't1',
    title: 'PWD Road Paving – Ward 50',
    agency: 'PWD Delhi',
    value: '₹12.4 Cr',
    deadline: '2026-04-15',
    ward: 'Ward 50',
    geoType: 'road',
    status: 'Active',
    collision: true,
    collisionWith: 'DJB Water Pipeline Replacement – Ward 50',
  },
  {
    id: 't2',
    title: 'DJB Water Pipeline – Ward 50',
    agency: 'DJB',
    value: '₹8.7 Cr',
    deadline: '2026-05-01',
    ward: 'Ward 50',
    geoType: 'underground',
    status: 'Active',
    collision: true,
    collisionWith: 'PWD Road Paving – Ward 50',
  },
  {
    id: 't3',
    title: 'Street Light Modernisation – Zone B',
    agency: 'BSES Rajdhani',
    value: '₹3.2 Cr',
    deadline: '2026-03-30',
    ward: 'Multiple',
    geoType: 'electrical',
    status: 'Tendered',
    collision: false,
  },
  {
    id: 't4',
    title: 'Footpath Beautification – CP',
    agency: 'NDMC',
    value: '₹1.8 Cr',
    deadline: '2026-06-10',
    ward: 'Ward 22',
    geoType: 'civil',
    status: 'Draft',
    collision: false,
  },
];

export const TENDERS_GEOJSON = {
  type: 'Feature',
  properties: { name: 'Active Tender Construction Area' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [77.1850, 28.6450], [77.1950, 28.6450],
      [77.1950, 28.6550], [77.1850, 28.6550],
      [77.1850, 28.6450]
    ]],
  },
};

// ── Right Panel – News / Intelligence Feed ────
export const INTELLIGENCE_FEED = [
  {
    id: 'n1',
    tag: 'AI INSIGHT',
    tagColor: '#60a5fa',
    title: 'Predictive Analytics flags pothole hotspots in 12 wards before monsoon',
    time: '2 min ago',
    source: 'Delhi-Intel Engine',
    resolved: false,
  },
  {
    id: 'n2',
    tag: 'POLICY UPDATE',
    tagColor: '#4ade80',
    title: 'CM approves ₹240 Cr Smart School upgrade package for 320 MCD schools',
    time: '18 min ago',
    source: 'Delhi Secretariat',
    resolved: true,
  },
  {
    id: 'n3',
    tag: '⚠ ALERT',
    tagColor: '#f87171',
    title: 'Water pressure drop detected in Zone D – Rohini Sector 22; field team dispatched',
    time: '34 min ago',
    source: 'DJB SCADA',
    resolved: false,
  },
  {
    id: 'n4',
    tag: 'TENDER',
    tagColor: '#fbbf24',
    title: 'COLLISION RISK: 3 active projects overlap in Ward 50 — review required',
    time: '51 min ago',
    source: 'GeoCMS Engine',
    resolved: false,
  },
  {
    id: 'n5',
    tag: 'AI INSIGHT',
    tagColor: '#60a5fa',
    title: 'AQI forecast: PM2.5 to peak at 180+ between 06:00–09:00 tomorrow — GRAP Stage II advisory',
    time: '1 hr ago',
    source: 'SAFAR-Delhi Model',
    resolved: false,
  },
  {
    id: 'n6',
    tag: 'TECH',
    tagColor: '#c084fc',
    title: '\'JanSetu\' booth app reaches 1.2M voter registrations — 94% via mobile',
    time: '2 hrs ago',
    source: 'CEO Delhi Office',
    resolved: true,
  },
  {
    id: 'n7',
    tag: 'INFRA',
    tagColor: '#38bdf8',
    title: 'Metro Phase IV – Janakpuri West corridor: 87% civil work complete',
    time: '3 hrs ago',
    source: 'DMRC Update',
    resolved: false,
  },
  {
    id: 'n8',
    tag: 'SECURITY',
    tagColor: '#fb923c',
    title: 'CCTV AI flagged 3 unattended objects near CP; all cleared by PCR',
    time: '4 hrs ago',
    source: 'Delhi Police ICCC',
    resolved: true,
  },
];

// ── Layer categories (with associated camera view states) ────────────────
export const LAYER_CATEGORIES = [
  { 
    id: 'education',     
    label: 'Education',     
    icon: 'GraduationCap', 
    color: '#60a5fa',
    viewState: { longitude: 77.1025, latitude: 28.7041, zoom: 12, pitch: 45, bearing: 0 } // Pitampura area
  },
  { 
    id: 'healthcare',    
    label: 'Healthcare',    
    icon: 'HeartPulse',    
    color: '#4ade80',
    viewState: { longitude: 77.2098, latitude: 28.5672, zoom: 13, pitch: 50, bearing: -15 } // AIIMS / Safdarjung
  },
  { 
    id: 'water',         
    label: 'Water Supply',  
    icon: 'Droplets',      
    color: '#38bdf8',
    viewState: { longitude: 77.2719, latitude: 28.6129, zoom: 11.5, pitch: 40, bearing: 10 } // East Delhi / Yamuna
  },
  { 
    id: 'environment',   
    label: 'Environment',   
    icon: 'TreePine',      
    color: '#86efac',
    viewState: { longitude: 77.1710, latitude: 28.6900, zoom: 12.5, pitch: 60, bearing: 45 } // Ridge Forest
  },
  { 
    id: 'security',      
    label: 'Security',      
    icon: 'ShieldCheck',   
    color: '#fb923c',
    viewState: { longitude: 77.2167, latitude: 28.6315, zoom: 14, pitch: 55, bearing: -30 } // Connaught Place
  },
  { 
    id: 'tenders',       
    label: 'Tenders/Infra', 
    icon: 'Construction',  
    color: '#fbbf24',
    viewState: { longitude: 77.1908, latitude: 28.6517, zoom: 13.5, pitch: 65, bearing: -20 } // Karol Bagh / Central
  },
];
