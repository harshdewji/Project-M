"use client";

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ConsultationModal from './ConsultationModal';
import WhatsAppWidget from './WhatsAppWidget';

export default function LayoutWrapper({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="noise-overlay" />
      <Navbar openModal={() => setIsModalOpen(true)} scrolled={scrolled} />
      <main>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { openModal: () => setIsModalOpen(true) });
          }
          return child;
        })}
      </main>
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppWidget />
    </div>
  );
}
