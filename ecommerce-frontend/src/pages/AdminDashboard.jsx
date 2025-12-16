import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, isAdmin, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ totalUsers: 0, totalSellers: 0, pendingSellers: 0, totalProducts: 0, totalOrders: 0 });
  const [users, setUsers] = useState([]);
  const [sellerApplications, setSellerApplications] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSellerApplications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/seller-applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setSellerApplications(data.applications);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSellerAction = async (userId, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/seller-applications/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Seller ${action}d successfully!`);
        fetchSellerApplications();
        fetchStats();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (isAdmin && token) {
      fetchStats();
      fetchUsers();
      fetchSellerApplications();
    }
  }, [isAdmin, token]);

  if (!isAdmin) return null;

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#6366f1' },
    { label: 'Total Sellers', value: stats.totalSellers, icon: '🏪', color: '#10b981' },
    { label: 'Pending Applications', value: stats.pendingSellers, icon: '📋', color: '#f59e0b' },
    { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: '#ec4899' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '🛒', color: '#8b5cf6' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <p style={{ color: '#dc2626', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Admin Panel</p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginTop: '8px' }}>Dashboard</h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {statCards.map((stat) => (
          <div key={stat.label} style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>{stat.label}</p>
                <p style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937' }}>{stat.value}</p>
              </div>
              <div style={{ width: '50px', height: '50px', background: `${stat.color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        {['overview', 'users', 'sellers'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: '600', cursor: 'pointer', background: activeTab === tab ? '#dc2626' : '#f3f4f6', color: activeTab === tab ? 'white' : '#6b7280', textTransform: 'capitalize' }}>
            {tab === 'sellers' ? 'Seller Applications' : tab}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>All Users ({users.length})</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Roles</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: '600' }}>{u.name}</td>
                  <td style={{ padding: '12px', color: '#6b7280' }}>{u.email}</td>
                  <td style={{ padding: '12px' }}>
                    {u.roles.map((r) => (
                      <span key={r} style={{ padding: '4px 10px', background: r === 'admin' ? '#fee2e2' : r === 'seller' ? '#dcfce7' : '#dbeafe', color: r === 'admin' ? '#dc2626' : r === 'seller' ? '#16a34a' : '#2563eb', borderRadius: '20px', fontSize: '12px', marginRight: '5px', fontWeight: '600' }}>{r}</span>
                    ))}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '4px 10px', background: u.isActive ? '#dcfce7' : '#fee2e2', color: u.isActive ? '#16a34a' : '#dc2626', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Seller Applications Tab */}
      {activeTab === 'sellers' && (
        <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>Pending Seller Applications ({sellerApplications.length})</h2>
          {sellerApplications.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '40px' }}>No pending applications</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {sellerApplications.map((app) => (
                <div key={app._id} style={{ background: '#f9fafb', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <h3 style={{ fontWeight: '700', color: '#1f2937' }}>{app.name}</h3>
                      <p style={{ color: '#6b7280', fontSize: '14px' }}>{app.email}</p>
                      <p style={{ marginTop: '10px' }}><strong>Store:</strong> {app.sellerInfo.storeName}</p>
                      <p><strong>GST:</strong> {app.sellerInfo.gstNumber || 'Not provided'}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '5px' }}>Applied: {new Date(app.sellerInfo.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleSellerAction(app._id, 'approve')} style={{ padding: '10px 20px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                      <button onClick={() => handleSellerAction(app._id, 'reject')} style={{ padding: '10px 20px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '15px' }}>Welcome, Admin! 🎉</h2>
          <p style={{ color: '#6b7280' }}>Use the tabs above to manage users and seller applications.</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
