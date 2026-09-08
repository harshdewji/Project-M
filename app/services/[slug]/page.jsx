"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ConsultationModal from '@/components/ConsultationModal';

const kitchenImg = '/assets/modern_kitchen_homelane_style_1777577519367.png';
const wardrobeImg = '/assets/modern_wardrobe_homelane_style_1777577538135.png';
const livingImg = '/assets/luxury_living_room_homelane_style_1777577556206.png';
const bedroomImg = '/assets/portfolio_modern_bedroom_1776973196356.png';
const bedroomOrganic = '/assets/bedroom_organic_new.png';
const diningImg = '/assets/dining_organic_new.png';
const officeImg = '/assets/office_organic_new.png';
const techLiving = '/assets/interior_technical_drawing_living_room_1777622685705.png';
const techBed = '/assets/master_bedroom_technical_plans_1777626603834.png';
const compImg = '/assets/site_execution_comparison_set_1777622725474.png';

const servicesData = {
  'modular-kitchens': {
    title: 'Modular Kitchens',
    subtitle: 'Bespoke, Ergonomic & Ultra-Durable Kitchen Designs',
    heroImage: kitchenImg,
    gallery: [kitchenImg, diningImg, techLiving, compImg],
    overview: 'Our modular kitchens are engineered for Indian cooking styles, using 100% boiling-water-proof (BWP) marine ply, anti-scratch finishes, and Blum soft-close German hardware.',
    features: [
      'BWP Marine Plywood with 10-Year Warranty',
      'Acrylic, PU Lacquer, & Veneer Finish Options',
      'Blum & Hettich Soft-Close Drawers & Pull-outs',
      'Quartz & Granite Stain-Resistant Countertops',
      'Integrated Appliance Cabinets & Pantry Towers',
      'Under-Cabinet LED Task & Accent Lighting'
    ],
    layouts: ['L-Shaped Kitchen', 'U-Shaped Kitchen', 'Parallel / Galley', 'Island Kitchen with Breakfast Bar'],
    priceEstimate: 'Starting from ₹1.8 Lakhs',
    packages: [
      { name: 'Standard Modular', price: '₹1.8L - ₹2.5L', desc: 'BWP Ply, High-Gloss Laminate, Hettich Hardware' },
      { name: 'Premium Acrylic', price: '₹2.8L - ₹4.2L', desc: 'Anti-Fingerprint Acrylic, Quartz Countertop, Blum Tandembox' },
      { name: 'Luxury PU & Glass', price: '₹4.5L+', desc: 'Italian Lacquer Finish, Tinted Glass Shutters, Smart Kitchen Sensors' }
    ]
  },
  'wardrobes-and-storage': {
    title: 'Wardrobes & Storage',
    subtitle: 'Floor-to-Ceiling Custom Closet Systems & Intelligent Storage',
    heroImage: wardrobeImg,
    gallery: [wardrobeImg, bedroomOrganic, techBed, compImg],
    overview: 'Maximize every inch of your bedroom with custom-built floor-to-ceiling wardrobes featuring concealed drawers, accessory organizers, integrated mirrors, and automatic LED sensors.',
    features: [
      'Sliding Door & Hinged Door Systems',
      'Tinted Glass, Fluted Glass, & PU Panel Finish',
      'Concealed Jewellery Drawers & Lockers',
      'Pull-down Hanger Rods for Loft Access',
      'Automated Motion-Sensor Interior Lights',
      'Soft-Touch Suede & Leatherette Interiors'
    ],
    layouts: ['Full Wall Sliding Wardrobe', 'L-Shaped Corner Closet', 'Walk-in Wardrobe Suite', 'Bedhead Storage Bridge'],
    priceEstimate: 'Starting from ₹85,000',
    packages: [
      { name: 'Contemporary Hinged', price: '₹85,000 - ₹1.4L', desc: 'Suede Laminate, Soft-Close Hinges, Internal Drawers' },
      { name: 'Sliding Track System', price: '₹1.5L - ₹2.6L', desc: 'Aluminum Frame Sliding Doors, Tinted Mirrors, Sensor LED' },
      { name: 'Bespoke Walk-In Suite', price: '₹2.8L+', desc: 'Glass Wardrobe Islands, Custom Shoe Rack Displays, Velvet Trays' }
    ]
  },
  'living-room-design': {
    title: 'Living Room Design',
    subtitle: 'Architectural Media Walls, Accent Panels & Curved Aesthetics',
    heroImage: livingImg,
    gallery: [livingImg, officeImg, techLiving, compImg],
    overview: 'Transform your primary social space into an architectural statement. We design floating media centers, acoustic wood-slat panels, ambient cove lighting, and tailored seating arrangements.',
    features: [
      'Fluted Charcoal & Wooden Slat Wall Panels',
      'Floating Marble/Quartz TV Consoles',
      'Cove & Concealed RGB/Warm Architectural Lighting',
      'Bespoke Crockery & Bar Units',
      'Acoustic Treatment & Hidden Cable Management',
      'Curated Modular & Fabric Sofas'
    ],
    layouts: ['Open Plan Living-Dining', 'Media-Focused Entertainment Zone', 'Formal Luxury Reception', 'Minimalist Lounge'],
    priceEstimate: 'Starting from ₹1.5 Lakhs',
    packages: [
      { name: 'Essential Living', price: '₹1.5L - ₹2.2L', desc: 'Laminate TV Unit, Accent Wall Paint, Curtains & Lighting' },
      { name: 'Editorial Luxury', price: '₹2.5L - ₹4.0L', desc: 'Wooden Slat Panels, Italian Marble Console, Designer Chandelier' },
      { name: 'Architectural Signature', price: '₹4.2L+', desc: 'Full Room Paneling, Smart Home Lighting Automation, Custom Bar Unit' }
    ]
  },
  'bedroom-interiors': {
    title: 'Bedroom Interiors',
    subtitle: 'Serene, Organic Modern Sanctuaries for Restful Living',
    heroImage: bedroomOrganic,
    gallery: [bedroomOrganic, bedroomImg, techBed, compImg],
    overview: 'Creating serene sanctuary bedrooms tailored for tranquility. From upholstered accent headboards to ambient warm lighting, integrated nightstands, and study nooks.',
    features: [
      'Custom Tufted & Wooden Fluted Headboards',
      'Floating Nightstands with Wireless Charging',
      'Integrated Study & Work-from-Home Desks',
      'Layered Ambient, Task, & Accent Lighting',
      'Window Seating Bays with Hydraulic Storage',
      'Hypoallergenic & Natural Material Finishes'
    ],
    layouts: ['Master Suite Sanctuary', 'Guest Room Oasis', 'Kids Activity & Bunk Bedroom', 'Minimalist Zen Suite'],
    priceEstimate: 'Starting from ₹1.2 Lakhs',
    packages: [
      { name: 'Comfort Suite', price: '₹1.2L - ₹1.8L', desc: 'Bed Frame with Headboard, 2 Nightstands, Wardrobe & Lighting' },
      { name: 'Serenity Master', price: '₹2.0L - ₹3.2L', desc: 'Cushioned Paneling, Integrated Study, Dressing Table with Mirror' },
      { name: 'Grand Master Suite', price: '₹3.5L+', desc: 'Walk-in Closet, Accent Veneer Walls, Motorized Curtains, Smart Lighting' }
    ]
  },
  'space-saving-furniture': {
    title: 'Space Saving Furniture',
    subtitle: 'Multi-functional, Folding & Convertible Smart Furniture',
    heroImage: officeImg,
    gallery: [officeImg, kitchenImg, wardrobeImg, compImg],
    overview: 'Optimize compact apartments and urban homes with intelligent multi-functional furniture. Murphy wall beds, foldaway study tables, extensible dining tables, and concealed storage benches.',
    features: [
      'Hydraulic Wall Bed (Murphy Bed) Systems',
      'Folding Wall-Mounted Study & Craft Desks',
      'Expandable 4-to-8 Seater Dining Tables',
      'Under-Bed & Sofa Drawer Hydraulic Storage',
      'Modular Convertible Ottoman Benches',
      'German Heavy-Duty Folding Hardware'
    ],
    layouts: ['Studio Apartment Optimization', 'Guest Room / Home Office Hybrid', 'Compact Kids Room Layout', 'Dual-Purpose Living Space'],
    priceEstimate: 'Starting from ₹65,000',
    packages: [
      { name: 'Smart Workstation', price: '₹65,000 - ₹95,000', desc: 'Wall Desk, Folding Storage Shelves, Compact Wardrobe' },
      { name: 'Hybrid Room Transformation', price: '₹1.1L - ₹1.9L', desc: 'Murphy Bed with Sofa Unit, Integrated Storage Towers' },
      { name: 'Full Studio Smart Furniture', price: '₹2.2L+', desc: 'Complete Foldable Living Suite, Modular Partition Walls' }
    ]
  }
};

const ServiceDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="section container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <p style={{ margin: '20px 0' }}>The requested Interior Solution page does not exist.</p>
        <Link href="/services" className="btn-primary">View All Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page section" style={{ paddingTop: '110px' }}>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
          <Link href="/" style={{ color: 'inherit' }}>Home</Link> &nbsp;/&nbsp; 
          <Link href="/services" style={{ color: 'inherit' }}>Services</Link> &nbsp;/&nbsp; 
          <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{service.title}</span>
        </div>

        {/* Hero Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              INTERIOR SOLUTION
            </span>
            <h1 className="section-title" style={{ textAlign: 'left', marginTop: '10px', marginBottom: '15px' }}>
              {service.title}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px', lineHeight: '1.6' }}>
              {service.subtitle}
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.8' }}>
              {service.overview}
            </p>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '14px 28px' }}>
                BOOK FREE CONSULTATION
              </button>
              <Link href="/contact" className="btn-outline" style={{ padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }}>
                GET CUSTOM QUOTE
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <img src={service.heroImage} alt={service.title} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        </div>

        {/* Photo Gallery Grid */}
        <div style={{ marginTop: '70px', marginBottom: '70px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '25px' }}>
            Design Showcase & Realizations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {service.gallery.map((imgSrc, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.03 }}
                style={{ borderRadius: '12px', overflow: 'hidden', height: '260px', background: 'var(--bg-secondary)', cursor: 'pointer' }}
              >
                <img src={imgSrc} alt={`${service.title} ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Features & Layouts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '35px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '20px' }}>Key Specifications & Materials</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {service.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✓</span> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '35px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '20px' }}>Popular Layouts & Options</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {service.layouts.map((lay, idx) => (
                <div key={idx} style={{ background: 'white', padding: '16px', borderRadius: '10px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{lay}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent)', background: 'rgba(142, 123, 109, 0.1)', padding: '4px 10px', borderRadius: '20px' }}>Customizable</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Packages */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '10px' }}>
            Investment Tiers for {service.title}
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>
            Transparent pricing with zero hidden costs. Includes 10-year warranty & 45-day delivery commitment.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {service.packages.map((pkg, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: idx === 1 ? 'var(--bg-primary)' : 'var(--bg-secondary)', 
                  border: idx === 1 ? '2px solid var(--accent)' : '1px solid #eee', 
                  padding: '35px 25px', 
                  borderRadius: '16px', 
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                {idx === 1 && (
                  <span style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px', letterSpacing: '1px' }}>
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{pkg.name}</h3>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '15px' }}>{pkg.price}</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.6' }}>{pkg.desc}</p>
                </div>
                <button className={idx === 1 ? 'btn-primary' : 'btn-outline'} style={{ width: '100%' }} onClick={() => setIsModalOpen(true)}>
                  Choose {pkg.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ background: 'var(--accent)', color: 'white', padding: '50px 30px', borderRadius: '20px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: '15px', fontFamily: 'var(--font-heading)' }}>Ready to Transform Your Space?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 30px auto' }}>
            Speak directly with our architectural designers for a 3D layout plan and material selection.
          </p>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: 'var(--accent)', padding: '16px 36px', fontWeight: 'bold' }}>
            SCHEDULE FREE DESIGN SESSION
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
