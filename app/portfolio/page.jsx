"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import '../Portfolio.css';

// Asset paths
const kitchenImg = '/assets/modern_kitchen_homelane_style_1777577519367.png';
const wardrobeImg = '/assets/modern_wardrobe_homelane_style_1777577538135.png';
const livingImg = '/assets/luxury_living_room_homelane_style_1777577556206.png';
const bedroomImg = '/assets/portfolio_modern_bedroom_1776973196356.png';
const officeImg = '/assets/office_organic_new.png';
const diningImg = '/assets/dining_organic_new.png';

const staticProjects = [
  { id: 1, title: 'Modern Organic Kitchen', category: 'Residential', image: kitchenImg },
  { id: 2, title: 'Bespoke Wardrobe System', category: 'Residential', image: wardrobeImg },
  { id: 3, title: 'Luxury Living Concept', category: 'Residential', image: livingImg },
  { id: 4, title: 'Minimalist Bedroom', category: 'Residential', image: bedroomImg },
  { id: 5, title: 'Commercial Spaces', category: 'Commercial', image: officeImg },
  { id: 6, title: 'Contemporary Dining', category: 'Residential', image: diningImg },
];

const PortfolioPage = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Residential', 'Commercial'];

  const filteredProjects = filter === 'All' 
    ? staticProjects 
    : staticProjects.filter(p => p.category === filter);

  return (
    <div className="portfolio section" style={{ paddingTop: '120px' }}>
      <div className="container">
        <div className="section-intro text-center" style={{ marginBottom: '60px' }}>
          <h1 className="section-title">Design Showcase</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '-60px' }}>
            A curated selection of our architectural narratives and bespoke interiors.
          </p>
        </div>
        
        <div className="portfolio-filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="portfolio-grid">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={project.id} 
                className="portfolio-item"
              >
                <Link href={`/portfolio/${project.id}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                  <div className="portfolio-img-wrapper" style={{ cursor: 'pointer' }}>
                    <img src={project.image} alt={project.title} />
                    <div className="portfolio-overlay">
                      <div className="overlay-content">
                        <h3>{project.title}</h3>
                        <p>{project.category} • View Project Details →</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;
