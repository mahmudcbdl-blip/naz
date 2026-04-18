export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black uppercase italic mb-10">Privacy <span className="text-yellow-500">Policy</span></h1>
      <div className="prose prose-lg max-w-none text-gray-700 font-medium">
        <p className="mb-6">At NAZ, your privacy is our priority. We only collect the data necessary to fulfill your orders and improve your shopping experience.</p>
        
        <h3 className="text-2xl font-black uppercase text-black mt-10 mb-4">What we collect:</h3>
        <ul className="list-disc pl-6 space-y-3 mb-10">
          <li>Name, Address, and Phone number for delivery.</li>
          <li>Email address for order confirmations and updates.</li>
          <li>Device information to improve our website performance.</li>
        </ul>

        <div className="bg-yellow-500/10 p-8 rounded-3xl border-2 border-yellow-500">
          <p className="font-bold text-black italic">
            "We never sell your data to third parties. Your information is strictly used for the logistics of NAZ Online Shop."
          </p>
        </div>
      </div>
    </div>
  );
}