import Hero from '@/components/Banner/Banner';
import DealoftheDay from '@/components/DealoftheDay';
import FlashSales from '@/components/FlashSales/FlashSales';
import TopRated from '@/components/TopRated/TopRated';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 py-20">
       
        <FlashSales />
      </section>

<section className='max-w-7xl mx-auto px-6 py-5 '  >
<DealoftheDay></DealoftheDay>

</section>

      <section className="max-w-7xl mx-auto px-4 py-20 bg-white rounded-[60px] my-10 border border-gray-100">
        <h2 className="text-3xl  text-black font-black uppercase tracking-tighter mb-10">⭐ Top Rated</h2>
        <TopRated />
      </section>
    </div>
  );
}