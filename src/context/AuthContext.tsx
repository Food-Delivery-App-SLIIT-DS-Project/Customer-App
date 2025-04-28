'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie } from 'cookies-next';

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
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
    setCookie('userId', user.userId);
    setCookie('username', user.fullName?.split(' ')[0] || 'User');

    setIsLoggedIn(true);
    setUserId(user.userId);
    setUsername(user.fullName?.split(' ')[0] || 'user');
  };

  const logout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('userId');
    deleteCookie('username');
    deleteCookie('cart');

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