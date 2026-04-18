const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userEmail: { type: String, required: true },
  phone: { type: String, required: true },
  division: { type: String, required: true }, 
  thana: { type: String, required: true },    
  detailedAddress: { type: String, required: true }, 
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    nameBn: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  paymentMethod: { type: String, default: 'Cash on Delivery' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);