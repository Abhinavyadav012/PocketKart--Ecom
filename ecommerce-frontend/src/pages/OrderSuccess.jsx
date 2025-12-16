import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const orderNumber = `PK${Date.now().toString().slice(-8)}`;

  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '50px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', fontSize: '50px', color: 'white' }}>
          ✓
        </div>
        
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginBottom: '15px' }}>
          Order Placed Successfully!
        </h1>
        
        <p style={{ color: '#6b7280', marginBottom: '25px' }}>
          Thank you for shopping with PocketKart. Your order has been confirmed.
        </p>

        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Order Number</p>
          <p style={{ fontSize: '22px', fontWeight: '800', color: '#667eea' }}>{orderNumber}</p>
        </div>

        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '30px' }}>
          You will receive an email confirmation shortly with tracking details.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/shop" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
            Continue Shopping
          </Link>
          <Link to="/profile" style={{ background: '#f3f4f6', color: '#1f2937', padding: '16px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none' }}>
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
