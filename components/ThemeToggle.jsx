import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <div className="creative-toggle-wrapper">
      <span className="toggle-label left">DAYLIGHT</span>
      <button 
        className={`lighting-dimmer ${isDark ? 'active-dark' : 'active-light'}`}
        onClick={() => setIsDark(!isDark)}
        aria-label="Adjust Lighting Mood"
      >
        <motion.div 
          className="dimmer-knob"
          animate={{ x: isDark ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? <Moon size={12} fill="currentColor" /> : <Sun size={12} fill="currentColor" />}
        </motion.div>
      </button>
      <span className="toggle-label right">AMBIENT</span>
    </div>
  );
};

export default ThemeToggle;
