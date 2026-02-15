'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'flow-states-101',
    title: 'Flow States 101: The Science Behind Peak Performance',
    date: '2025-01-15',
    excerpt: 'Understanding the neurochemistry of flow and how to trigger it consistently in your daily work...',
    tags: ['flow', 'productivity', 'science'],
  },
  {
    id: 'fourflow-introduction',
    title: 'Introducing the FourFlow Framework',
    date: '2025-01-10',
    excerpt: 'Spirit, Story, Space, Self - a holistic approach to designing your life for maximum flow...',
    tags: ['fourflow', 'philosophy', 'framework'],
  },
  {
    id: 'micro-workouts',
    title: 'The Power of Micro-Workouts',
    date: '2025-01-05',
    excerpt: 'Why distributed movement throughout the day beats traditional gym sessions for most people...',
    tags: ['fitness', 'habits', 'repos'],
  },
  {
    id: 'terminal-design',
    title: 'Terminal Aesthetics in Modern Apps',
    date: '2024-12-28',
    excerpt: 'Exploring the psychological impact of minimalist, terminal-inspired user interfaces...',
    tags: ['design', 'ux', 'minimalism'],
  },
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="h-full flex flex-col font-mono">
      {/* Header */}
      <div
        className="px-3 py-2 shrink-0 text-xs font-bold uppercase tracking-wider"
        style={{
          color: 'var(--accent-cyan)',
          borderBottom: '1px solid var(--window-border)',
          textShadow: '0 0 8px var(--glow-cyan)',
        }}
      >
        // Transmission Logs
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* List header */}
        <div
          className="grid grid-cols-[2fr,1fr,1fr] gap-2 p-2.5 text-xs font-bold uppercase tracking-wider sticky top-0"
          style={{
            color: 'var(--accent-cyan)',
            borderBottom: '1px solid var(--window-border)',
            background: 'var(--bg-secondary)',
          }}
        >
          <span>Title</span>
          <span>Date</span>
          <span>Tags</span>
        </div>

        {/* Blog posts */}
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.id}
            className="grid grid-cols-[2fr,1fr,1fr] gap-2 p-2.5 cursor-pointer text-sm rounded transition-colors"
            style={{
              background: selectedPost?.id === post.id ? 'rgba(var(--accent-cyan-rgb), 0.08)' : 'transparent',
              color: 'var(--text-secondary)',
              borderBottom: '1px solid rgba(30, 35, 71, 0.5)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            onClick={() => setSelectedPost(post)}
            onMouseEnter={e => {
              if (selectedPost?.id !== post.id) {
                e.currentTarget.style.background = 'var(--bg-tertiary)';
              }
            }}
            onMouseLeave={e => {
              if (selectedPost?.id !== post.id) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span className="flex items-center gap-2 truncate">
              <span style={{ color: 'var(--text-primary)' }} className="truncate">{post.title}</span>
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>{formatDate(post.date)}</span>
            <span className="truncate" style={{ color: 'var(--text-dim)' }}>{post.tags.join(', ')}</span>
          </motion.div>
        ))}
      </div>

      {/* Preview pane */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="shrink-0 p-4 text-sm"
            style={{
              borderTop: '1px solid var(--window-border)',
              background: 'var(--bg-tertiary)',
              maxHeight: '150px',
              overflow: 'auto',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            key={selectedPost.id}
          >
            <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{selectedPost.title}</h4>
            <p className="mb-2 text-xs" style={{ color: 'var(--text-dim)' }}>{formatDate(selectedPost.date)}</p>
            <p style={{ color: 'var(--text-secondary)' }}>{selectedPost.excerpt}</p>
            <div className="flex gap-1 mt-2">
              {selectedPost.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold"
                  style={{
                    background: 'rgba(var(--accent-magenta-rgb), 0.1)',
                    color: 'var(--accent-magenta)',
                    border: '1px solid rgba(var(--accent-magenta-rgb), 0.3)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div
        className="shrink-0 px-3 py-1.5 text-xs"
        style={{
          borderTop: '1px solid var(--window-border)',
          color: 'var(--text-dim)',
        }}
      >
        {blogPosts.length} log(s) found
      </div>
    </div>
  );
}
