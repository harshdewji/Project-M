"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import './Testimonials.css';

const staticTestimonials = [
  {
    id: 1,
    client_name: 'Anjali Sharma',
    review: 'Studio Arka transformed our apartment into a sanctuary. Their eye for organic textures and spatial flow is unmatched.',
    rating: 5,
    role: 'Homeowner'
  },
  {
    id: 2,
    client_name: 'Vikram Mehta',
    review: 'The technical precision and 3D visualizations helped us see our office before it was even built. Truly professional.',
    rating: 5,
    role: 'CEO, Tech Hub'
  },
  {
    id: 3,
    client_name: 'Sneha Reddy',
    review: 'Simple, elegant, and very specific to our needs. The taupe palette they suggested is absolutely stunning.',
    rating: 5,
    role: 'Architect'
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % staticTestimonials.length);
  };
  
  const prev = () => {
    setIndex((prev) => (prev - 1 + staticTestimonials.length) % staticTestimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-intro text-center">
          <h2>Voices of Satisfaction</h2>
          <p>What our clients say about their transformed spaces.</p>
        </div>

        <div className="testimonial-slider-wrapper">
          <button className="slider-nav prev" onClick={prev}><ChevronLeft /></button>
          
          <div className="testimonial-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="testimonial-card"
              >
                <Quote className="quote-icon" />
                <div className="stars">
                  {[...Array(staticTestimonials[index].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />
                  ))}
                </div>
                <p className="review-text">"{staticTestimonials[index].review}"</p>
                <div className="client-info">
                  <h4>{staticTestimonials[index].client_name}</h4>
                  <span>{staticTestimonials[index].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="slider-nav next" onClick={next}><ChevronRight /></button>
        </div>

        <div className="slider-dots">
          {staticTestimonials.map((_, i) => (
            <span 
              key={i} 
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
