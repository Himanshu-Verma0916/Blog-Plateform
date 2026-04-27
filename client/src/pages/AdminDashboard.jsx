import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { Edit, Trash2, Eye, EyeOff, MessageSquare, BarChart2, Users, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '40px 2rem 80px' },
  header: { marginBottom: '40px' },
  title: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '6px' },
  sub: { color: 'var(--ink-muted)', fontSize: '0.875rem' },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px', marginBottom: '40px',
  },
  statCard: {
    background: 'var(--white)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', padding: '20px 24px',
  },
  statIcon: {
    width: '36px', height: '36px', borderRadius: '8px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '12px',
  },
  statNum: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 },
  statLabel: { fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '4px' },
  section: { marginBottom: '40px' },
  sectionTitle: {
    fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700,
    marginBottom: '20px', paddingBottom: '12px',
    borderBottom: '1px solid var(--parchment-deep)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  tableWrap: {
    background: 'var(--white)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', overflow: 'hidden',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '12px 16px', textAlign: 'left',
    fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.06em', color: 'var(--ink-muted)',
    background: 'var(--parchment)', borderBottom: '1px solid var(--parchment-deep)',
  },
  td: {
    padding: '14px 16px', fontSize: '0.875rem',
    borderBottom: '1px solid var(--parchment-warm)',
    color: 'var(--ink-soft)', verticalAlign: 'middle',
  },
  titleCell: { fontWeight: 600, color: 'var(--ink)', maxWidth: '280px' },
  titleText: {
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
    display: 'block', maxWidth: '260px',
  },
  badge: {
    display: 'inline-block', fontSize: '0.7rem', fontWeight: 600,
    padding: '2px 8px', borderRadius: '20px',
  },
  publishedBadge: { background: '#f0fdf4', color: '#166534' },
  draftBadge: { background: '#fefce8', color: '#92400e' },
  actions: { display: 'flex', gap: '6px', alignItems: 'center' },
  iconBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '30px', height: '30px', borderRadius: '6px',
    border: '1px solid var(--parchment-deep)', background: 'transparent',
    cursor: 'pointer', transition: 'all var(--transition)', color: 'var(--ink-muted)',
  },
  deleteBtn: { border: '1px solid #fecaca', color: '#c0392b' },
  commentRow: {
    background: 'var(--white)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', padding: '16px 20px',
    marginBottom: '10px',
    display: 'flex', gap: '14px', alignItems: 'flex-start',
  },
  commentAvatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 },
  commentBody: { flex: 1 },
  commentMeta: { fontSize: '0.8rem', color: 'var(--ink-muted)', marginBottom: '4px' },
  commentText: { fontSize: '0.875rem', color: 'var(--ink-soft)' },
  postTitle: { fontSize: '0.75rem', color: 'var(--accent)', marginTop: '4px' },
  searchWrap: { marginBottom: '16px' },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { posts, updatePost, deletePost } = useBlog();
  const [search, setSearch] = useState('');

  if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/" />;

  const allComments = posts.flatMap(p =>
    p.comments.map(c => ({ ...c, postId: p.id, postTitle: p.title }))
  );

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.authorName.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { icon: <FileText size={18} color="#c4501a" />, iconBg: '#fdeee8', num: posts.length, label: 'Total Posts' },
    { icon: <CheckCircle size={18} color="#2d7a4f" />, iconBg: '#f0fdf4', num: posts.filter(p => p.published).length, label: 'Published' },
    { icon: <MessageSquare size={18} color="#2563eb" />, iconBg: '#eff6ff', num: allComments.length, label: 'Comments' },
    { icon: <Users size={18} color="#7c3aed" />, iconBg: '#f5f3ff', num: 3, label: 'Users' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.sub}>Monitor and manage all platform content.</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: s.iconBg }}>{s.icon}</div>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          <span>All Posts</span>
          <Link to="/new-post" style={{
            fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)',
            textDecoration: 'none',
          }}>+ New post</Link>
        </div>
        <div style={styles.searchWrap}>
          <SearchBar value={search} onChange={setSearch} placeholder="Search posts..." />
        </div>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Author</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Comments</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post.id}>
                  <td style={{ ...styles.td, ...styles.titleCell }}>
                    <Link to={`/post/${post.id}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                      <span style={styles.titleText}>{post.title}</span>
                    </Link>
                  </td>
                  <td style={styles.td}>{post.authorName}</td>
                  <td style={styles.td}>{post.category || '—'}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...(post.published ? styles.publishedBadge : styles.draftBadge) }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={styles.td}>{post.comments.length}</td>
                  <td style={styles.td}>{formatDate(post.createdAt)}</td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <Link to={`/edit/${post.id}`} style={styles.iconBtn}
                        title="Edit"
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <Edit size={13} />
                      </Link>
                      <button
                        style={styles.iconBtn}
                        title={post.published ? 'Unpublish' : 'Publish'}
                        onClick={() => updatePost(post.id, { published: !post.published })}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        {post.published ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <button
                        style={{ ...styles.iconBtn, ...styles.deleteBtn }}
                        title="Delete"
                        onClick={() => { if (confirm('Delete this post?')) deletePost(post.id); }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Recent Comments ({allComments.length})
        </div>
        {allComments.length === 0 ? (
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.875rem' }}>No comments yet.</p>
        ) : (
          allComments.slice(0, 8).map(c => (
            <div key={c.id} style={styles.commentRow}>
              <img src={c.avatar} alt={c.userName} style={styles.commentAvatar} />
              <div style={styles.commentBody}>
                <div style={styles.commentMeta}>
                  <strong>{c.userName}</strong> · {formatDate(c.createdAt)}
                </div>
                <p style={styles.commentText}>{c.body}</p>
                <div style={styles.postTitle}>
                  On: <Link to={`/post/${c.postId}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {c.postTitle}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
