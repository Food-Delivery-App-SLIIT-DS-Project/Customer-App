'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

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
    const checkAuth = async () => {
      try {
        // Await the cookie values
        const accessToken = await getCookie('accessToken');
        const storedUserId = await getCookie('userId');
        const storedUsername = await getCookie('username');

        if (accessToken && storedUserId) {
          setIsLoggedIn(true);
          setUserId(String(storedUserId));
          setUsername(String(storedUsername));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
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