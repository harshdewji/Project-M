"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
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

      {/* Arka AI Concierge Showcase Section */}
      <section className="section arka-ai-home-section" style={{ background: '#111111', color: '#FFFFFF', padding: '125px 0' }}>
        <div className="container">
          <div className="ai-home-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(142, 123, 109, 0.25)', border: '1px solid rgba(142, 123, 109, 0.45)', padding: '8px 18px', borderRadius: '24px', color: '#D4AF37', fontSize: '0.8rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '24px' }}>
                <Sparkles size={16} />
                <span>Next-Gen Architectural Intelligence</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', color: '#FFFFFF', margin: '0 0 24px 0', lineHeight: '1.15' }}>
                Design Smarter with <span style={{ color: '#8E7B6D' }}>Arka AI</span>
              </h2>
              <p style={{ color: '#B3AAA2', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '35px' }}>
                Explore customized architectural styling, real-time cost estimations, and curated material palettes for your home in seconds. Tailored specifically for Indian homes, luxury villas, and executive spaces.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginBottom: '40px' }}>
                <Link href="/ai-consultant" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', padding: '16px 36px', fontSize: '0.85rem' }}>
                  <Sparkles size={18} /> EXPLORE AI STUDIO
                </Link>
                <button 
                  type="button"
                  className="btn-outline" 
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.35)', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 32px', fontSize: '0.85rem' }}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-ai-assistant', {
                        detail: { prompt: "Can you help me choose the best interior design style and estimate costs for my apartment?" }
                      }));
                    }
                  }}
                >
                  <MessageSquare size={18} /> CHAT WITH ARKA AI
                </button>
              </div>

              {/* Quick AI Starter Chips */}
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.2px', color: '#8E7B6D', display: 'block', marginBottom: '12px' }}>Try popular AI prompts:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {[
                    "💰 Estimate 3BHK interior cost",
                    "🍳 Modular kitchen with Blum fittings",
                    "🎨 Japandi color palette & wood pairings",
                    "🛏️ Minimalist master bedroom layout"
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('open-ai-assistant', { detail: { prompt: chip } }));
                        }
                      }}
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#D4C9BF', padding: '8px 16px', borderRadius: '20px', fontSize: '0.84rem', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(142, 123, 109, 0.35)', padding: '45px', borderRadius: '8px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '18px', marginBottom: '30px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: '#FFFFFF' }}>Virtual Architectural Capabilities</span>
                <span style={{ width: '10px', height: '10px', backgroundColor: '#10B981', borderRadius: '50%', boxShadow: '0 0 12px #10B981' }}></span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', background: '#8E7B6D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600 }}>1</div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: '0 0 6px 0', fontFamily: 'var(--font-heading)' }}>Bespoke Concept Generation</h4>
                    <p style={{ color: '#A0968E', fontSize: '0.92rem', margin: 0, lineHeight: '1.6' }}>Select your space typology and aesthetic movement to receive an architect-grade concept brief in seconds.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', background: '#8E7B6D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600 }}>2</div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: '0 0 6px 0', fontFamily: 'var(--font-heading)' }}>Real-Time Investment Modeling</h4>
                    <p style={{ color: '#A0968E', fontSize: '0.92rem', margin: 0, lineHeight: '1.6' }}>Accurate budget projections reflecting genuine materials (BWP marine ply, German Blum, Italian marble) in INR.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ width: '42px', height: '42px', background: '#8E7B6D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600 }}>3</div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: '0 0 6px 0', fontFamily: 'var(--font-heading)' }}>Harmonious Material & Lighting Plans</h4>
                    <p style={{ color: '#A0968E', fontSize: '0.92rem', margin: 0, lineHeight: '1.6' }}>Cohesive 5-tone color harmonies with click-to-copy HEX codes and Kelvin temperature lighting guidance.</p>
                  </div>
                </div>
              </div>
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
