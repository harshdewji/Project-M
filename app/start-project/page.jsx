"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import './Inquiry.css';

const InquiryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    budgetRange: '₹5L - ₹10L',
    timeline: 'Within 1 Month',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      alert("Submission failed. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="inquiry-success">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={80} color="var(--accent)" />
          <h2>Request Received</h2>
          <p>Thank you, {formData.name}. Our design lead will contact you within 24 hours to discuss your {formData.projectType} project.</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="inquiry-page" style={{ paddingTop: '120px' }}>
      <div className="container inquiry-container">
        <div className="inquiry-intro">
          <span className="subtitle">Project Discovery</span>
          <h1>Start Your Design Journey</h1>
          <p>Tell us about your dream space. This brief helps us prepare a personalized consultation for you.</p>
        </div>

        <div className="inquiry-card">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="form-step">
                <h3>1. The Basics</h3>
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="" />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="" />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="" />
                  </div>
                </div>
                <button type="button" className="btn-primary" onClick={() => setStep(2)}>Next Step <ChevronRight size={18} /></button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="form-step">
                <h3>2. Project Details</h3>
                <div className="input-row">
                  <div className="input-group">
                    <label>Project Type</label>
                    <select value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}>
                      <option>Residential Apartment</option>
                      <option>Luxury Villa</option>
                      <option>Commercial Office</option>
                      <option>Retail / Shop</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Budget Range</label>
                    <select value={formData.budgetRange} onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}>
                      <option>₹30k - ₹50k</option>
                      <option>₹1 - ₹3L</option>
                      <option>₹3L - ₹5L</option>
                      <option>₹5L - ₹8L</option>
                      <option>₹8L +</option>
                    </select>
                  </div>
                </div>
                <div className="input-group">
                  <label>Timeline</label>
                  <select value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
                    <option>Immediately</option>
                    <option>Within 3 Months</option>
                    <option>3 - 6 Months</option>
                    <option>6 Months +</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Brief Suggestion / Requirements</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us about your style preferences or specific needs..."></textarea>
                </div>
                <div className="btn-group">
                  <button type="button" className="btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn-primary">Submit Inquiry <Send size={18} /></button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
