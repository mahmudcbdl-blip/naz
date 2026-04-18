"use client";
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function OffersPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter products with a discount and take first 15
          const discounted = data
            .filter(p => p.discount && p.discount !== '0%')
            .slice(0, 15);
          setProducts(discounted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase">Loading Offers...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
      <div className="mb-12 border-b-8 border-yellow-500 pb-6">
        <h1 className="text-6xl text-black font-black uppercase italic tracking-tighter">Hot <span className="text-yellow-500">Offers</span> %</h1>
        <p className="font-bold text-gray-500 uppercase tracking-widest mt-2">Exclusive discounts just for you</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-200">
          <p className="text-2xl font-black text-gray-400 uppercase">No active offers right now!</p>
        </div>
      )}
    </div>
  );
}