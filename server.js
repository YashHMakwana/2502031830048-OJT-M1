require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ImageKit = require('imagekit');

const User = require('./models/User');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const Booking = require('./models/Booking');
const MenuItem = require('./models/MenuItem');
const auth = require('./middleware/auth');
const adminAuth = require('./middleware/adminAuth');

// Helper to optionally resolve user ID from authorization headers
const getOptionalUserId = (req) => {
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      return decoded.user.id;
    } catch (err) {
      // Silent catch: treat as guest if token is invalid or expired
    }
  }
  return null;
};

// Initialize ImageKit SDK client
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ''
});

const app = express();

// Middlewares
app.use(cors());
// Set higher body payload limits for base64 image transmissions
app.use(express.json({ limit: '10mb' }));

// Database Connection & Auto Seeding
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yashHotel';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Successfully connected to MongoDB.');
    await seedDatabase();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    console.log('Ensure MongoDB server is running or set a valid MONGO_URI in .env');
  });

// Seeding Script
async function seedDatabase() {
  try {
    // 1. Seed default Admin account
    const adminEmail = 'admin@rangilukathiyawad.com';
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('adminpassword123', 10);
      adminUser = new User({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('Default Admin user seeded: admin@rangilukathiyawad.com / adminpassword123');
    }

    // 1b. Seed/Ensure yashhmakwana@gmail.com admin account
    const yashEmail = 'yashhmakwana@gmail.com';
    let yashUser = await User.findOne({ email: yashEmail });
    if (!yashUser) {
      const hashedPassword = await bcrypt.hash('adminpassword123', 10);
      yashUser = new User({
        username: 'yashhmakwana',
        email: yashEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await yashUser.save();
      console.log('Admin user yashhmakwana@gmail.com seeded: adminpassword123');
    } else if (yashUser.role !== 'admin') {
      yashUser.role = 'admin';
      await yashUser.save();
      console.log('User yashhmakwana@gmail.com promoted to admin');
    }

    // 2. Seed initial delicacies Menu items
    const menuCount = await MenuItem.countDocuments();
    if (menuCount === 0) {
      const menuSeed = require('./seeds/menuSeed');
      await MenuItem.insertMany(menuSeed);
      console.log(`Successfully seeded ${menuSeed.length} default menu items to database.`);
    }
  } catch (err) {
    console.error('Database seeding failed:', err.message);
  }
}

// --- AUTHENTICATION ROUTES ---

// @route   POST /api/auth/register
// @desc    Register a new user
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ msg: 'User with this email or username already exists' });
    }

    const role = (email === 'yashhmakwana@gmail.com' || email === 'admin@rangilukathiyawad.com') ? 'admin' : 'user';
    user = new User({ username, email, password, role });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Sign JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Sign JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile (protected)
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Me endpoint error:', err.message);
    res.status(500).send('Server Error');
  }
});

// --- CART ROUTING API ---

// @route   GET /api/cart
// @desc    Get active user's cart items (protected)
app.get('/api/cart', auth, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(cartItems);
  } catch (err) {
    console.error('Get cart error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart or increment quantity if existing (protected)
app.post('/api/cart/add', auth, async (req, res) => {
  const { itemId, name, price, image, quantity = 1 } = req.body;

  try {
    let cartItem = await CartItem.findOne({ userId: req.user.id, itemId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({
        userId: req.user.id,
        itemId,
        name,
        price,
        image,
        quantity
      });
      await cartItem.save();
    }

    const updatedCart = await CartItem.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(updatedCart);
  } catch (err) {
    console.error('Add cart item error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/cart/update
// @desc    Update a cart item's quantity directly (protected)
app.put('/api/cart/update', auth, async (req, res) => {
  const { itemId, quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ msg: 'Quantity must be at least 1' });
  }

  try {
    let cartItem = await CartItem.findOne({ userId: req.user.id, itemId });
    if (!cartItem) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const updatedCart = await CartItem.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(updatedCart);
  } catch (err) {
    console.error('Update cart item error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/cart/remove/:itemId
// @desc    Remove an item from cart (protected)
app.delete('/api/cart/remove/:itemId', auth, async (req, res) => {
  const { itemId } = req.params;

  try {
    const result = await CartItem.findOneAndDelete({ userId: req.user.id, itemId });
    if (!result) {
      return res.status(404).json({ msg: 'Cart item not found' });
    }

    const updatedCart = await CartItem.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(updatedCart);
  } catch (err) {
    console.error('Remove cart item error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear active user's cart (protected)
app.delete('/api/cart/clear', auth, async (req, res) => {
  try {
    await CartItem.deleteMany({ userId: req.user.id });
    res.json({ msg: 'Cart cleared successfully' });
  } catch (err) {
    console.error('Clear cart error:', err.message);
    res.status(500).send('Server Error');
  }
});

// --- ORDERS & BOOKINGS APIS ---

// @route   POST /api/orders
// @desc    Create a new order (Persists items, total pricing, token details and optional userId relationship)
app.post('/api/orders', async (req, res) => {
  const { items, subtotal, tax, delivery, total, tokenId, estimatedPrepTime } = req.body;

  try {
    const userId = getOptionalUserId(req);

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      tax,
      delivery,
      total,
      tokenId,
      estimatedPrepTime
    });

    await newOrder.save();

    // Clean persistent Cart rows if auth session is verified
    if (userId) {
      await CartItem.deleteMany({ userId });
    }

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Create order error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/bookings
// @desc    Create table reservation / catering inquiry / feedback persisting details
app.post('/api/bookings', async (req, res) => {
  const { name, mobile, bookingType, details } = req.body;

  try {
    const userId = getOptionalUserId(req);

    const newBooking = new Booking({
      userId,
      name,
      mobile,
      bookingType,
      details
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Create booking error:', err.message);
    res.status(500).send('Server Error');
  }
});

// --- MENU & ADMIN ROUTING APIS ---

// @route   GET /api/menu
// @desc    Retrieve all delicacies menu items
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    const categoryOrder = {
      'breakfast': 1,
      'starters': 2,
      'shaak': 3,
      'rotla': 4,
      'rice': 5,
      'sweets': 6,
      'sides': 7
    };
    items.sort((a, b) => {
      const orderA = categoryOrder[a.category] || 99;
      const orderB = categoryOrder[b.category] || 99;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
    });
    res.json(items);
  } catch (err) {
    console.error('Fetch menu items error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/admin/upload
// @desc    Upload an image base64 stream directly to ImageKit (No Multer)
app.post('/api/admin/upload', auth, adminAuth, async (req, res) => {
  const { image, fileName } = req.body;

  if (!image || !fileName) {
    return res.status(400).json({ msg: 'Image base64 data and fileName are required' });
  }

  try {
    const uploadResponse = await imagekit.upload({
      file: image, // Base64 representation of file
      fileName: fileName
    });
    res.json({ url: uploadResponse.url });
  } catch (err) {
    console.error('ImageKit upload error:', err.message);
    res.status(500).json({ msg: 'Image upload failed', error: err.message });
  }
});

// @route   POST /api/admin/menu
// @desc    Create a new menu item
app.post('/api/admin/menu', auth, adminAuth, async (req, res) => {
  const { id, name, category, price, image, description } = req.body;

  try {
    let existingItem = await MenuItem.findOne({ id });
    if (existingItem) {
      return res.status(400).json({ msg: 'Menu item with this ID already exists' });
    }

    const newItem = new MenuItem({
      id,
      name,
      category,
      price,
      image,
      description
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Create menu item error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/menu/:id
// @desc    Update an existing menu item
app.put('/api/admin/menu/:id', auth, adminAuth, async (req, res) => {
  const { name, category, price, image, description } = req.body;

  try {
    let item = await MenuItem.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }

    item.name = name || item.name;
    item.category = category || item.category;
    item.price = price !== undefined ? price : item.price;
    item.image = image || item.image;
    item.description = description || item.description;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error('Update menu item error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/admin/menu/:id
// @desc    Delete a menu item
app.delete('/api/admin/menu/:id', auth, adminAuth, async (req, res) => {
  try {
    const item = await MenuItem.findOneAndDelete({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }
    res.json({ msg: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Delete menu item error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders (Admin protected)
app.get('/api/admin/orders', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Get all orders error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/admin/bookings
// @desc    Get all table/catering bookings (Admin protected)
app.get('/api/admin/bookings', auth, adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Get all bookings error:', err.message);
    res.status(500).send('Server Error');
  }
});

// --- STATIC STATIC CONTENT & FRONTEND ROUTE ---
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for SPA route triggers
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Rangilu Kathiyawad server is running on http://localhost:${PORT}`);
});
