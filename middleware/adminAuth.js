const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    // req.user is populated by the first auth middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'No user token, authorization denied' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Administrative privileges required' });
    }

    next();
  } catch (err) {
    console.error('AdminAuth middleware error:', err.message);
    res.status(500).send('Server Error');
  }
};
