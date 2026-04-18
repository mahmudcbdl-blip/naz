"use client";
import { useEffect, useState, use } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductDetails({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(""); 
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(p => p._id === id);
          setProduct(found);
          if (found) {
             setActiveImage(found.images?.[0] || found.image);
          }
        }
      })
      .catch(err => console.error("Product details fetch error:", err));
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
      <p className="font-black text-gray-500 uppercase tracking-widest">লোড হচ্ছে...</p>
    </div>
  );

  const discountPercent = parseFloat(product.discount?.replace('%', '')) || 0;
  const sellingPrice = parseFloat(product.price) || 0;
  const cutPrice = discountPercent > 0 
    ? Math.round(sellingPrice / (1 - discountPercent / 100)) 
    : 0;

  const imagesList = product.images || [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 bg-white p-6 md:p-12 rounded-[50px] shadow-sm border border-gray-100">
        
        {/* LEFT: Image Section */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-5">
            <div className="rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100 aspect-square group">
              <img 
                src={activeImage} 
                alt={product.nameBn} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {imagesList.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-2xl bg-gray-100 border-2 overflow-hidden cursor-pointer transition-all ${activeImage === img ? 'border-yellow-500 scale-95' : 'border-transparent opacity-60'}`}
                >
                   <img src={img} className="w-full h-full object-cover" alt={`preview-${i}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-[15px] font-black uppercase tracking-widest">
              {product.category}
            </span>
            {product.stock > 0 ? (
              <span className="flex items-center gap-2 text-green-700 text-[15px] font-black uppercase tracking-widest bg-green-50 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                In Stock ({product.stock} Units)
              </span>
            ) : (
              <span className="text-red-600 text-[15px] font-black uppercase tracking-widest bg-red-50 px-4 py-1.5 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Restored Original Headline Style */}
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tighter leading-tight italic">
            {product.nameEn} <br/>
            <span className="text-gray-500 not-italic font-bold tracking-wider text-2xl">{product.nameBn}</span>
          </h1>

          <div className="flex items-baseline gap-6 mb-10">
            <p className="text-5xl font-black text-yellow-500 tracking-tighter">৳{product.price}</p>
            {product.discount !== '0%' && (
              <div className="flex flex-col">
                <span className="text-gray-500 line-through font-bold text-2xl">৳{cutPrice}</span>
                <span className="text-red-600 font-black text-sm">{product.discount} OFF</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-8 rounded-[30px] mb-10 border border-gray-100">
            <h3 className="text-lg font-black text-gray-700 uppercase tracking-widest mb-4">পণ্য সম্পর্কে বিস্তারিত:</h3>
            <p className="text-gray-800 leading-relaxed font-medium text-[23px]">
              {product.descriptionBn}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`flex-1 px-10 py-5 rounded-[22px] font-black text-xl transition-all shadow-2xl uppercase tracking-tighter ${
                product.stock <= 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none' 
                : 'bg-gray-900 text-white hover:bg-yellow-500'
              }`}
            >
              {product.stock <= 0 ? "Stock Out" : "Add to Cart"}
            </button>
          </div>

          {/* Metadata Section - Clearer Text */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t pt-10">
            {[ {l: 'Delivery', v: '24-72 Hours'}, {l: 'Return Policy', v: '7 Days Easy'}, {l: 'Warranty', v: 'Official Brand'} ].map((item, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[14px] font-black text-gray-500 uppercase tracking-widest">{item.l}</p>
                <p className="font-bold text-gray-800 italic text-[15px]">{item.v}</p>
              </div>
            ))}
          </div>

          {/* Bottom Icons - Restored Original Style but clearer */}
          <div className="mt-12 flex flex-wrap gap-8 items-center text-gray-700 font-black text-[11px] tracking-widest uppercase">
            <div>🛡️ 100% AUTHENTIC</div>
            <div>🚚 FAST SHIPPING</div>
            <div>💳 SECURE PAYMENT</div>
          </div>
        </div>
      </div>
    </div>
  );
}