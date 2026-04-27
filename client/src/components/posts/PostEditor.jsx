import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Save, Eye, EyeOff, ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../../utils/mockData';

const styles = {
  page: { maxWidth: '800px', margin: '0 auto', padding: '40px 1.5rem' },
  header: { marginBottom: '32px' },
  title: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '6px' },
  subtitle: { color: 'var(--ink-muted)', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  field: {},
  label: {
    display: 'block', fontSize: '0.8rem', fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.06em',
    color: 'var(--ink-muted)', marginBottom: '8px',
  },
  input: {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', background: 'var(--white)',
    color: 'var(--ink)', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color var(--transition)', fontFamily: 'var(--font-body)',
  },
  titleInput: {
    fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600,
  },
  textarea: {
    width: '100%', padding: '16px',
    border: '1.5px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', background: 'var(--white)',
    color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.7,
    outline: 'none', resize: 'vertical', minHeight: '320px',
    transition: 'border-color var(--transition)', fontFamily: 'var(--font-body)',
  },
  select: {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid var(--parchment-deep)',
    borderRadius: 'var(--radius-md)', background: 'var(--white)',
    color: 'var(--ink)', fontSize: '0.9rem', outline: 'none',
    fontFamily: 'var(--font-body)', cursor: 'pointer',
    appearance: 'none',
  },
  imagePreview: {
    marginTop: '12px', borderRadius: 'var(--radius-md)', overflow: 'hidden',
    border: '1px solid var(--parchment-deep)', aspectRatio: '16/7',
    background: 'var(--parchment-warm)',
  },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  aiBox: {
    background: 'linear-gradient(135deg, #fff8f5 0%, #fef2ec 100%)',
    border: '1.5px solid #f4d5c4', borderRadius: 'var(--radius-md)',
    padding: '16px',
  },
  aiLabel: {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: '10px',
  },
  aiText: { fontSize: '0.875rem', color: 'var(--ink-soft)', lineHeight: 1.65 },
  aiPending: {
    display: 'flex', alignItems: 'center', gap: '8px',
    color: 'var(--ink-muted)', fontSize: '0.875rem', fontStyle: 'italic',
  },
  spinner: {
    width: '14px', height: '14px', border: '2px solid var(--parchment-deep)',
    borderTop: '2px solid var(--accent)', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  actions: {
    display: 'flex', alignItems: 'center', gap: '12px',
    paddingTop: '8px', borderTop: '1px solid var(--parchment-warm)',
    flexWrap: 'wrap',
  },
  publishToggle: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 16px', borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--parchment-deep)', background: 'transparent',
    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500,
    color: 'var(--ink-soft)', transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)',
  },
  saveBtn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'var(--ink)', color: 'var(--parchment)',
    padding: '11px 24px', borderRadius: 'var(--radius-md)',
    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
    border: 'none', transition: 'all var(--transition)',
    fontFamily: 'var(--font-body)', marginLeft: 'auto',
  },
  saveBtnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  notice: {
    display: 'flex', alignItems: 'flex-start', gap: '10px',
    padding: '12px 16px', borderRadius: 'var(--radius-md)',
    fontSize: '0.85rem',
  },
  successNotice: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534' },
  errorNotice: { background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b' },
};

export default function PostEditor({ existingPost }) {
  const { currentUser } = useAuth();
  const { createPost, updatePost, isGeneratingSummary } = useBlog();
  const navigate = useNavigate();
  const isEditing = !!existingPost;

  const [form, setForm] = useState({
    title: existingPost?.title || '',
    featuredImage: existingPost?.featuredImage || '',
    body: existingPost?.body || '',
    category: existingPost?.category || '',
    published: existingPost?.published ?? true,
  });
  const [preview, setPreview] = useState(existingPost?.summary || '');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.body.trim()) {
      setNotice({ type: 'error', text: 'Title and body are required.' });
      return;
    }
    setSaving(true);
    try {
      if (isEditing) {
        updatePost(existingPost.id, form);
        setNotice({ type: 'success', text: 'Post updated successfully.' });
        setTimeout(() => navigate(`/post/${existingPost.id}`), 1200);
      } else {
        const post = await createPost(form, currentUser);
        setNotice({ type: 'success', text: 'Post published! AI summary generated.' });
        setTimeout(() => navigate(`/post/${post.id}`), 1200);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>{isEditing ? 'Edit Post' : 'Write a New Post'}</h1>
        <p style={styles.subtitle}>
          {isEditing ? 'Make changes to your post.' : 'Share your ideas. An AI summary will be generated automatically.'}
        </p>
      </div>

      <div style={styles.form}>
        {notice && (
          <div style={{ ...styles.notice, ...(notice.type === 'success' ? styles.successNotice : styles.errorNotice) }}>
            {notice.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
            {notice.text}
          </div>
        )}

        <div style={styles.field}>
          <label style={styles.label}>Title</label>
          <input
            style={{ ...styles.input, ...styles.titleInput }}
            placeholder="Write a compelling headline..."
            value={form.title}
            onChange={e => set('title', e.target.value)}
            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
            onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Featured Image URL</label>
          <input
            style={styles.input}
            placeholder="https://images.unsplash.com/..."
            value={form.featuredImage}
            onChange={e => set('featuredImage', e.target.value)}
            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
            onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
          />
          {form.featuredImage && (
            <div style={styles.imagePreview}>
              <img src={form.featuredImage} alt="Preview" style={styles.previewImg}
                onError={e => e.target.style.display = 'none'} />
            </div>
          )}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select style={styles.select} value={form.category} onChange={e => set('category', e.target.value)}>
            <option value="">Select a category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Body Content</label>
          <textarea
            style={styles.textarea}
            placeholder="Tell your story..."
            value={form.body}
            onChange={e => set('body', e.target.value)}
            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
            onBlur={e => e.target.style.borderColor = 'var(--parchment-deep)'}
          />
        </div>

        {!isEditing && (
          <div style={styles.aiBox}>
            <div style={styles.aiLabel}><Sparkles size={12} /> AI Summary</div>
            {isGeneratingSummary ? (
              <div style={styles.aiPending}>
                <div style={styles.spinner} />
                Generating ~200-word summary via Google AI...
              </div>
            ) : (
              <p style={styles.aiText}>
                {preview
                  ? preview
                  : 'A summary will be automatically generated when you publish this post.'}
              </p>
            )}
          </div>
        )}

        <div style={styles.actions}>
          <button
            style={styles.publishToggle}
            onClick={() => set('published', !form.published)}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--parchment-warm)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {form.published ? <Eye size={15} /> : <EyeOff size={15} />}
            {form.published ? 'Published' : 'Draft'}
          </button>

          <button
            style={{ ...styles.saveBtn, ...(saving ? styles.saveBtnDisabled : {}) }}
            onClick={handleSave}
            disabled={saving}
            onMouseEnter={e => { if (!saving) e.currentTarget.style.background = 'var(--ink-soft)'; }}
            onMouseLeave={e => { if (!saving) e.currentTarget.style.background = 'var(--ink)'; }}
          >
            <Save size={15} />
            {saving ? 'Saving...' : (isEditing ? 'Update Post' : 'Publish Post')}
          </button>
        </div>
      </div>
    </div>
  );
}
