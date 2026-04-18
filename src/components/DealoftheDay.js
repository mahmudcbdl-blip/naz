"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DealoftheDay() {
  const [product, setProduct] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Fetch products and find the "Deal of the Day"
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) {
          const deal = json.find(p => p.isDealOfDay) || json[0];
          setProduct(deal);
        }
      });

    // Simple 24h Countdown Logic
    const timer = setInterval(() => {
      const now = new Date();
      setTimeLeft({
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(),
        seconds: 59 - now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) return null;

  return (
    <div className="my-20 bg-zinc-900 rounded-[50px] overflow-hidden shadow-2xl border-4 border-yellow-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 lg:p-16 items-center">
        
        {/* Left Side: Product Image */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-yellow-500/20 blur-3xl rounded-full group-hover:bg-yellow-500/40 transition-all"></div>
          <img 
            src={product.images?.[0] || product.image} 
            alt="Deal of the Day" 
            className="relative w-full aspect-square object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-0 right-0 bg-red-600 text-white font-black p-6 rounded-full text-xl rotate-12 shadow-xl border-4 border-white">
            -{product.discount || '25%'}
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="text-white space-y-8">
          <div className="inline-block px-6 py-2 bg-yellow-500 text-black font-black uppercase text-sm tracking-widest rounded-full">
            Limited Time Offer
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Deal <span className="text-yellow-500">of the</span> Day
          </h2>
          
          <h3 className="text-3xl font-bold text-gray-300 uppercase">{product.nameEn}</h3>

          {/* Countdown Timer UI */}
          <div className="flex gap-4">
            {[
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((unit, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl w-24 text-center">
                <p className="text-4xl font-black text-yellow-500 leading-none">
                  {String(unit.value).padStart(2, '0')}
                </p>
                <p className="text-[10px] font-black uppercase text-gray-400 mt-1">{unit.label}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className="text-gray-400 uppercase font-black text-xs mb-1">Exclusive Price</p>
              <p className="text-6xl font-black text-white italic tracking-tighter">৳{product.price}</p>
            </div>
            <Link 
              href={`/products/${product._id}`}
              className="px-12 py-6 bg-white text-black font-black uppercase text-lg rounded-[25px] hover:bg-yellow-500 transition-all shadow-2xl active:scale-95"
            >
              Grab it Now ⚡
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}