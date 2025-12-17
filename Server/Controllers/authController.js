import User from '../Models/User.js';
import { generateToken } from '../utils/jwt.js';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * SIGNUP
 */
export const signup = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number already registered',
      });
    }

    // Validate phone number
    const phoneNumber = parsePhoneNumberFromString(phone);
    if (!phoneNumber || !phoneNumber.isValid()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format',
      });
    }

    // Create user
    const user = await User.create({
      email: normalizedEmail,
      phone: phoneNumber.number,
      password, // hashed in pre-save hook
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup',
    });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

/**
 * GET CURRENT USER
 */
export const me = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/**
 * LOGOUT
 */
export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
