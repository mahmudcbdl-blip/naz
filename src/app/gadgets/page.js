"use client";
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const CATEGORY_NAME = "Gadgets"; // Change this for each file (Fashion, Electronics)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Filter by the specific category
          const filtered = data.filter(p => p.category?.toLowerCase() === CATEGORY_NAME.toLowerCase());
          setProducts(filtered);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-5xl font-black uppercase italic mb-10 border-l-8 border-yellow-500 pl-6">
        Our <span className="text-yellow-500">{CATEGORY_NAME}</span> Collection
      </h1>
      
      {loading ? (
        <p className="text-center font-bold">Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      ) : (
        <p className="text-gray-400 font-bold text-center py-20">No products found in this category.</p>
      )}
    </div>
  );
}