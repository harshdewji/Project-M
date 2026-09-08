"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './Footer.css';

// Custom SVG Icons to bypass lucide-react dependency issues
const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const MailIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const SendIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="brand-main">Studio Arka</h2>
            <p className="brand-sub" style={{ letterSpacing: '2px', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--accent)', marginTop: '-10px', marginBottom: '15px' }}>Architectural Interiors</p>
            <p>Your trusted interior design partner. We bring your dream home to life with precision and style.</p>
            <div className="trust-badges-mini">
              <span>45-Day Delivery</span> | <span>10-Year Warranty</span>
            </div>
          </div>
          <div className="footer-links">
            <h3>Interior Solutions</h3>
            <ul>
              <li><Link href="/services/modular-kitchens">Modular Kitchens</Link></li>
              <li><Link href="/services/wardrobes-and-storage">Wardrobes & Storage</Link></li>
              <li><Link href="/services/living-room-design">Living Room Design</Link></li>
              <li><Link href="/services/bedroom-interiors">Bedroom Interiors</Link></li>
              <li><Link href="/services/space-saving-furniture">Space Saving Furniture</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Our Studio</h3>
            <p>Studio Arka, Luxury Design Center, <br />Main Commercial Hub, City Center</p>
            <p className="mt-10" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MailIcon /> <a href="mailto:arka4@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>arka4@gmail.com</a>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneIcon /> <a href="tel:+916232793125" style={{ color: 'inherit', textDecoration: 'none' }}>+91 62327 93125</a>
            </p>
          </div>
          <div className="footer-social">
            <h3>Stay Inspired</h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '15px' }}>Join 5,000+ others for weekly design tips and trends.</p>
            
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', marginBottom: '10px', background: 'var(--bg-primary)', color: 'var(--text-primary)', outline: 'none' }} 
                />
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <SendIcon /> SUBSCRIBE
                </button>
              </form>
            ) : (
              <div className="subscription-success" style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: '500', padding: '10px 0' }}>
                ✓ Thank you for subscribing!
              </div>
            )}

            <div className="social-icons" style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--text-primary)', transition: 'var(--transition-smooth)' }}><InstagramIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--text-primary)', transition: 'var(--transition-smooth)' }}><LinkedinIcon /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Studio Arka Interior Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
