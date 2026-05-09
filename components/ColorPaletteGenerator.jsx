"use client";

import React, { useState } from 'react';
import { Palette, Copy, Check } from 'lucide-react';
import './ColorPaletteGenerator.css';

const vibes = [
  { 
    id: 'zen', 
    name: 'Earthy Zen', 
    colors: ['#F5F5F0', '#D2B48C', '#8F9779', '#4A5D4E', '#2C362D'] 
  },
  { 
    id: 'scandi', 
    name: 'Nordic Chill', 
    colors: ['#FFFFFF', '#ECECEC', '#A3A3A3', '#5E707F', '#2D3436'] 
  },
  { 
    id: 'sunset', 
    name: 'Desert Sunset', 
    colors: ['#F9F1E7', '#E8C3A9', '#D98B61', '#A64B2A', '#4D241C'] 
  },
  { 
    id: 'royal', 
    name: 'Midnight Royal', 
    colors: ['#F8F9FA', '#D4AF37', '#1B263B', '#0D1B2A', '#000814'] 
  },
  { 
    id: 'modern', 
    name: 'Organic Modern', 
    colors: ['#FAF9F6', '#E5E4E2', '#C2B280', '#8B8589', '#363636'] 
  }
];

const ColorPaletteGenerator = () => {
  const [selectedVibe, setSelectedVibe] = useState(vibes[0]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (color, index) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="palette-generator">
      <div className="palette-header">
        <Palette className="palette-icon" />
        <div>
          <h3>AI Style Vibe Generator</h3>
          <p>Pick a mood and get a curated design palette</p>
        </div>
      </div>

      <div className="vibe-selector">
        {vibes.map(vibe => (
          <button 
            key={vibe.id}
            className={`vibe-chip ${selectedVibe.id === vibe.id ? 'active' : ''}`}
            onClick={() => setSelectedVibe(vibe)}
          >
            {vibe.name}
          </button>
        ))}
      </div>

      <div className="palette-display">
        {selectedVibe.colors.map((color, idx) => (
          <div 
            key={idx}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => handleCopy(color, idx)}
          >
            <div className="color-overlay">
              {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
              <span>{color}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="palette-footer">
        <p>Tip: Use the lightest color for walls and darkest for accents.</p>
        <button className="btn-outline full-width">Download Vibe PDF</button>
      </div>
    </div>
  );
};

export default ColorPaletteGenerator;
