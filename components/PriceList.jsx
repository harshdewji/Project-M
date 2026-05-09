import React from 'react';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import './PriceList.css';

const pricingData = [
  { item: 'False Ceiling (Gypsum)', unit: 'sq.ft', price: '₹95' },
  { item: 'Painting (Luxe Emulsion)', unit: 'sq.ft', price: '₹28' },
  { item: 'Modular Wardrobe (Laminate)', unit: 'sq.ft', price: '₹1,350' },
  { item: 'Modular Kitchen (BWP)', unit: 'sq.ft', price: '₹2,100' },
  { item: 'Electrical Pointing', unit: 'point', price: '₹450' },
  { item: 'Civil / Tiling Work', unit: 'sq.ft', price: '₹85' },
  { item: 'Premium Wallpaper', unit: 'sq.ft', price: '₹55' },
  { item: 'Design Consultation', unit: 'visit', price: '₹2,500' }
];

const PriceList = () => {
  const downloadStandalonePriceList = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Studio M | Standard Rate Card 2024</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400&display=swap');
          body { font-family: 'Inter', sans-serif; background: #FDFCFB; color: #1C1C1C; padding: 50px; line-height: 1.6; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 60px; border: 1px solid #EFECE8; box-shadow: 0 30px 60px rgba(0,0,0,0.03); }
          .header { text-align: center; margin-bottom: 50px; border-bottom: 1px solid #EFECE8; padding-bottom: 30px; }
          h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; margin-bottom: 10px; font-weight: 300; }
          table { width: 100%; border-collapse: collapse; margin-top: 30px; }
          th { text-align: left; padding: 15px; border-bottom: 2px solid #1C1C1C; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; }
          td { padding: 15px; border-bottom: 1px solid #F8F7F4; font-size: 0.95rem; }
          .price { font-weight: 600; color: #9A8C7F; }
          .footer { margin-top: 50px; font-size: 0.75rem; color: #888; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Studio M Rate Card</h1>
            <p>Architectural Interiors & Bespoke Spaces</p>
          </div>
          <table>
            <thead>
              <tr><th>Item</th><th>Unit</th><th>Rate</th></tr>
            </thead>
            <tbody>
              ${pricingData.map(row => `<tr><td>${row.item}</td><td>${row.unit}</td><td class="price">${row.price}</td></tr>`).join('')}
            </tbody>
          </table>
          <div class="footer">
            * All rates are indicative. Final pricing depends on project scope.<br/>
            &copy; 2024 Studio M Agency
          </div>
        </div>
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Studio_M_PriceList_2024.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="price-list-section">
      <div className="price-list-header">
        <div className="header-text">
          <FileText className="header-icon" />
          <h2>Standard Rate Card 2024</h2>
          <p>Transparent pricing for your dream home transformation.</p>
        </div>
        <button onClick={downloadStandalonePriceList} className="btn-primary download-price-btn">
          <Download size={18} /> Download Rate Card
        </button>
      </div>

      <div className="price-table-container">
        <table className="price-table">
          <thead>
            <tr>
              <th>Service Item</th>
              <th>Unit</th>
              <th>Base Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pricingData.map((row, idx) => (
              <tr key={idx}>
                <td className="item-name">{row.item}</td>
                <td className="item-unit">{row.unit}</td>
                <td className="item-price">{row.price}</td>
                <td className="item-status">
                  <span className="status-tag"><CheckCircle2 size={12} /> Live</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="price-disclaimer">
        <p>* All rates are indicative. Final pricing depends on material selection, site complexity, and design details.</p>
      </div>
    </section>
  );
};

export default PriceList;
