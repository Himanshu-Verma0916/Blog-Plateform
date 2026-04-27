import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import PostDetailPage from './pages/PostDetailPage';
import { NewPostPage, EditPostPage } from './pages/PostFormPages';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={
                <>
                  <Navbar />
                  <main style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/post/:id" element={<PostDetailPage />} />
                      <Route path="/new-post" element={<NewPostPage />} />
                      <Route path="/edit/:id" element={<EditPostPage />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
