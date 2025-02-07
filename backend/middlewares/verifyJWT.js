const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Unauthorized - No token provided',
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find user and attach to request
    const user = await User.findById(decoded.id).select(
      '-passwordHash -refreshToken'
    );

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized - User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Unauthorized - Token expired',
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Unauthorized - Invalid token',
      });
    }
    return res.status(403).json({
      message: 'Forbidden - Invalid authorization',
    });
  }
};

module.exports = verifyJWT;
