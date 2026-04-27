import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import PostEditor from '../components/posts/PostEditor';

export function NewPostPage() {
  const { currentUser, hasPermission } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (!hasPermission('canCreate')) return <Navigate to="/" />;
  return <PostEditor />;
}

export function EditPostPage() {
  const { id } = useParams();
  const { currentUser, canEditPost } = useAuth();
  const { getPostById } = useBlog();

  if (!currentUser) return <Navigate to="/login" />;
  const post = getPostById(id);
  if (!post) return <Navigate to="/" />;
  if (!canEditPost(post)) return <Navigate to={`/post/${id}`} />;

  return <PostEditor existingPost={post} />;
}
