import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Contact Form:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    { icon: '📞', label: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210' },
    { icon: '✉️', label: 'Email', value: 'support@pocketkart.com', link: 'mailto:support@pocketkart.com' },
    { icon: '📍', label: 'Address', value: '123 Commerce Street, Mumbai, India - 400001', link: 'https://maps.google.com' },
  ];

  const socialLinks = [
    { icon: '📘', label: 'Facebook', link: 'https://facebook.com/pocketkart', color: '#3b5998' },
    { icon: '📷', label: 'Instagram', link: 'https://instagram.com/pocketkart', color: '#e4405f' },
    { icon: '✉️', label: 'Gmail', link: 'mailto:support@pocketkart.com', color: '#ea4335' },
    { icon: '📞', label: 'WhatsApp', link: 'https://wa.me/919876543210', color: '#25d366' },
  ];

  if (submitted) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
        <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', marginBottom: '25px' }}>✓</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937', marginBottom: '15px' }}>Message Sent!</h1>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>We'll get back to you within 24 hours.</p>
        <button onClick={() => setSubmitted(false)} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px 30px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <p style={{ color: '#667eea', fontWeight: '600', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>Get In Touch</p>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#1f2937', marginTop: '10px' }}>Contact Us</h1>
        <p style={{ color: '#6b7280', marginTop: '10px', maxWidth: '500px', margin: '10px auto 0' }}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {/* Contact Form */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '35px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', marginBottom: '25px' }}>Send us a Message</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com"
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?"
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Your message..."
                style={{ width: '100%', padding: '14px 16px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>
            
            <button type="submit" disabled={isSubmitting}
              style={{ width: '100%', padding: '16px', background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}>
              {isSubmitting ? '⏳ Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          {/* Info Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
            {contactInfo.map((info, index) => (
              <a key={index} href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                  {info.icon}
                </div>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '5px' }}>{info.label}</p>
                  <p style={{ color: '#1f2937', fontWeight: '600', fontSize: '16px' }}>{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '20px' }}>Follow Us</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {socialLinks.map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" title={social.label}
                  style={{
                    width: '55px',
                    height: '55px',
                    background: social.color,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    textDecoration: 'none',
                    transition: 'transform 0.2s',
                    boxShadow: `0 5px 15px ${social.color}50`
                  }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '20px', padding: '30px', marginTop: '20px', color: 'white' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Business Hours</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.9 }}>Monday - Friday</span>
                <span style={{ fontWeight: '600' }}>9:00 AM - 8:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.9 }}>Saturday</span>
                <span style={{ fontWeight: '600' }}>10:00 AM - 6:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ opacity: 0.9 }}>Sunday</span>
                <span style={{ fontWeight: '600' }}>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
