const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nameBn: { type: String, required: true },
  nameEn: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  
  // CHANGE THIS: Remove 'image' and add 'images'
  images: [{ type: String, required: true }], 
  
  descriptionBn: { type: String, required: true },
  isFlashSale: { type: Boolean, default: false },
  isTopRated: { type: Boolean, default: false },
  discount: { type: String, default: "0%" },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);