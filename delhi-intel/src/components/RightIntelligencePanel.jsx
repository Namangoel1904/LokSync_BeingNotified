import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rss, ChevronRight, Bell, Send, CheckCircle2, Wifi } from 'lucide-react';
import useStore from '../store';
import { INTELLIGENCE_FEED, WATER_DATA } from '../MockData';

export default function RightIntelligencePanel() {
  const triggerPushNotif = useStore((s) => s.triggerPushNotif);
  const pushNotifState = useStore((s) => s.pushNotifState);
  const scrollRef = useRef(null);

  // Auto-scroll the feed slowly
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (el.scrollTop + el.clientHeight < el.scrollHeight - 2) {
        el.scrollTop += 0.5;
      } else {
        el.scrollTop = 0;
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-3">
      {/* ── Water KPI Card ── */}
      <WaterKPICard />

      {/* ── Intelligence Feed ── */}
      <div className="glass rounded-xl flex flex-col flex-1 overflow-hidden transition-colors duration-500">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--panel-border)' }}>
          <div className="relative">
            <Rss size={15} className="text-blue-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400">AI Intelligence Feed</span>
          <span className="ml-auto text-xs font-mono transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>LIVE</span>
        </div>

        {/* Scrolling feed */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 py-2 space-y-2"
          style={{ scrollBehavior: 'smooth' }}
          onMouseEnter={() => scrollRef.current && (scrollRef.current.style.overflowY = 'scroll')}
        >
          {INTELLIGENCE_FEED.map((item, i) => (
            <FeedItem key={item.id} item={item} index={i} onPushNotif={triggerPushNotif} pushState={pushNotifState} />
          ))}
        </div>
      </div>

      {/* ── Active Alerts Panel ── */}
      <ActiveAlerts />
    </div>
  );
}

/* ── Water KPI highlight card ── */
function WaterKPICard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-xl px-4 py-3 transition-colors duration-500"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'var(--color-electric)' }}>
            💧 DJB Water Supply
          </div>
          <div className="flex items-end gap-1 leading-none">
            <span className="text-5xl font-black" style={{ color: 'var(--color-electric)', textShadow: '0 0 20px rgba(56,189,248,0.2)' }}>
              {WATER_DATA.supply}
            </span>
            <span className="text-xl font-bold mb-1" style={{ color: 'var(--color-electric)' }}>{WATER_DATA.unit}</span>
          </div>
          <div className="text-xs mt-1 transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>
            Demand: <span className="transition-colors duration-500" style={{ color: 'var(--text-main)' }}>{WATER_DATA.demand} MGD</span> · Coverage: <span className="transition-colors duration-500" style={{ color: 'var(--text-main)' }}>{WATER_DATA.coverage}%</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold mb-1 transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>Zone Status</div>
          {WATER_DATA.zones.map((z) => (
            <div key={z.name} className="flex items-center justify-end gap-1.5 text-xs">
              <span className="transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>{z.name.split('–')[0].trim()}</span>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                z.status === 'green' ? 'bg-green-400' :
                z.status === 'amber' ? 'bg-amber-400' : 'bg-red-400'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Individual feed card ── */
function FeedItem({ item, index, onPushNotif, pushState }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 + 0.5, type: 'spring', stiffness: 120, damping: 18 }}
      className="glass rounded-lg px-3 py-2.5 transition-colors duration-500 group cursor-pointer"
      whileHover={{ backgroundColor: 'var(--panel-bg-hover)', borderColor: 'var(--color-electric)' }}
    >
      {/* Tag + time */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold px-1.5 py-0.5 rounded"
          style={{ background: `${item.tagColor}18`, color: item.tagColor, border: `1px solid ${item.tagColor}33` }}>
          {item.tag}
        </span>
        <span className="text-xs font-mono transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>{item.time}</span>
      </div>

      {/* Title */}
      <p className="text-xs font-medium leading-relaxed transition-colors duration-500" style={{ color: 'var(--text-main)' }}>
        {item.title}
      </p>

      {/* Source + action */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>{item.source}</span>
        {item.resolved && (
          <button
            onClick={onPushNotif}
            disabled={!!pushState}
            className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg transition-all duration-200"
            style={{
              background: pushState ? 'rgba(74,222,128,0.15)' : 'rgba(59,130,246,0.15)',
              color: pushState ? 'var(--color-neon)' : 'var(--color-electric)',
              border: `1px solid ${pushState ? 'rgba(74,222,128,0.3)' : 'rgba(59,130,246,0.25)'}`,
              opacity: pushState ? 0.7 : 1,
            }}
          >
            {pushState === 'sent' ? (
              <><CheckCircle2 size={11} /> Dispatched</>
            ) : pushState === 'sending' ? (
              <><Wifi size={11} className="animate-pulse" /> Sending…</>
            ) : (
              <><Send size={11} /> Push Update to Ward Citizens</>
            )}
          </button>
        )}
        {!item.resolved && (
          <ChevronRight size={12} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
        )}
      </div>
    </motion.div>
  );
}

/* ── Active Alerts strip ── */
function ActiveAlerts() {
  const alerts = [
    { label: 'Zone D – Water Pressure', severity: 'critical', time: '34m' },
    { label: 'Ward 50 – Tender Collision', severity: 'high', time: '51m' },
    { label: 'AQI Advisory Tomorrow', severity: 'medium', time: '1h' },
  ];
  const colors = { critical: 'var(--color-crimson)', high: 'var(--color-amber)', medium: 'var(--color-electric)' };

  return (
    <div className="glass rounded-xl px-4 py-3 transition-colors duration-500">
      <div className="flex items-center gap-2 mb-2">
        <Bell size={13} style={{ color: 'var(--color-crimson)' }} />
        <span className="text-xs font-bold tracking-widest uppercase transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>
          Active Alerts
        </span>
        <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold"
          style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--color-crimson)' }}>
          {alerts.length}
        </span>
      </div>
      <div className="space-y-1.5">
        {alerts.map((a) => (
          <div key={a.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors[a.severity] }} />
              <span className="transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>{a.label}</span>
            </div>
            <span className="font-mono transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>{a.time} ago</span>
          </div>
        ))}
      </div>
    </div>
  );
}
