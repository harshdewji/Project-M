"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './ConsultationForm.css';

const ConsultationForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/consultation`, formData);

      if (response.status === 200) {
        alert(response.data.message);
        setFormData({ name: '', email: '', phone: '', city: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMsg = error.response?.data?.message || error.message;
      alert(`ERROR: ${errorMsg}. Please ensure the backend is running and SMTP is correct.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="consultation-form-container"
    >
      <h3>Book a Free 3D Design Session</h3>
      <p>Get a quote and 3D visualization in 30 seconds</p>
      
      <form onSubmit={handleSubmit} className="consultation-form">
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            required 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="City" 
            required 
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
        </div>
        <button 
          type="submit" 
          className="btn-primary w-full" 
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        >
          {isSubmitting ? 'SENDING REQUEST...' : 'GET FREE QUOTE'}
        </button>

        {onCancel && (
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={onCancel}
            style={{ 
              width: '100%', 
              background: 'transparent', 
              border: 'none', 
              marginTop: '10px', 
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              textDecoration: 'underline'
            }}
          >
            Cancel and Return to Site
          </button>
        )}
        <p className="form-footer">By clicking, you agree to our privacy policy.</p>
      </form>
    </motion.div>
  );
};

export default ConsultationForm;
