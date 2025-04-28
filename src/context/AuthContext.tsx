'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  userId: string;
  username: string;
  login: (accessToken: string, refreshToken: string, user: Record<any, any>) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (accessToken && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setUsername(storedUsername || 'User');
    }
    setIsLoading(false);
  }, []);

  const login = (accessToken: string, refreshToken: string, user: Record<any, any>) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('username', user.fullName?.split(' ')[0] || 'User');
    setIsLoggedIn(true);
    setUserId(user.userId);
    setUsername(user.fullName?.split(' ')[0] || 'user');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}