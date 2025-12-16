import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const featuredProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, originalPrice: 3999, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', badge: 'Best Seller' },
  { id: 2, name: 'Smart Watch Pro', price: 4999, originalPrice: 5999, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', badge: 'New' },
  { id: 3, name: 'Running Shoes', price: 3499, originalPrice: 4499, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', badge: 'Trending' },
  { id: 4, name: 'Backpack', price: 1299, originalPrice: 1799, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', badge: 'Sale' },
];

const categories = [
  { name: 'Electronics', icon: '📱', count: '120+ Products', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Fashion', icon: '👗', count: '200+ Products', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Home & Living', icon: '🏠', count: '80+ Products', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Sports', icon: '⚽', count: '60+ Products', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
];

const testimonials = [
  { name: 'Rahul Sharma', role: 'Verified Buyer', text: 'Amazing quality products! Fast delivery and excellent customer service. Highly recommended!', avatar: '👨‍💼', rating: 5 },
  { name: 'Priya Patel', role: 'Verified Buyer', text: 'Love shopping here. The prices are great and the products always exceed my expectations.', avatar: '👩‍💻', rating: 5 },
  { name: 'Amit Kumar', role: 'Verified Buyer', text: 'Best e-commerce experience ever. The UI is smooth and checkout is super easy!', avatar: '👨‍🎨', rating: 5 },
];

const stats = [
  {
    number: '50K+',
    label: 'Happy Customers',
    background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
    accent: '#4338ca'
  },
  {
    number: '10K+',
    label: 'Products',
    background: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
    accent: '#048ba8'
  },
  {
    number: '99%',
    label: 'Satisfaction',
    background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    accent: '#f97316'
  },
  {
    number: '24/7',
    label: 'Support',
    background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    accent: '#db2777'
  }
];

const features = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    desc: 'On orders above ₹999',
    color: '#10b981',
    background: 'linear-gradient(135deg, #d1fae5 0%, #bbf7d0 100%)'
  },
  {
    icon: '🔄',
    title: 'Easy Returns',
    desc: '30-day return policy',
    color: '#f59e0b',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    desc: '100% secure checkout',
    color: '#6366f1',
    background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
  },
  {
    icon: '💬',
    title: '24/7 Support',
    desc: 'Dedicated support team',
    color: '#ec4899',
    background: 'linear-gradient(135deg, #fbcfe8 0%, #f5d0fe 100%)'
  }
];

const timerData = [
  { value: '02', label: 'Days' },
  { value: '18', label: 'Hours' },
  { value: '45', label: 'Mins' },
  { value: '30', label: 'Secs' },
];

const Home = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        borderRadius: '30px',
        padding: '60px 40px',
        marginBottom: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{ position: 'relative', maxWidth: '600px' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: '8px 20px',
            borderRadius: '30px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '20px'
          }}>
            ✨ New Collection 2025
          </span>
          
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: '800',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '20px'
          }}>
            Discover Your<br />
            <span style={{ 
              background: 'linear-gradient(to right, #fff, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Perfect Style</span>
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.7',
            marginBottom: '30px'
          }}>
            Explore our curated collection of premium products. Quality meets affordability with exclusive deals.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'white',
              color: '#667eea',
              padding: '16px 32px',
              borderRadius: '15px',
              fontWeight: '700',
              fontSize: '16px',
              textDecoration: 'none',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s'
            }}>
              Shop Now <span>→</span>
            </Link>
            <a href="#featured" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '15px',
              fontWeight: '600',
              fontSize: '16px',
              textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.4)'
            }}>
              View Collection
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '60px'
      }}>
        {stats.map((stat) => (
          <div key={stat.label} className="hover-expand" style={{
            background: stat.background,
            padding: '25px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 40px var(--card-shadow)',
            color: '#1f2937'
          }}>
            <p style={{ fontSize: '32px', fontWeight: '800', color: stat.accent, marginBottom: '5px' }}>{stat.number}</p>
            <p style={{ fontSize: '14px', color: '#1f2937b3' }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '60px'
      }}>
        {features.map((item) => (
          <div key={item.title} className="hover-expand" style={{
            background: item.background,
            padding: '30px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 40px var(--card-shadow)',
            cursor: 'pointer',
            color: '#1f2937'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              background: `${item.color}20`,
              borderRadius: '20px',
              fontSize: '32px',
              marginBottom: '15px'
            }}>{item.icon}</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: '#1f2937b3' }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Categories</span>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1f2937', marginTop: '10px' }}>Shop by Category</h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {categories.map((cat) => (
            <Link key={cat.name} to="/shop" className="hover-expand" style={{
              background: cat.gradient,
              padding: '40px 30px',
              borderRadius: '25px',
              textDecoration: 'none',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <span style={{ fontSize: '50px', display: 'block', marginBottom: '15px' }}>{cat.icon}</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '5px' }}>{cat.name}</h3>
              <p style={{ fontSize: '13px', opacity: '0.9' }}>{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Featured</span>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1f2937', marginTop: '10px' }}>Popular Products</h2>
          </div>
          <Link to="/shop" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#667eea',
            fontWeight: '600',
            textDecoration: 'none',
            padding: '12px 24px',
            border: '2px solid #667eea',
            borderRadius: '12px'
          }}>
            View All <span>→</span>
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="hover-expand" style={{
              background: 'var(--card-bg)',
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px var(--card-shadow)',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: product.badge === 'Sale' ? '#ef4444' : product.badge === 'New' ? '#10b981' : '#667eea',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                zIndex: 10
              }}>{product.badge}</span>
              
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ overflow: 'hidden' }}>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                  />
                </div>
              </Link>
              
              <div style={{ padding: '20px', color: 'var(--card-text)' }}>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: 'var(--card-text)' }}>{product.name}</h3>
                </Link>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
                  <span style={{ color: '#fbbf24' }}>★★★★★</span>
                  <span style={{ fontSize: '13px', color: 'var(--muted-text)' }}>(128)</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '22px', fontWeight: '700', color: '#667eea' }}>₹{product.price.toLocaleString()}</span>
                    <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '8px' }}>₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="hover:bg-blue-700 hover:scale-110 transition-all duration-300"
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      width: '45px',
                      height: '45px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}
                  >🛒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        borderRadius: '30px',
        padding: '50px',
        marginBottom: '60px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: '0.3'
        }}></div>
        
        <div style={{ position: 'relative' }}>
          <span style={{
            display: 'inline-block',
            background: '#ef4444',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>LIMITED TIME OFFER</span>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: 'white', marginBottom: '15px', lineHeight: '1.2' }}>
            Get <span style={{ color: '#fbbf24' }}>50% OFF</span> on Premium Headphones
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '25px' }}>
            Don't miss this exclusive deal. Limited stock available!
          </p>
          <Link to="/product/1" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(to right, #667eea, #764ba2)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '15px',
            fontWeight: '700',
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}>
            Shop Now <span>→</span>
          </Link>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px'
          }}>
            {timerData.map((time) => (
              <div key={time.label} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '20px',
                borderRadius: '15px',
                minWidth: '70px'
              }}>
                <p style={{ fontSize: '32px', fontWeight: '800', color: 'white' }}>{time.value}</p>
                <p style={{ color: '#9ca3af', fontSize: '12px' }}>{time.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Testimonials</span>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1f2937', marginTop: '10px' }}>What Our Customers Say</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="hover-expand" style={{
              background: 'var(--card-bg)',
              padding: '30px',
              borderRadius: '25px',
              boxShadow: '0 10px 40px var(--card-shadow)',
              color: 'var(--card-text)'
            }}>
              <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '20px' }}>★</span>
                ))}
              </div>
              <p style={{ color: 'var(--muted-text)', lineHeight: '1.7', marginBottom: '25px', fontSize: '15px' }}>
                "{testimonial.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>{testimonial.avatar}</span>
                <div>
                  <p style={{ fontWeight: '700', color: '#1f2937' }}>{testimonial.name}</p>
                  <p style={{ color: '#9ca3af', fontSize: '13px' }}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '30px',
        padding: '60px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '400px',
          height: '400px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>
            Get 20% Off Your First Order
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '30px', maxWidth: '500px', marginInline: 'auto' }}>
            Subscribe to our newsletter and receive exclusive discounts and early access to new arrivals.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            maxWidth: '450px',
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                flex: '1',
                minWidth: '250px',
                padding: '18px 24px',
                borderRadius: '15px',
                border: 'none',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <button style={{
              background: '#1f2937',
              color: 'white',
              padding: '18px 35px',
              borderRadius: '15px',
              border: 'none',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
