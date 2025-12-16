import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const dummyOrders = [
  { id: 'ORD001', date: '2025-01-15', total: 5998, status: 'Delivered', items: 2 },
  { id: 'ORD002', date: '2025-01-20', total: 2999, status: 'Shipped', items: 1 },
  { id: 'ORD003', date: '2025-01-25', total: 8499, status: 'Processing', items: 3 },
];

const Profile = () => {
  const { user, logout, isSeller, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <span style={{ fontSize: '60px', marginBottom: '20px' }}>🔐</span>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginBottom: '10px' }}>Please Login</h1>
        <p style={{ color: '#6b7280', marginBottom: '25px' }}>You need to login to view your profile</p>
        <Link to="/login" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px 30px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none' }}>
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>My Account</p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginTop: '8px' }}>Welcome, {user.name}!</h1>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {isSeller && (
          <Link to="/seller" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', padding: '20px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
            🏪 Seller Dashboard
          </Link>
        )}
        {isAdmin && (
          <Link to="/admin" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', color: 'white', padding: '20px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
            🔐 Admin Panel
          </Link>
        )}
        {!isSeller && (
          <Link to="/become-seller" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', padding: '20px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: '600' }}>
            🚀 Become Seller
          </Link>
        )}
      </div>

      {/* Profile Card */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', paddingBottom: '25px', borderBottom: '2px solid #e5e7eb' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', color: 'white' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>{user.name}</h2>
            <p style={{ color: '#6b7280' }}>{user.email}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {user.roles?.map((role) => (
                <span key={role} style={{ padding: '4px 12px', background: role === 'admin' ? '#fee2e2' : role === 'seller' ? '#dcfce7' : '#dbeafe', color: role === 'admin' ? '#dc2626' : role === 'seller' ? '#16a34a' : '#2563eb', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'capitalize' }}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Full Name</label>
            <input type="text" value={user.name} readOnly style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', background: '#f9fafb', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Email</label>
            <input type="email" value={user.email} readOnly style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', background: '#f9fafb', boxSizing: 'border-box' }} />
          </div>
        </div>

        <button onClick={logout} style={{ marginTop: '30px', width: '100%', padding: '16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
          🚪 Logout
        </button>
      </div>

      {/* Order History */}
      <div style={{ background: 'white', borderRadius: '25px', padding: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', marginTop: '30px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '25px' }}>Order History</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {dummyOrders.map((order) => (
            <div key={order.id} style={{
              border: '2px solid #e5e7eb',
              borderRadius: '15px',
              padding: '20px',
              transition: 'border-color 0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontWeight: '700', color: '#1f2937', marginBottom: '5px' }}>{order.id}</h4>
                  <p style={{ color: '#6b7280', fontSize: '13px' }}>{order.date} • {order.items} items</p>
                </div>
                <span style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Shipped' ? '#dbeafe' : '#fef3c7',
                  color: order.status === 'Delivered' ? '#16a34a' : order.status === 'Shipped' ? '#2563eb' : '#d97706'
                }}>{order.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ fontWeight: '700', color: '#1f2937', fontSize: '18px' }}>₹{order.total.toLocaleString()}</span>
                <button style={{ color: '#667eea', background: 'none', border: 'none', fontWeight: '600', cursor: 'pointer' }}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
