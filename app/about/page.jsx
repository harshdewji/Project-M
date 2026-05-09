"use client";

import React from 'react';
import { motion } from 'framer-motion';

const muskanImg = '/assets/muskan.jpg';

const AboutPage = () => {
  return (
    <div className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <h1 className="section-title">About Muskan Dewangan</h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 400px' }}
          >
            <div style={{ 
              width: '100%', 
              height: '500px', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img 
                src={muskanImg} 
                alt="Muskan Dewangan" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: '1 1 400px' }}
          >
            <h2 style={{ marginBottom: '20px' }}>Designing Your Dreams into Reality</h2>
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
              Hello! I am Muskan Dewangan, a passionate interior designer with a keen eye for detail and a love for creating harmonious spaces. I believe that an interior should be a reflection of its inhabitants—elegant, functional, and deeply personal.
            </p>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ marginBottom: '15px' }}>Core Skills</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['AutoCAD Architecture', 'Interior & Spatial Design', '3D Visualization (V-Ray/Corona)', 'Project Management'].map(skill => (
                  <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent)', borderRadius: '50%' }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 style={{ marginBottom: '15px' }}>Experience</h3>
              <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '1.1rem' }}>Senior Interior Designer</h4>
                  <p style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>2021 - Present</p>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '5px' }}>Leading luxury residential projects.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
