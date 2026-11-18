const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'fingerscope_forensic_jwt_secret_key_2026';

// Helper to generate JWT token
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required. Please log in.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = decoded;
    next();
  });
}

// 1. Register with Email & Password
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, organization, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      organization: organization || 'Forensic Science Division',
      role: role || 'Forensic Investigator',
    });

    await newUser.save();
    const token = generateToken(newUser);

    const userObj = newUser.toObject();
    delete userObj.password;

    res.status(201).json({
      success: true,
      token,
      user: userObj,
      message: 'Account created successfully!',
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ error: 'Server error during registration: ' + err.message });
  }
});

// 2. Login with Email & Password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (!user.password) {
      return res.status(400).json({
        error: 'This account was created with Google. Please use Google Sign-In.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      token,
      user: userObj,
      message: 'Welcome back, ' + user.name + '!',
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error during login: ' + err.message });
  }
});

// 3. Google Sign-In / Sign-Up
router.post('/google', async (req, res) => {
  try {
    const { email, name, googleId, picture } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required for Google authentication.' });
    }

    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      // Create new user via Google
      user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        googleId: googleId || '',
        avatar: picture || '',
        organization: 'Independent Forensic Analyst',
        role: 'Forensic Investigator',
      });
      await user.save();
    } else {
      // Update existing user with google info if not set
      if (!user.googleId && googleId) user.googleId = googleId;
      if (!user.avatar && picture) user.avatar = picture;
      await user.save();
    }

    const token = generateToken(user);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      token,
      user: userObj,
      message: 'Signed in with Google successfully!',
    });
  } catch (err) {
    console.error('Google Auth error:', err.message);
    res.status(500).json({ error: 'Google sign-in error: ' + err.message });
  }
});

// 4. Get Current User Profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Update Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, organization, role, avatar } = req.body;
    const updates = {};
    if (name) updates.name = name.trim();
    if (organization) updates.organization = organization.trim();
    if (role) updates.role = role.trim();
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user.id, { $set: updates }, { new: true }).select('-password');
    res.json({ success: true, user, message: 'Profile updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Record Quiz Score
router.post('/quiz-result', authenticateToken, async (req, res) => {
  try {
    const { score, total, percentage } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: 'User not found.' });

    const currentStats = user.quizStats || {
      testsCompleted: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      highestPercentage: 0,
    };

    currentStats.testsCompleted = (currentStats.testsCompleted || 0) + 1;
    currentStats.totalQuestionsAnswered = (currentStats.totalQuestionsAnswered || 0) + (total || 0);
    currentStats.correctAnswers = (currentStats.correctAnswers || 0) + (score || 0);
    currentStats.highestPercentage = Math.max(currentStats.highestPercentage || 0, percentage || 0);
    currentStats.lastTestedAt = new Date();

    user.quizStats = currentStats;
    await user.save();

    res.json({ success: true, quizStats: user.quizStats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
