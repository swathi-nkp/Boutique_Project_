import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    boutiqueId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Boutique',
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
    },
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    measurements: {
      chest: { type: String, default: '' },
      waist: { type: String, default: '' },
      hips: { type: String, default: '' },
      height: { type: String, default: '' },
      sleeveLength: { type: String, default: '' },
      shoulderWidth: { type: String, default: '' },
      notes: { type: String, default: '' },
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Finished'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
