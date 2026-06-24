import Boutique from '../models/Boutique.js';
import Order from '../models/Order.js';

// @desc    Register a new boutique
// @route   POST /api/vendor/boutique
// @access  Private (Vendor only)
export const registerBoutique = async (req, res) => {
  try {
    const { boutiqueName, description, address, contactEmail } = req.body;

    const existingBoutique = await Boutique.findOne({ vendorId: req.user._id });
    if (existingBoutique) {
      return res.status(400).json({ message: 'Boutique already registered for this vendor' });
    }

    const boutique = await Boutique.create({
      vendorId: req.user._id,
      boutiqueName,
      description,
      address,
      contactEmail,
    });

    res.status(201).json(boutique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Vendor Dashboard Data
// @route   GET /api/vendor/dashboard
// @access  Private (Vendor only)
export const getVendorDashboard = async (req, res) => {
  try {
    const boutique = await Boutique.findOne({ vendorId: req.user._id });
    
    if (!boutique) {
      return res.status(404).json({ message: 'No boutique found for this vendor' });
    }

    const orders = await Order.find({ vendorId: req.user._id }).populate('customerId', 'name email');

    res.status(200).json({
      boutique,
      orders,
      revenue: boutique.revenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
