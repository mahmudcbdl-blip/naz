"use client";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Ensure this path is correct
import { useRouter } from 'next/navigation';
import EditProductModal from '@/components/EditProductModal';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]); 
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    nameBn: '', nameEn: '', price: '', category: 'gadgets', 
    images: [], 
    descriptionBn: '', stock: '', discount: '0%',
    isFlashSale: false, isTopRated: false
  });

  // --- SECURITY CHECK: Redirect if not logged in ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) { console.error("Fetch Error:", err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (formData.images.length + selectedFiles.length > 3) {
        alert("You can only upload a maximum of 3 images.");
        return;
    }
    const updatedFiles = [...formData.images, ...selectedFiles];
    setFormData({ ...formData, images: updatedFiles });
    const newPreviews = updatedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const updatedFiles = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedFiles });
    setPreviews(updatedPreviews);
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "naz_preset");
    data.append("cloud_name", "dmp0i6dsx");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmp0i6dsx/image/upload", {
        method: "POST",
        body: data,
      });
      const cloudData = await res.json();
      return cloudData.secure_url;
    } catch (error) {
      console.error("Cloudinary Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) return alert("Please select at least one image");
    setUploading(true);
    try {
      const sellingPrice = parseFloat(formData.price);
      const discountPercent = parseFloat(formData.discount.replace('%', '')) || 0;
      const originalPrice = discountPercent > 0 
        ? (sellingPrice / (1 - discountPercent / 100)).toFixed(2) 
        : sellingPrice;

      const uploadPromises = formData.images.map(file => uploadImageToCloudinary(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const filteredUrls = uploadedUrls.filter(url => url !== null);
      
      if (filteredUrls.length === 0) {
        alert("Image upload failed!");
        setUploading(false);
        return;
      }

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ...formData, 
            images: filteredUrls,
            price: sellingPrice,
            originalPrice: originalPrice
        })
      });
      
      if (res.ok) {
        alert("Product Added Successfully!");
        setFormData({ nameBn: '', nameEn: '', price: '', category: 'gadgets', images: [], descriptionBn: '', stock: '', discount: '0%', isFlashSale: false, isTopRated: false });
        setPreviews([]);
        fetchProducts();
      }
    } catch (err) { alert("Server connection failed"); } 
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete this?")) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest">Authorizing Admin...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-4">
      {editingProduct && (
        <EditProductModal 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onUpdate={fetchProducts} 
        />
      )}

      <div className="flex flex-col md:flex-col justify-between items-center md:items-center gap-4 border-b pb-6 mt-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">Inventory Control</h1>
          <p className="text-gray-600 text-xl font-semibold mt-2">Manage your {products.length} products</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 place-items-center min-h-screen">



<div className="xl:col-span-4 bg-white p-6 md:p-8 rounded-[20px] w-full max-w-3xl shadow-sm border border-gray-100 h-fit xl:sticky xl:top-24">
  <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-yellow-600">
    Add Product
  </h2>

  <form onSubmit={handleSubmit} className="space-y-4 text-sm">
    <input
      type="text"
      placeholder="Name (Bangla)"
      className="w-full p-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-yellow-500"
      value={formData.nameBn}
      onChange={(e) =>
        setFormData({ ...formData, nameBn: e.target.value })
      }
      required
    />

    <input
      type="text"
      placeholder="Name (English)"
      className="w-full p-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-yellow-500"
      value={formData.nameEn}
      onChange={(e) =>
        setFormData({ ...formData, nameEn: e.target.value })
      }
      required
    />

    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Price (৳)"
        className="p-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-yellow-500"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        required
      />

      <input
        type="number"
        placeholder="Stock"
        className="p-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-yellow-500"
        value={formData.stock}
        onChange={(e) =>
          setFormData({ ...formData, stock: e.target.value })
        }
        required
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Discount (e.g. 10%)"
        className="p-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-yellow-500"
        value={formData.discount}
        onChange={(e) =>
          setFormData({ ...formData, discount: e.target.value })
        }
        required
      />

      <select
        className="p-4 bg-white text-gray-900 rounded-2xl outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-yellow-500"
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
      >
        <option value="gadgets">Gadgets</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home-appliances">Home Appliances</option>
      </select>
    </div>

    <div className="space-y-3">
      <label className="text-[10px] font-black text-gray-500 ml-2 uppercase tracking-widest">
        Images ({formData.images.length}/3)
      </label>

      <div className="grid grid-cols-3 gap-2">
        {previews.map((src, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden border border-yellow-500 group shadow-sm"
          >
            <img
              src={src}
              className="w-full h-full object-cover"
              alt="preview"
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center shadow-lg"
            >
              ✕
            </button>

            <div className="absolute bottom-0 left-0 bg-yellow-500 text-white text-[7px] px-1 font-black uppercase w-full text-center py-0.5">
              Img {index + 1}
            </div>
          </div>
        ))}

        {previews.length < 3 && (
          <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 transition-all">
            <span className="text-xl font-light">+</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
    </div>

    <textarea
      placeholder="Description (Bangla)"
      className="w-full p-4 bg-white text-gray-900 placeholder-gray-400 rounded-2xl outline-none ring-1 ring-gray-200 h-32 resize-none focus:ring-2 focus:ring-yellow-500"
      value={formData.descriptionBn}
      onChange={(e) =>
        setFormData({ ...formData, descriptionBn: e.target.value })
      }
      required
    ></textarea>

    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
      <label className="flex items-center gap-2 font-black text-[10px] text-gray-700">
        <input
          type="checkbox"
          checked={formData.isFlashSale}
          onChange={(e) =>
            setFormData({
              ...formData,
              isFlashSale: e.target.checked,
            })
          }
        />
        FLASH SALE
      </label>

      <label className="flex items-center gap-2 font-black text-[10px] text-gray-700">
        <input
          type="checkbox"
          checked={formData.isTopRated}
          onChange={(e) =>
            setFormData({
              ...formData,
              isTopRated: e.target.checked,
            })
          }
        />
        TOP RATED
      </label>
    </div>

    <button
      disabled={uploading}
      className="w-full bg-yellow-500 text-white py-5 rounded-[22px] font-black text-lg shadow-xl hover:bg-black transition-all"
    >
      {uploading ? "UPLOADING ASSETS..." : "CONFIRM UPLOAD"}
    </button>
  </form>
</div>


        <div className="xl:col-span-8 bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-gray-100">
          <h2 className="text-xl font-black mb-8 italic text-gray-700 uppercase tracking-widest">Inventory Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p._id} className="p-4 bg-gray-50/50 border border-gray-100 rounded-[30px] flex items-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                <div className="relative">
                  <img src={p.images?.[0] || p.image} className="w-20 h-20 rounded-2xl object-cover shadow-sm" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 truncate">{p.nameBn}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600 font-bold text-sm">৳{p.price}</span>
                    {p.originalPrice && <span className="text-gray-400 text-xs line-through">৳{p.originalPrice}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setEditingProduct(p)} className="bg-yellow-50 text-yellow-600 p-3 rounded-xl hover:bg-yellow-500 hover:text-white transition-all text-xs font-black">✎</button>
                   <button onClick={() => handleDelete(p._id)} className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-black">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}