export default function Reviews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
          <div className="text-yellow-400 mb-2">★★★★★</div>
          <p className="text-gray-600 text-sm italic">"অসাধারণ সার্ভিস! পণ্যের মান খুব ভালো এবং ডেলিভারি খুব দ্রুত পেয়েছি।"</p>
          <p className="mt-4 font-bold text-gray-800">- Happy Customer {i}</p>
        </div>
      ))}
    </div>
  );
}