import Link from 'next/link';

export default function Footer() {
  const categories = [
    { name: 'Gadgets', href: '/gadgets' },
    { name: 'Fashion', href: '/fashion' },
    { name: 'Electronics', href: '/electronics' },
  ];

  return (
    <footer className="bg-zinc-950 text-gray-300 pt-10 pb-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* 1. Brand Section */}
        <div className="space-y-3">
          <Link href="/" className="text-3xl font-black flex items-center gap-2">
            <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-lg uppercase tracking-tighter">NAZ</span>
            <span className="text-white tracking-tighter uppercase italic">Shop</span>
          </Link>
          <p className="text-sm font-bold leading-snug max-w-xs text-gray-400">
            আপনার আস্থার বিশ্বস্ত অনলাইন শপ। সাশ্রয়ী মূল্যে সেরা মানের গ্যাজেট ও ফ্যাশন পণ্য।
          </p>
        </div>

        {/* 2. Quick Links - Bigger & More Visible */}
        <div>
          <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-3 border-b border-zinc-800 pb-1 inline-block">Quick Links</h4>
          <ul className="space-y-1 text-[14px] font-bold uppercase tracking-widest">
            <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-yellow-500 transition-colors">Products</Link></li>
            <li><Link href="/offers" className="text-red-500 hover:text-white transition-colors">Offers %</Link></li>
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link href={cat.href} className="hover:text-yellow-500 transition-colors opacity-90">{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Legal */}
        <div>
          <h4 className="text-white font-bold uppercase text-xm tracking-widest mb-3 border-b border-zinc-800 pb-1 inline-block">Legal</h4>
          <ul className="space-y-1 text-[14px] font-boldfont-bold uppercase tracking-wider">
            <li><Link href="/aboutus" className="hover:text-yellow-500 transition-colors">About Us</Link></li>
            <li><Link href="/terms" className="hover:text-yellow-500 transition-colors">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* 4. Contact - Very Visible Address */}
        <div>
          <h4 className="text-white font-bold uppercase text-sm tracking-widest mb-3 border-b border-zinc-800 pb-1 inline-block">Visit Us</h4>
          <div className="text-[14px] font-bold uppercase tracking-wider space-y-0.5">
            <p className="text-white">Razzak Plaza</p>
            <p className="text-gray-200">13th Floor, Lift-12</p>
            <p>Moghbazar, Ramna, Dhaka</p>
            <div className="mt-2 pt-2 border-t border-zinc-900">
              <p className="text-yellow-500 text-lg">Phone: +880 1XXX-XXXXXX</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright - Reduced Margin */}
      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-900 mt-8 pt-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
        © {new Date().getFullYear()} NAZ Online Shop. All Rights Reserved.
      </div>
    </footer>
  );
}