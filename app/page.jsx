"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './Home.css';

// Assets
const heroImg = '/assets/hero_interior_1776973180953.png';
const beforeImg = '/assets/bedroom_before_1776974957520.png';
const afterImg = '/assets/portfolio_modern_bedroom_1776973196356.png';
const kitchenImg = '/assets/modern_kitchen_homelane_style_1777577519367.png';
const wardrobeImg = '/assets/modern_wardrobe_homelane_style_1777577538135.png';
const livingImg = '/assets/luxury_living_room_homelane_style_1777577556206.png';
const bedroomNew = '/assets/bedroom_organic_new.png';
const diningNew = '/assets/dining_organic_new.png';
const bathroomNew = '/assets/bathroom_organic_new.png';
const officeNew = '/assets/office_organic_new.png';
const comparisonBedroom = '/assets/implementation_comparison_bedroom_1777626624343.png';

// Components
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TrustRibbon from '@/components/TrustRibbon';
import StyleQuiz from '@/components/StyleQuiz';
import BudgetCalculator from '@/components/BudgetCalculator';
import ColorPaletteGenerator from '@/components/ColorPaletteGenerator';
import Testimonials from '@/components/Testimonials';
import ProjectShowcase from '@/components/ProjectShowcase';

const Home = ({ openModal }) => {
  const [showHeroForm, setShowHeroForm] = useState(true);
  return (
    <div className="home simple-premium">
      {/* Subtle Vertical Brand Label */}
      <div className="vertical-brand-label">
        <span>STUDIO ARKA — ARCHITECTURAL INTERIORS</span>
      </div>

      {/* Hero Section */}
      <section className="creative-hero">
        <div className="hero-background-text">STUDIO</div>
        <div className="container hero-creative-inner">
          <div className="hero-content-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="brand-signature"
            >
              <h1 className="main-logo-text">STUDIO<span>ARKA</span></h1>
              <p className="creative-tagline">Architectural Interiors</p>
            </motion.div>
            
            <div className="hero-main-description">
              <p>We create beautiful, functional spaces that reflect your personality and style. Simple, attractive, and meticulously crafted.</p>
              <div className="creative-cta-box">
                <button className="btn-primary" onClick={() => document.getElementById('showcase')?.scrollIntoView({behavior:'smooth'})}>
                  EXPLORE OUR WORK
                </button>
              </div>
            </div>
          </div>

          <div className="hero-visual-right">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="featured-frame frame-1"
            >
              <img src={heroImg} alt="Luxury Interior" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Ribbon */}
      <TrustRibbon />

      {/* Signature Collections Grid */}
      <section className="section signature-collections">
        <div className="container">
          <div className="section-intro">
            <span className="subtitle">EXPERTISE</span>
            <h2 className="section-title">Signature Collections</h2>
          </div>
          
          <div className="collections-mosaic">
            <Link href="/portfolio/4" className="mosaic-item tall" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={bedroomNew} alt="Organic Bedroom" />
              <div className="mosaic-info">
                <h4>Master Retreats</h4>
                <p>Organic modern sanctuaries • View Project →</p>
              </div>
            </Link>
            <Link href="/portfolio/1" className="mosaic-item small" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={kitchenImg} alt="Modern Kitchen" />
              <div className="mosaic-info">
                <h4>Epicurean Hubs</h4>
              </div>
            </Link>
            <Link href="/portfolio/6" className="mosaic-item small" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={diningNew} alt="Dining Area" />
              <div className="mosaic-info">
                <h4>Gathering Spaces</h4>
              </div>
            </Link>
            <Link href="/portfolio/5" className="mosaic-item wide" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={officeNew} alt="Commercial Spaces" />
              <div className="mosaic-info">
                <h4>Commercial Spaces</h4>
                <p>Where productivity meets peace • View Project →</p>
              </div>
            </Link>
            <Link href="/portfolio/5" className="mosaic-item small" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={officeNew} alt="Commercial Spaces" />
              <div className="mosaic-info">
                <h4>Commercial Spaces</h4>
              </div>
            </Link>
            <Link href="/portfolio/2" className="mosaic-item small" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={wardrobeImg} alt="Wardrobe" />
              <div className="mosaic-info">
                <h4>Bespoke Closets</h4>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Project Showcase */}
      <div id="showcase">
        <ProjectShowcase />
      </div>

      {/* Style Quiz Section */}
      <section className="section quiz-section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-intro text-center" style={{ marginBottom: '50px' }}>
            <h2 className="section-title">Find Your Interior Style</h2>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>Unsure where to start? Take our 1-minute quiz to discover your design personality.</p>
          </div>
          <StyleQuiz />
        </div>
      </section>

      {/* Planning & Visualization Section */}
      <section id="process" className="section planning-section">
        <div className="container">
          <div className="section-intro">
            <span className="subtitle">METHODOLOGY</span>
            <h2 className="section-title">Architectural Precision</h2>
          </div>

          <div className="bento-grid">
            <div className="bento-item main-content">
              <h3>Conceptualization</h3>
              <p>Our process begins with a deep dive into your lifestyle. We don't just design rooms; we curate experiences that align with your daily rituals.</p>
              <button className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', marginTop: '20px' }} onClick={openModal}>
                LEARN OUR PROCESS
              </button>
            </div>

            <div className="bento-item bento-visual">
              <img src={afterImg} alt="3D Visualization" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section tools-section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-intro text-center" style={{ marginBottom: '50px' }}>
            <h2 className="section-title">Design Toolkit</h2>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>Plan your investment and explore color palettes.</p>
          </div>
          <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <BudgetCalculator openModal={openModal} />
            <ColorPaletteGenerator />
          </div>
        </div>
      </section>

      {/* Interactive Room Preview Section */}
      <section className="section room-preview">
        <div className="container">
          <h2 className="section-title">The Power of Transformation</h2>
          <p className="section-subtitle-text" style={{ textAlign: 'center', marginBottom: '40px' }}>
            Drag the slider to see how we turn an ordinary room into a luxurious, personalized space.
          </p>
          <BeforeAfterSlider beforeImage={beforeImg} afterImage={comparisonBedroom} />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
