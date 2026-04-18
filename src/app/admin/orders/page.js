"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
      setLoading(false);
    } catch (err) {
      console.error("Order fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchOrders();
    } catch (err) {
      alert("Status update failed!");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-black text-gray-400 uppercase animate-pulse">লোড হচ্ছে...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-12 bg-white min-h-screen text-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
            Customer <span className="text-yellow-500">Orders</span>
          </h1>
          <p className="text-gray-700 font-bold text-2xl uppercase tracking-widest mt-4">
            Total Orders: {orders.length}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {orders.map(order => (
            <div key={order._id} className="flex flex-col xl:flex-row justify-between gap-18 border-4 rounded-2xl p-6 border-gray-500 pb-8 last:border-none">
              
              {/* 1. Customer Info Section (Simplified) */}
              <div className="xl:w-1/3 space-y-5">
                <div className="flex items-center gap-4">
                  {/* <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                    order.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status || 'Pending'}
                  </span> */}
                
                  <span className="text-gray-600 font-bold text-2xl">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : ''}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-800  ">
                    Customer Information
                  </h3>
                  <h3 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                    {order.customerName}
                  </h3>
                  <p className="text-yellow-600 font-black text-xl ">{order.phone}</p>
                  <p className="text-gray-600 font-semibold text-lg lowercase">{order.userEmail}</p>
                </div>

                <div className="pt-3 space-y-2">
                  <p className="text-xs font-bold text-gray-600 uppercase ">Shipping Destination</p>
                  <div className="flex items-center gap-2 text-lg font-bold uppercase">
                    <span className="text-gray-900">{order.division}</span>
                    <span className="text-yellow-500">/</span>
                    <span className="text-gray-900">{order.thana}</span>
                  </div>
                  <p className="text-gray-700 font-bold text-lg leading-tight">
                    {order.detailedAddress || order.address}
                  </p>
                </div>
              </div>

              {/* 2. Items Section (Removed Borders & Fixed Collapsing) */}
              <div className="flex-1 space-y-8">
                <h4 className="text-xs font-black text-gray-700 uppercase tracking-[0.2em] mb-3">Items Detail</h4>
                <div className="space-y-10">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-start gap-8">
                      <Link href={`/products/${item.productId || item._id}`} className="shrink-0">
                        <img 
                          src={item.image || "https://via.placeholder.com/150"} 
                          alt="product" 
                          className="w-30 h-30 rounded-3xl object-cover  transition-all shadow-sm"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link href={`/products/${item.productId || item._id}`}>
                           <span className="font-black text-gray-900 text-3xl block leading-none hover:text-yellow-500 transition-colors mb-3">
                             {item.nameBn || item.nameEn || "Product Name"}
                           </span>
                        </Link>
                        
                        <div className="flex flex-wrap items-center gap-2 ">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-black text-gray-700 uppercase">Quantity</span>
                            <span className="text-4xl font-black text-gray-900 italic tracking-tighter">{item.quantity || 1}</span>
                          </div>
                          <span className="text-xl font-black text-yellow-500 italic">
                            ৳{item.price} each
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Grand Total & Actions */}
              <div className="xl:w-1/2 flex flex-col justify-between ">
                <div className="text-right">
                    <span className="text-lg font-bold text-gray-700 uppercase tracking-widest block mb-4 mt-4">Grand Total</span>
                    <div className="text-2xl font-bold text-gray-900 tracking-widest  leading-none">
                        ৳{order.totalAmount}
                    </div>
                </div>
                
              


              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}