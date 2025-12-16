import { useState } from 'react';
import { Link } from 'react-router-dom';

const sampleProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, stock: 15, status: 'Active', sales: 128, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: 2, name: 'Smart Watch Pro', price: 4999, stock: 8, status: 'Active', sales: 89, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  { id: 3, name: 'Running Shoes', price: 3499, stock: 0, status: 'Out of Stock', sales: 245, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: 4, name: 'Backpack', price: 1299, stock: 25, status: 'Active', sales: 67, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' },
];

const sampleOrders = [
  { id: 'ORD001', customer: 'Rahul Sharma', date: '2025-01-15', total: 5998, status: 'Delivered', items: 2 },
  { id: 'ORD002', customer: 'Priya Patel', date: '2025-01-14', total: 4999, status: 'Shipped', items: 1 },
  { id: 'ORD003', customer: 'Amit Kumar', date: '2025-01-14', total: 8497, status: 'Processing', items: 3 },
  { id: 'ORD004', customer: 'Sneha Gupta', date: '2025-01-13', total: 2999, status: 'Pending', items: 1 },
];

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'Electronics', description: '', imageUrl: '' });

  const stats = [
    { label: 'Total Sales', value: '₹1,45,890', icon: '💰', color: '#10b981', change: '+12.5%' },
    { label: 'Total Orders', value: '156', icon: '📦', color: '#6366f1', change: '+8.2%' },
    { label: 'Products', value: '24', icon: '🏷️', color: '#f59e0b', change: '+3' },
    { label: 'Customers', value: '89', icon: '👥', color: '#ec4899', change: '+15.3%' },
  ];

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log('New Product:', newProduct);
    alert('Product added successfully!');
    setShowAddProduct(false);
    setNewProduct({ name: '', price: '', stock: '', category: 'Electronics', description: '', imageUrl: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', text: '#16a34a' };
      case 'Out of Stock': return { bg: '#fee2e2', text: '#dc2626' };
      case 'Delivered': return { bg: '#dcfce7', text: '#16a34a' };
      case 'Shipped': return { bg: '#dbeafe', text: '#2563eb' };
      case 'Processing': return { bg: '#fef3c7', text: '#d97706' };
      case 'Pending': return { bg: '#f3f4f6', text: '#6b7280' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <p style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Seller Dashboard</p>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginTop: '8px' }}>Welcome back, Abhinav! 👋</h1>
        </div>
        <button
          onClick={() => setShowAddProduct(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '14px 24px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}
        >
          ➕ Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{stat.label}</p>
                <p style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937' }}>{stat.value}</p>
                <p style={{ color: '#10b981', fontSize: '13px', marginTop: '8px', fontWeight: '600' }}>{stat.change} from last month</p>
              </div>
              <div style={{ width: '50px', height: '50px', background: `${stat.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        {['overview', 'products', 'orders'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeTab === tab ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
              color: activeTab === tab ? 'white' : '#6b7280',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
          {/* Recent Orders */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>Recent Orders</h2>
              <button onClick={() => setActiveTab('orders')} style={{ color: '#667eea', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {sampleOrders.slice(0, 3).map((order) => (
                <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f9fafb', borderRadius: '12px' }}>
                  <div>
                    <p style={{ fontWeight: '600', color: '#1f2937' }}>{order.id}</p>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>{order.customer}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '700', color: '#1f2937' }}>₹{order.total.toLocaleString()}</p>
                    <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', background: getStatusColor(order.status).bg, color: getStatusColor(order.status).text, fontWeight: '600' }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>Top Products</h2>
              <button onClick={() => setActiveTab('products')} style={{ color: '#667eea', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>View All →</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {sampleProducts.slice(0, 3).map((product) => (
                <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f9fafb', borderRadius: '12px' }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#1f2937' }}>{product.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>{product.sales} sold</p>
                  </div>
                  <p style={{ fontWeight: '700', color: '#667eea' }}>₹{product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>Your Products</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Stock</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Sales</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleProducts.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{product.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#1f2937' }}>₹{product.price.toLocaleString()}</td>
                    <td style={{ padding: '15px', color: product.stock > 0 ? '#1f2937' : '#dc2626', fontWeight: '600' }}>{product.stock}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: getStatusColor(product.status).bg, color: getStatusColor(product.status).text }}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px', color: '#1f2937' }}>{product.sales}</td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '8px 12px', background: '#dbeafe', color: '#2563eb', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Edit</button>
                        <button style={{ padding: '8px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={{ background: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>All Orders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Items</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '15px', color: '#6b7280', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#667eea' }}>{order.id}</td>
                    <td style={{ padding: '15px', color: '#1f2937' }}>{order.customer}</td>
                    <td style={{ padding: '15px', color: '#6b7280' }}>{order.date}</td>
                    <td style={{ padding: '15px', color: '#1f2937' }}>{order.items}</td>
                    <td style={{ padding: '15px', fontWeight: '700', color: '#1f2937' }}>₹{order.total.toLocaleString()}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: getStatusColor(order.status).bg, color: getStatusColor(order.status).text }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <select style={{ padding: '8px 12px', border: '2px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}>
                        <option>Update Status</option>
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '35px', maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>Add New Product</h2>
              <button onClick={() => setShowAddProduct(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Product Name</label>
                <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required placeholder="Enter product name"
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Price (₹)</label>
                  <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required placeholder="0"
                    style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Stock</label>
                  <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} required placeholder="0"
                    style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Category</label>
                <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Sports</option>
                  <option>Home & Living</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Image URL</label>
                <input type="url" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} placeholder="https://example.com/image.jpg"
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Description</label>
                <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows="4" placeholder="Product description..."
                  style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowAddProduct(false)}
                  style={{ flex: 1, padding: '14px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit"
                  style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
