const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/token');

const register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const saltRounds = 16;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ username, email, passwordHash });
    await user.save();

    const tokens = generateTokens(user);
    res.status(201).json({ user, ...tokens });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid)
      return res.status(401).json({ error: 'Invalid credentials' });

    const tokens = generateTokens(user);
    res.json({ user, ...tokens });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'Token missing' });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
