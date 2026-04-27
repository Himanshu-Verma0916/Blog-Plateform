import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Send } from 'lucide-react';

const styles = {
  section: { marginTop: '48px' },
  heading: {
    fontFamily: 'var(--font-display)', fontSize: '1.35rem',
    fontWeight: 700, marginBottom: '24px',
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  commentCount: {
    fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink-muted)',
    background: 'var(--parchment-warm)', padding: '2px 10px', borderRadius: '20px',
    fontFamily: 'var(--font-body)',
  },
  commentList: { display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' },
  comment: {
    display: 'flex', gap: '14px', paddingBottom: '20px',
    borderBottom: '1px solid var(--parchment-warm)',
  },
  avatar: { width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 },
  commentBody: { flex: 1 },
  commentMeta: {
    display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px',
  },
  commentAuthor: { fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' },
  commentDate: { fontSize: '0.75rem', color: 'var(--ink-muted)' },
  commentText: { fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.65 },
  empty: {
    textAlign: 'center', padding: '32px',
    background: 'var(--parchment)', borderRadius: 'var(--radius-md)',
    color: 'var(--ink-muted)', fontSize: '0.875rem',
  },
  formWrap: {
    background: 'var(--parchment)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-lg)', padding: '24px',
  },
  formTitle: {
    fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)',
    marginBottom: '16px',
  },
  textarea: {
    width: '100%', padding: '12px 14px',
    border: '1.5px solid var(--parchment-deep)', borderRadius: 'var(--radius-md)',
    background: 'var(--white)', color: 'var(--ink)',
    fontSize: '0.9rem', lineHeight: 1.6, resize: 'vertical', minHeight: '100px',
    outline: 'none', transition: 'border-color var(--transition)',
    fontFamily: 'var(--font-body)',
    marginBottom: '12px',
  },
  submitBtn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '10px 20px', borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
    border: 'none', transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)',
  },
  loginPrompt: {
    background: 'var(--parchment)', border: '1px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'center',
    color: 'var(--ink-muted)', fontSize: '0.875rem',
  },
  loginLink: { color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 },
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function CommentSection({ post, onAddComment }) {
  const { currentUser, hasPermission } = useAuth();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    onAddComment({
      userId: currentUser.id,
      userName: currentUser.name,
      avatar: currentUser.avatar,
      body: text.trim(),
    });
    setText('');
    setSubmitting(false);
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.heading}>
        <MessageSquare size={20} />
        Comments
        <span style={styles.commentCount}>{post.comments.length}</span>
      </h3>

      {post.comments.length === 0 ? (
        <div style={styles.empty}>No comments yet. Be the first to share your thoughts.</div>
      ) : (
        <div style={styles.commentList}>
          {post.comments.map(c => (
            <div key={c.id} style={styles.comment}>
              <img src={c.avatar} alt={c.userName} style={styles.avatar} />
              <div style={styles.commentBody}>
                <div style={styles.commentMeta}>
                  <span style={styles.commentAuthor}>{c.userName}</span>
                  <span style={styles.commentDate}>{formatDate(c.createdAt)}</span>
                </div>
                <p style={styles.commentText}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentUser && hasPermission('canComment') ? (
        <div style={styles.formWrap}>
          <div style={styles.formTitle}>Leave a comment</div>
          <textarea
            style={styles.textarea}
            placeholder="Share your thoughts..."
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
            onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
          />
          <button
            style={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!text.trim() || submitting}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--ink-soft)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
          >
            <Send size={14} />
            {submitting ? 'Posting...' : 'Post comment'}
          </button>
        </div>
      ) : (
        <div style={styles.loginPrompt}>
          <a href="/login" style={styles.loginLink}>Sign in</a> to leave a comment.
        </div>
      )}
    </div>
  );
}
