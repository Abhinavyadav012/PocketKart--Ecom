import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const shipping = cartTotal > 999 ? 0 : 99;
  const total = cartTotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <span style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</span>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginBottom: '10px' }}>Your Cart is Empty</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px', maxWidth: '400px' }}>Looks like you haven't added anything to your cart yet. Start shopping to fill it up!</p>
        <Link 
          to="/shop" 
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '16px',
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <p style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Your Cart</p>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginTop: '8px' }}>Shopping Cart</h1>
          <p style={{ color: '#6b7280', marginTop: '5px' }}>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <button
          onClick={clearCart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#fef2f2',
            color: '#dc2626',
            border: '2px solid #fecaca',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🗑️ Clear Cart
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {cartItems.map((item) => (
              <div 
                key={item.productId} 
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center'
                }}
              >
                {/* Product Image - Smaller */}
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '12px',
                    flexShrink: 0
                  }}
                />

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <Link 
                    to={`/product/${item.productId}`}
                    style={{ 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      fontSize: '16px',
                      textDecoration: 'none'
                    }}
                  >
                    {item.name}
                  </Link>
                  <p style={{ color: '#667eea', fontWeight: '700', fontSize: '18px', marginTop: '5px' }}>
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      background: 'white',
                      fontSize: '18px',
                      cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                      opacity: item.quantity <= 1 ? 0.5 : 1
                    }}
                  >
                    −
                  </button>
                  <span style={{ 
                    width: '40px', 
                    textAlign: 'center', 
                    fontWeight: '600',
                    borderLeft: '2px solid #e5e7eb',
                    borderRight: '2px solid #e5e7eb',
                    padding: '8px 0'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      background: 'white',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <p style={{ fontWeight: '700', color: '#1f2937', fontSize: '18px' }}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  style={{
                    background: '#fef2f2',
                    color: '#dc2626',
                    border: 'none',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link 
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#667eea',
                fontWeight: '600',
                textDecoration: 'none',
                marginTop: '10px'
              }}
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #e5e7eb' }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                <span>Subtotal ({cartItems.length} items)</span>
                <span style={{ fontWeight: '600' }}>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                <span>Shipping</span>
                <span style={{ fontWeight: '600', color: shipping === 0 ? '#16a34a' : '#6b7280' }}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: '13px', color: '#667eea', background: '#f0f4ff', padding: '10px', borderRadius: '8px' }}>
                  💡 Add ₹{(1000 - cartTotal).toLocaleString()} more for free shipping!
                </p>
              )}
            </div>

            {/* Coupon Code */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e5e7eb' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Coupon code"
                  style={{
                    flex: 1,
                    padding: '12px 15px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button style={{
                  padding: '12px 20px',
                  background: '#1f2937',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Apply
                </button>
              </div>
            </div>

            {/* Grand Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>Grand Total</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#667eea' }}>₹{total.toLocaleString()}</span>
            </div>

            {/* Checkout Button */}
            <Link 
              to="/checkout"
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
              }}
            >
              Proceed to Checkout →
            </Link>

            {/* Trust Badges */}
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '20px' }}>🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '20px' }}>🚚</span>
                  <span>Fast Delivery</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '20px' }}>🔄</span>
                  <span>Easy Returns</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '20px' }}>💳</span>
                  <span>Safe Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
