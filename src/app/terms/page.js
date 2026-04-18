export default function TermsPage() {
  const sections = [
    { title: "Ordering", content: "By placing an order on NAZ, you agree to provide accurate information. We reserve the right to cancel orders in case of stock errors or pricing glitches." },
    { title: "Shipping", content: "Orders within Dhaka are typically delivered in 24-48 hours. Outside Dhaka takes 3-5 business days." },
    { title: "Returns", content: "We offer a 7-day easy return policy for defective items. The product must be in its original packaging with all accessories." },
    { title: "Payments", content: "We accept Cash on Delivery (COD), bkash, and Nagad. Your payment data is handled through secure, encrypted gateways." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black uppercase italic mb-12">Terms & <span className="text-yellow-500">Conditions</span></h1>
      <div className="space-y-12">
        {sections.map((sec, i) => (
          <div key={i} className="border-b border-gray-100 pb-8">
            <h2 className="text-2xl font-black uppercase mb-3 flex items-center gap-3">
              <span className="text-yellow-500">0{i+1}.</span> {sec.title}
            </h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}