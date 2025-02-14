require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create password hash
    const saltRounds = 16;
    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      saltRounds
    );

    const adminUser = new User({
      username: 'admin',
      email: process.env.ADMIN_EMAIL,
      passwordHash, // Use passwordHash instead of password
      isAdmin: true,
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
