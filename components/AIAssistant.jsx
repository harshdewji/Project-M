"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  Calendar, 
  ChevronDown,
  Compass,
  Home,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import './AIAssistant.css';

// Live Portfolio Spaces from Studio Arka
const PORTFOLIO_SPACES = [
  {
    id: 'kitchen',
    title: 'Modern Organic Kitchen',
    category: 'Modular Kitchen',
    image: '/assets/modern_kitchen_homelane_style_1777577519367.png',
    projectId: 1,
    tag: 'BWP Marine Ply • Blum Hardware',
    rate: 'From ₹2,000/sq.ft',
    desc: 'Handleless matte cabinetry, quartz waterfall island, Blum Legrabox drawers.'
  },
  {
    id: 'living',
    title: 'Luxury Living Lounge',
    category: 'Living Room',
    image: '/assets/luxury_living_room_homelane_style_1777577556206.png',
    projectId: 3,
    tag: 'Travertine Accent • Cove Lights',
    rate: 'From ₹1,200/sq.ft',
    desc: 'Fluted wood slat acoustic paneling, backlit stone TV console, ambient 2700K lighting.'
  },
  {
    id: 'bedroom',
    title: 'Minimalist Master Bedroom',
    category: 'Master Bedroom',
    image: '/assets/portfolio_modern_bedroom_1776973196356.png',
    projectId: 4,
    tag: 'Japandi Sanctuary • Limewash',
    rate: 'From ₹1,000/sq.ft',
    desc: 'Full-width linen headboard, concealed bedside LED sconces, acoustic calming walls.'
  },
  {
    id: 'wardrobe',
    title: 'Bespoke Wardrobe System',
    category: 'Storage & Closets',
    image: '/assets/modern_wardrobe_homelane_style_1777577538135.png',
    projectId: 2,
    tag: 'Tinted Glass • Sensor Lighting',
    rate: 'From ₹1,400/sq.ft',
    desc: 'Floor-to-ceiling closets, sliding tinted glass shutters, suede organizer trays.'
  },
  {
    id: 'dining',
    title: 'Contemporary Dining Hub',
    category: 'Dining Space',
    image: '/assets/dining_organic_new.png',
    projectId: 6,
    tag: 'Statuario Marble • Brass Accents',
    rate: 'From ₹900/sq.ft',
    desc: 'Book-matched Italian marble dining table with custom sculptural pendant.'
  },
  {
    id: 'office',
    title: 'Executive Commercial Office',
    category: 'Commercial Spaces',
    image: '/assets/office_organic_new.png',
    projectId: 5,
    tag: 'Biophilic • Ergonomic Acoustics',
    rate: 'From ₹700/sq.ft',
    desc: 'Acoustic oak baffles, private executive cabin, and biophilic planter partitions.'
  }
];

// Live Aesthetic Options per space
const AESTHETIC_STYLES = {
  kitchen: [
    {
      id: 'organic_kitchen',
      name: 'Organic Modern Minimalist',
      image: '/assets/modern_kitchen_homelane_style_1777577519367.png',
      desc: 'Seamless handleless shutters, quartz countertops, warm earth tones',
      palette: ['#FAF8F5', '#E5DDD3', '#C7B7A3', '#8E7B6D', '#2E2722'],
      tags: ['Warm Alabaster', 'Travertine', 'Natural Oak', 'Warm Bronze', 'Espresso']
    },
    {
      id: 'luxury_kitchen',
      name: 'High-Gloss Contemporary Luxury',
      image: '/assets/hero_interior_1776973180953.png',
      desc: 'Acrylic glass shutters, brushed brass channels, Neolith sintered stone',
      palette: ['#FFFFFF', '#D4AF37', '#8E7B6D', '#242933', '#0F1218'],
      tags: ['Pure White', 'Brushed Brass', 'Bronze Mirror', 'Charcoal', 'Black Onyx']
    }
  ],
  living: [
    {
      id: 'travertine_living',
      name: 'Contemporary Travertine & Wood',
      image: '/assets/luxury_living_room_homelane_style_1777577556206.png',
      desc: 'Fluted wood slats, backlit travertine marble TV console, indirect 2700K lighting',
      palette: ['#FAF8F5', '#E5DDD3', '#C7B7A3', '#8E7B6D', '#2E2722'],
      tags: ['Travertine Cream', 'Limestone', 'Fluted Oak', 'Warm Bronze', 'Charcoal']
    },
    {
      id: 'scandi_living',
      name: 'Nordic Zen Minimalist',
      image: '/assets/hero_interior_1776973180953.png',
      desc: 'Airy neutral palette, curved linen sofa, light ash cabinetry and natural sunlight',
      palette: ['#FFFFFF', '#ECECEC', '#A3A3A3', '#5E707F', '#2D3436'],
      tags: ['Chalk White', 'Ash Wood', 'Sage Fog', 'Deep Slate', 'Iron Black']
    }
  ],
  bedroom: [
    {
      id: 'japandi_bedroom',
      name: 'Japandi Organic Sanctuary',
      image: '/assets/portfolio_modern_bedroom_1776973196356.png',
      desc: 'Wabi-sabi limewash walls, custom upholstered linen headboard, low platform bed',
      palette: ['#F5F5F0', '#E2DCD2', '#B9AAA0', '#7A6B60', '#1F1E1D'],
      tags: ['Rice Paper', 'Raw Linen', 'Blonde Hinoki', 'Clay Earth', 'Sumi Black']
    },
    {
      id: 'modern_bedroom',
      name: 'Contemporary Hotel Suite',
      image: '/assets/bedroom_organic_new.png',
      desc: 'Full-height acoustic fabric panelling, concealed perimeter LED glow, study nook',
      palette: ['#FAF8F5', '#E8DFD5', '#C2B29F', '#8E7B6D', '#3B322C'],
      tags: ['Cashmere', 'Warm Grey', 'Smoked Walnut', 'Champagne Brass', 'Mink']
    }
  ],
  wardrobe: [
    {
      id: 'glass_wardrobe',
      name: 'Smoked Glass & Suede Luxury',
      image: '/assets/modern_wardrobe_homelane_style_1777577538135.png',
      desc: 'Floor-to-ceiling tinted sliding shutters, automatic sensor LEDs, watch organizers',
      palette: ['#1C1B1A', '#38332E', '#8E7B6D', '#C2B29F', '#FAF8F5'],
      tags: ['Smoked Glass', 'Dark Bronze', 'Caramel Suede', 'Champagne', 'Warm Alabaster']
    }
  ],
  dining: [
    {
      id: 'marble_dining',
      name: 'Statuario Marble & Fluted Wood',
      image: '/assets/dining_organic_new.png',
      desc: 'Book-matched Italian marble, custom brass chandelier, minimalist credenza',
      palette: ['#FAF9F6', '#E5E4E2', '#C2B29F', '#8E7B6D', '#2B2825'],
      tags: ['Statuario White', 'Carrara Grey', 'Warm Taupe', 'Bronze', 'Charcoal']
    }
  ],
  office: [
    {
      id: 'biophilic_office',
      name: 'Biophilic Executive Studio',
      image: '/assets/office_organic_new.png',
      desc: 'Acoustic oak slat baffles, integrated planters, ergonomic cantilever desk',
      palette: ['#FFFFFF', '#EAEAEA', '#B3BCB7', '#607268', '#1F2923'],
      tags: ['Clean White', 'Light Oak', 'Eucalyptus', 'Deep Spruce', 'Matte Black']
    }
  ]
};

const HOME_CONFIGS = [
  { id: '1bhk', label: '1 BHK', sqft: '550 - 700 sq.ft', est: '₹5.5L - ₹9.5 Lakhs' },
  { id: '2bhk', label: '2 BHK', sqft: '950 - 1,200 sq.ft', est: '₹8.5L - ₹15 Lakhs' },
  { id: '3bhk', label: '3 BHK', sqft: '1,350 - 1,750 sq.ft', est: '₹12L - ₹22 Lakhs' },
  { id: '4bhk', label: '4 BHK / Villa', sqft: '2,200+ sq.ft', est: '₹25L - ₹45+ Lakhs' },
  { id: 'custom', label: 'Single Room / Custom', sqft: '150 - 400 sq.ft', est: '₹2.5L - ₹6.5 Lakhs' }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [copiedHex, setCopiedHex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Interactive consultation flow state
  const [consultationState, setConsultationState] = useState({
    step: 1, // 1: space selection, 2: aesthetic selection, 3: config selection, 4: concept presentation
    selectedSpace: null,
    selectedAesthetic: null,
    selectedConfig: null
  });

  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize initial message and auto-open on visitor arrival
  useEffect(() => {
    initChat();
    // Auto-open on initial visit if not manually closed in current session
    const hasClosed = typeof window !== 'undefined' && sessionStorage.getItem('arka_ai_closed');
    if (!hasClosed) {
      const openTimer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(openTimer);
    } else {
      const teaserTimer = setTimeout(() => {
        setShowTeaser(true);
      }, 2500);
      return () => clearTimeout(teaserTimer);
    }
  }, []);

  const initChat = () => {
    setConsultationState({
      step: 1,
      selectedSpace: null,
      selectedAesthetic: null,
      selectedConfig: null
    });
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        sender: 'assistant',
        text: `### Welcome to Studio Arka\nI'm **Muskan's AI Architectural Consultant**.\n\nLet's design your space together! **Which room are you planning to transform?** Tap any completed project from our live portfolio below:`,
        interactiveType: 'spaces_grid'
      }
    ]);
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  };

  // Crucial: Keep the scroll strictly at the TOP of the welcome message when starting/opening!
  useEffect(() => {
    if (isOpen) {
      setShowTeaser(false);
      if (messages.length <= 1) {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = 0;
        }
        requestAnimationFrame(() => {
          if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = 0;
          }
        });
      }
    }
  }, [isOpen, messages]);

  // Smooth scroll to the top of newly added messages
  const scrollToNewMessage = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const rows = messagesContainerRef.current.querySelectorAll('.ai-message-row');
        if (rows.length > 0) {
          const lastAssistantRow = rows[rows.length - 1];
          lastAssistantRow?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 120);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('arka_ai_closed', 'true');
    }
  };

  // Global event listener
  useEffect(() => {
    const handleOpen = (e) => {
      setIsOpen(true);
      setShowTeaser(false);
      if (e.detail?.prompt) {
        handleSendCustomMessage(e.detail.prompt);
      }
    };
    window.addEventListener('open-ai-assistant', handleOpen);
    return () => window.removeEventListener('open-ai-assistant', handleOpen);
  }, []);

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleOpenConsultationModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-consultation-modal'));
    }
  };

  const handleWhatsAppChat = (customText = "") => {
    const spaceTitle = consultationState.selectedSpace?.title || "Interior Project";
    const styleName = consultationState.selectedAesthetic?.name || "";
    const configName = consultationState.selectedConfig?.label || "";
    const text = encodeURIComponent(
      customText || `Hello Muskan! I was consulting Arka AI about my project: ${spaceTitle} (${styleName}, ${configName}). I would like to schedule a 3D design session.`
    );
    window.open(`https://wa.me/916232793125?text=${text}`, '_blank');
  };

  // Step 1: User selects a Space from live portfolio examples
  const handleSelectSpace = (space) => {
    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: `I'd like to design my ${space.category} — inspired by your "${space.title}".`
    };

    const aestheticOptions = AESTHETIC_STYLES[space.id] || AESTHETIC_STYLES['living'];

    const aiResponse = {
      id: 'ai-' + Date.now(),
      sender: 'assistant',
      text: `### Great Choice! "${space.title}"\n${space.desc}\n\n**Which design aesthetic speaks to you most?** Here are live design directions from Muskan's portfolio:`,
      interactiveType: 'aesthetics_grid',
      spaceId: space.id,
      aestheticOptions
    };

    setConsultationState(prev => ({ ...prev, step: 2, selectedSpace: space }));
    setMessages(prev => [...prev, userMsg, aiResponse]);
    scrollToNewMessage();
  };

  // Step 2: User selects an Aesthetic movement
  const handleSelectAesthetic = (aesthetic) => {
    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: `I love the "${aesthetic.name}" aesthetic.`
    };

    const aiResponse = {
      id: 'ai-' + Date.now(),
      sender: 'assistant',
      text: `### Selected Aesthetic: ${aesthetic.name}\n${aesthetic.desc}\n\n**What is the size or configuration of your home?** This helps me calculate an accurate budget and material schedule:`,
      interactiveType: 'configs_grid'
    };

    setConsultationState(prev => ({ ...prev, step: 3, selectedAesthetic: aesthetic }));
    setMessages(prev => [...prev, userMsg, aiResponse]);
    scrollToNewMessage();
  };

  // Step 3: User selects home configuration -> AI shows complete bespoke concept!
  const handleSelectConfig = (config) => {
    const currentSpace = consultationState.selectedSpace || PORTFOLIO_SPACES[0];
    const currentAesthetic = consultationState.selectedAesthetic || (AESTHETIC_STYLES[currentSpace.id]?.[0] || AESTHETIC_STYLES.living[0]);

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: `My home configuration is ${config.label} (${config.sqft}).`
    };

    const conceptMsg = {
      id: 'ai-concept-' + Date.now(),
      sender: 'assistant',
      text: `### Architectural Concept Brief\nHere is your custom design plan tailored by Studio Arka:\n\n* **Space:** ${currentSpace.title} (${config.label})\n* **Material Focus:** BWP 710 Marine Plywood, German Blum hardware, concealed 2700K ambient illumination.\n* **Estimated Investment:** **${config.est}** (Turnkey delivery in 45-60 days with 10-year warranty).`,
      interactiveType: 'concept_card',
      conceptData: {
        space: currentSpace,
        aesthetic: currentAesthetic,
        config: config
      }
    };

    setConsultationState(prev => ({ ...prev, step: 4, selectedConfig: config }));
    setMessages(prev => [...prev, userMsg, conceptMsg]);
    scrollToNewMessage();
  };

  // Custom free-form chat message handler
  const handleSendCustomMessage = async (customPrompt) => {
    const query = (customPrompt || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    scrollToNewMessage();

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text })),
          currentPrompt: query
        })
      });

      const data = await response.json();

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: data.text || "Thank you. Could you share your room type or approximate square footage?",
        palette: data.palette || null,
        projectRef: data.projectRef || null,
        estimate: data.estimate || null,
        suggestedPrompts: data.suggestedPrompts || ["Estimate my project cost", "View kitchen portfolio", "Book 3D Session"]
      };

      setMessages(prev => [...prev, aiMsg]);
      scrollToNewMessage();
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: "I encountered a minor network pause. Please feel free to retry or connect with Muskan on WhatsApp directly (+91 6232793125)."
        }
      ]);
      scrollToNewMessage();
    } finally {
      setIsLoading(false);
    }
  };

  // Formatter for markdown-like text
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    const lines = rawText.split('\n');

    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="ai-markdown-h4">{line.replace('### ', '')}</h4>;
      }
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const itemText = line.trim().replace(/^[\*\-]\s+/, '');
        return (
          <li key={idx} className="ai-markdown-li">
            {formatBold(itemText)}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="ai-markdown-spacer" />;
      }
      return (
        <p key={idx} className="ai-markdown-p">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="ai-highlight">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Proactive Floating Visitor Teaser Bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="ai-proactive-teaser"
          >
            <div className="teaser-avatar">
              <img src="/assets/muskan.jpg" alt="Muskan Dewangan" />
              <span className="teaser-dot" />
            </div>
            <div className="teaser-content" onClick={() => setIsOpen(true)}>
              <span className="teaser-title">Muskan's AI Architectural Assistant</span>
              <p className="teaser-text">
                👋 Planning a design project? Let me ask 3 quick questions with <strong>live examples from our portfolio</strong> to find your style & budget!
              </p>
              <button className="teaser-cta">
                <Sparkles size={13} /> Start Visual Discovery →
              </button>
            </div>
            <button 
              className="teaser-close" 
              onClick={(e) => { e.stopPropagation(); setShowTeaser(false); }}
              aria-label="Close message"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <div className="arka-ai-launcher-wrapper">
        <button 
          className={`arka-ai-launcher-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Arka AI Consultant"
        >
          <div className="launcher-sparkle-glow" />
          <div className="launcher-icon-box">
            {isOpen ? <X size={24} /> : <Sparkles size={25} />}
          </div>
          <span className="launcher-label">
            <strong>Arka AI</strong>
            <small>Live Portfolio Assistant</small>
          </span>
          {!isOpen && <span className="launcher-pulse-badge" />}
        </button>
      </div>

      {/* Interactive Architectural Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="arka-ai-chat-window"
          >
            {/* Header */}
            <div className="ai-window-header">
              <div className="ai-header-brand">
                <div className="ai-designer-avatar">
                  <img src="/assets/muskan.jpg" alt="Muskan Dewangan" />
                </div>
                <div>
                  <div className="ai-title-row">
                    <h3>Studio Arka AI</h3>
                    <span className="ai-live-dot" title="Online" />
                  </div>
                  <p className="ai-subtitle">Muskan Dewangan • Lead Architect Assistant</p>
                </div>
              </div>

              <div className="ai-header-controls">
                <button 
                  className="ai-ctrl-btn" 
                  onClick={initChat} 
                  title="Restart discovery"
                  aria-label="Restart chat"
                >
                  <RotateCcw size={15} />
                </button>
                <button 
                  className="ai-ctrl-btn close" 
                  onClick={handleClose} 
                  title="Minimize"
                  aria-label="Minimize chat"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="ai-messages-container" ref={messagesContainerRef}>
              {messages.map((msg) => (
                <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
                  {msg.sender === 'assistant' && (
                    <div className="ai-bubble-avatar">
                      <Sparkles size={14} />
                    </div>
                  )}

                  <div className="ai-message-bubble">
                    {/* Formatted Text */}
                    <div className="ai-message-content">
                      {renderFormattedText(msg.text)}
                    </div>

                    {/* Step 1 Interactive: Live Portfolio Spaces Grid */}
                    {msg.interactiveType === 'spaces_grid' && (
                      <div className="ai-interactive-spaces">
                        <span className="interactive-guide-label">
                          Tap a completed space to see real specifications:
                        </span>
                        <div className="spaces-cards-grid">
                          {PORTFOLIO_SPACES.map((space) => (
                            <div 
                              key={space.id} 
                              className="space-card-item"
                              onClick={() => handleSelectSpace(space)}
                            >
                              <div className="space-card-img">
                                <img src={space.image} alt={space.title} />
                                <span className="space-rate-pill">{space.rate}</span>
                              </div>
                              <div className="space-card-body">
                                <h5>{space.title}</h5>
                                <p className="space-card-tag">{space.tag}</p>
                                <span className="space-card-cta">
                                  Select Space <ArrowRight size={12} />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2 Interactive: Live Aesthetic Options Comparison */}
                    {msg.interactiveType === 'aesthetics_grid' && msg.aestheticOptions && (
                      <div className="ai-interactive-aesthetics">
                        <span className="interactive-guide-label">
                          Choose an aesthetic movement from our projects:
                        </span>
                        <div className="aesthetics-cards-stack">
                          {msg.aestheticOptions.map((aes) => (
                            <div 
                              key={aes.id}
                              className="aesthetic-card-item"
                              onClick={() => handleSelectAesthetic(aes)}
                            >
                              <div className="aes-thumb">
                                <img src={aes.image} alt={aes.name} />
                              </div>
                              <div className="aes-info">
                                <h5>{aes.name}</h5>
                                <p>{aes.desc}</p>
                                <div className="mini-palette-row">
                                  {aes.palette.map((c, ci) => (
                                    <span key={ci} className="mini-color-dot" style={{ backgroundColor: c }} />
                                  ))}
                                </div>
                                <span className="aes-select-pill">
                                  Select This Aesthetic <ArrowRight size={12} />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3 Interactive: Home Configuration Cards */}
                    {msg.interactiveType === 'configs_grid' && (
                      <div className="ai-interactive-configs">
                        <span className="interactive-guide-label">
                          Select your apartment or villa size:
                        </span>
                        <div className="config-cards-list">
                          {HOME_CONFIGS.map((cfg) => (
                            <button
                              key={cfg.id}
                              className="config-card-btn"
                              onClick={() => handleSelectConfig(cfg)}
                            >
                              <div className="config-btn-left">
                                <Home size={16} />
                                <div>
                                  <strong>{cfg.label}</strong>
                                  <small>{cfg.sqft}</small>
                                </div>
                              </div>
                              <span className="config-btn-est">{cfg.est}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4 Interactive: Bespoke Concept Card Result */}
                    {msg.interactiveType === 'concept_card' && msg.conceptData && (
                      <div className="ai-final-concept-card">
                        <div className="concept-card-hero">
                          <img src={msg.conceptData.space.image} alt={msg.conceptData.space.title} />
                          <div className="concept-hero-overlay">
                            <span className="concept-badge">Portfolio Reference #{msg.conceptData.space.projectId}</span>
                            <h4>{msg.conceptData.aesthetic.name}</h4>
                          </div>
                        </div>

                        {/* Color Palette Swatches with click-to-copy */}
                        <div className="concept-palette-box">
                          <span className="palette-label">Architectural Color Harmony:</span>
                          <div className="palette-swatches-row">
                            {msg.conceptData.aesthetic.palette.map((hex, hIdx) => (
                              <button
                                key={hIdx}
                                className="palette-swatch"
                                style={{ backgroundColor: hex }}
                                onClick={() => handleCopyHex(hex)}
                                title={`Copy ${hex}`}
                              >
                                <span className="swatch-label">
                                  {copiedHex === hex ? <Check size={10} /> : hex}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="concept-action-btns">
                          <button 
                            className="ai-action-btn primary"
                            onClick={handleOpenConsultationModal}
                          >
                            <Calendar size={14} /> Book Free 3D Session
                          </button>
                          <button 
                            className="ai-action-btn whatsapp"
                            onClick={() => handleWhatsAppChat()}
                          >
                            <MessageSquare size={14} /> Send to Muskan on WhatsApp
                          </button>
                          <button 
                            className="ai-action-btn restart"
                            onClick={initChat}
                          >
                            <RotateCcw size={13} /> Design Another Space
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Free-form Palette Card */}
                    {msg.palette && (
                      <div className="ai-card-palette">
                        <div className="palette-card-header">
                          <Compass size={14} />
                          <span>{msg.palette.name || "Curated Architectural Palette"}</span>
                        </div>
                        <div className="palette-swatches-row">
                          {msg.palette.colors.map((hex, cIdx) => (
                            <button
                              key={cIdx}
                              className="palette-swatch"
                              style={{ backgroundColor: hex }}
                              onClick={() => handleCopyHex(hex)}
                              title={`Copy ${hex}`}
                            >
                              <span className="swatch-label">
                                {copiedHex === hex ? <Check size={11} /> : hex}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Free-form Project Reference Card */}
                    {msg.projectRef && (
                      <div className="ai-card-project">
                        <div className="project-thumbnail-wrapper">
                          <img src={msg.projectRef.image} alt={msg.projectRef.title} />
                        </div>
                        <div className="project-card-details">
                          <h5>{msg.projectRef.title}</h5>
                          <Link 
                            href={`/portfolio/${msg.projectRef.id}`} 
                            className="project-view-link"
                            onClick={() => setIsOpen(false)}
                          >
                            Explore Project Details <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Suggested Prompts */}
                    {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                      <div className="ai-prompts-tray">
                        {msg.suggestedPrompts.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            className="ai-prompt-chip"
                            onClick={() => handleSendCustomMessage(prompt)}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-message-row assistant">
                  <div className="ai-bubble-avatar">
                    <Sparkles size={14} />
                  </div>
                  <div className="ai-message-bubble loading">
                    <span className="ai-dot-pulse"></span>
                    <span className="ai-dot-pulse"></span>
                    <span className="ai-dot-pulse"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form 
              className="ai-input-wrapper"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendCustomMessage();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask any design question or select above..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="ai-send-btn" 
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send query"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
