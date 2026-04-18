"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const menuLinks = [
    { name: 'Products', href: '/admin' },
    { name: 'Orders', href: '/admin/orders' },

  ];

  // Authentication Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // If no user and not on the login page, redirect to login
      if (!currentUser && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-yellow-500 font-black text-2xl animate-pulse">
        NAZ LOADING...
      </div>
    );
  }

  // If on login page, don't show the sidebar/header
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-900 text-white p-4 flex justify-between items-center sticky top-0 z-[110]">
        <h2 className="text-xl font-black text-yellow-500 tracking-tighter">NAZ ADMIN</h2>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isMenuOpen ? 'block' : 'hidden'} 
        lg:block lg:w-72 bg-gray-900 text-white p-8 lg:sticky lg:top-0 lg:h-screen z-[100]
      `}>
        <h2 className="hidden lg:block text-2xl font-black text-yellow-500 mb-12 tracking-tighter text-center">NAZ ADMIN</h2>
        <nav className="flex flex-col space-y-4">
          {menuLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`py-4 px-6 rounded-2xl transition-all font-bold text-center lg:text-left ${
                pathname === link.href ? 'bg-yellow-500 text-white' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="py-4 px-6 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold mt-10"
          >
            Logout 🔒
          </button>

          <Link href="/" className="pt-10 text-gray-500 text-sm font-bold text-center hover:text-white transition-colors underline decoration-yellow-500 decoration-2 underline-offset-8">
            ← Back to Shop
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}