import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    
    setIsLoading(true);
    
    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrors({ form: result.message });
    }
    setIsLoading(false);
  };

  const inputStyle = (error) => ({ width: '100%', padding: '14px 16px', borderRadius: '12px', border: error ? '2px solid #ef4444' : '2px solid #e5e7eb', background: error ? '#fef2f2' : 'white', fontSize: '15px', outline: 'none', boxSizing: 'border-box' });
  const passwordStyle = (error) => ({ ...inputStyle(error), paddingRight: '50px' });

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', padding: '40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
              <span style={{ fontSize: '40px' }}>🚀</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: '#6b7280' }}>Join PocketKart today</p>
          </div>

          {errors.form && (
            <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center' }}>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={inputStyle(errors.name)} />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>⚠️ {errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle(errors.email)} />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>⚠️ {errors.email}</p>}
            </div>

            {/* Password with Show/Hide */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" style={passwordStyle(errors.password)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '0' }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>⚠️ {errors.password}</p>}
            </div>

            {/* Confirm Password with Show/Hide */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" style={passwordStyle(errors.confirmPassword)} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '0' }}>
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>⚠️ {errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
              <input type="checkbox" required style={{ width: '18px', height: '18px', marginTop: '2px' }} />
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                I agree to the <a href="#" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none' }}>Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '16px', background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: isLoading ? 'not-allowed' : 'pointer', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
              {isLoading ? '⏳ Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ position: 'relative', margin: '25px 0', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px solid #e5e7eb' }}></div>
            <span style={{ position: 'relative', background: 'white', padding: '0 15px', color: '#9ca3af', fontSize: '14px' }}>Or sign up with</span>
          </div>

          {/* Social */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', background: 'white', cursor: 'pointer', fontWeight: '500', fontSize: '14px', color: '#374151' }}>🔵 Google</button>
            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', background: 'white', cursor: 'pointer', fontWeight: '500', fontSize: '14px', color: '#374151' }}>📘 Facebook</button>
          </div>

          <p style={{ textAlign: 'center', color: '#6b7280' }}>
            Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: '700', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
