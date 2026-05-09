"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const phoneNumber = "919876543210"; 
  const message = "Hello Studio M, I'm interested in interior design services.";
  
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-widget" onClick={handleClick} title="Chat with us on WhatsApp">
      <div className="wa-pulse"></div>
      <MessageCircle className="wa-icon" />
    </div>
  );
};

export default WhatsAppWidget;
