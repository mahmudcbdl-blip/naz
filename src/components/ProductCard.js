"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isStockOut = product.stock <= 0;

  // CALCULATION LOGIC:
  const discountPercent = parseFloat(product.discount?.replace('%', '')) || 0;
  const sellingPrice = parseFloat(product.price) || 0;
  const cutPrice = discountPercent > 0 
    ? Math.round(sellingPrice / (1 - discountPercent / 100)) 
    : 0;

  return (
    <div className="group relative bg-white rounded-[25px] p-4 shadow-sm border border-gray-200 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
      <Link href={`/products/${product._id}`} className="relative block aspect-square rounded-[25px] overflow-hidden bg-gray-50">
        <img 
          src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
          alt={product.nameEn}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isStockOut ? 'grayscale opacity-40' : ''}`}
        />
        {isStockOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[3px] z-10">
            <span className="bg-red-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl border-2 border-white animate-pulse">Stock Out</span>
          </div>
        )}
        {!isStockOut && discountPercent > 0 && (
          <div className="absolute top-5 left-5 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg z-10">
            {product.discount} OFF
          </div>
        )}
      </Link>

      <div className="mt-6 space-y-3 px-2 flex-1">
        <div className="flex justify-between items-start">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.category}</p>
           <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md ${isStockOut ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'}`}>
              {isStockOut ? 'Empty' : `In Stock: ${product.stock}`}
           </span>
        </div>

        <h3 className="font-black text-gray-900 text-xl leading-tight truncate">{product.nameEn}</h3>
        
        <div className="flex items-baseline gap-2 pt-1">
           <span className="text-3xl font-black text-gray-900 tracking-tighter">৳{product.price}</span>
           {discountPercent > 0 && (
             <span className="text-sm text-gray-400 line-through font-bold">৳{cutPrice}</span>
           )}
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6">
          <Link href={`/products/${product._id}`} className="w-full text-center py-2 bg-gray-100 text-gray-900 rounded-[22px] font-black uppercase text-sm tracking-wider hover:bg-gray-200 transition-all border border-gray-200">
            View Details
          </Link>
          <button 
            onClick={() => addToCart(product)}
            disabled={isStockOut}
            className={`w-full py-2 rounded-[22px] font-black uppercase text-sm tracking-tighter transition-all shadow-xl active:scale-95 ${
              isStockOut 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-yellow-500 text-black hover:bg-black hover:text-white'
            }`}
          >
            {isStockOut ? "Out of Stock" : "Add to Cart 🛒"}
          </button>
        </div>
      </div>
    </div>
  );
}