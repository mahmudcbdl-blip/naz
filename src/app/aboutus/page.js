export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-black">
      <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-10 border-b-8 border-yellow-500 pb-4">
        Our <span className="text-yellow-500">Story</span>
      </h1>
      
      <div className="space-y-8 text-xl leading-relaxed font-medium text-gray-700">
        <p>
          Welcome to <span className="font-black text-black">NAZ Online Shop</span>. 
          Established in 2026 in the heart of Dhaka, we started with a single mission: 
          to provide authentic, high-quality gadgets and fashion to the tech-savvy 
          community of Bangladesh.
        </p>
        
        <div className="bg-gray-100 p-10 rounded-[40px] border-l-8 border-black">
          <h2 className="text-3xl font-black uppercase mb-4 text-black">Why NAZ?</h2>
          <p>
            In a market flooded with replicas, we stand for **authenticity**. Every product 
            you see on our platform is sourced directly from authorized distributors. 
            We don't just sell products; we sell an experience of trust and premium quality.
          </p>
        </div>

        <p>
          Whether you are looking for the latest flagship smartphone, premium wireless 
          audio, or trend-setting fashion, NAZ is your curated destination. We believe 
          in fast delivery, transparent pricing, and a customer-first approach.
        </p>

        <div className="pt-10 border-t-2 border-gray-100 flex items-center gap-6">
          <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center text-3xl">🎯</div>
          <div>
            <p className="font-black uppercase text-sm text-gray-400">Our Goal</p>
            <p className="text-2xl font-black italic">Building the most trusted E-commerce brand in Bangladesh.</p>
          </div>
        </div>
      </div>
    </div>
  );
}