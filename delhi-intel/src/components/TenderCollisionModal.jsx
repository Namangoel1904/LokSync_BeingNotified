import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, X, MapPin, Wrench } from 'lucide-react';
import useStore from '../store';

export default function TenderCollisionModal() {
  const hide = useStore((s) => s.hideTenderCollision);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ── Backdrop ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={hide}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* ── Modal Content ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass-red relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 80px rgba(239,68,68,0.2), 0 0 30px rgba(239,68,68,0.4)',
          border: '1px solid rgba(239,68,68,0.5)',
        }}
      >
        {/* Header strip */}
        <div className="bg-red-500/20 border-b border-red-500/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-red-400">
            <AlertOctagon size={24} className="animate-pulse" />
            <h2 className="text-lg font-black tracking-widest uppercase">Critical Collision Detected</h2>
          </div>
          <button onClick={hide} className="text-red-400 hover:text-red-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
              <Wrench size={40} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 transition-colors duration-500" style={{ color: 'var(--text-main)' }}>Infrastructural Overlap in Ward 50</h3>
            <p className="text-red-400 text-sm max-w-md mx-auto">
              Two major infrastructural projects are scheduled in the same geographical zone with overlapping execution timelines.
            </p>
          </div>

          {/* Project Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* Connection line between cards */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 text-red-500 font-bold"
                style={{ background: 'var(--panel-bg)'}}>
                VS
              </div>
            </div>

            {/* Project 1 */}
            <div className="border rounded-xl p-5 transition-colors duration-500"
              style={{ background: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 transition-colors duration-500"
                style={{ color: 'var(--text-muted)'}}>
                <MapPin size={14} /> PWD Delhi
              </div>
              <div className="font-bold text-lg mb-1 transition-colors duration-500" style={{ color: 'var(--text-main)' }}>Road Paving & Resurfacing</div>
              <div className="text-sm mb-4 transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>Phase 3 · Ward 50 Corridor</div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-xs transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>Start Date</div>
                  <div className="transition-colors duration-500" style={{ color: 'var(--text-main)' }}>15 April 2026</div>
                </div>
                <div>
                  <div className="text-xs transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>Budget</div>
                  <div className="font-bold transition-colors duration-500" style={{ color: 'var(--color-electric)' }}>₹12.4 Cr</div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border rounded-xl p-5 transition-colors duration-500"
              style={{ background: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 transition-colors duration-500"
                 style={{ color: 'var(--text-muted)'}}>
                <MapPin size={14} /> Delhi Jal Board (DJB)
              </div>
              <div className="font-bold text-lg mb-1 transition-colors duration-500" style={{ color: 'var(--text-main)' }}>Underground Pipeline Replace</div>
              <div className="text-sm mb-4 transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>Main Transmission Line · Ward 50</div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-xs transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>Start Date</div>
                  <div className="transition-colors duration-500" style={{ color: 'var(--text-main)' }}>01 May 2026</div>
                </div>
                <div>
                  <div className="text-xs transition-colors duration-500" style={{ color: 'var(--text-muted)' }}>Budget</div>
                  <div className="font-bold transition-colors duration-500" style={{ color: 'var(--color-electric)' }}>₹8.7 Cr</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between border-t border-red-500/20 pt-6">
            <div className="text-xs text-red-300/70">
              ID: COL-2026-WD50-842 · Detected by GeoCMS AI
            </div>
            <div className="flex gap-3">
              <button onClick={hide} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                Dismiss
              </button>
              <button 
                onClick={hide}
                className="px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95 text-white"
                style={{
                  background: 'linear-gradient(to right, #ef4444, #dc2626)',
                  border: '1px solid #f87171'
                }}
              >
                Halt Tenders & Notify Agencies
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
