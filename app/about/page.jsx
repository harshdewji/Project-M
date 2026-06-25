"use client";

import React from 'react';
import { motion } from 'framer-motion';

const muskanImg = '/assets/muskan.jpg';

const AboutPage = () => {
  return (
    <div className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <h1 className="section-title">About Muskan Dewangan</h1>
        
        <div className="about-flex-container">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="about-image-col"
          >
            <div className="about-image-card">
              <img 
                src={muskanImg} 
                alt="Muskan Dewangan" 
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-text-col"
          >
            <h2>Designing Your Dreams into Reality</h2>
            <p>
              Hello! I am Muskan Dewangan, a passionate interior designer with a keen eye for detail and a love for creating harmonious spaces. I believe that an interior should be a reflection of its inhabitants—elegant, functional, and deeply personal.
            </p>
            <div>
              <h3>Core Skills</h3>
              <ul className="about-skills-list">
                {['AutoCAD Architecture', 'Interior & Spatial Design', '3D Visualization (V-Ray/Corona)', 'Project Management'].map(skill => (
                  <li key={skill} className="about-skill-item">
                    <span className="about-skill-dot"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3>Experience</h3>
              <div className="about-experience-timeline">
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
