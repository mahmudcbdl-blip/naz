"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Banner() {
  const [slide1, setSlide1] = useState(0);
  const [slide2, setSlide2] = useState(0);

  const leftSlides = [
    { img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000", title: "New Arrivals" },
    { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000", title: "Tech Gadgets" },
    { img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000", title: "Modern Style" },
  ];

  const rightSlides = [
    { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000", title: "Best Deals" },
    { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000", title: "Flash Sale" },
    { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000", title: "Top Sellers" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide1((prev) => (prev + 1) % leftSlides.length);
      setSlide2((prev) => (prev + 1) % rightSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-7xl mx-auto mt-4">
      
      {/* LEFT SLIDER - Redirects to Products */}
      <div className="relative group overflow-hidden rounded-[30px] shadow-2xl h-[350px] ">
        <Link href="/products" className="block h-full w-full relative">
          {leftSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === slide1 ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-10">
                <div className="text-white">
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{s.title}</h2>
                  <p className="mt-3 text-yellow-500 font-black uppercase tracking-[0.2em] text-xs">Shop Now →</p>
                </div>
              </div>
            </div>
          ))}
        </Link>
        {/* SMALL DOTS */}
        <div className="absolute bottom-6 left-10 flex gap-1.5 z-10">
          {leftSlides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${slide1 === i ? 'w-6 bg-yellow-500' : 'w-1.5 bg-white/50'}`} />
          ))}
        </div>
      </div>

      {/* RIGHT SLIDER - Redirects to Best Sellers */}
      <div className="relative group overflow-hidden rounded-[30px] shadow-2xl h-[350px] ">
        <Link href="/best-sellers" className="block h-full w-full relative">
          {rightSlides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === slide2 ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-10">
                <div className="text-white">
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{s.title}</h2>
                  <p className="mt-3 text-yellow-500 font-black uppercase tracking-[0.2em] text-xs">Explore →</p>
                </div>
              </div>
            </div>
          ))}
        </Link>
        {/* SMALL DOTS */}
        <div className="absolute bottom-6 left-10 flex gap-1.5 z-10">
          {rightSlides.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${slide2 === i ? 'w-6 bg-yellow-500' : 'w-1.5 bg-white/50'}`} />
          ))}
        </div>
      </div>

    </div>
  );
}