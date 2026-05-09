"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Info, CheckCircle } from 'lucide-react';
import './BudgetCalculator.css';

const roomTypes = [
  { id: 'living', name: 'Living Room', basePrice: 1200 },
  { id: 'bedroom', name: 'Master Bedroom', basePrice: 1000 },
  { id: 'kitchen', name: 'Modular Kitchen', basePrice: 2000 },
  { id: 'bathroom', name: 'Luxury Bath', basePrice: 800 },
  { id: 'office', name: 'Home Office', basePrice: 700 }
];

const designLevels = [
  { id: 'standard', name: 'Standard', multiplier: 1, desc: 'Quality basics & functional design' },
  { id: 'premium', name: 'Premium', multiplier: 1.6, desc: 'High-end materials & custom furniture' },
  { id: 'luxury', name: 'Luxury', multiplier: 2.8, desc: 'Designer labels, automation & bespoke art' }
];

const BudgetCalculator = ({ openModal }) => {
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [selectedLevel, setSelectedLevel] = useState(designLevels[0]);
  const [sqft, setSqft] = useState(250);

  const estimate = useMemo(() => {
    const total = selectedRoom.basePrice * selectedLevel.multiplier * sqft;
    return Math.round(total);
  }, [selectedRoom, selectedLevel, sqft]);

  return (
    <div className="budget-calculator">
      <div className="calc-header">
        <Calculator className="calc-icon" />
        <div>
          <h3>Investment Estimator</h3>
          <p>Get a rough estimate in INR (₹)</p>
        </div>
      </div>

      <div className="calc-body">
        <div className="calc-section">
          <label>Select Room Type</label>
          <div className="room-grid">
            {roomTypes.map(room => (
              <button 
                key={room.id}
                className={`room-btn ${selectedRoom.id === room.id ? 'active' : ''}`}
                onClick={() => setSelectedRoom(room)}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        <div className="calc-section">
          <div className="label-group">
            <label>Room Area (sq.ft)</label>
            <span className="sqft-value">{sqft} sq.ft</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="1500" 
            step="50" 
            value={sqft} 
            onChange={(e) => setSqft(parseInt(e.target.value))}
            className="sqft-slider"
          />
        </div>

        <div className="calc-section">
          <label>Finish Level</label>
          <div className="level-options">
            {designLevels.map(level => (
              <div 
                key={level.id}
                className={`level-card ${selectedLevel.id === level.id ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level)}
              >
                <div className="level-radio">
                  {selectedLevel.id === level.id && <CheckCircle size={14} />}
                </div>
                <div className="level-info">
                  <span className="level-name">{level.name}</span>
                  <span className="level-desc">{level.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="calc-footer">
        <div className="estimate-box">
          <span className="estimate-label">Estimated Investment</span>
          <span className="estimate-value">₹ {estimate.toLocaleString('en-IN')} - ₹ {(estimate * 1.2).toLocaleString('en-IN')}</span>
          <p className="estimate-note">*Prices are indicative for Indian markets and may vary based on actual site conditions.</p>
        </div>
        <button className="btn-primary full-width" onClick={openModal}>Get Final Quote</button>
      </div>
    </div>
  );
};

export default BudgetCalculator;
