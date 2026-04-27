import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/posts/CommentSection';
import { Edit, ArrowLeft, Calendar, Clock, Sparkles, Tag } from 'lucide-react';

const styles = {
  page: { maxWidth: '780px', margin: '0 auto', padding: '40px 1.5rem 80px' },
  backLink: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    color: 'var(--ink-muted)', fontSize: '0.875rem',
    textDecoration: 'none', marginBottom: '32px',
    transition: 'color var(--transition)',
  },
  header: { marginBottom: '32px' },
  meta: {
    display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
    marginBottom: '16px',
  },
  catBadge: {
    display: 'flex', alignItems: 'center', gap: '4px',
    background: 'var(--accent-pale)', color: 'var(--accent)',
    fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.06em', padding: '3px 10px', borderRadius: '20px',
  },
  metaItem: {
    display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '0.8rem', color: 'var(--ink-muted)',
  },
  title: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em',
    marginBottom: '24px',
  },
  authorRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' },
  authorName: { fontSize: '0.925rem', fontWeight: 600, color: 'var(--ink)' },
  authorDate: { fontSize: '0.8rem', color: 'var(--ink-muted)' },
  editBtn: {
    marginLeft: 'auto',
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'var(--parchment)', border: '1.5px solid var(--parchment-deep)',
    padding: '8px 16px', borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)',
    textDecoration: 'none', transition: 'all var(--transition)',
  },
  featuredImage: {
    width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    marginBottom: '40px', aspectRatio: '16/8',
    background: 'var(--parchment-warm)',
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  summaryBox: {
    background: 'linear-gradient(135deg, #fff8f5, #fef2ec)',
    border: '1.5px solid #f4d5c4', borderRadius: 'var(--radius-md)',
    padding: '20px 24px', marginBottom: '40px',
  },
  summaryLabel: {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: '10px',
  },
  summaryText: { fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.75 },
  body: {
    fontSize: '1.025rem', color: 'var(--ink)', lineHeight: 1.85,
    marginBottom: '48px',
  },
  paragraph: { marginBottom: '1.5em' },
  divider: { border: 'none', borderTop: '2px solid var(--parchment-deep)', margin: '40px 0' },
  notFound: { textAlign: 'center', padding: '80px', color: 'var(--ink-muted)' },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function readingTime(body) { return Math.ceil(body.split(' ').length / 200); }

export default function PostDetailPage() {
  const { id } = useParams();
  const { getPostById, addComment } = useBlog();
  const { canEditPost } = useAuth();
  const navigate = useNavigate();

  const post = getPostById(id);

  if (!post) {
    return (
      <div style={styles.notFound}>
        <h2>Post not found</h2>
        <Link to="/" style={{ color: 'var(--accent)' }}>← Back to home</Link>
      </div>
    );
  }

  const paragraphs = post.body.split('\n\n').filter(Boolean);

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.backLink}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-muted)'}
      >
        <ArrowLeft size={15} /> All posts
      </Link>

      <header style={styles.header}>
        <div style={styles.meta}>
          {post.category && (
            <span style={styles.catBadge}><Tag size={10} /> {post.category}</span>
          )}
          <span style={styles.metaItem}><Calendar size={12} />{formatDate(post.createdAt)}</span>
          <span style={styles.metaItem}><Clock size={12} />{readingTime(post.body)} min read</span>
        </div>
        <h1 style={styles.title}>{post.title}</h1>
        <div style={styles.authorRow}>
          <img src={`https://i.pravatar.cc/150?img=47`} alt={post.authorName} style={styles.avatar} />
          <div>
            <div style={styles.authorName}>{post.authorName}</div>
            <div style={styles.authorDate}>Published {formatDate(post.createdAt)}</div>
          </div>
          {canEditPost(post) && (
            <Link to={`/edit/${post.id}`} style={styles.editBtn}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-warm)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment)'}
            >
              <Edit size={14} /> Edit post
            </Link>
          )}
        </div>
      </header>

      {post.featuredImage && (
        <div style={styles.featuredImage}>
          <img src={post.featuredImage} alt={post.title} style={styles.img} />
        </div>
      )}

      {post.summary && (
        <div style={styles.summaryBox}>
          <div style={styles.summaryLabel}><Sparkles size={12} /> AI-Generated Summary</div>
          <p style={styles.summaryText}>{post.summary}</p>
        </div>
      )}

      <article style={styles.body}>
        {paragraphs.map((p, i) => (
          <p key={i} style={styles.paragraph}>{p}</p>
        ))}
      </article>

      <hr style={styles.divider} />

      <CommentSection post={post} onAddComment={(c) => addComment(post.id, c)} />
    </div>
  );
}
