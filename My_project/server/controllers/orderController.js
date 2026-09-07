import Order from '../models/Order.js';
import Boutique from '../models/Boutique.js';
import User from '../models/User.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Customer only)
export const createOrder = async (req, res) => {
  try {
    const {
      productName,
      productImage,
      measurements,
      shippingAddress,
      phone,
      customerName,
      totalAmount,
      boutiqueName,
    } = req.body;

    if (!productName || !shippingAddress || !phone || !customerName) {
      return res.status(400).json({ message: 'Please provide all required shipping and product fields' });
    }

    // Try to find boutique by name
    let boutique = null;
    if (boutiqueName) {
      boutique = await Boutique.findOne({ boutiqueName: new RegExp('^' + boutiqueName + '$', 'i') });
    }

    // Fallback: get the first boutique in the system
    if (!boutique) {
      boutique = await Boutique.findOne();
    }

    // If still no boutique exists, let's create a default one for the first Vendor we find
    if (!boutique) {
      let vendor = await User.findOne({ role: 'Vendor' });
      if (!vendor) {
        vendor = await User.create({
          name: 'Maison Atelier Owner',
          email: 'atelier_owner@maison.com',
          password: 'password123',
          role: 'Vendor'
        });
      }
      boutique = await Boutique.create({
        vendorId: vendor._id,
        boutiqueName: boutiqueName || 'Maison Luxe Atelier',
        description: 'A beautiful luxury bespoke fashion boutique.',
        address: '124 Luxury Lane, New York, NY',
        contactEmail: vendor.email,
      });
    }

    // Create the order
    const order = await Order.create({
      customerId: req.user._id,
      vendorId: boutique.vendorId,
      boutiqueId: boutique._id,
      productName,
      productImage,
      measurements,
      shippingAddress,
      phone,
      customerName,
      totalAmount: parseFloat(totalAmount) || 0,
      status: 'Pending',
    });

    // Update Boutique revenue
    boutique.revenue = (boutique.revenue || 0) + order.totalAmount;
    await boutique.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer's orders
// @route   GET /api/orders/myorders
// @access  Private (Customer only)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id })
      .populate('boutiqueId', 'boutiqueName')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Vendor only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the logged in vendor owns this order
    if (order.vendorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to modify this order' });
    }

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
