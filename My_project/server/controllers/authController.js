import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, gender, address, measurements } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Normalize role to correct case
    const normalizedRole = role && role.toLowerCase() === 'vendor' ? 'Vendor' : 'Customer';

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
      phone: phone || '',
      gender: gender || 'Female',
      address: address || '',
      measurements: measurements || { chest: '', waist: '', hips: '', height: '' },
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
        measurements: user.measurements,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Case-insensitive role check to prevent cross-portal login
      if (role && user.role.toLowerCase() !== role.toLowerCase()) {
        return res.status(401).json({ 
          message: `This account is registered as a ${user.role}. Please select the '${user.role}' tab to login.` 
        });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
        phone: user.phone,
        gender: user.gender,
        address: user.address,
        measurements: user.measurements,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      phone: req.user.phone,
      gender: req.user.gender,
      address: req.user.address,
      measurements: req.user.measurements,
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Authenticate with Google
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res) => {
  try {
    const { credential, role } = req.body;

    // Verify the Google token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    // Normalize role to correct case
    const normalizedRole = role && role.toLowerCase() === 'vendor' ? 'Vendor' : 'Customer';

    if (user) {
      // Prevent cross-portal login
      if (role && user.role.toLowerCase() !== role.toLowerCase()) {
        return res.status(401).json({ 
          message: `This account is registered as a ${user.role}. Please select the '${user.role}' tab to login.` 
        });
      }

      // Update googleId and picture if missing
      if (!user.googleId) {
        user.googleId = googleId;
        user.picture = picture;
        await user.save();
      }
    } else {
      // Create new user for Google login
      user = await User.create({
        name,
        email,
        googleId,
        picture,
        role: normalizedRole,
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      picture: user.picture,
      phone: user.phone,
      gender: user.gender,
      address: user.address,
      measurements: user.measurements,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
      user.gender = req.body.gender !== undefined ? req.body.gender : user.gender;
      user.address = req.body.address !== undefined ? req.body.address : user.address;
      user.measurements = req.body.measurements !== undefined ? req.body.measurements : user.measurements;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        picture: updatedUser.picture,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        address: updatedUser.address,
        measurements: updatedUser.measurements,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
