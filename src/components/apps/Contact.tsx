'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const inputStyle = {
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--window-border)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    padding: '8px 12px',
    fontSize: '13px',
    outline: 'none',
    width: '100%',
    fontFamily: 'var(--font-mono)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const fields = [
    { field: 'name', label: 'Name', placeholder: 'your_name', type: 'text' },
    { field: 'email', label: 'Email', placeholder: 'user@network.com', type: 'email' },
    { field: 'subject', label: 'Subject', placeholder: 'transmission_subject', type: 'text' },
  ];

  return (
    <div className="h-full flex flex-col p-4 font-mono">
      <div className="text-[10px] uppercase tracking-widest mb-4 font-bold" style={{ color: 'var(--accent-cyan)', textShadow: '0 0 8px var(--glow-cyan)' }}>
        // Open Comm Channel
      </div>

      <form onSubmit={handleSubmit} className="flex-1 module-container space-y-4">
        {fields.map((f, i) => (
          <motion.div
            key={f.field}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.08 }}
          >
            <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{f.label}</label>
            <input
              value={formData[f.field as keyof typeof formData]}
              onChange={handleChange(f.field)}
              placeholder={f.placeholder}
              type={f.type}
              required
              style={inputStyle}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                e.currentTarget.style.boxShadow = '0 0 12px var(--glow-cyan)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'var(--window-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 3 * 0.08 }}
        >
          <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Message</label>
          <textarea
            value={formData.message}
            onChange={handleChange('message')}
            placeholder="enter_message..."
            required
            rows={4}
            className="resize-none"
            style={inputStyle}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'var(--accent-cyan)';
              e.currentTarget.style.boxShadow = '0 0 12px var(--glow-cyan)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'var(--window-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </motion.div>

        <div className="flex justify-end items-center gap-3 pt-2">
          <AnimatePresence>
            {status === 'sent' && (
              <motion.span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--accent-green)', textShadow: '0 0 8px var(--glow-green)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                [OK] Transmission sent
              </motion.span>
            )}
          </AnimatePresence>
          {status === 'error' && (
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-magenta)' }}>
              [ERR] Transmission failed
            </span>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-5 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            style={{
              background: 'rgba(var(--accent-magenta-rgb), 0.15)',
              color: 'var(--accent-magenta)',
              border: '1px solid var(--accent-magenta)',
              boxShadow: '0 0 15px var(--glow-magenta)',
            }}
            onMouseEnter={e => {
              if (status !== 'sending') {
                e.currentTarget.style.background = 'rgba(var(--accent-magenta-rgb), 0.25)';
                e.currentTarget.style.boxShadow = '0 0 25px var(--glow-magenta)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(var(--accent-magenta-rgb), 0.15)';
              e.currentTarget.style.boxShadow = '0 0 15px var(--glow-magenta)';
            }}
          >
            {status === 'sending' ? 'Transmitting...' : '[TX] Transmit'}
          </button>
        </div>
      </form>

      <div
        className="mt-3 pt-3 text-xs text-center"
        style={{
          borderTop: '1px solid var(--window-border)',
          color: 'var(--text-dim)',
        }}
      >
        <p>// Direct channel:</p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)',
            textShadow: '0 0 8px var(--glow-cyan)',
          }}
        >
          alex@example.com
        </p>
      </div>
    </div>
  );
}
