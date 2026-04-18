"use client";
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';

export default function FlashSales() {
  const [data, setData] = useState([]);
  const [timer, setTimer] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) {
          setData(json.filter(p => p.isFlashSale).slice(0, 8));
        }
      });

    const target = new Date("2026-05-01T00:00:00").getTime(); // Set your date here

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      setTimer({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="my-16 px-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">
            Flash <span className="text-yellow-500">Sales</span> 🔥
          </h2>
        </div>

        {/* COMPACT TIMER BAR */}
        <div className="flex items-center gap-3 bg-black text-white p-3 px-6 rounded-full border-b-4 border-yellow-500">
          <span className="text-[10px] font-black uppercase text-gray-400">Ends In:</span>
          <div className="flex gap-2 text-xl font-black italic text-yellow-500">
            <span>{timer.d}d</span>
            <span>{String(timer.h).padStart(2, '0')}h</span>
            <span>{String(timer.m).padStart(2, '0')}m</span>
            <span className="text-white animate-pulse">{String(timer.s).padStart(2, '0')}s</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}