import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Edit, Clock, Sparkles } from 'lucide-react';

const styles = {
  card: {
    background: 'var(--white)', borderRadius: 'var(--radius-lg)',
    overflow: 'hidden', border: '1px solid var(--parchment-deep)',
    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex', flexDirection: 'column',
  },
  imageWrap: {
    position: 'relative', overflow: 'hidden', aspectRatio: '16/9',
    background: 'var(--parchment-warm)',
  },
  image: {
    width: '100%', height: '100%', objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  badge: {
    position: 'absolute', top: '12px', left: '12px',
    background: 'var(--white)', color: 'var(--ink)',
    fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.06em', padding: '3px 10px',
    borderRadius: '20px',
  },
  draftBadge: {
    position: 'absolute', top: '12px', right: '12px',
    background: 'rgba(184,134,11,0.9)', color: 'white',
    fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.06em', padding: '3px 10px',
    borderRadius: '20px',
  },
  body: { padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' },
  meta: {
    display: 'flex', alignItems: 'center', gap: '8px',
    fontSize: '0.78rem', color: 'var(--ink-muted)',
    marginBottom: '12px',
  },
  authorAvatar: { width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' },
  dot: { color: 'var(--parchment-deep)' },
  title: {
    fontFamily: 'var(--font-display)', fontSize: '1.15rem',
    fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3,
    marginBottom: '12px',
    textDecoration: 'none', display: 'block',
    transition: 'color var(--transition)',
  },
  summaryBox: {
    background: 'var(--parchment)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', padding: '12px 14px',
    marginBottom: '16px', flex: 1,
  },
  summaryLabel: {
    display: 'flex', alignItems: 'center', gap: '5px',
    fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.07em', color: 'var(--accent)',
    marginBottom: '6px',
  },
  summaryText: {
    fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.6,
    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 'auto', paddingTop: '16px',
    borderTop: '1px solid var(--parchment-warm)',
  },
  footerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  stat: {
    display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '0.78rem', color: 'var(--ink-muted)',
  },
  readLink: {
    fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)',
    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px',
    transition: 'color var(--transition)',
  },
  editBtn: {
    display: 'flex', alignItems: 'center', gap: '5px',
    fontSize: '0.78rem', color: 'var(--ink-muted)',
    background: 'var(--parchment-warm)', border: '1px solid var(--parchment-deep)',
    padding: '4px 10px', borderRadius: '6px', cursor: 'pointer',
    transition: 'all var(--transition)', textDecoration: 'none',
  },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function readingTime(body) {
  return Math.ceil(body.split(' ').length / 200);
}

export default function PostCard({ post }) {
  const { canEditPost } = useAuth();
  const [hovered, setHovered] = useState(false);
  const canEdit = canEditPost(post);

  return (
    <div
      style={{ ...styles.card, ...(hovered ? { transform: 'translateY(-3px)', boxShadow: 'var(--shadow-md)' } : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.imageWrap}>
        <img
          src={post.featuredImage}
          alt={post.title}
          style={{ ...styles.image, transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />
        {post.category && <span style={styles.badge}>{post.category}</span>}
        {!post.published && <span style={styles.draftBadge}>Draft</span>}
      </div>

      <div style={styles.body}>
        <div style={styles.meta}>
          <img src={`https://i.pravatar.cc/150?img=47`} alt={post.authorName} style={styles.authorAvatar} />
          <span>{post.authorName}</span>
          <span style={styles.dot}>·</span>
          <Clock size={11} />
          <span>{readingTime(post.body)} min read</span>
          <span style={styles.dot}>·</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <Link to={`/post/${post.id}`} style={{ ...styles.title, ...(hovered ? { color: 'var(--accent)' } : {}) }}>
          {post.title}
        </Link>

        {post.summary && (
          <div style={styles.summaryBox}>
            <div style={styles.summaryLabel}>
              <Sparkles size={10} /> AI Summary
            </div>
            <p style={styles.summaryText}>{post.summary}</p>
          </div>
        )}

        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <span style={styles.stat}>
              <MessageSquare size={13} />
              {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {canEdit && (
              <Link to={`/edit/${post.id}`} style={styles.editBtn}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-deep)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--parchment-warm)'}
              >
                <Edit size={12} /> Edit
              </Link>
            )}
            <Link to={`/post/${post.id}`} style={styles.readLink}>
              Read →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
