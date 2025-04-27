'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import { apiRequest } from '@/lib/api';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      // const response = await apiRequest('/auth/signin', 'POST', { email, password });
      // if (response.status !== 200) {
      //   throw new Error(response.message);
      // }
      // const data = response.data;

      login('your-auth-token', 'username'); // Replace with actual token and username
      router.push('/home');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}
        <div>
          <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Email"
        required
          />
        </div>
        <div>
          <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Password"
        required
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 text-white p-2 rounded flex justify-center items-center"
        >
          {isSubmitting ? (
        <LoadingSpinner />
          ) : (
        'Login'
          )}
        </button>

        <p className="text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
        Register
          </a>
        </p>
      </form>
    </div>
  );
}