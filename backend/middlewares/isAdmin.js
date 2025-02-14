const isAdmin = async (req, res, next) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = isAdmin;
