"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ConsultationModal from '@/components/ConsultationModal';

const kitchenImg = '/assets/modern_kitchen_homelane_style_1777577519367.png';
const wardrobeImg = '/assets/modern_wardrobe_homelane_style_1777577538135.png';
const livingImg = '/assets/luxury_living_room_homelane_style_1777577556206.png';
const bedroomImg = '/assets/portfolio_modern_bedroom_1776973196356.png';
const bedroomOrganic = '/assets/bedroom_organic_new.png';
const bedroomBefore = '/assets/bedroom_before_1776974957520.png';
const officeImg = '/assets/office_organic_new.png';
const diningImg = '/assets/dining_organic_new.png';
const bathImg = '/assets/bathroom_organic_new.png';
const techLiving = '/assets/interior_technical_drawing_living_room_1777622685705.png';
const techBed = '/assets/master_bedroom_technical_plans_1777626603834.png';
const compImg = '/assets/site_execution_comparison_set_1777622725474.png';

const portfolioProjects = {
  '1': {
    id: 1,
    slug: '1',
    title: 'Modern Organic Kitchen',
    category: 'Residential',
    location: 'Jubilee Hills, Hyderabad',
    area: '380 sq.ft',
    year: '2024',
    timeline: '35 Days',
    image: kitchenImg,
    gallery: [kitchenImg, diningImg, techLiving, compImg],
    tagline: 'Warm minimalism meets culinary precision',
    description: 'Designed for a passion passionate host, this modern organic kitchen seamlessly blends hand-crafted oak veneer with matte quartz surfaces and hidden appliance pantries.',
    blueprint: techLiving,
    specs: ['Boiling Water Proof Ply', 'Matte Quartz Countertops', 'Blum Soft-Close Tandembox', 'Under-Cabinet Task Lighting'],
    testimonial: 'Studio Arka brought our vision to life beyond expectations. The ergonomic workflow in our kitchen makes cooking an absolute pleasure.',
    client: 'Ananya & Rohan Sharma'
  },
  '2': {
    id: 2,
    slug: '2',
    title: 'Bespoke Wardrobe System',
    category: 'Residential',
    location: 'Banjara Hills, Hyderabad',
    area: '260 sq.ft',
    year: '2024',
    timeline: '25 Days',
    image: wardrobeImg,
    gallery: [wardrobeImg, bedroomOrganic, techBed, compImg],
    tagline: 'Floor-to-ceiling luxury closet suite',
    description: 'A custom closet system designed with smoked bronze glass shutters, automated motion-sensor LED lighting, and suede-lined jewelry organizer drawers.',
    blueprint: techBed,
    specs: ['Bronze Aluminum Profiles', 'Tinted Toughened Glass', 'Automated LED Sensors', 'Suede Velvet Drawers'],
    testimonial: 'The wardrobe organization transformed our daily routine. Every piece has its dedicated space with editorial lighting.',
    client: 'Dr. Priya Varma'
  },
  '3': {
    id: 3,
    slug: '3',
    title: 'Luxury Living Concept',
    category: 'Residential',
    location: 'Gachibowli, Hyderabad',
    area: '750 sq.ft',
    year: '2024',
    timeline: '45 Days',
    image: livingImg,
    gallery: [livingImg, officeImg, techLiving, compImg],
    tagline: 'Architectural media wall & curved reception lounge',
    description: 'Featuring a floor-to-ceiling fluted wooden slat accent wall, an Italian statuario marble TV console, and warm indirect cove lighting for formal and casual entertaining.',
    blueprint: techLiving,
    specs: ['Italian Statuario Marble', 'Fluted Teak Wood Panels', 'Concealed Ambient LED', 'Custom Velvet Curved Sofa'],
    testimonial: 'The living room leaves every guest awestruck. The balance between warm textures and modern lighting is sheer perfection.',
    client: 'Vikram & Sunita Mehta'
  },
  '4': {
    id: 4,
    slug: '4',
    title: 'Minimalist Bedroom',
    category: 'Residential',
    location: 'Hitec City, Hyderabad',
    area: '320 sq.ft',
    year: '2024',
    timeline: '30 Days',
    image: bedroomImg,
    gallery: [bedroomImg, bedroomOrganic, techBed, bedroomBefore],
    tagline: 'Tactile sanctuary for restful slumber',
    description: 'A serene master bedroom focusing on natural textures, low-profile upholstered platform bed, custom acoustic headboard paneling, and warm dimmable sconces.',
    blueprint: techBed,
    specs: ['Upholstered Acoustic Paneling', 'Floating Oak Nightstands', 'Concealed Work Nook', 'Layered Linen Drapes'],
    testimonial: 'Stepping into this bedroom at the end of a chaotic workday feels like entering a 5-star wellness resort.',
    client: 'Karan Malhotra'
  },
  '5': {
    id: 5,
    slug: '5',
    title: 'Commercial Spaces',
    category: 'Commercial',
    location: 'Kondapur, Hyderabad',
    area: '420 sq.ft',
    year: '2024',
    timeline: '28 Days',
    image: officeImg,
    gallery: [officeImg, livingImg, techLiving, compImg],
    tagline: 'Ergonomic luxury workspace designed for deep focus',
    description: 'An executive suite balancing walnut joinery, sound-dampening acoustic slat panels, integrated display alcoves, and ergonomic executive seating.',
    blueprint: techLiving,
    specs: ['American Walnut Finish', 'Sound-Dampening Felt', 'Integrated Wireless Charging', 'Custom Bookshelf Towers'],
    testimonial: 'My productivity skyrocketed in this space. It projects professionalism during video calls while remaining extremely comfortable.',
    client: 'Siddharth Rao, Founder'
  },
  '6': {
    id: 6,
    slug: '6',
    title: 'Contemporary Dining',
    category: 'Residential',
    location: 'Financial District, Hyderabad',
    area: '290 sq.ft',
    year: '2024',
    timeline: '20 Days',
    image: diningImg,
    gallery: [diningImg, kitchenImg, techLiving, compImg],
    tagline: 'Warm gathering atmosphere with sculptured lighting',
    description: 'Featuring an 8-seater solid oak dining table, sculptural glass pendant chandelier, and a built-in floating crockery console with fluted glass doors.',
    blueprint: techLiving,
    specs: ['Solid White Oak', 'Fluted Glass Crockery Doors', 'Sculptural Glass Pendant', 'Stain-Proof Velvet Chairs'],
    testimonial: 'Family dinners have become our favorite ritual. The dining console and ambient lighting set the most inviting mood.',
    client: 'Meera & Rajesh Reddy'
  }
};

const PortfolioDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = portfolioProjects[id] || portfolioProjects['1'];

  return (
    <div className="portfolio-detail-page section" style={{ paddingTop: '110px' }}>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
          <Link href="/" style={{ color: 'inherit' }}>Home</Link> &nbsp;/&nbsp; 
          <Link href="/portfolio" style={{ color: 'inherit' }}>Portfolio</Link> &nbsp;/&nbsp; 
          <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{project.title}</span>
        </div>

        {/* Title Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '40px' }}>
          <span style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            {project.category} PROJECT Showcase
          </span>
          <h1 className="section-title" style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>{project.tagline}</p>
        </motion.div>

        {/* Project Hero Banner */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ borderRadius: '20px', overflow: 'hidden', height: '480px', marginBottom: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        {/* Quick Project Info Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px', background: 'var(--bg-secondary)', padding: '30px', borderRadius: '16px', marginBottom: '60px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Location</span>
            <p style={{ fontSize: '1rem', fontWeight: '600', marginTop: '5px' }}>{project.location}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Project Area</span>
            <p style={{ fontSize: '1rem', fontWeight: '600', marginTop: '5px' }}>{project.area}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Execution Time</span>
            <p style={{ fontSize: '1rem', fontWeight: '600', marginTop: '5px' }}>{project.timeline}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Year Completed</span>
            <p style={{ fontSize: '1rem', fontWeight: '600', marginTop: '5px' }}>{project.year}</p>
          </div>
        </div>

        {/* Narrative & Specifications Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', marginBottom: '80px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '20px' }}>Architectural Story</h2>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '1.05rem' }}>
              {project.description}
            </p>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Every detail in this space was custom engineered by Studio Arka's lead designers—from structural partition work and custom joinery down to hand-picked textiles and concealed warm LED illumination.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '35px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '20px' }}>Selected Materials & Hardware</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {project.specs.map((spec, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.98rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}></span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Full Image Gallery */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '30px' }}>Project Photo Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {project.gallery.map((imgSrc, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.02 }} style={{ borderRadius: '14px', overflow: 'hidden', height: '300px', background: 'var(--bg-secondary)', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}>
                <img src={imgSrc} alt={`${project.title} Detail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Blueprint Section */}
        {project.blueprint && (
          <div style={{ background: '#1c1b18', color: 'white', padding: '50px 35px', borderRadius: '20px', marginBottom: '80px' }}>
            <div style={{ marginBottom: '30px' }}>
              <span style={{ color: '#d4af37', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 'bold' }}>TECHNICAL ELEVATIONS & BLUEPRINTS</span>
              <h2 style={{ color: 'white', fontFamily: 'var(--font-heading)', marginTop: '8px' }}>Architectural Drafting | Scale 1:50</h2>
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={project.blueprint} alt="Technical Drawings" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
            </div>
          </div>
        )}

        {/* Testimonial Quote */}
        {project.testimonial && (
          <div style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent)', padding: '40px', borderRadius: '0 16px 16px 0', marginBottom: '80px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px', lineHeight: '1.7' }}>
              "{project.testimonial}"
            </p>
            <p style={{ fontWeight: 'bold', color: 'var(--accent)', margin: 0 }}>— {project.client}</p>
          </div>
        )}

        {/* Call To Action */}
        <div style={{ background: 'var(--accent)', color: 'white', padding: '60px 40px', borderRadius: '20px', textAlign: 'center' }}>
          <h2 style={{ color: 'white', marginBottom: '15px', fontFamily: 'var(--font-heading)' }}>Love this design concept?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 30px auto', fontSize: '1.1rem' }}>
            We can customize a similar architectural design layout specifically tailored for your floor plan and budget.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: 'var(--accent)', padding: '16px 36px', fontWeight: 'bold' }}>
              REQUEST SIMILAR DESIGN
            </button>
            <Link href="/contact" className="btn-outline" style={{ borderColor: 'white', color: 'white', padding: '16px 36px', textDecoration: 'none', fontWeight: 'bold' }}>
              CONTACT STUDIO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
