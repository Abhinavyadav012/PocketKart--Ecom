import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const allProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, originalPrice: 3999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', badge: 'Best Seller' },
  { id: 2, name: 'Smart Watch Pro', price: 4999, originalPrice: 5999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', badge: 'New' },
  { id: 3, name: 'Running Shoes', price: 3499, originalPrice: 4499, category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', badge: 'Trending' },
  { id: 4, name: 'Backpack', price: 1299, originalPrice: 1799, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', badge: 'Sale' },
  { id: 5, name: 'Sunglasses', price: 1999, originalPrice: 2499, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop', badge: '' },
  { id: 6, name: 'Camera Lens', price: 8999, originalPrice: 10999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=300&h=300&fit=crop', badge: 'Premium' },
  { id: 7, name: 'Bluetooth Speaker', price: 2499, originalPrice: 2999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', badge: '' },
  { id: 8, name: 'Leather Wallet', price: 899, originalPrice: 1299, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop', badge: 'Sale' },
];

const categories = ['All', 'Electronics', 'Fashion', 'Sports'];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [addedProducts, setAddedProducts] = useState({});
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    setAddedProducts({ ...addedProducts, [product.id]: true });
    setTimeout(() => {
      setAddedProducts({ ...addedProducts, [product.id]: false });
    }, 1500);
  };

  let filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '40px' }}>
        <span style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Our Collection</span>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1f2937', marginTop: '10px', marginBottom: '10px' }}>Shop All Products</h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Discover our curated collection of premium products</p>
      </div>

      {/* Filters Section */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '40px',
        padding: '25px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
      }}>
        {/* Search */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 20px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                background: selectedCategory === category ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                color: selectedCategory === category ? 'white' : '#4b5563',
                transition: 'all 0.2s'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '15px 20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            outline: 'none',
            cursor: 'pointer',
            background: 'white'
          }}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Products Count */}
      <p style={{ color: '#6b7280', marginBottom: '25px', fontSize: '15px' }}>
        Showing <strong style={{ color: '#1f2937' }}>{filteredProducts.length}</strong> products
      </p>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '25px'
        }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{
              background: 'white',
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              position: 'relative'
            }}>
              {product.badge && (
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
              )}

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

              <div style={{ padding: '20px' }}>
                <span style={{ color: '#667eea', fontSize: '12px', fontWeight: '600' }}>{product.category}</span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginTop: '8px', marginBottom: '10px' }}>{product.name}</h3>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
                  <span style={{ color: '#fbbf24' }}>★★★★★</span>
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>(128)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '22px', fontWeight: '700', color: '#667eea' }}>₹{product.price.toLocaleString()}</span>
                    <span style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '8px' }}>₹{product.originalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedProducts[product.id] ? '#22c55e' : '#667eea',
                      color: 'white',
                      border: 'none',
                      width: '45px',
                      height: '45px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                  >{addedProducts[product.id] ? '✓' : '🛒'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <span style={{ fontSize: '60px', display: 'block', marginBottom: '20px' }}>🔍</span>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>No Products Found</h3>
          <p style={{ color: '#6b7280' }}>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
