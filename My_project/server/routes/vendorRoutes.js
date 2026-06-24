import express from 'express';
import { registerBoutique, getVendorDashboard } from '../controllers/vendorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check if user is a Vendor
const vendorOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Vendor') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as a Vendor' });
  }
};

router.post('/boutique', protect, vendorOnly, registerBoutique);
router.get('/dashboard', protect, vendorOnly, getVendorDashboard);

export default router;
