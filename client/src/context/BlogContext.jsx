import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_POSTS } from '../utils/mockData';

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  // Simulated AI summary generation
  const generateSummary = async (title, body) => {
    setIsGeneratingSummary(true);
    await new Promise(r => setTimeout(r, 2000)); // simulate API call
    const words = body.split(' ');
    const snippet = words.slice(0, 180).join(' ');
    const summary = snippet + (words.length > 180 ? '...' : '');
    setIsGeneratingSummary(false);
    return summary;
  };

  const createPost = useCallback(async (postData, author) => {
    const summary = await generateSummary(postData.title, postData.body);
    const newPost = {
      id: Date.now(),
      ...postData,
      authorId: author.id,
      authorName: author.name,
      summary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      published: postData.published ?? true,
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  }, []);

  const updatePost = useCallback((postId, updates) => {
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, ...updates, updatedAt: new Date().toISOString() }
      : p
    ));
  }, []);

  const deletePost = useCallback((postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  }, []);

  const addComment = useCallback((postId, comment) => {
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, comments: [...p.comments, { id: Date.now(), ...comment, createdAt: new Date().toISOString() }] }
      : p
    ));
  }, []);

  const getPostById = useCallback((id) => {
    return posts.find(p => p.id === Number(id));
  }, [posts]);

  return (
    <BlogContext.Provider value={{ posts, createPost, updatePost, deletePost, addComment, getPostById, isGeneratingSummary }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlog = () => useContext(BlogContext);
