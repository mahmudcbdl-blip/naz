"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const currentCount = cart?.length || 0;

  const categories = [
    { name: 'Gadgets', href: '/gadgets' },
    { name: 'Fashion', href: '/fashion' },
    { name: 'Electronics', href: '/electronics' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-[100] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        <Link href="/" className="text-2xl md:text-3xl font-black flex items-center gap-2 shrink-0">
          <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-lg uppercase tracking-tighter">NAZ</span>
          <span className="text-gray-900 tracking-tighter hidden sm:block uppercase italic">Online Shop</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-bold uppercase text-[12px] tracking-widest">
          <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-yellow-500 transition-colors">All Products</Link>
          
          {/* CATEGORIES DROPDOWN */}
          <div className="relative group py-4">
            <button className="flex items-center gap-1 hover:text-yellow-500 transition-colors uppercase font-bold">
              Categories ▾
            </button>
            <div className="absolute top-full left-0 bg-white shadow-2xl border border-gray-100 rounded-2xl w-48 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {categories.map((cat) => (
                <Link key={cat.name} href={cat.href} className="block px-6 py-2 hover:bg-yellow-500 hover:text-black transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/offers" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-black transition-all">Offers %</Link>
        </div>

        {/* Cart & Hamburger */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative p-2.5 bg-gray-100 rounded-2xl hover:bg-yellow-100 transition-all">
            <span className="text-xl">🛒</span>
            {currentCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {currentCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-900 text-2xl">{isOpen ? '✕' : '☰'}</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-2xl p-6 flex flex-col items-center gap-4 font-black uppercase text-sm">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <div className="w-full border-y border-gray-100 py-4 space-y-4">
            <p className="text-gray-400 text-[10px] tracking-[0.3em]">Categories</p>
            {categories.map(cat => (
              <Link key={cat.name} href={cat.href} onClick={() => setIsOpen(false)} className="block text-lg">{cat.name}</Link>
            ))}
          </div>
          <Link href="/offers" onClick={() => setIsOpen(false)} className="text-red-600">Offers %</Link>
        </div>
      )}
    </nav>
  );
}