import mongoose from 'mongoose';

const boutiqueSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    boutiqueName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Boutique = mongoose.model('Boutique', boutiqueSchema);
export default Boutique;
