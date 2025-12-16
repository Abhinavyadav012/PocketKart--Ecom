import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Sample product data
const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, description: 'Premium wireless headphones featuring active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for music lovers and professionals who demand the best sound quality.', category: 'Electronics', stock: 15, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop'] },
  { id: 2, name: 'Smart Watch Pro', price: 4999, description: 'Advanced smartwatch with health monitoring, GPS tracking, water resistance up to 50m, and a stunning AMOLED display. Stay connected and track your fitness goals.', category: 'Electronics', stock: 8, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop'] },
  { id: 3, name: 'Running Shoes', price: 3499, description: 'Lightweight running shoes engineered for performance. Features responsive cushioning, breathable mesh upper, and superior grip for all terrains.', category: 'Sports', stock: 20, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop'] },
  { id: 4, name: 'Backpack', price: 1299, description: 'Durable and stylish backpack with multiple compartments, padded laptop sleeve, and ergonomic straps. Perfect for work, travel, or everyday use.', category: 'Fashion', stock: 25, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop'] },
  { id: 5, name: 'Sunglasses', price: 1999, description: 'Premium polarized sunglasses with 100% UV protection. Lightweight titanium frame with scratch-resistant lenses.', category: 'Fashion', stock: 30, imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop'] },
  { id: 6, name: 'Camera Lens', price: 8999, description: 'Professional 50mm f/1.8 prime lens. Sharp optics, beautiful bokeh, and fast autofocus for stunning portraits and low-light photography.', category: 'Electronics', stock: 5, imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&h=600&fit=crop'] },
  { id: 7, name: 'Bluetooth Speaker', price: 2499, description: 'Portable Bluetooth speaker with 360° immersive sound, 12-hour battery life, and IPX7 waterproof rating. Take your music anywhere.', category: 'Electronics', stock: 18, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop'] },
  { id: 8, name: 'Leather Wallet', price: 899, description: 'Handcrafted genuine leather wallet with RFID blocking technology. Features multiple card slots, bill compartment, and coin pocket.', category: 'Fashion', stock: 40, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop', images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop'] },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = sampleProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '60px', marginBottom: '15px' }}>😕</span>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>Product Not Found</h1>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>The product you're looking for doesn't exist.</p>
        <Link to="/shop" style={{ background: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    });
    navigate('/checkout');
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '30px' }}>
        <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</Link>
        <span style={{ color: '#9ca3af' }}>›</span>
        <Link to="/shop" style={{ color: '#6b7280', textDecoration: 'none' }}>Shop</Link>
        <span style={{ color: '#9ca3af' }}>›</span>
        <span style={{ color: '#1f2937', fontWeight: '500' }}>{product.name}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
        {/* Image Section */}
        <div>
          <div style={{ background: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            />
          </div>
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: selectedImage === index ? '3px solid #667eea' : '3px solid transparent',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Category Badge */}
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600',
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '15px'
          }}>
            {product.category}
          </span>

          {/* Title */}
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginBottom: '15px', lineHeight: '1.2' }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ color: '#fbbf24', fontSize: '18px' }}>★★★★★</div>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>(128 reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontSize: '36px', fontWeight: '800', color: '#667eea' }}>
              ₹{product.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '20px', color: '#9ca3af', textDecoration: 'line-through' }}>
              ₹{Math.round(product.price * 1.2).toLocaleString()}
            </span>
            <span style={{
              background: '#dcfce7',
              color: '#16a34a',
              fontSize: '13px',
              fontWeight: '700',
              padding: '5px 12px',
              borderRadius: '8px'
            }}>
              20% OFF
            </span>
          </div>

          {/* Description */}
          <p style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '25px', fontSize: '15px' }}>
            {product.description}
          </p>

          {/* Stock Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            {product.stock > 0 ? (
              <>
                <span style={{ width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%' }}></span>
                <span style={{ color: '#16a34a', fontWeight: '600' }}>In Stock ({product.stock} available)</span>
              </>
            ) : (
              <>
                <span style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%' }}></span>
                <span style={{ color: '#dc2626', fontWeight: '600' }}>Out of Stock</span>
              </>
            )}
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
            <span style={{ color: '#374151', fontWeight: '600' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
              <button
                onClick={decreaseQty}
                disabled={quantity <= 1}
                style={{
                  width: '50px',
                  height: '50px',
                  border: 'none',
                  background: 'white',
                  fontSize: '20px',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  opacity: quantity <= 1 ? 0.5 : 1
                }}
              >−</button>
              <span style={{ width: '60px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', borderLeft: '2px solid #e5e7eb', borderRight: '2px solid #e5e7eb' }}>
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                disabled={quantity >= product.stock}
                style={{
                  width: '50px',
                  height: '50px',
                  border: 'none',
                  background: 'white',
                  fontSize: '20px',
                  cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                  opacity: quantity >= product.stock ? 0.5 : 1
                }}
              >+</button>
            </div>
          </div>

          {/* Action Buttons - Updated */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '18px 30px',
                borderRadius: '15px',
                border: 'none',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: addedToCart ? '#22c55e' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
              }}
            >
              {addedToCart ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="btn-secondary"
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '18px 30px',
                borderRadius: '15px',
                border: 'none',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                color: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Buy Now
            </button>
          </div>

          {/* Features - Updated */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            padding: '25px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '20px'
          }}>
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'Orders over ₹999' },
              { icon: '🔄', title: 'Easy Returns', desc: '30-day policy' },
              { icon: '🛡️', title: 'Warranty', desc: '1 year covered' },
              { icon: '💳', title: 'Secure Payment', desc: '100% protected' },
            ].map((feature) => (
              <div 
                key={feature.title} 
                className="feature-card"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                <span className="feature-icon" style={{ fontSize: '28px' }}>{feature.icon}</span>
                <div>
                  <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{feature.title}</p>
                  <p style={{ color: '#6b7280', fontSize: '12px' }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section - Updated */}
      <section style={{ marginTop: '60px' }}>
        <div style={{ marginBottom: '30px' }}>
          <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Related</span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginTop: '8px' }}>You May Also Like</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {sampleProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link 
                key={p.id} 
                to={`/product/${p.id}`}
                className="product-card"
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  display: 'block'
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img 
                    src={p.imageUrl} 
                    alt={p.name} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <h3 
                    className="product-title"
                    style={{ 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      fontSize: '15px', 
                      marginBottom: '8px', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      transition: 'color 0.3s ease'
                    }}
                  >{p.name}</h3>
                  <p style={{ color: '#667eea', fontWeight: '700', fontSize: '18px' }}>₹{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
