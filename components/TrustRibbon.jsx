import React from 'react';
import { ShieldCheck, Truck, CreditCard, Clock } from 'lucide-react';
import './TrustRibbon.css';

const TrustRibbon = () => {
  const items = [
    { icon: <Clock size={24} />, title: '45-Day Delivery', desc: 'Or we pay you rent' },
    { icon: <ShieldCheck size={24} />, title: '10-Year Warranty', desc: 'Reliability you can trust' },
    { icon: <CreditCard size={24} />, title: 'Easy EMIs', desc: 'Flexible payment options' },
    { icon: <Truck size={24} />, title: 'Free Site Visit', desc: 'Measurement & Consultation' }
  ];

  return (
    <div className="trust-ribbon">
      <div className="container trust-container">
        {items.map((item, idx) => (
          <div key={idx} className="trust-item">
            <div className="trust-icon">{item.icon}</div>
            <div className="trust-text">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustRibbon;
