import React, { useRef, useCallback } from 'react';
import Map, { Layer, Source, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { motion } from 'framer-motion';
import useStore from '../store';
import {
  INITIAL_VIEW_STATE,
  AAROGYA_CLINICS,
  HOSPITALS,
  FOREST_COVER_GEOJSON,
  AQI_DATA,
  WATER_GEOJSON,
  EDUCATION_GEOJSON,
  SECURITY_GEOJSON,
  TENDERS_GEOJSON,
  LAYER_CATEGORIES,
} from '../MockData';

// Helper to wrap GeoJSON in FeatureCollection
const toFeatureCollection = (feature) => ({
  type: 'FeatureCollection',
  features: [feature],
});

// Sources
const FOREST_SOURCE = toFeatureCollection(FOREST_COVER_GEOJSON);
const WATER_SOURCE = toFeatureCollection(WATER_GEOJSON);
const EDUCATION_SOURCE = toFeatureCollection(EDUCATION_GEOJSON);
const SECURITY_SOURCE = toFeatureCollection(SECURITY_GEOJSON);
const TENDERS_SOURCE = toFeatureCollection(TENDERS_GEOJSON);

export default function MapboxContainer() {
  const activeLayer = useStore((s) => s.activeLayer);
  const theme = useStore((s) => s.theme);
  const mapRef = useRef(null);

  const showHealthcare = activeLayer === 'healthcare';
  const showEnvironment = activeLayer === 'environment';

  // Fly to layer specific view state when toggled
  React.useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    
    if (activeLayer) {
      const category = LAYER_CATEGORIES.find(c => c.id === activeLayer);
      if (category && category.viewState) {
        map.flyTo({
          center: [category.viewState.longitude, category.viewState.latitude],
          zoom: category.viewState.zoom,
          pitch: category.viewState.pitch,
          bearing: category.viewState.bearing,
          duration: 2500, // Smooth 2.5s transition
          essential: true
        });
      }
    } else {
      // Reset to initial view if toggles are cleared
      map.flyTo({
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        pitch: INITIAL_VIEW_STATE.pitch,
        bearing: INITIAL_VIEW_STATE.bearing,
        duration: 2500,
        essential: true
      });
    }
  }, [activeLayer]);

  // 3D Buildings layer spec (dynamic based on theme)
  // OpenFreeMap usually has buildings under source: 'openmaptiles', layer: 'building'
  const buildingsLayer = {
    id: 'delhi-3d-buildings',
    source: 'openmaptiles', // Must match the source ID in liberty style.json
    'source-layer': 'building',
    filter: ['!', ['has', 'hide_3d']], // Some styles use this to hide footprints of 3D models
    type: 'fill-extrusion',
    // We render them at close zoom
    minzoom: 14,
    paint: {
      'fill-extrusion-color': BUILDING_COLORS[theme],
      'fill-extrusion-height': [
        'interpolate', ['linear'], ['zoom'],
        14, 0,
        14.05, ['get', 'render_height']
      ],
      'fill-extrusion-base': [
        'interpolate', ['linear'], ['zoom'],
        14, 0,
        14.05, ['get', 'render_min_height']
      ],
      'fill-extrusion-opacity': 0.85,
    },
  };

  return (
    <div className="relative w-full h-full">
      <Map
        ref={mapRef}
        initialViewState={{...INITIAL_VIEW_STATE, zoom: 15, pitch: 60, bearing: -20}}
        mapStyle={MAP_STYLES[theme]}
        style={{ width: '100%', height: '100%' }}
        antialias={true}
      >
        {/* ── 3D Buildings ── */}
        <Layer {...buildingsLayer} />

        {/* ── Healthcare Layer ── */}
        {activeLayer === 'healthcare' && (
          <>
            {AAROGYA_CLINICS.map((clinic) => (
              <Marker key={clinic.id} longitude={clinic.longitude} latitude={clinic.latitude} anchor="center">
                <ClinicMarker clinic={clinic} />
              </Marker>
            ))}
            {HOSPITALS.map((hospital) => (
              <Marker key={hospital.id} longitude={hospital.longitude} latitude={hospital.latitude} anchor="center">
                <HospitalMarker hospital={hospital} />
              </Marker>
            ))}
          </>
        )}

        {/* ── Environment Layer — Forest Polygon ── */}
        {activeLayer === 'environment' && (
          <Source id="forest-cover" type="geojson" data={FOREST_SOURCE}>
            <Layer id="forest-fill" type="fill" paint={{ 'fill-color': '#4ade80', 'fill-opacity': 0.18 }} />
            <Layer id="forest-outline" type="line" paint={{ 'line-color': '#4ade80', 'line-width': 2.5, 'line-opacity': 0.7 }} />
          </Source>
        )}

        {/* ── Water Layer ── */}
        {activeLayer === 'water' && (
          <Source id="water-layer" type="geojson" data={WATER_SOURCE}>
            <Layer id="water-fill" type="fill" paint={{ 'fill-color': '#38bdf8', 'fill-opacity': 0.25 }} />
            <Layer id="water-outline" type="line" paint={{ 'line-color': '#38bdf8', 'line-width': 3, 'line-opacity': 0.8 }} />
          </Source>
        )}

        {/* ── Education Layer ── */}
        {activeLayer === 'education' && (
          <Source id="edu-layer" type="geojson" data={EDUCATION_SOURCE}>
            <Layer id="edu-fill" type="fill" paint={{ 'fill-color': '#60a5fa', 'fill-opacity': 0.2 }} />
            <Layer id="edu-outline" type="line" paint={{ 'line-color': '#60a5fa', 'line-width': 2, 'line-opacity': 0.8, 'line-dasharray': [2, 2] }} />
          </Source>
        )}

        {/* ── Security Layer ── */}
        {activeLayer === 'security' && (
          <Source id="sec-layer" type="geojson" data={SECURITY_SOURCE}>
            <Layer id="sec-fill" type="fill" paint={{ 'fill-color': '#fb923c', 'fill-opacity': 0.15 }} />
            <Layer id="sec-outline" type="line" paint={{ 'line-color': '#fb923c', 'line-width': 2.5, 'line-opacity': 0.9 }} />
          </Source>
        )}

        {/* ── Tenders/Infra Layer ── */}
        {activeLayer === 'tenders' && (
          <Source id="infra-layer" type="geojson" data={TENDERS_SOURCE}>
            <Layer id="infra-fill" type="fill" paint={{ 'fill-color': '#fbbf24', 'fill-opacity': 0.3 }} />
            <Layer id="infra-outline" type="line" paint={{ 'line-color': '#fbbf24', 'line-width': 2, 'line-opacity': 1, 'line-dasharray': [4, 2] }} />
          </Source>
        )}
      </Map>

      {/* ── AQI Widget (visible when environment active) ── */}
      {activeLayer === 'environment' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <AQIWidget />
        </motion.div>
      )}

      {/* ── Map Gradient Edges ── */}
      <div className="absolute inset-0 pointer-events-none z-10 transition-colors duration-500"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(241,245,249,0.7) 100%)' }}
      />

      {/* ── Layer indicator badge ── */}
      {activeLayer && (
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-500"
          style={{ color: 'var(--color-electric)' }}
        >
          LAYER ACTIVE: {activeLayer.toUpperCase()}
        </motion.div>
      )}
    </div>
  );
}

/* ── Aarogya Clinic Marker (pulsing green dot) ── */
function ClinicMarker({ clinic }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full animate-ping"
          style={{ background: 'rgba(74,222,128,0.3)', animationDuration: '1.5s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full animate-ping"
          style={{ background: 'rgba(74,222,128,0.1)', animationDuration: '2s', animationDelay: '0.3s' }} />
      </div>
      {/* Dot */}
      <div className="relative w-4 h-4 rounded-full border-2"
        style={{ background: 'var(--color-neon)', borderColor: '#fff', boxShadow: '0 0 12px rgba(74,222,128,0.6)' }}
      />
      {/* Tooltip */}
      {hovered && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold z-50 transition-colors duration-300 shadow-xl"
          style={{ background: 'var(--tooltip-bg)', border: '1px solid rgba(74,222,128,0.3)', color: 'var(--color-neon)', backdropFilter: 'blur(12px)' }}>
          {clinic.name}
          <div style={{ color: 'var(--text-subtle)' }}>{clinic.patients} patients today</div>
        </div>
      )}
    </div>
  );
}

/* ── Hospital Marker (red cross) ── */
function HospitalMarker({ hospital }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center border-2 transition-transform hover:scale-110"
        style={{ background: 'rgba(239,68,68,0.9)', borderColor: '#f87171', boxShadow: '0 0 14px rgba(239,68,68,0.5)' }}
      >
        {/* Cross shape */}
        <div className="relative w-4 h-4">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white rounded-full" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white rounded-full" />
        </div>
      </div>
      {hovered && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 rounded-lg text-xs z-50 shadow-xl transition-colors duration-300"
          style={{ background: 'var(--tooltip-bg)', border: '1px solid rgba(248,113,113,0.3)', backdropFilter: 'blur(12px)' }}>
          <div className="font-bold" style={{ color: 'var(--color-crimson)' }}>{hospital.name}</div>
          <div style={{ color: 'var(--text-subtle)' }}>{hospital.beds.toLocaleString()} beds</div>
        </div>
      )}
    </div>
  );
}

/* ── AQI Widget Component ── */
function AQIWidget() {
  const aqi = AQI_DATA;
  return (
    <div className="glass rounded-2xl px-6 py-4 flex items-center gap-6"
      style={{ boxShadow: '0 10px 30px rgba(251,191,36,0.1)' }}>
      {/* Big AQI number */}
      <div className="text-center">
        <div className="text-5xl font-black leading-none" style={{ color: aqi.color, textShadow: `0 0 20px ${aqi.color}44` }}>
          {aqi.value}
        </div>
        <div className="text-xs font-bold mt-1 tracking-widest uppercase" style={{ color: aqi.color }}>AQI · {aqi.label}</div>
      </div>
      {/* Divider */}
      <div className="w-px h-14 self-stretch" style={{ background: 'var(--panel-border)' }} />
      {/* Pollutants */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-1">
        {[
          { label: 'PM2.5', value: `${aqi.pm25}` },
          { label: 'PM10', value: `${aqi.pm10}` },
          { label: 'NO₂', value: `${aqi.no2}` },
          { label: 'O₃', value: `${aqi.o3}` },
        ].map((p) => (
          <div key={p.label} className="flex items-center gap-2">
            <span className="text-xs font-semibold w-10 transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>{p.label}</span>
            <span className="text-sm font-bold transition-colors duration-500" style={{ color: 'var(--text-main)' }}>{p.value}</span>
          </div>
        ))}
      </div>
      {/* Source */}
      <div className="text-xs font-mono transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>SAFAR-Delhi</div>
    </div>
  );
}
