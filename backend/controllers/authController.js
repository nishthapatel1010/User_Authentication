const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    console.log(req.body); // Debugging: Logs the request body
  
    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Check if the user already exists by email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
  
      // Generate a JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send response
      res.status(201).json({
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare the entered password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return success response with token and user info
      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        message:"login successful"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' }); // Catch any server errors
    }
  };

// Protect Route Middleware
exports.protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
