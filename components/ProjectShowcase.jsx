"use client";

import React from 'react';
import { motion } from 'framer-motion';
import './ProjectShowcase.css';

import Link from 'next/link';

// Assets
const officeShowcase = '/assets/portfolio_luxury_office_1776973212687.png';
const livingTechnical = '/assets/interior_technical_drawing_living_room_1777622685705.png';
const bedroomShowcase = '/assets/portfolio_modern_bedroom_1776973196356.png';
const bedroomTechnical = '/assets/master_bedroom_technical_plans_1777626603834.png';
const bathShowcase = '/assets/bathroom_organic_new.png';
const comparisonImg = '/assets/site_execution_comparison_set_1777622725474.png';

const ProjectShowcase = () => {
  return (
    <div className="project-showcase-editorial">
      {/* CHAPTER 1: THE EXECUTIVE SUITE */}
      <section className="ed-chapter">
        <div className="editorial-header">
          <span>PORTFOLIO</span>
          <span>MUSKAN DEWANGAN</span>
          <span>INTERIORS</span>
        </div>

        <Link href="/portfolio/5" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="ed-main-visual" style={{ cursor: 'pointer' }}>
            <img src={officeShowcase} alt="Executive Office" className="ed-hero-img" />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="ed-room-overlay"
            >
              <div className="ed-room-label">ROOM 01</div>
              <h2>EXECUTIVE LOUNGE</h2>
              <p>Bespoke Commercial Design • Click to View Project →</p>
            </motion.div>
          </div>
        </Link>

        <div className="ed-narrative container">
          <div className="ed-narrative-grid">
            <div className="ed-text-column">
              <p>A masterclass in professional elegance. This suite combines dark walnut textures with ergonomic precision, creating an environment that inspires leadership and focused creativity.</p>
            </div>
            <div className="ed-metadata-column">
              <div className="meta-item"><span>Location</span><p>Hyderabad, IN</p></div>
              <div className="meta-item"><span>Area</span><p>850 sq.ft</p></div>
              <div className="meta-item"><span>Year</span><p>2024</p></div>
            </div>
          </div>
        </div>

        {/* Technical Section */}
        <div className="ed-technical-section container" style={{ marginTop: '60px' }}>
          <div className="ed-technical-intro">
            <h3>Technical Precision</h3>
            <p>Moving from vision to reality requires architectural accuracy. Here we explore the technical elevations that defined the furniture layout.</p>
          </div>
          <div className="ed-blueprint-box">
            <img src={livingTechnical} alt="Technical Plans" />
            <div className="ed-blueprint-caption">OFFICE SUITE ELEVATIONS | SCALE 1:50</div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: THE MODERN RETREAT (ROOM 02) */}
      <section className="ed-chapter ed-dark-bg">
        <Link href="/portfolio/4" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="ed-main-visual" style={{ cursor: 'pointer' }}>
            <img src={bedroomShowcase} alt="Modern Bedroom" className="ed-hero-img" style={{ opacity: 0.9 }} />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="ed-room-overlay"
            >
              <div className="ed-room-label">ROOM 02</div>
              <h2>MODERN RETREAT</h2>
              <p>High-End Residential Bedroom • Click to View Project →</p>
            </motion.div>
          </div>
        </Link>

        {/* Technical Section */}
        <div className="ed-technical-section container">
          <div className="ed-technical-intro">
            <h3>Architectural Layout</h3>
            <p>Meticulous attention to lighting and circulation paths ensures a restful, editorial environment.</p>
          </div>
          <div className="ed-blueprint-box">
            <img src={bedroomTechnical} alt="Bedroom Technical Plans" />
            <div className="ed-blueprint-caption">MASTER SUITE ELEVATIONS | SCALE 1:50</div>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION CHAPTER: THE TRANSFORMATION */}
      <section className="ed-implementation-section">
        <div className="container">
          <div className="ed-section-header">
            <h3>From Site to Execution</h3>
            <p>A transparent look at our design journey—bridging the gap between the raw space, our photorealistic vision, and the final lived-in reality.</p>
          </div>
          
          <div className="ed-comparison-grid">
            <div className="ed-comp-main">
              <img src={comparisonImg} alt="Implementation Breakdown" />
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: COMMERCIAL SPACES (ROOM 03) */}
      <section className="ed-chapter">
        <Link href="/portfolio/5" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="ed-main-visual" style={{ cursor: 'pointer' }}>
            <img src={officeShowcase} alt="Commercial Spaces" className="ed-hero-img" />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="ed-room-overlay"
            >
              <div className="ed-room-label">ROOM 03</div>
              <h2>COMMERCIAL SPACES</h2>
              <p>Bespoke Office & Retail Design • Click to View Project →</p>
            </motion.div>
          </div>
        </Link>

        <div className="editorial-footer">
          <span>PROJECT REF: MD-2024-001</span>
          <span>STUDIO ARKA AGENCY</span>
          <div className="ed-footer-actions">
            <a href="/technical-monograph.pdf" download className="btn-outline" style={{ padding: '6px 15px', fontSize: '0.6rem' }}>
              DOWNLOAD MONOGRAPH (PDF)
            </a>
            <span style={{ marginLeft: '20px' }}>PAGE 12 / 12</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectShowcase;
