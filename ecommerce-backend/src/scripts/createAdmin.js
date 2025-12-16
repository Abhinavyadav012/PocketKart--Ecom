const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@pocketkart.com' });
    
    if (adminExists) {
      console.log('Admin already exists!');
      console.log('Email: admin@pocketkart.com');
      process.exit(0);
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@pocketkart.com',
      password: 'admin123',
      roles: ['user', 'admin']
    });

    console.log('✅ Admin created successfully!');
    console.log('Email: admin@pocketkart.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
