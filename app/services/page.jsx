"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, PenTool, Box, Home as HomeIcon } from 'lucide-react';
import PriceList from '@/components/PriceList';

const services = [
  {
    icon: <Compass size={40} color="var(--accent)" />,
    title: 'Interior Consultation',
    desc: 'Expert advice on color palettes, materials, and space planning to suit your lifestyle.',
    price: 'Starting from ₹5,000'
  },
  {
    icon: <PenTool size={40} color="var(--accent)" />,
    title: '2D Planning & Drafting',
    desc: 'Detailed floor plans and layouts ensuring optimal space utilization.',
    price: 'Starting from ₹15 / sq.ft'
  },
  {
    icon: <Box size={40} color="var(--accent)" />,
    title: '3D Visualization',
    desc: 'Photorealistic 3D renders so you can see your space before construction begins.',
    price: 'Starting from ₹8,000 / room'
  },
  {
    icon: <HomeIcon size={40} color="var(--accent)" />,
    title: 'Full Renovation',
    desc: 'Turnkey interior solutions from conceptualization to execution.',
    price: 'Custom Quote'
  }
];

const ServicesPage = ({ openModal }) => {
  return (
    <div className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <h1 className="section-title">My Services</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {services.map((srv, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              style={{ padding: '40px 30px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}
            >
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{srv.icon}</div>
              <h3 style={{ marginBottom: '15px' }}>{srv.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', minHeight: '60px' }}>{srv.desc}</p>
              <div style={{ fontWeight: '600', color: 'var(--accent)', fontSize: '1.1rem' }}>{srv.price}</div>
              <button className="btn-outline" style={{ marginTop: '20px', width: '100%' }} onClick={openModal}>Book Now</button>
            </motion.div>
          ))}
        </div>

        {/* Design Packages */}
        <div style={{ marginTop: '100px' }}>
          <h2 className="section-title">Design Packages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {[
              { 
                name: 'Essential', 
                price: '₹24,999', 
                features: ['1 Room Design', 'Color Palette', 'Mood Board', 'Shopping List'],
                btnClass: 'btn-outline'
              },
              { 
                name: 'Premium', 
                price: '₹64,999', 
                features: ['3 Room Design', '3D Photorealistic Renders', 'Technical Drawings', 'Material Selection'],
                btnClass: 'btn-primary'
              },
              { 
                name: 'Executive', 
                price: 'Custom Quote', 
                features: ['Full Home Design', 'Unlimited Revisions', 'Site Visits', 'Execution Oversight'],
                btnClass: 'btn-outline'
              }
            ].map((pkg, idx) => (
              <div key={idx} style={{ 
                padding: '50px 30px', 
                background: pkg.name === 'Premium' ? 'white' : 'var(--bg-secondary)', 
                borderRadius: '12px', 
                border: pkg.name === 'Premium' ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                textAlign: 'center',
                boxShadow: pkg.name === 'Premium' ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                position: 'relative',
                transform: pkg.name === 'Premium' ? 'scale(1.05)' : 'none',
                zIndex: pkg.name === 'Premium' ? '2' : '1'
              }}>
                {pkg.name === 'Premium' && <span style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--accent)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '700' }}>BEST VALUE</span>}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{pkg.name}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '30px', color: 'var(--text-primary)' }}>{pkg.price}</div>
                <ul style={{ marginBottom: '40px', textAlign: 'left', padding: '0 20px' }}>
                  {pkg.features.map((f, i) => <li key={i} style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>• {f}</li>)}
                </ul>
                <button className={pkg.btnClass} style={{ width: '100%' }} onClick={openModal}>Choose {pkg.name}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Price List Section */}
        <PriceList />
      </div>
    </div>
  );
};

export default ServicesPage;
