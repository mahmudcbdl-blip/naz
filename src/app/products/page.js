"use client";
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        // FIXED: Changed 'http://localhost:5000/api/products' to '/api/products'
        // This allows Vercel to use the rewrites defined in your vercel.json
        const res = await fetch('/api/products'); 
        
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">পণ্য লোড হচ্ছে...</div>;

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20 text-gray-900">
      {/* Header & Filter Section */}
      <div className="bg-white border-b py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              All <span className="text-yellow-500">Products</span>
            </h1>
            <p className="text-gray-500 mt-4 font-bold uppercase text-[10px] tracking-widest">প্রিমিয়াম কালেকশন এক্সপ্লোর করুন</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-[24px]">
            {['all', 'gadgets', 'electronics', 'fashion', 'food'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-[18px] font-black transition-all capitalize text-xs tracking-widest ${
                  filter === cat 
                  ? 'bg-yellow-500 text-white shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-[40px] border border-dashed border-gray-300 py-32 text-center mt-10">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h3>
            <button 
              onClick={() => setFilter('all')}
              className="mt-6 text-yellow-600 font-black underline underline-offset-8 uppercase text-xs tracking-widest"
            >
              Back to All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}