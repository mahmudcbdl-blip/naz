"use client";
import { useState } from 'react';

export default function EditProductModal({ product, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ ...product });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Hits /api/products/[id] with a PUT method
      const res = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Product Updated Successfully!");
        onUpdate(); // Refreshes the list in AdminPage
        onClose();  // Closes modal
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      alert("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-gray-900">
      <div className="bg-white w-full max-w-2xl rounded-[40px] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Edit Product Info</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 font-bold">CLOSE ✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
               <label className="text-[10px] font-black ml-2 text-gray-400 uppercase">Name (Bangla)</label>
               <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none" value={formData.nameBn} onChange={(e)=>setFormData({...formData, nameBn:e.target.value})} required/>
            </div>
            <div className="space-y-1">
               <label className="text-[10px] font-black ml-2 text-gray-400 uppercase">Name (English)</label>
               <input type="text" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none" value={formData.nameEn} onChange={(e)=>setFormData({...formData, nameEn:e.target.value})} required/>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="number" placeholder="Price" className="p-4 bg-gray-50 rounded-2xl border border-gray-100" value={formData.price} onChange={(e)=>setFormData({...formData, price:e.target.value})} required/>
            <input type="number" placeholder="Stock" className="p-4 bg-gray-50 rounded-2xl border border-gray-100" value={formData.stock} onChange={(e)=>setFormData({...formData, stock:e.target.value})} required/>
            <input type="text" placeholder="Discount" className="p-4 bg-gray-50 rounded-2xl border border-gray-100" value={formData.discount} onChange={(e)=>setFormData({...formData, discount:e.target.value})} required/>
          </div>

          <textarea placeholder="Description" className="w-full p-4 bg-gray-50 rounded-2xl h-32 border border-gray-100 resize-none" value={formData.descriptionBn} onChange={(e)=>setFormData({...formData, descriptionBn:e.target.value})} required></textarea>

          <button disabled={loading} className="w-full bg-yellow-500 text-white py-5 rounded-[22px] font-black text-lg shadow-xl hover:bg-black transition-all">
            {loading ? "SAVING CHANGES..." : "CONFIRM UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
}