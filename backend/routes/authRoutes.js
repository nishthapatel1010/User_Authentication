const express = require('express');
const router = express.Router();
const { registerUser, loginUser, protectRoute } = require('../controllers/authController');

// Register and Login Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Route Example
router.get('/protected', protectRoute, (req, res) => {
  res.json({ message: 'Welcome to the protected route', user: req.user });
});

module.exports = router;
