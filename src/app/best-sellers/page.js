"use client";
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Here we just simulate best sellers by taking 8 items
          setProducts(data.slice(0, 8));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24">
      <div className="bg-gray-900 text-white py-20 px-4 text-center mb-16 rounded-b-[60px] shadow-2xl">
        <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">Best Sellers</h1>
        <p className="text-gray-400 text-lg font-medium">আমাদের শপের সবচেয়ে জনপ্রিয় এবং সেরা পণ্যসমূহ</p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center py-20 text-xl font-bold">লোড হচ্ছে...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.length > 0 ? (
              products.map(p => <ProductCard key={p._id} product={p} />)
            ) : (
              <div className="col-span-full text-center py-20 text-gray-400 font-bold">
                কোনো পণ্য পাওয়া যায়নি। অ্যাডমিন প্যানেল থেকে পণ্য যোগ করুন।
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}