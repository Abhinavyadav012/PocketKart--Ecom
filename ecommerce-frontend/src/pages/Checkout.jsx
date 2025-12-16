import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const shipping = cartTotal > 999 ? 0 : 99;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <span style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</span>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginBottom: '10px' }}>Your Cart is Empty</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>Add items to cart before checkout.</p>
        <Link to="/shop" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '16px 40px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none' }}>
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Checkout</p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginTop: '8px' }}>Complete Your Order</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Form Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Shipping Info */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#667eea', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>1</span>
                Shipping Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>Full Name</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>Address</label>
                  <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" placeholder="House No., Street, Landmark" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}></textarea>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Mumbai" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="Maharashtra" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '6px', fontSize: '14px' }}>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="400001" style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ background: '#667eea', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>2</span>
                Payment Method
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/*
                  { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                  { id: 'upi', label: 'UPI', icon: '📱' },
                  { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
                  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleChange}
                      className="w-5 h-5 text-purple-600"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium text-gray-800">{method.label}</span>
                  </label>
                ))}
                */}
                <label
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: formData.paymentMethod === 'card' ? '2px solid #667eea' : '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', background: formData.paymentMethod === 'card' ? '#f0f4ff' : 'white' }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '24px' }}>💳</span>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>Credit/Debit Card</span>
                </label>

                <label
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: formData.paymentMethod === 'upi' ? '2px solid #667eea' : '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', background: formData.paymentMethod === 'upi' ? '#f0f4ff' : 'white' }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '24px' }}>📱</span>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>UPI</span>
                </label>

                <label
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: formData.paymentMethod === 'netbanking' ? '2px solid #667eea' : '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', background: formData.paymentMethod === 'netbanking' ? '#f0f4ff' : 'white' }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={formData.paymentMethod === 'netbanking'}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '24px' }}>🏦</span>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>Net Banking</span>
                </label>

                <label
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: formData.paymentMethod === 'cod' ? '2px solid #667eea' : '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', background: formData.paymentMethod === 'cod' ? '#f0f4ff' : 'white' }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '24px' }}>💵</span>
                  <span style={{ fontWeight: '500', color: '#1f2937' }}>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: 'fit-content', position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>Order Summary</h2>

            {/* Items */}
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px' }}>
              {cartItems.map((item) => (
                <div key={item.productId} style={{ display: 'flex', gap: '12px', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{item.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>Qty: {item.quantity}</p>
                  </div>
                  <p style={{ fontWeight: '700', color: '#1f2937' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '15px', borderTop: '2px solid #e5e7eb', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#16a34a' : '#6b7280' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '2px solid #e5e7eb' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>Total</span>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#667eea' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isProcessing} style={{ width: '100%', padding: '16px', background: isProcessing ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: isProcessing ? 'not-allowed' : 'pointer', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
              {isProcessing ? '⏳ Processing...' : `Pay ₹${total.toLocaleString()}`}
            </button>

            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '12px', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              🔒 Secured by 256-bit SSL encryption
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
