"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Compass, 
  Home, 
  Layers, 
  Calculator, 
  Palette, 
  Check, 
  ArrowRight, 
  Calendar, 
  MessageSquare,
  Maximize2,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import './AIConsultant.css';

const ROOM_OPTIONS = [
  { id: 'Living Room', name: 'Living Room', desc: 'Focal entertainment & social lounge' },
  { id: 'Master Suite', name: 'Master Suite', desc: 'Organic bedroom & dressing sanctuary' },
  { id: 'Modular Kitchen', name: 'Modular Kitchen', desc: 'Precision cabinetry & chef ergonomics' },
  { id: 'Executive Office', name: 'Executive Office', desc: 'Acoustic clarity & modern work hub' },
  { id: 'Dining Room', name: 'Dining Room', desc: 'Sculptural entertaining space' }
];

const VIBE_OPTIONS = [
  { id: 'Organic Modern', name: 'Organic Modern', desc: 'Warm stone, travertine, linen, and curved timber' },
  { id: 'Japandi Minimalist', name: 'Japandi Minimalist', desc: 'Wabi-sabi simplicity, raw limewash, and natural blonde oak' },
  { id: 'Contemporary Luxury', name: 'Contemporary Luxury', desc: 'Midnight bronze, brushed brass, and Statuario marble' },
  { id: 'Scandinavian Zen', name: 'Scandinavian Zen', desc: 'Nordic light, pale ash wood, and sage foliage tones' },
  { id: 'Industrial Loft', name: 'Industrial Loft', desc: 'Raw concrete, blackened steel, and exposed brick accents' }
];

const FINISH_TIERS = [
  { id: 'Standard', name: 'Standard Grade', rate: '₹1,100 / sq.ft', desc: 'High-grade commercial ply, soft-close hardware, acrylic surfaces' },
  { id: 'Premium', name: 'Architectural Premium', rate: '₹1,800 / sq.ft', desc: 'BWP Marine Ply 710, German Blum Legrabox, fluted acoustic paneling' },
  { id: 'Ultra-Luxury', name: 'Bespoke Haute', rate: '₹2,900+ / sq.ft', desc: 'Imported Italian marble, PU matte lacquer, automated smart lighting' }
];

export default function AIConsultantPage({ openModal }) {
  const [selectedRoom, setSelectedRoom] = useState(ROOM_OPTIONS[0].id);
  const [selectedVibe, setSelectedVibe] = useState(VIBE_OPTIONS[0].id);
  const [selectedTier, setSelectedTier] = useState(FINISH_TIERS[1].id);
  const [sqft, setSqft] = useState(300);
  const [requirements, setRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conceptResult, setConceptResult] = useState(null);
  const [copiedHex, setCopiedHex] = useState(null);

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomType: selectedRoom,
          vibe: selectedVibe,
          level: selectedTier,
          sqft: Number(sqft),
          requirements
        })
      });
      const data = await res.json();
      setConceptResult(data);
      // Smooth scroll down to results
      setTimeout(() => {
        document.getElementById('ai-concept-output')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Failed to generate AI concept:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleOpenConsultation = () => {
    if (typeof openModal === 'function') {
      openModal();
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-consultation-modal'));
    }
  };

  const handleOpenChatAssistant = () => {
    if (typeof window !== 'undefined') {
      const promptText = `I just generated an AI concept for a ${selectedTier} ${selectedRoom} (${sqft} sq.ft) in ${selectedVibe} style. Can you explain the lighting strategy and recommended furniture layout for this?`;
      window.dispatchEvent(new CustomEvent('open-ai-assistant', { detail: { prompt: promptText } }));
    }
  };

  const handleWhatsAppShare = () => {
    const summaryText = conceptResult ? 
      `Studio Arka AI Concept: ${conceptResult.summary.vibe} ${conceptResult.summary.roomType} (${conceptResult.summary.sqft} sq.ft) - Est: ${conceptResult.summary.estimatedTotal}` : 
      `Interested in an interior consultation for ${selectedVibe} ${selectedRoom}.`;
    const url = `https://wa.me/916232793125?text=${encodeURIComponent('Hello Studio Arka! ' + summaryText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="ai-consultant-page section" style={{ paddingTop: '120px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-intro text-center">
          <div className="ai-badge-header">
            <Sparkles size={16} />
            <span>STUDIO ARKA ARCHITECTURAL INTELLIGENCE</span>
          </div>
          <h1 className="section-title">AI Design Studio</h1>
          <p className="ai-header-sub">
            Generate custom architectural concepts, tailored material specifications, color harmonies, and precision investment models in real-time.
          </p>
        </div>

        {/* Configurator Card */}
        <div className="ai-configurator-card">
          <form onSubmit={handleGenerate}>
            {/* Step 1: Space Type */}
            <div className="config-block">
              <label className="config-label">
                <span className="step-num">01</span> Select Space Typology
              </label>
              <div className="config-grid room-grid">
                {ROOM_OPTIONS.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    className={`config-tile ${selectedRoom === room.id ? 'active' : ''}`}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <h4>{room.name}</h4>
                    <p>{room.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Aesthetic Philosophy */}
            <div className="config-block">
              <label className="config-label">
                <span className="step-num">02</span> Choose Aesthetic Movement
              </label>
              <div className="config-grid vibe-grid">
                {VIBE_OPTIONS.map((vibe) => (
                  <button
                    key={vibe.id}
                    type="button"
                    className={`config-tile ${selectedVibe === vibe.id ? 'active' : ''}`}
                    onClick={() => setSelectedVibe(vibe.id)}
                  >
                    <h4>{vibe.name}</h4>
                    <p>{vibe.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Area & Finish Tier */}
            <div className="config-block two-col">
              <div>
                <label className="config-label">
                  <span className="step-num">03</span> Carpet Area (sq.ft)
                </label>
                <div className="sqft-slider-wrapper">
                  <div className="sqft-display">
                    <strong>{sqft}</strong> <span>sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1500"
                    step="25"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    className="custom-range-slider"
                  />
                  <div className="range-marks">
                    <span>100 sq.ft</span>
                    <span>750 sq.ft</span>
                    <span>1500+ sq.ft</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="config-label">
                  <span className="step-num">04</span> Material & Execution Tier
                </label>
                <div className="tier-selector">
                  {FINISH_TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      className={`tier-chip ${selectedTier === tier.id ? 'active' : ''}`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      <div className="tier-top">
                        <span className="tier-name">{tier.name}</span>
                        <span className="tier-rate">{tier.rate}</span>
                      </div>
                      <p className="tier-desc">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 5: Specific Requests */}
            <div className="config-block">
              <label className="config-label">
                <span className="step-num">05</span> Bespoke Priorities or Requirements (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Pet-friendly textiles, cove lighting, integrated workstation, maximum wardrobe storage..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="ai-notes-input"
              />
            </div>

            {/* CTA Button */}
            <div className="config-actions">
              <button 
                type="submit" 
                className="btn-primary generate-cta"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="ai-btn-spinner" />
                    <span>Architecting Design Concept...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>GENERATE ARCHITECTURAL CONCEPT</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Output Section */}
        <div id="ai-concept-output">
          <AnimatePresence>
            {conceptResult && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="concept-results-container"
              >
                {/* Result Header */}
                <div className="concept-results-header">
                  <div>
                    <span className="concept-tagline">AI ARCHITECTURAL BRIEF</span>
                    <h2 className="concept-title">{conceptResult.summary.vibe} {conceptResult.summary.roomType}</h2>
                    <p className="concept-narrative">{conceptResult.summary.narrative}</p>
                  </div>
                  <div className="concept-estimate-badge">
                    <span className="est-label">Estimated Investment</span>
                    <span className="est-val">{conceptResult.summary.estimatedTotal}</span>
                    <span className="est-timeline">Timeline: {conceptResult.summary.timeline}</span>
                  </div>
                </div>

                {/* 5-Color Architectural Palette */}
                <div className="concept-card palette-section">
                  <div className="card-header-row">
                    <Palette size={20} color="var(--accent)" />
                    <h3>Curated Color & Material Harmony</h3>
                  </div>
                  <div className="concept-swatches-grid">
                    {conceptResult.palette.colors.map((hex, idx) => (
                      <div 
                        key={idx} 
                        className="swatch-card" 
                        onClick={() => handleCopyColor(hex)}
                        title="Click to copy HEX"
                      >
                        <div className="swatch-color-box" style={{ backgroundColor: hex }}>
                          <span className="swatch-copy-status">
                            {copiedHex === hex ? <Check size={14} /> : hex}
                          </span>
                        </div>
                        <span className="swatch-name">{conceptResult.palette.labels[idx]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Investment Grid */}
                <div className="concept-dual-grid">
                  {/* Material Specs */}
                  <div className="concept-card">
                    <div className="card-header-row">
                      <Layers size={20} color="var(--accent)" />
                      <h3>Architectural Material Strategy</h3>
                    </div>
                    <ul className="material-spec-list">
                      {conceptResult.materials.map((mat, mIdx) => (
                        <li key={mIdx}>
                          <strong>{mat.category}:</strong>
                          <span>{mat.spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Budget Allocation Breakdown */}
                  <div className="concept-card">
                    <div className="card-header-row">
                      <Calculator size={20} color="var(--accent)" />
                      <h3>Scope & Investment Breakdown</h3>
                    </div>
                    <div className="budget-breakdown-list">
                      {conceptResult.breakdown.map((item, bIdx) => (
                        <div key={bIdx} className="breakdown-row">
                          <div className="breakdown-info">
                            <span className="breakdown-name">{item.item}</span>
                            <span className="breakdown-pct">{item.percentage}</span>
                          </div>
                          <span className="breakdown-cost">{item.approx}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Matched Project Showcase */}
                {conceptResult.matchedProject && (
                  <div className="concept-card matched-project-card">
                    <div className="matched-thumb">
                      <img src={conceptResult.matchedProject.image} alt={conceptResult.matchedProject.title} />
                    </div>
                    <div className="matched-details">
                      <span className="subtitle">STUDIO ARKA EXECUTION</span>
                      <h3>Reference: {conceptResult.matchedProject.title}</h3>
                      <p>
                        We have executed spaces with this exact architectural language. Explore the full photography, layout blueprints, and specifications.
                      </p>
                      <Link 
                        href={`/portfolio/${conceptResult.matchedProject.id}`} 
                        className="btn-secondary" 
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                      >
                        VIEW EXECUTED PROJECT <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}

                {/* Actions Handoff */}
                <div className="concept-action-bar">
                  <button className="btn-primary" onClick={handleOpenConsultation}>
                    <Calendar size={16} /> BOOK FREE 3D DESIGN SESSION
                  </button>
                  <button className="btn-secondary" onClick={handleWhatsAppShare}>
                    <MessageSquare size={16} /> DISCUSS ON WHATSAPP
                  </button>
                  <button className="btn-secondary ai-chat-cta" onClick={handleOpenChatAssistant}>
                    <Sparkles size={16} /> REFINE WITH ARKA AI CHAT
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

