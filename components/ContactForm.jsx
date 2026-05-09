"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/contact`, formData);
      if (response.status === 200) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="success-message"
        style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-secondary)', borderRadius: '15px' }}
      >
        <h3 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you shortly.</p>
        <button className="btn-primary" onClick={() => setIsSent(false)} style={{ marginTop: '20px' }}>Send Another</button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="contact-form-card"
      style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}
    >
      <h3 style={{ marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>Send a Message</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Have a question? We're here to help.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white' }}
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white' }}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Subject" 
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white' }}
          />
        </div>
        <div className="form-group">
          <textarea 
            placeholder="Your Message" 
            required 
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            style={{ width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', background: 'white', resize: 'vertical' }}
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isSubmitting}
          style={{ padding: '15px', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
