import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, HeartPulse, Droplets, TreePine, ShieldCheck, Wrench,
  Zap, AlertTriangle,
} from 'lucide-react';
import useStore from '../store';
import { LAYER_CATEGORIES, TENDERS_DATA } from '../MockData';

const ICON_MAP = {
  GraduationCap,
  HeartPulse,
  Droplets,
  TreePine,
  ShieldCheck,
  Construction: Wrench,
};

export default function SidebarToggles() {
  const activeLayer = useStore((s) => s.activeLayer);
  const setActiveLayer = useStore((s) => s.setActiveLayer);
  const showTenderCollision = useStore((s) => s.showTenderCollision);

  const collisionCount = TENDERS_DATA.filter((t) => t.collision).length;

  return (
    <div className="flex flex-col gap-3">
      {/* ── Command Center Label ── */}
      <div className="glass rounded-xl px-4 py-3 transition-colors duration-500">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={14} className="text-blue-400" />
          <span className="text-xs font-bold tracking-widest uppercase transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>
            Command Center
          </span>
        </div>
        <p className="text-xs transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>
          Activate a layer to explore city-wide data on the 3D map.
        </p>
      </div>

      {/* ── Layer Toggles ── */}
      {LAYER_CATEGORIES.map((cat, i) => {
        const Icon = ICON_MAP[cat.icon];
        const isActive = activeLayer === cat.id;
        const hasAlert = cat.id === 'tenders' || cat.id === 'water';

        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 + 0.1, type: 'spring', stiffness: 120, damping: 18 }}
          >
            <button
              onClick={() => setActiveLayer(cat.id)}
              className="w-full text-left rounded-xl px-4 py-3.5 transition-all duration-300"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${cat.color}22, ${cat.color}0a)`
                  : 'var(--panel-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: isActive
                  ? `1px solid ${cat.color}55`
                  : '1px solid var(--panel-border)',
                boxShadow: isActive ? `0 0 20px ${cat.color}22` : '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center justify-between">
                {/* Icon + Label */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive ? `${cat.color}25` : 'rgba(150,150,150,0.05)',
                      border: `1px solid ${isActive ? cat.color + '55' : 'rgba(150,150,150,0.1)'}`,
                    }}
                  >
                    {Icon && (
                      <Icon
                        size={20}
                        style={{ color: isActive ? cat.color : 'var(--text-subtle)' }}
                        strokeWidth={isActive ? 2.5 : 1.8}
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm transition-colors duration-500" style={{ color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>
                      {cat.label}
                    </div>
                    {hasAlert && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <AlertTriangle size={10} style={{ color: 'var(--color-amber)' }} />
                        <span className="text-xs font-semibold" style={{ color: 'var(--color-amber)' }}>
                          {cat.id === 'tenders' ? `${collisionCount} Collisions` : 'Zone D Critical'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Physical Toggle Switch */}
                <ToggleSwitch active={isActive} color={cat.color} />
              </div>

              {/* Expanded inner stats when active */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 pt-3 border-t"
                  style={{ borderColor: `${cat.color}22` }}
                >
                  <LayerStats layerId={cat.id} color={cat.color} />
                </motion.div>
              )}
            </button>
          </motion.div>
        );
      })}

      {/* ── Simulate Tender Collision Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <button
          onClick={showTenderCollision}
          className="w-full rounded-xl px-4 py-4 font-bold text-sm tracking-wide transition-all duration-200 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.08))',
            border: '1px solid rgba(239,68,68,0.4)',
            color: 'var(--color-crimson)',
            boxShadow: '0 0 20px rgba(239,68,68,0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(239,68,68,0.35)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.3), rgba(239,68,68,0.12))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(239,68,68,0.15)';
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.08))';
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle size={16} />
            <span>Simulate Tender Collision</span>
          </div>
        </button>
      </motion.div>

      {/* ── Version chip ── */}
      <div className="text-center pb-2">
        <span className="text-xs font-mono transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>
          JanSetu v3.1.4-beta · GeoCMS Engine
        </span>
      </div>
    </div>
  );
}

/* ── Physical Toggle Switch Component ── */
function ToggleSwitch({ active, color }) {
  return (
    <div
      className="relative flex-shrink-0 w-14 h-7 rounded-full transition-all duration-300 cursor-pointer"
      style={{
        background: active
          ? `linear-gradient(135deg, ${color}, ${color}88)`
          : 'var(--panel-border)',
        border: active ? `1px solid ${color}88` : '1px solid var(--panel-border)',
        boxShadow: active ? `0 0 12px ${color}44` : 'none',
      }}
    >
      <motion.div
        animate={{ x: active ? 29 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-5 h-5 rounded-full"
        style={{
          background: active ? '#fff' : 'var(--text-muted)',
          boxShadow: active ? `0 2px 8px ${color}66` : '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
}

/* ── Quick Stats per active layer ── */
function LayerStats({ layerId, color }) {
  const stats = {
    education: [
      { label: 'Total Schools', value: '1,024' },
      { label: 'Avg Attendance', value: '87.4%' },
      { label: 'Smart Classrooms', value: '642' },
    ],
    healthcare: [
      { label: 'Aarogya Clinics', value: '6 Active' },
      { label: 'Hospitals', value: '5 Major' },
      { label: 'Today\'s OPD', value: '741 Pts' },
    ],
    water: [
      { label: 'Supply', value: '45 MGD' },
      { label: 'Coverage', value: '73%' },
      { label: 'Zone D', value: '⚠ Critical' },
    ],
    environment: [
      { label: 'AQI', value: '142' },
      { label: 'Forest Cover', value: '887 ha' },
      { label: 'PM2.5', value: '68.4 µg' },
    ],
    security: [
      { label: 'CCTV Active', value: '1,847' },
      { label: 'Incidents 24h', value: '7' },
      { label: 'Resolved', value: '85%' },
    ],
    tenders: [
      { label: 'Active Tenders', value: '4' },
      { label: 'Collisions', value: '⚠ 2' },
      { label: 'Total Value', value: '₹26.1 Cr' },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {(stats[layerId] || []).map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-bold text-sm leading-tight transition-colors duration-500" style={{ color }}>
            {s.value}
          </div>
          <div className="text-xs mt-0.5 leading-tight transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
