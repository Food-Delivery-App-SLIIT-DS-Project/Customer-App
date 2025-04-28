'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { isLoggedIn, username, logout, isLoading } = useAuth();
  const { cart } = useCart();

  if (isLoading) {
    return (
      <div className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Branding */}
          <div className="flex items-center">
            <Link 
              href="/home" 
              className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <LogoIcon className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                QuickGrubs
              </span>
            </Link>
          </div>

          {/* Main Navigation and Controls */}
          <div className="flex items-center gap-6">
            {/* Primary Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {isLoggedIn ? (
                <>
                  <NavLink href="/home">Home</NavLink>
                  <NavLink href="/orders">Orders</NavLink>
                  <CartLink href="/cart" count={cartItemCount} />
                </>
              ) : (
                <NavLink href="/about">About</NavLink>
              )}
            </nav>

            {/* User Controls */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <UserDropdown username={username} onLogout={logout} />
              ) : (
                <Link 
                  href="/login" 
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isLoggedIn={isLoggedIn} cartItemCount={cartItemCount} />
    </header>
  );
}

// Styled NavLink Component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all group-hover:w-full"></span>
    </Link>
  );
}

// Special Cart Link with Counter
function CartLink({ href, count }: { href: string; count: number }) {
  return (
    <Link 
      href={href}
      className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium group"
    >
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-4 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform hover:scale-110 transition-transform">
          {count}
        </span>
      )}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all group-hover:w-full"></span>
    </Link>
  );
}

// Enhanced User Dropdown
function UserDropdown({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
          {username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <ChevronDownIcon className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-100 dark:border-gray-700 animate-fade-in">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Signed in as</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{username || 'user'}</p>
            </div>
            <div className="py-1">
              <Link 
                href="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Enhanced Mobile Navigation
function MobileNav({ isLoggedIn, cartItemCount }: { isLoggedIn: boolean; cartItemCount: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="md:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full p-4">
              <div className="flex justify-between items-center mb-8">
                <Link 
                  href="/home" 
                  className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <LogoIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  QuickGrubs
                </Link>
                <ThemeToggle />
              </div>
              
              <nav className="flex-1 flex flex-col gap-1">
                {isLoggedIn ? (
                  <>
                    <MobileNavLink href="/home" onClick={() => setIsOpen(false)}>
                      Home
                    </MobileNavLink>
                    <MobileNavLink href="/orders" onClick={() => setIsOpen(false)}>
                      Orders
                    </MobileNavLink>
                    <MobileNavLink href="/cart" onClick={() => setIsOpen(false)}>
                      <div className="flex items-center justify-between w-full">
                        <span>Cart</span>
                        {cartItemCount > 0 && (
                          <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                          </span>
                        )}
                      </div>
                    </MobileNavLink>
                    <MobileNavLink href="/profile" onClick={() => setIsOpen(false)}>
                      Profile
                    </MobileNavLink>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                      About
                    </MobileNavLink>
                    <MobileNavLink href="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </MobileNavLink>
                  </>
                )}
              </nav>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 px-4">
                  © {new Date().getFullYear()} QuickGrubs
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Styled Mobile NavLink
function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {children}
    </Link>
  );
}

// Icons
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}