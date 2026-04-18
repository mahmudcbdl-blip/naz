"use client";
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter(); 
  
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const handleGoToCheckout = () => {
    if (cart.length === 0) return alert("আপনার কার্ট খালি!");
    router.push('/cart/checkout'); 
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 text-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-black mb-12 uppercase tracking-tighter italic leading-none">
          Your <span className="text-yellow-500">Cart</span> ({cart.length})
        </h1>
        
        {cart.length === 0 ? (
          <div className="bg-white p-20 rounded-[50px] text-center shadow-2xl border border-gray-100">
            <div className="text-6xl mb-4 opacity-20">🛒</div>
            <p className="text-2xl text-gray-300 font-black uppercase tracking-widest">Your cart is empty</p>
            <Link href="/products" className="mt-6 inline-block text-yellow-600 font-black underline uppercase text-xs tracking-widest">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => {
              // ROBUST NAME & IMAGE LOGIC
              const displayImage = item.images && item.images.length > 0 ? item.images[0] : (item.image || "/placeholder.jpg");
              
              // This ensures if nameBn is "33", it shows "33", 
              // but it specifically looks for the fields you use in your Admin Panel
              const displayName = item.nameBn || item.nameEn || "Unnamed Product";
              
              return (
                <div key={index} className="bg-white p-6 rounded-[35px] shadow-sm flex items-center justify-between border border-gray-100 hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-6">
                    {/* Clickable Image */}
                    <Link href={`/products/${item._id}`}>
                      <img 
                        src={displayImage} 
                        className="w-24 h-24 object-cover rounded-[24px] border border-gray-50 shadow-sm hover:scale-105 transition-transform duration-300" 
                        alt={displayName} 
                      />
                    </Link>

                    <div className="space-y-1">
                      {/* Clickable Name */}
                      <Link href={`/products/${item._id}`}>
                        <h3 className="font-black text-2xl text-gray-900 leading-none hover:text-yellow-600 transition-colors">
                          {displayName}
                        </h3>
                      </Link>
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest italic">
                        {item.category || "General Item"}
                      </p>
                      <p className="text-yellow-500 font-black text-2xl tracking-tighter italic">
                        ৳{item.price}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    className="bg-red-50 text-red-500 font-black uppercase text-[10px] px-8 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all tracking-widest shadow-sm active:scale-95"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
            
            {/* TOTAL SECTION */}
            <div className="bg-gray-900 p-10 rounded-[50px] text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl mt-12 border-t-8 border-yellow-500">
              <div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Total Payable</p>
                <h2 className="text-6xl font-black text-yellow-500 italic tracking-tighter leading-none">
                  ৳{total}
                </h2>
              </div>
              <button 
                onClick={handleGoToCheckout}
                className="w-full md:w-auto bg-yellow-500 text-black px-16 py-7 rounded-[28px] font-black text-xl hover:bg-white transition-all shadow-xl active:scale-95 uppercase tracking-tighter italic"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}