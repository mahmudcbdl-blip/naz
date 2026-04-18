"use client";
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function TopRated() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.filter(p => p.isTopRated).slice(0, 12));
        }
      })
      .catch(err => console.error("TopRated fetch error:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}