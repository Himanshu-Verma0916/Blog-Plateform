import React, { useState, useMemo } from 'react';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/posts/PostCard';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import { Filter, PenLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../utils/mockData';

const POSTS_PER_PAGE = 6;

const styles = {
  page: { maxWidth: '1200px', margin: '0 auto', padding: '48px 2rem' },
  hero: {
    textAlign: 'center', marginBottom: '56px',
    padding: '60px 2rem',
    background: 'linear-gradient(135deg, var(--parchment) 0%, var(--parchment-warm) 100%)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--parchment-deep)',
    position: 'relative', overflow: 'hidden',
  },
  heroTagline: {
    fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '16px',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700, lineHeight: 1.15, marginBottom: '16px',
    letterSpacing: '-0.02em',
  },
  heroSub: {
    color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '520px',
    margin: '0 auto 28px', lineHeight: 1.7,
  },
  heroCta: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '11px 24px', borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
    transition: 'all var(--transition)',
  },
  controls: {
    display: 'flex', alignItems: 'center', gap: '16px',
    marginBottom: '32px', flexWrap: 'wrap',
  },
  filterRow: {
    display: 'flex', alignItems: 'center', gap: '8px',
    flexWrap: 'wrap', marginBottom: '32px',
  },
  filterLabel: {
    display: 'flex', alignItems: 'center', gap: '5px',
    fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.06em', color: 'var(--ink-muted)',
  },
  catBtn: {
    padding: '5px 14px', borderRadius: '20px',
    border: '1.5px solid var(--parchment-deep)',
    background: 'transparent', cursor: 'pointer',
    fontSize: '0.8rem', fontWeight: 500, color: 'var(--ink-soft)',
    transition: 'all var(--transition)', fontFamily: 'var(--font-body)',
  },
  catBtnActive: {
    background: 'var(--ink)', color: 'var(--parchment)', borderColor: 'var(--ink)',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)', fontSize: '1.1rem',
    fontWeight: 700, marginBottom: '24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  count: { fontSize: '0.8rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '28px', marginBottom: '48px',
  },
  empty: {
    textAlign: 'center', padding: '80px 2rem',
    color: 'var(--ink-muted)', gridColumn: '1 / -1',
  },
  emptyIcon: { fontSize: '2.5rem', marginBottom: '16px' },
  emptyTitle: { fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '8px' },
};

export default function HomePage() {
  const { posts } = useBlog();
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const visiblePosts = useMemo(() => {
    let filtered = posts.filter(p => {
      if (currentUser?.role === 'admin') return true;
      if (currentUser?.role === 'author') return p.authorId === currentUser.id || p.published;
      return p.published;
    });
    if (category) filtered = filtered.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q) ||
        (p.summary || '').toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [posts, search, category, currentUser]);

  const totalPages = Math.ceil(visiblePosts.length / POSTS_PER_PAGE);
  const paginated = visiblePosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleSearch = (v) => { setSearch(v); setPage(1); };
  const handleCategory = (c) => { setCategory(c); setPage(1); };

  return (
    <div style={styles.page}>
      {!currentUser && (
        <div style={styles.hero}>
          <div style={styles.heroTagline}>The Inkwell Blog</div>
          <h1 style={styles.heroTitle}>
            Ideas worth <em>reading</em>
          </h1>
          <p style={styles.heroSub}>
            Long-form essays, technology analysis, and cultural commentary. Every post includes an AI-generated summary so you can decide what to read.
          </p>
          <Link to="/landing" style={styles.heroCta}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-soft)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            <PenLine size={15} /> Get Started
          </Link>
        </div>
      )}

      <div style={styles.controls}>
        <SearchBar value={search} onChange={handleSearch} />
      </div>

      <div style={styles.filterRow}>
        <span style={styles.filterLabel}><Filter size={12} /> Filter</span>
        {['', ...CATEGORIES].map(c => (
          <button
            key={c || 'all'}
            style={{ ...styles.catBtn, ...(category === c ? styles.catBtnActive : {}) }}
            onClick={() => handleCategory(c)}
            onMouseEnter={e => { if (category !== c) e.currentTarget.style.background = 'var(--parchment-warm)'; }}
            onMouseLeave={e => { if (category !== c) e.currentTarget.style.background = 'transparent'; }}
          >
            {c || 'All'}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>
        <span>{category ? `${category} Posts` : 'All Posts'}</span>
        <span style={styles.count}>{visiblePosts.length} {visiblePosts.length === 1 ? 'post' : 'posts'}</span>
      </div>

      <div style={styles.grid}>
        {paginated.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>📭</div>
            <h3 style={styles.emptyTitle}>No posts found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        ) : (
          paginated.map((post, i) => (
            <div key={post.id} style={{ animation: `fadeIn 0.3s ease ${i * 0.05}s backwards` }}>
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
