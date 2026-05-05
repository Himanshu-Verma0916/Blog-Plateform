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

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Routes>
              
              {/* Public Routes */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Main App Routes */}
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/post/:id" element={<Layout><PostDetailPage /></Layout>} />
              <Route path="/new-post" element={<Layout><NewPostPage /></Layout>} />
              <Route path="/edit/:id" element={<Layout><EditPostPage /></Layout>} />
              <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />

            </Routes>
          </div>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
