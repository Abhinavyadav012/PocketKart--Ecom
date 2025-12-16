import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const categories = ['Electronics', 'Fashion', 'Sports', 'Home & Living'];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${searchTerm}`);
    }
  };

  const glassBackground = theme === 'light' ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.1)';
  const menuBorder = theme === 'light' ? 'rgba(15,23,42,0.12)' : 'rgba(148,163,184,0.25)';
  const searchBackground = theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.5)';

  return (
    <header
      style={{
        background: 'var(--header-bg)',
        color: 'var(--header-text)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 24px rgba(15,23,42,0.35)',
        transition: 'background 0.3s ease, color 0.3s ease'
      }}
    >
      <nav style={{
        width: '100%',
        padding: '0 30px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '70px',
          gap: '20px'
        }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--header-text)',
            fontSize: '22px',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '18px'
            }}>🛒</span>
            <span>PocketKart</span>
          </Link>

          <div
            style={{ position: 'relative', flexShrink: 0 }}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: glassBackground,
              border: `1px solid ${menuBorder}`,
              color: 'var(--header-text)',
              padding: '10px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              transform: showCategories ? 'scale(1.05)' : 'scale(1)'
            }}>
              <span>☰</span> Categories
            </button>

            {showCategories && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: 'var(--card-bg)',
                color: 'var(--card-text)',
                borderRadius: '12px',
                boxShadow: '0 12px 40px rgba(15,23,42,0.35)',
                padding: '10px 0',
                minWidth: '190px',
                zIndex: 100,
                border: `1px solid ${menuBorder}`
              }}>
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/shop?category=${cat}`}
                    style={{
                      display: 'block',
                      padding: '12px 20px',
                      color: 'inherit',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme === 'light'
                        ? 'rgba(15,23,42,0.06)'
                        : 'rgba(148,163,184,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSearch} style={{
            flex: 1,
            maxWidth: '400px',
            display: 'flex'
          }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                borderRadius: '10px 0 0 10px',
                fontSize: '14px',
                outline: 'none',
                background: searchBackground,
                color: theme === 'light' ? '#0f172a' : '#f8fafc'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: '#ffffff',
                padding: '12px 18px',
                borderRadius: '0 10px 10px 0',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🔍
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexShrink: 0
          }}>
            <NavLink to="/" style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#93c5fd' : 'var(--header-text)',
              fontWeight: isActive ? 600 : 400,
              fontSize: '14px',
              transition: 'color 0.2s ease'
            })}>
              Home
            </NavLink>
            <NavLink to="/shop" style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#93c5fd' : 'var(--header-text)',
              fontWeight: isActive ? 600 : 400,
              fontSize: '14px',
              transition: 'color 0.2s ease'
            })}>
              Shop
            </NavLink>
            <NavLink to="/cart" style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? '#93c5fd' : 'var(--header-text)',
              fontWeight: isActive ? 600 : 400,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '14px',
              transition: 'color 0.2s ease'
            })}>
              🛒
              {cartCount > 0 && (
                <span style={{
                  background: '#ef4444',
                  fontSize: '11px',
                  padding: '2px 7px',
                  borderRadius: '20px',
                  fontWeight: 600,
                  color: '#ffffff'
                }}>{cartCount}</span>
              )}
            </NavLink>

            <button
              onClick={toggleTheme}
              style={{
                background: glassBackground,
                border: `1px solid ${menuBorder}`,
                color: 'var(--header-text)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                transition: 'transform 0.2s ease, background 0.2s ease'
              }}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <NavLink
              to="/login"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#ffffff',
                padding: '10px 20px',
                borderRadius: '10px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 6px 18px rgba(102, 126, 234, 0.35)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Login
            </NavLink>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--header-text)',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{
            padding: '20px 0',
            borderTop: `1px solid ${menuBorder}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '10px 0 0 10px',
                  fontSize: '14px',
                  outline: 'none',
                  background: searchBackground,
                  color: theme === 'light' ? '#0f172a' : '#f8fafc'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '0 10px 10px 0',
                  cursor: 'pointer'
                }}
              >
                🔍
              </button>
            </form>

            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--header-text)', textDecoration: 'none', padding: '10px' }}>Home</NavLink>
            <NavLink to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--header-text)', textDecoration: 'none', padding: '10px' }}>Shop</NavLink>

            <div style={{ padding: '10px', color: 'var(--muted-text)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>Categories</div>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${cat}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--header-text)', textDecoration: 'none', padding: '10px 20px' }}
              >
                {cat}
              </Link>
            ))}

            <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--header-text)', textDecoration: 'none', padding: '10px' }}>🛒 Cart {cartCount > 0 && `(${cartCount})`}</NavLink>
            <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--header-text)', textDecoration: 'none', padding: '10px' }}>Profile</NavLink>
            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff', textDecoration: 'none', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>Login</NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
