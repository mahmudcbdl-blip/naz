import Link from 'next/link';

const categories = [
  { name: 'ইলেকট্রনিক্স', icon: '⚡', slug: 'electronics' },
  { name: 'গ্যাজেট', icon: '⌚', slug: 'gadgets' },
  { name: 'ফ্যাশন', icon: '👜', slug: 'fashion' },
  { name: 'খাবার', icon: '🍯', slug: 'food' },
  { name: 'গৃহস্থালি', icon: '🏠', slug: 'home' }
];

export default function Categories() {
  return (
    <div className="flex justify-center gap-8 flex-wrap py-6">
      {categories.map((cat) => (
        <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="group flex flex-col items-center">
          <div className="w-24 h-24 bg-white shadow-md rounded-[32px] flex items-center justify-center text-4xl group-hover:bg-yellow-500 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
            {cat.icon}
          </div>
          <span className="mt-4 font-bold text-gray-700 group-hover:text-yellow-600 transition-colors">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}