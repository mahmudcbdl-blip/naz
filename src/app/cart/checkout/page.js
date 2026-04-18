"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  // Destructure context safely
  const cartContext = useCart();
  const cart = cartContext?.cart || [];
  const setCart = cartContext?.setCart; // This is the key to updating the Navbar
  const router = useRouter();
  
  const [localCart, setLocalCart] = useState([]);
  const [uploading, setUploading] = useState(false);

  const divisions = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Rangpur", "Mymensingh", "Barishal"];

  useEffect(() => {
    if (cart.length > 0) {
      setLocalCart(cart.map(item => ({ ...item, quantity: item.quantity || 1 })));
    }
  }, [cart]);

  const [formData, setFormData] = useState({
    customerName: '', 
    email: '', 
    phone: '', 
    division: 'Dhaka',
    thana: '',
    detailedAddress: ''
  });

  const updateQuantity = (id, amount, stock) => {
    setLocalCart(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + amount;
        if (newQty > 0 && newQty <= stock) return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = localCart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (localCart.length === 0) return alert("আপনার কার্ট খালি!");
    
    setUploading(true);

    const orderData = {
      customerName: formData.customerName,
      userEmail: formData.email, 
      phone: formData.phone,
      division: formData.division,
      thana: formData.thana,
      detailedAddress: formData.detailedAddress,
      items: localCart.map(item => ({
        productId: item._id,
        nameBn: item.nameBn,
        price: item.price,
        image: item.images && item.images.length > 0 ? item.images[0] : item.image,
        quantity: item.quantity
      })),
      totalAmount: total,
      paymentMethod: 'Cash on Delivery'
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        // 1. Clear physical storage
        localStorage.removeItem('cart'); 
        
        // 2. Update the Context State
        // This makes the Navbar icon update IMMEDIATELY
        if (typeof setCart === 'function') {
          setCart([]);
        } else if (cartContext?.clearCart) {
          cartContext.clearCart();
        }
        
        alert("ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।");
        router.push('/'); 
        return; 
      } else {
        const error = await res.json();
        alert(`অর্ডার দিতে সমস্যা হয়েছে: ${error.message}`);
      }
    } catch (err) {
      console.error("Order Submission Error:", err);
      alert("সার্ভার কানেকশন এরর! অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-16 px-4 text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Delivery Form */}
        <div className="lg:col-span-7 bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-3xl font-black italic uppercase">Shipping Details</h2>
             <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Cash on Delivery</span>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 font-bold" 
              onChange={(e)=>setFormData({...formData, customerName: e.target.value})} required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 font-bold" 
                  onChange={(e)=>setFormData({...formData, email: e.target.value})} required />
                <input type="text" placeholder="Phone Number" className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 font-bold" 
                  onChange={(e)=>setFormData({...formData, phone: e.target.value})} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 ml-2 uppercase tracking-widest">Division (বিভাগ)</label>
                    <select className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 font-bold" 
                        onChange={(e)=>setFormData({...formData, division: e.target.value})} value={formData.division}>
                        {divisions.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 ml-2 uppercase tracking-widest">Thana / Area (থানা)</label>
                    <input type="text" placeholder="Enter Thana" className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 font-bold" 
                        onChange={(e)=>setFormData({...formData, thana: e.target.value})} required />
                </div>
            </div>

            <textarea placeholder="Detailed Address (Road No, House No, Area details...)" 
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-yellow-500 h-32 font-bold resize-none" 
              onChange={(e)=>setFormData({...formData, detailedAddress: e.target.value})} required />

            <button disabled={uploading} className="w-full bg-yellow-500 text-white py-6 rounded-[24px] font-black text-xl hover:bg-black transition-all shadow-xl uppercase italic tracking-tighter">
              {uploading ? "PROCESSING..." : `Confirm Order (৳${total})`}
            </button>
          </form>
        </div>

        {/* Order Summary Area */}
        <div className="lg:col-span-5 bg-gray-900 text-white p-10 rounded-[50px] h-fit sticky top-24 shadow-2xl border-t-8 border-yellow-500">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-yellow-500 italic">Order Items</h2>
          <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {localCart.map((item, i) => (
              <div key={i} className="flex gap-4 items-center border-b border-gray-800 pb-6">
                <img 
                    src={item.images && item.images.length > 0 ? item.images[0] : item.image} 
                    className="w-16 h-16 rounded-xl object-cover" 
                    alt="product" 
                />
                <div className="flex-1 min-w-0">
                    <span className="text-gray-100 font-bold block truncate">{item.nameBn}</span>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                            <button type="button" onClick={()=>updateQuantity(item._id, -1, item.stock)} className="px-3 py-1 hover:bg-yellow-500 hover:text-black transition-all">-</button>
                            <span className="px-3 text-xs font-black">{item.quantity}</span>
                            <button type="button" onClick={()=>updateQuantity(item._id, 1, item.stock)} className="px-3 py-1 hover:bg-yellow-500 hover:text-black transition-all">+</button>
                        </div>
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest italic">Stock: {item.stock}</span>
                    </div>
                </div>
                <span className="font-black text-yellow-500 text-lg">৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-5xl font-black border-t border-gray-800 pt-8 mt-4 tracking-tighter italic">
            <span className="text-gray-500">Total</span>
            <span className="text-white">৳{total}</span>
          </div>
        </div>
      </div>

      {/* DETAILED RETURN POLICY */}
      <div className="max-w-6xl mx-auto mt-20 p-10 bg-white rounded-[40px] border border-gray-100">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-6 border-b pb-4 flex items-center gap-2">
          <span className="bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm italic">i</span>
          Return & Replacement Policy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
             <h4 className="font-black text-sm uppercase text-gray-400">01. 7-Day Window</h4>
             <p className="text-xs text-gray-600 leading-relaxed">পণ্য হাতে পাওয়ার পর সর্বোচ্চ ৭ দিনের মধ্যে রিটার্ন রিকোয়েস্ট করতে হবে। এরপর কোনো অভিযোগ গ্রহণযোগ্য হবে না।</p>
          </div>
          <div className="space-y-3">
             <h4 className="font-black text-sm uppercase text-gray-400">02. Product Condition</h4>
             <p className="text-xs text-gray-600 leading-relaxed">পণ্যটি অবশ্যই অব্যবহৃত এবং অক্ষত অবস্থায় থাকতে হবে। কোনো অংশ ভাঙা বা প্যাকেট নষ্ট হলে রিটার্ন নেওয়া হবে না।</p>
          </div>
          <div className="space-y-3">
             <h4 className="font-black text-sm uppercase text-gray-400">03. Verification</h4>
             <p className="text-xs text-gray-600 leading-relaxed">ডেলিভারি ম্যানের সামনে পণ্য চেক করে নিন। কোনো ত্রুটি থাকলে তাৎক্ষণিক আমাদের হটলাইনে যোগাযোগ করুন।</p>
          </div>
        </div>
      </div>
    </div>
  );  
}