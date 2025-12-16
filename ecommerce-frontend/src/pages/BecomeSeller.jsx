import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BecomeSeller = () => {
  const { user, applySeller } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ storeName: '', storeDescription: '', gstNumber: '', bankAccount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const result = await applySeller(formData);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '50px', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: '100px', height: '100px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', fontSize: '50px' }}>✓</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginBottom: '15px' }}>Application Approved!</h1>
          <p style={{ color: '#6b7280', marginBottom: '25px' }}>You are now a registered seller. You can start adding products.</p>
          <Link to="/seller/dashboard" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px 30px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none' }}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937' }}>Become a Seller</h1>
        <p style={{ color: '#6b7280' }}>Start selling on PocketKart today</p>
      </div>

      {!user && (
        <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '12px', marginBottom: '25px', textAlign: 'center' }}>
          <p style={{ color: '#92400e' }}>Please <Link to="/login" style={{ fontWeight: '700' }}>login</Link> first to apply as a seller.</p>
        </div>
      )}

      {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '15px', borderRadius: '12px', marginBottom: '20px' }}>{error}</div>}

      <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '35px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Store Name *</label>
            <input type="text" value={formData.storeName} onChange={(e) => setFormData({ ...formData, storeName: e.target.value })} required placeholder="Your store name"
              style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Store Description</label>
            <textarea value={formData.storeDescription} onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })} rows="3" placeholder="Describe your store"
              style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}></textarea>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>GST Number</label>
            <input type="text" value={formData.gstNumber} onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })} placeholder="GST12345678"
              style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Bank Account Number</label>
            <input type="text" value={formData.bankAccount} onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })} placeholder="For payments"
              style={{ width: '100%', padding: '14px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={isLoading || !user}
            style={{ width: '100%', padding: '16px', background: user ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#9ca3af', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: user ? 'pointer' : 'not-allowed' }}>
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;
