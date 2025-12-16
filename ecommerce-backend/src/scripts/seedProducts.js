const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const products = [
  // Electronics
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling with two processors controlling 8 microphones for unprecedented noise cancellation. With Auto NC Optimizer, noise canceling is automatically optimized based on your wearing conditions and environment.',
    price: 29990,
    originalPrice: 34990,
    category: 'Electronics',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    rating: 5
  },
  {
    name: 'Apple MacBook Air M2',
    description: 'Strikingly thin and fast. Redesigned around the next-generation M2 chip, MacBook Air is strikingly thin and brings exceptional speed and power efficiency within its durable all-aluminum enclosure.',
    price: 114900,
    originalPrice: 119900,
    category: 'Electronics',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
    rating: 5
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Create crystal-clear content worth sharing with the 200MP camera. Nightography captures epic details even in the dark.',
    price: 124999,
    originalPrice: 149999,
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1610945265078-38584e10a487?w=800&q=80',
    rating: 4.8
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Meet MX Master 3S – an iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance.',
    price: 9995,
    originalPrice: 10995,
    category: 'Electronics',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    rating: 4.9
  },
  {
    name: 'Canon EOS R6 Mark II',
    description: 'Capture fleeting moments in time with up to 40 fps continuous shooting, and record 6K RAW video to an external recorder.',
    price: 215995,
    originalPrice: 245995,
    category: 'Electronics',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    rating: 4.7
  },

  // Fashion
  {
    name: 'Nike Air Jordan 1 High',
    description: 'Familiar but always fresh, the iconic Air Jordan 1 is remastered for today\'s sneakerhead culture. This Retro High OG version goes all in with premium leather.',
    price: 16995,
    originalPrice: 18995,
    category: 'Fashion',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    rating: 4.9
  },
  {
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    description: 'A modern slim with room to move, the 511 Slim Fit Jeans are a classic since right now. These jeans sit below the waist with a slim fit from hip to ankle.',
    price: 2499,
    originalPrice: 3999,
    category: 'Fashion',
    stock: 150,
    imageUrl: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80',
    rating: 4.5
  },
  {
    name: 'Ray-Ban Aviator Classic',
    description: 'Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. Aviators in 1937.',
    price: 8590,
    originalPrice: 9590,
    category: 'Fashion',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    rating: 4.6
  },
  {
    name: 'Zara Oversized Trench Coat',
    description: 'Loose-fitting trench coat with a lapel collar and long sleeves. Adjustable tabs at the cuffs. Welt pockets at the hip.',
    price: 5990,
    originalPrice: 7990,
    category: 'Fashion',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    rating: 4.4
  },
  {
    name: 'Adidas Ultraboost Light',
    description: 'Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever. The magic lies in the Light BOOST midsole.',
    price: 13999,
    originalPrice: 15999,
    category: 'Fashion',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
    rating: 4.8
  },

  // Home & Living
  {
    name: 'Herman Miller Aeron Chair',
    description: 'The Aeron Chair combines a deep knowledge of human-centered design with cutting-edge technology. With over 7 million sold, it has been admired and recognized as a work of art.',
    price: 125000,
    originalPrice: 145000,
    category: 'Home & Living',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80',
    rating: 5
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    description: 'Dyson\'s most powerful, intelligent cordless vacuum. Laser reveals microscopic dust. Automatically adapts suction power.',
    price: 59900,
    originalPrice: 65900,
    category: 'Home & Living',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1558317374-a354d5f6d4da?w=800&q=80',
    rating: 4.9
  },
  {
    name: 'Philips Hue Smart Bulb Starter Kit',
    description: 'Add ambient color to any room with the Philips Hue White and Color Ambiance Starter Kit. Connect to the included Hue Bridge to take advantage of endless list of features.',
    price: 9999,
    originalPrice: 12999,
    category: 'Home & Living',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80',
    rating: 4.7
  },
  {
    name: 'Nespresso Vertuo Coffee Machine',
    description: 'Nespresso Vertuo offers a full range of coffee styles with its unique Centrifusion technology. Precision brewing for a perfect cup every time.',
    price: 18500,
    originalPrice: 21500,
    category: 'Home & Living',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
    rating: 4.8
  },
  {
    name: 'IKEA STRANDMON Wing Chair',
    description: 'Bringing new life to an old favorite. We first introduced this chair in the 1950s. Some 60 years later we brought it back into the range with the same craftsmanship.',
    price: 19990,
    originalPrice: 22990,
    category: 'Home & Living',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    rating: 4.6
  },

  // Sports
  {
    name: 'Yonex Astrox 99 Pro Badminton Racket',
    description: 'The Astrox 99 Pro is a head-heavy power racket, boasting the heaviest swing weight of the Astrox series. Known to generate a single powerful smash.',
    price: 14990,
    originalPrice: 18990,
    category: 'Sports',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-847649623db6?w=800&q=80',
    rating: 4.8
  },
  {
    name: 'Wilson NBA Official Game Ball',
    description: 'The official basketball of the NBA. This ball features the NBA Pro Seams and a pure leather cover for the ultimate grip and feel.',
    price: 12999,
    originalPrice: 14999,
    category: 'Sports',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-9200263931a2?w=800&q=80',
    rating: 4.9
  },
  {
    name: 'Fitbit Charge 6',
    description: 'Give your fitness routine a boost with Charge 6, the only tracker with Google built-in. Includes 6 months of Premium Membership.',
    price: 14999,
    originalPrice: 16999,
    category: 'Sports',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1576243345690-8e4b728a3fa3?w=800&q=80',
    rating: 4.5
  },
  {
    name: 'Decathlon Quechua Camping Tent',
    description: 'Our team of campers designed this Arpenaz 2 tent for two campers wanting a tent that is easy to pitch and take down.',
    price: 2999,
    originalPrice: 3999,
    category: 'Sports',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
    rating: 4.6
  },
  {
    name: 'Yoga Mat Premium 6mm',
    description: 'Extra thick 6mm yoga mat provides optimal comfort and cushioning for your knees and joints. Non-slip surface ensures stability.',
    price: 999,
    originalPrice: 1499,
    category: 'Sports',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    rating: 4.4
  },

  // New Arrivals
  {
    name: 'Nothing Ear (2) ANC Earbuds',
    description: 'Dual-chamber ANC earbuds with LHDC 5.0 support, personalized sound profiles, and crystal-clear voice pickup.',
    price: 11999,
    originalPrice: 12999,
    category: 'Electronics',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1614689045786-1c81cfc3b124?w=800&q=80',
    rating: 4.6
  },
  {
    name: 'Asus ROG Zephyrus G14 (2024)',
    description: '14-inch QHD+ gaming laptop powered by AMD Ryzen 9 and NVIDIA RTX 4070 graphics with 120Hz Nebula display.',
    price: 169990,
    originalPrice: 184990,
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-98927c532fa3?w=800&q=80',
    rating: 4.9
  },
  {
    name: 'Uniqlo Ultra Light Down Jacket',
    description: 'Featherlight warmth with premium down fill, packs into an included pouch for effortless travel layering.',
    price: 7990,
    originalPrice: 9990,
    category: 'Fashion',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1511556155321-2497c0b7b9b5?w=800&q=80',
    rating: 4.5
  },
  {
    name: 'Instant Pot Duo 7-in-1 Cooker',
    description: 'Multi-use pressure cooker replaces seven appliances with guided presets and stainless-steel inner pot.',
    price: 12499,
    originalPrice: 14999,
    category: 'Home & Living',
    stock: 65,
    imageUrl: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=800&q=80',
    rating: 4.8
  },
  {
    name: 'Garmin Forerunner 265 GPS Watch',
    description: 'AMOLED running smartwatch with training readiness, multi-band GPS accuracy, and music storage.',
    price: 44990,
    originalPrice: 48990,
    category: 'Sports',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1612810806695-30ba0bfe1251?w=800&q=80',
    rating: 4.7
  },
  {
    name: 'Sleepyhead 3-Layer Memory Foam Mattress',
    description: 'Orthopedic mattress with breathable comfort layer, memory foam cushioning, and supportive base foam.',
    price: 18999,
    originalPrice: 21999,
    category: 'Home & Living',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    rating: 4.6
  },
  {
    name: 'DJI Mini 4 Pro Drone',
    description: 'Sub-249g foldable drone with 4K/60fps HDR video, omnidirectional obstacle sensing, and 20km transmission range.',
    price: 139990,
    originalPrice: 149990,
    category: 'Electronics',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1504199367641-aba8151af406?w=800&q=80',
    rating: 4.8
  },
  {
    name: 'Lululemon Align High-Rise Leggings',
    description: 'Buttery-soft Nulu fabric leggings designed for yoga with weightless support and sweat-wicking comfort.',
    price: 9890,
    originalPrice: 10990,
    category: 'Fashion',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    rating: 4.7
  },
  {
    name: 'KitchenAid Artisan Stand Mixer',
    description: 'Iconic tilt-head mixer with 10 speeds, 300-watt motor, and 4.8L stainless steel bowl for versatile baking.',
    price: 29999,
    originalPrice: 33999,
    category: 'Home & Living',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800&q=80',
    rating: 4.9
  },
  {
    name: 'Specialized Sirrus X 4.0 Hybrid Bike',
    description: 'Fast and capable hybrid bike with Future Shock suspension, carbon fork, and 1x drivetrain for city and gravel rides.',
    price: 84990,
    originalPrice: 89990,
    category: 'Sports',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800&q=80',
    rating: 4.8
  },
  {
    name: 'Kindle Scribe 32GB Bundle',
    description: '10.2-inch glare-free Paperwhite display with Basic Pen, perfect for immersive reading and note taking.',
    price: 33999,
    originalPrice: 36999,
    category: 'Electronics',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
    rating: 4.6
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user to assign as seller
    const admin = await User.findOne({ email: 'admin@pocketkart.com' });
    
    if (!admin) {
      console.error('❌ Admin user not found. Please run createAdmin.js first.');
      process.exit(1);
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Add seller ID to products
    const productsWithSeller = products.map(product => ({
      ...product,
      seller: admin._id
    }));

    // Insert new products
    await Product.insertMany(productsWithSeller);
    console.log(`✅ Successfully added ${products.length} products across 4 categories!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedProducts();
