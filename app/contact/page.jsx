"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const ContactPage = () => {
  return (
    <div className="contact-page organic-modern" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-intro"
          style={{ textAlign: 'left', marginBottom: '80px' }}
        >
          <h1 className="organic-title" style={{ fontSize: '3.5rem' }}>Get In Touch <br /><span>Let's Discuss Your Vision</span></h1>
          <p className="hero-description" style={{ maxWidth: '600px' }}>
            Whether you're planning a complete renovation or just looking for a professional consultation, we're here to help you create a space that feels like home.
          </p>
        </motion.div>
        
        <div className="contact-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '100px' }}>
          <div className="contact-info-panel" style={{ flex: '1 1 350px' }}>
            <div className="info-block" style={{ marginBottom: '50px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>Studio Location</h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>
            
            <div className="info-block" style={{ marginBottom: '50px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>Direct Line</h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>+91 6232793125</p>
                </div>
              </div>
            </div>

            <div className="info-block" style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>Email Inquiries</h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    <a href="mailto:arka4@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>arka4@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>

            <a href="https://wa.me/916232793125" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#25D366', border: 'none' }}>
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>

          <div className="contact-form-panel" style={{ flex: '1.5 1 450px' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
