"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, PenTool, Box, Home as HomeIcon } from 'lucide-react';
import ConsultationModal from '@/components/ConsultationModal';

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
    price: 'Starting from ₹10 / sq.ft'
  },
  {
    icon: <Box size={40} color="var(--accent)" />,
    title: '3D Visualization',
    desc: 'Photorealistic 3D renders so you can see your space before construction begins.',
    price: 'Starting from ₹3,000 / room'
  },
  {
    icon: <HomeIcon size={40} color="var(--accent)" />,
    title: 'Full Renovation',
    desc: 'Turnkey interior solutions from conceptualization to execution.',
    price: 'Custom Quote'
  }
];

const interiorSolutions = [
  { slug: 'modular-kitchens', title: 'Modular Kitchens', img: '/assets/modern_kitchen_homelane_style_1777577519367.png', desc: 'Custom kitchens with BWP marine ply & German Blum hardware.' },
  { slug: 'wardrobes-and-storage', title: 'Wardrobes & Storage', img: '/assets/modern_wardrobe_homelane_style_1777577538135.png', desc: 'Floor-to-ceiling closets, sliding shutters & suede organizers.' },
  { slug: 'living-room-design', title: 'Living Room Design', img: '/assets/luxury_living_room_homelane_style_1777577556206.png', desc: 'Architectural TV consoles, wooden slat paneling & ambient lighting.' },
  { slug: 'bedroom-interiors', title: 'Bedroom Interiors', img: '/assets/bedroom_organic_new.png', desc: 'Organic modern sanctuaries, custom headboards & study nooks.' },
  { slug: 'space-saving-furniture', title: 'Space Saving Furniture', img: '/assets/office_organic_new.png', desc: 'Smart Murphy beds, foldaway desks & convertible dining tables.' }
];

const ServicesPage = ({ openModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsModalOpen(true);
    if (typeof openModal === 'function') openModal();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-consultation-modal'));
    }
  };
  return (
    <div className="section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-intro text-center" style={{ marginBottom: '60px' }}>
          <h1 className="section-title">Interior Solutions</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '-20px' }}>
            Explore our specialized architectural categories. Click any solution to view images, specs, and packages.
          </p>
        </div>

        {/* Interior Solutions Featured Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', marginBottom: '80px' }}>
          {interiorSolutions.map((item, idx) => (
            <motion.div 
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              style={{ background: 'var(--bg-secondary)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
                <a href={`/services/${item.slug}`} className="btn-outline" style={{ textAlign: 'center', width: '100%', textDecoration: 'none' }}>
                  Explore {item.title} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Design & Planning Services</h2>
        
        <div className="services-grid">
          {services.map((srv, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="service-card"
            >
              <div className="service-icon-wrapper">{srv.icon}</div>
              <h3>{srv.title}</h3>
              <p>{srv.desc}</p>
              <div className="service-price">{srv.price}</div>
              <button className="btn-outline" onClick={handleBookNow}>Book Now</button>
            </motion.div>
          ))}
        </div>

        {/* Design Packages */}
        <div style={{ marginTop: '100px' }}>
          <h2 className="section-title">Design Packages</h2>
          <div className="packages-grid">
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
              <div 
                key={idx} 
                className={`package-card ${pkg.name === 'Premium' ? 'premium' : ''}`}
              >
                {pkg.name === 'Premium' && <span className="package-badge">BEST VALUE</span>}
                <h3>{pkg.name}</h3>
                <div className="package-price">{pkg.price}</div>
                <ul className="package-features">
                  {pkg.features.map((f, i) => <li key={i}>• {f}</li>)}
                </ul>
                <button className={pkg.btnClass} style={{ width: '100%' }} onClick={handleBookNow}>Choose {pkg.name}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Consultation Modal */}
        <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default ServicesPage;
