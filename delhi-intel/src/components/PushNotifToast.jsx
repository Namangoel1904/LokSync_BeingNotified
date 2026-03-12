import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Wifi } from 'lucide-react';

export default function PushNotifToast({ state }) {
  if (!state) return null;

  const isSending = state === 'sending';
  const color = isSending ? '#60a5fa' : '#4ade80';
  const bg = isSending ? 'rgba(59,130,246,0.15)' : 'rgba(74,222,128,0.15)';
  const border = isSending ? '1px solid rgba(59,130,246,0.5)' : '1px solid rgba(74,222,128,0.5)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl transition-colors duration-500"
      style={{
        background: 'var(--panel-bg)',
        border,
        boxShadow: `0 20px 40px -10px ${isSending ? 'rgba(59,130,246,0.2)' : 'rgba(74,222,128,0.2)'}`,
      }}
    >
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-500"
        style={{ background: bg, color }}
      >
        {isSending ? (
          <Wifi size={24} className="animate-pulse" />
        ) : (
          <CheckCircle2 size={24} />
        )}
      </div>

      <div>
        <h4 className="font-bold text-sm mb-0.5 transition-colors duration-500" style={{ color: 'var(--text-main)' }}>
          {isSending ? 'Dispatching Hyper-local Update...' : 'Update Delivered Successfully'}
        </h4>
        <p className="text-xs font-mono transition-colors duration-500" style={{ color: 'var(--text-subtle)' }}>
          {isSending ? 'Targeting JanSetu Booth App Users (Ward 50)' : 'Reached 4,521 verified voters via JanSetu App'}
        </p>
      </div>

      {!isSending && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="ml-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold"
        >
          <Send size={12} /> Live
        </motion.div>
      )}
    </motion.div>
  );
}
