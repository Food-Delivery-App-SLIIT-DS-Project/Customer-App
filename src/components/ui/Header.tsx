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
      <header className="w-full sticky top-0 z-50 bg-gray-100 dark:bg-black shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-lg font-bold">QuickGrubs</div>
          <LoadingSpinner />
        </div>
      </header>
    );
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-100 dark:bg-black shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo/Branding */}
        <div className="flex items-center">
          <Link href="/" className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <LogoIcon className="h-6 w-6" /> {/* Optional logo icon */}
            QuickGrubs
          </Link>
        </div>

        {/* Main Navigation and Controls */}
        <div className="flex items-center gap-6">
          {/* Primary Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm relative">
            {isLoggedIn ? (
              <>
                <NavLink href="/home">Home</NavLink>
                <NavLink href="/cart">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                  )}
                </NavLink>
                <NavLink href="/orders">My Orders</NavLink>
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
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation (optional) */}
      <MobileNav isLoggedIn={isLoggedIn} />
    </header>
  );
}

// Sub-components for better organization
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}

function UserDropdown({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-gray-800 dark:text-white">Hello {username || 'user'}!</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
          <Link 
            href="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4">
            <nav className="flex flex-col space-y-4 mt-16">
              {isLoggedIn ? (
                <>
                  <MobileNavLink href="/home" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                  <MobileNavLink href="/cart" onClick={() => setIsOpen(false)}>Cart</MobileNavLink>
                  <MobileNavLink href="/profile" onClick={() => setIsOpen(false)}>Profile</MobileNavLink>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="text-left text-red-600 px-4 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
                  <MobileNavLink href="/login" onClick={() => setIsOpen(false)}>Login</MobileNavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
    >
      {children}
    </Link>
  );
}

// Example icon components (replace with your actual icons)
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Your logo path here */}
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