'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigationStore } from '@/store/navigationStore';

const tabs = ['About', 'Skills', 'Journey', 'Connect'];

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState(0);
  const setActivePanel = useNavigationStore(state => state.setActivePanel);

  return (
    <div className="h-full flex flex-col">
      {/* Tab Bar */}
      <div className="flex shrink-0" style={{ borderBottom: '1px solid var(--window-border)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            style={{
              color: activeTab === i ? 'var(--accent-cyan)' : 'var(--text-tertiary)',
              borderBottom: activeTab === i ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              background: 'transparent',
              fontFamily: 'var(--font-mono)',
              textShadow: activeTab === i ? '0 0 8px var(--glow-cyan)' : 'none',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          {/* About Tab */}
          {activeTab === 0 && (
            <motion.div
              key="about"
              className="space-y-5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Profile Header */}
              <div className="flex gap-4 items-start">
                <div
                  className="w-16 h-16 rounded flex items-center justify-center text-xl font-mono font-bold shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(255, 45, 123, 0.15))',
                    border: '1px solid var(--accent-cyan)',
                    color: 'var(--accent-cyan)',
                    boxShadow: '0 0 15px var(--glow-cyan)',
                  }}
                >
                  USR
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold" style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-display)' }}>Alex Martel</h2>
                  <p className="text-xs italic font-mono" style={{ color: 'var(--text-secondary)' }}>Creator &middot; Builder &middot; Flow Engineer</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wider" style={{ background: 'rgba(0, 229, 255, 0.15)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 229, 255, 0.3)' }}>Developer</span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wider" style={{ background: 'rgba(180, 77, 255, 0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(180, 77, 255, 0.3)' }}>Coach</span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wider" style={{ background: 'rgba(0, 255, 157, 0.15)', color: 'var(--accent-green)', border: '1px solid rgba(0, 255, 157, 0.3)' }}>Designer</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-2 font-semibold font-mono" style={{ color: 'var(--accent-cyan)' }}>// Bio</div>
                <div className="text-sm leading-relaxed font-mono" style={{ color: 'var(--text-secondary)' }}>
                  <p className="mb-2">
                    I design and develop digital products that help people achieve more with less friction.
                    My work sits at the intersection of <strong style={{ color: 'var(--accent-cyan)' }}>technology</strong>, <strong style={{ color: 'var(--accent-magenta)' }}>psychology</strong>,
                    and <strong style={{ color: 'var(--accent-purple)' }}>mindful design</strong>.
                  </p>
                  <p>
                    Creator of the FourFlow framework — a holistic approach to cultivating flow states
                    through Spirit, Story, Space, and Self.
                  </p>
                </div>
              </div>

              {/* Philosophy Quote */}
              <div
                className="p-4 rounded text-sm italic leading-relaxed font-mono"
                style={{
                  background: 'rgba(180, 77, 255, 0.05)',
                  borderLeft: '2px solid var(--accent-purple)',
                  color: 'var(--text-secondary)',
                  boxShadow: '-4px 0 15px rgba(180, 77, 255, 0.1)',
                }}
              >
                &ldquo;My path has led me from the haze of hesitation to the clear rhythm of inspired action.
                In flow, we harmonize effort with ease, replace apathy with inspiration, and leave behind
                grinding for thriving in joy and simplicity.&rdquo;
              </div>
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === 1 && (
            <motion.div
              key="skills"
              className="space-y-5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-3 font-semibold font-mono" style={{ color: 'var(--accent-cyan)' }}>// Technical Skills</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'React / Next.js', level: 95 },
                    { name: 'TypeScript', level: 90 },
                    { name: 'React Native', level: 85 },
                    { name: 'Node.js', level: 80 },
                    { name: 'Tailwind CSS', level: 95 },
                    { name: 'Firebase / Supabase', level: 85 },
                  ].map((skill, i) => (
                    <div key={skill.name} className="text-sm font-mono">
                      <div className="flex justify-between mb-1">
                        <span style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                        <span style={{ color: 'var(--accent-cyan)' }}>{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                            boxShadow: '0 0 8px var(--glow-cyan)',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest mb-3 font-semibold font-mono" style={{ color: 'var(--accent-cyan)' }}>// Frameworks &amp; Philosophy</div>
                <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                  {[
                    '> Flow States',
                    '> Energy Mgmt',
                    '> Minimalist UX',
                    '> User Psych',
                    '> PWA Dev',
                    '> Agile/Lean',
                  ].map(skill => (
                    <div
                      key={skill}
                      className="p-2.5 rounded flex items-center gap-2"
                      style={{
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--window-border)',
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Journey Tab */}
          {activeTab === 2 && (
            <motion.div
              key="journey"
              className="space-y-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-xs mb-4 font-mono" style={{ color: 'var(--text-tertiary)' }}>
                // Timeline of pivotal moments that shaped my approach.
              </p>

              {[
                { year: '2024', title: 'FourFlow Framework', desc: 'Synthesized years of research into a cohesive framework for cultivating flow states.' },
                { year: '2024', title: 'REP.OS Launch', desc: 'Built a minimalist fitness tracker that challenges the complexity of modern apps.' },
                { year: '2023', title: 'FlowSpace Development', desc: 'Started building productivity tools based on flow psychology.' },
                { year: '2022', title: 'Flow Research', desc: 'Deep dive into Csikszentmihalyi\'s work and modern flow science.' },
                { year: '2020', title: 'Full-Stack Journey', desc: 'Transitioned to building complete products from concept to deployment.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <div
                    className="w-14 shrink-0 text-center py-1.5 rounded font-mono font-bold text-xs"
                    style={{
                      background: 'rgba(0, 229, 255, 0.15)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      boxShadow: '0 0 8px var(--glow-cyan)',
                    }}
                  >
                    {item.year}
                  </div>
                  <div
                    className="flex-1 p-3 rounded font-mono"
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--window-border)',
                    }}
                  >
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Connect Tab */}
          {activeTab === 3 && (
            <motion.div
              key="connect"
              className="space-y-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-3 font-semibold font-mono" style={{ color: 'var(--accent-cyan)' }}>// Channels</div>
                <div className="space-y-2">
                  {[
                    { icon: 'WEB', label: 'Website', value: 'alexmartel.com', href: '#' },
                    { icon: 'X  ', label: 'Twitter / X', value: '@alexmartel', href: '#' },
                    { icon: 'LNK', label: 'LinkedIn', value: '/in/alexmartel', href: '#' },
                    { icon: 'MSG', label: 'Email', value: 'hello@alexmartel.com', href: 'mailto:hello@alexmartel.com' },
                  ].map((link, i) => (
                    <motion.div
                      key={link.label}
                      className="flex items-center gap-3 text-sm p-2.5 rounded font-mono"
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--window-border)',
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                    >
                      <span className="text-xs font-bold" style={{ color: 'var(--accent-cyan)' }}>[{link.icon}]</span>
                      <div className="flex-1">
                        <span style={{ color: 'var(--text-tertiary)' }}>{link.label}: </span>
                        <a
                          href={link.href}
                          className="underline underline-offset-2 transition-colors"
                          style={{ color: 'var(--accent-cyan)' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = 'var(--accent-magenta)';
                            e.currentTarget.style.textShadow = '0 0 8px var(--glow-magenta)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = 'var(--accent-cyan)';
                            e.currentTarget.style.textShadow = 'none';
                          }}
                        >
                          {link.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActivePanel('contact')}
                  className="px-5 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                  style={{
                    background: 'rgba(255, 45, 123, 0.15)',
                    color: 'var(--accent-magenta)',
                    border: '1px solid var(--accent-magenta)',
                    boxShadow: '0 0 15px var(--glow-magenta)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255, 45, 123, 0.25)';
                    e.currentTarget.style.boxShadow = '0 0 25px var(--glow-magenta)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 45, 123, 0.15)';
                    e.currentTarget.style.boxShadow = '0 0 15px var(--glow-magenta)';
                  }}
                >
                  [COM] Open Comm Channel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
