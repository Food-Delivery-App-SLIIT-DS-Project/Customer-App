'use client';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowRight, ChefHat, Clock, CreditCard, Smartphone, Sparkles } from 'lucide-react';

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
    } else {
      setIsCheckingAuth(false);
    }
  }, [isLoggedIn, router]);

  if (isCheckingAuth || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-full mb-6">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Fast, Easy & Secure</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            QuickGrubs
          </span>
          <br />
          Connecting Food Lovers & Restaurants
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Order from your favorite restaurants with just a few taps. Fast delivery, secure payments, 
          and the best dining experience right at your fingertips.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => router.push('/login')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started <ArrowRight className="inline ml-2 h-4 w-4" />
          </button>
          <button 
            onClick={() => router.push('/about')}
            className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          Why Choose QuickGrubs?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Easy Ordering</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse menus, customize orders, and checkout in minutes with our intuitive mobile-friendly interface.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <ChefHat className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Top Restaurants</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Partnered with the best local restaurants to bring you quality food and diverse cuisines.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Secure Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pay with confidence using Stripe's secure payment processing. Multiple payment options available.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-white dark:bg-gray-800 rounded-t-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Browse Restaurants</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover local restaurants and explore their menus with photos and reviews.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Place Your Order</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your meal, add to cart, and checkout with secure payment.
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Enjoy Your Meal</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track your order in real-time and receive notifications when it's on its way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to experience the future of food ordering?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Join thousands of satisfied customers enjoying delicious meals from their favorite restaurants.
        </p>
        <button 
          onClick={() => router.push('/login')}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl text-lg"
        >
          Start Ordering Now <ArrowRight className="inline ml-2 h-5 w-5" />
        </button>
      </section>
    </div>
  );
}