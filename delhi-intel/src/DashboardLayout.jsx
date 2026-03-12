import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './store';
import SidebarToggles from './components/SidebarToggles';
import MapboxContainer from './components/MapboxContainer';
import RightIntelligencePanel from './components/RightIntelligencePanel';
import TenderCollisionModal from './components/TenderCollisionModal';
import PushNotifToast from './components/PushNotifToast';

export default function DashboardLayout() {
  const tenderCollisionVisible = useStore((s) => s.tenderCollisionVisible);
  const pushNotifState = useStore((s) => s.pushNotifState);

  return (
    <div className="relative w-full h-full overflow-hidden transition-colors duration-500" style={{ background: 'var(--app-bg)', color: 'var(--text-main)' }}>
      {/* Scanline overlay for CRT effect */}
      <div className="scanlines absolute inset-0 pointer-events-none z-10" />

      {/* ── Top Header Bar ── */}
      <header
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3 transition-colors duration-500"
        style={{
          background: 'var(--header-bg)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--panel-border)',
        }}
      >
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)', boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight transition-colors duration-500" style={{ color: 'var(--text-main)' }}>Delhi-Intel 3D</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: 'rgba(59,130,246,0.2)', color: 'var(--color-electric)', border: '1px solid rgba(59,130,246,0.3)' }}>
                LIVE
              </span>
            </div>
            <div className="text-xs font-medium transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>JanSetu Smart City Operating System · Delhi NCT</div>
          </div>
        </div>

        {/* Center stats */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'WARDS MONITORED', value: '272', color: 'var(--color-electric)' },
            { label: 'ACTIVE ALERTS', value: '7', color: 'var(--color-crimson)' },
            { label: 'UPTIME', value: '99.97%', color: 'var(--color-neon)' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black leading-none transition-colors duration-500" style={{ color: s.color, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
              <div className="text-xs mt-0.5 font-semibold tracking-widest transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Right — time + status */}
        <div className="flex items-center gap-4">
          <LiveClock />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold transition-colors duration-500" style={{ color: 'var(--color-neon)' }}>ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </header>

      {/* ── Map (full background) ── */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
        <MapboxContainer />
      </div>

      {/* ── Left Sidebar ── */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
        className="absolute left-4 top-20 bottom-4 z-20 w-72 flex flex-col gap-3 overflow-y-auto"
        style={{ scrollbarWidth: 'thin' }}
      >
        <SidebarToggles />
      </motion.aside>

      {/* ── Right Panel ── */}
      <motion.aside
        initial={{ x: 380 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
        className="absolute right-4 top-20 bottom-4 z-20 w-80 flex flex-col overflow-hidden"
      >
        <RightIntelligencePanel />
      </motion.aside>

      {/* ── Modals ── */}
      <AnimatePresence>
        {tenderCollisionVisible && <TenderCollisionModal />}
      </AnimatePresence>

      <AnimatePresence>
        {pushNotifState && <PushNotifToast state={pushNotifState} />}
      </AnimatePresence>
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-right">
      <div className="font-mono font-bold text-base transition-colors duration-500" style={{ color: 'var(--text-main)', fontVariantNumeric: 'tabular-nums' }}>
        {time.toLocaleTimeString('en-IN', { hour12: false })}
      </div>
      <div className="text-xs transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>
        {time.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </div>
  );
}
