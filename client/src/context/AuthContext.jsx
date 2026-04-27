import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../utils/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // Check cache on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('blogUser');
    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser);
        setCurrentUser(user);
      } catch (error) {
        localStorage.removeItem('blogUser');
      }
    }
  }, []);

  const login = (email, password) => {
    // First check cached users (these have passwords)
    const cachedUsers = JSON.parse(localStorage.getItem('blogUsers') || '[]');
    let user = cachedUsers.find(u => u.email === email && u.password === password);
    
    // If not found in cache, check mock users (no password required for demo)
    if (!user) {
      const mockUser = MOCK_USERS.find(u => u.email === email);
      if (mockUser) {
        user = mockUser;
      }
    }
    
    if (user) {
      const userToCache = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      };
      setCurrentUser(userToCache);
      // Cache the user session
      localStorage.setItem('blogUser', JSON.stringify(userToCache));
      return { success: true, user: userToCache };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('blogUser');
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    const perms = {
      author: { canCreate: true, canEditOwn: true, canEditAll: false, canViewComments: true, canComment: true, canMonitor: false },
      viewer: { canCreate: false, canEditOwn: false, canEditAll: false, canViewComments: false, canComment: true, canMonitor: false },
      admin: { canCreate: true, canEditOwn: true, canEditAll: true, canViewComments: true, canComment: true, canMonitor: true },
    };
    return perms[currentUser.role]?.[permission] || false;
  };

  const canEditPost = (post) => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'author' && post.authorId === currentUser.id) return true;
    return false;
  };

  const signUp = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('blogUsers') || '[]');
    const userExists = existingUsers.some(user => user.email === userData.email);
    
    if (userExists) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem('blogUsers', JSON.stringify(existingUsers));

    // Don't auto-login, just return success
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signUp, hasPermission, canEditPost }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
