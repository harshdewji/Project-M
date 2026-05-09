"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = ({ openModal, scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className={`navbar luxury-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo creative-brand">
          <Link href="/" className="brand-logo">
            <div className="brand-initial">M</div>
            <div className="brand-meta">
              <span className="brand-main">Studio M</span>
              <span className="brand-sub">Architectural Interiors</span>
            </div>
          </Link>
        </div>
        
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link href="/" className={isActive('/') ? 'active' : ''} onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="/portfolio" className={isActive('/portfolio') ? 'active' : ''} onClick={() => setIsOpen(false)}>Portfolio</Link></li>
          <li><Link href="/services" className={isActive('/services') ? 'active' : ''} onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li className={`nav-accent ${isActive('/start-project') ? 'active' : ''}`}>
            <Link href="/start-project" onClick={() => setIsOpen(false)}>Start Project</Link>
          </li>
          <li className="mobile-only">
            <button className="btn-primary" onClick={() => { setIsOpen(false); openModal(); }}>
              GET FREE ESTIMATE
            </button>
          </li>
        </ul>

        <div className="nav-actions">
          <button onClick={openModal} className="btn-primary nav-cta">
            GET ESTIMATE
          </button>

          <button className={`creative-mobile-btn ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
