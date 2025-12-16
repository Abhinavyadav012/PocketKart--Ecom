import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'linear-gradient(to right, #0f172a, #1e293b)', color: 'white', marginTop: '60px' }}>
      {/* Newsletter Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>Get 20% Off Your First Order</h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '25px', maxWidth: '500px', margin: '0 auto 25px' }}>
          Subscribe to our newsletter and receive exclusive discounts and early access to new arrivals.
        </p>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '450px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{ flex: '1', minWidth: '250px', padding: '16px 20px', borderRadius: '12px', border: 'none', fontSize: '15px', outline: 'none' }}
          />
          <button style={{ background: '#1f2937', color: 'white', padding: '16px 30px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>
              <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '10px', borderRadius: '10px' }}>🛒</span>
              PocketKart
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>
              Your premium destination for quality products at unbeatable prices.
            </p>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {/* Facebook */}
              <a 
                href="https://facebook.com/pocketkart" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#1877f2',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)'
                }}
                title="Facebook"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://instagram.com/pocketkart" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(225, 48, 108, 0.4)'
                }}
                title="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              
              {/* Gmail/Email */}
              <a 
                href="mailto:abhinav3463@gmail.com" 
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#ea4335',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(234, 67, 53, 0.4)'
                }}
                title="Email Us"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
              
              {/* WhatsApp/Phone */}
              <a 
                href="https://wa.me/919140106996" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '44px',
                  height: '44px',
                  background: '#25d366',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
                }}
                title="WhatsApp"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Shop All</Link>
              <Link to="/cart" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>My Cart</Link>
              <Link to="/profile" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>My Account</Link>
              <Link to="/shop" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Track Order</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>Customer Service</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Us</Link>
              <Link to="/faq" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>FAQs</Link>
              <Link to="/shipping" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Shipping Policy</Link>
              <Link to="/returns" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Returns & Refunds</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="mailto:abhinav3463@gmail.com" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '36px', height: '36px', background: 'rgba(234, 67, 53, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" fill="#ea4335" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </span>
                abhinav3463@gmail.com
              </a>
              <a href="tel:+919140106996" style={{ color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '36px', height: '36px', background: 'rgba(37, 211, 102, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" fill="#25d366" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </span>
                +91 9140106996
              </a>
              <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ width: '36px', height: '36px', background: 'rgba(102, 126, 234, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" fill="#667eea" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </span>
                <span style={{ lineHeight: '1.5' }}>Tiyara, Badlapur, Jaunpur,<br/>Uttar Pradesh 222125</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #334155', padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
            © 2025 PocketKart. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
