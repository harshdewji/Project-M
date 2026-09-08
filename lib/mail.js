import nodemailer from 'nodemailer';

export const sendInquiryEmail = async (data, type) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const clientName = data.name || 'Valued Client';
  const clientEmail = data.email || 'N/A';
  const clientPhone = data.phone || 'N/A';

  const mailOptions = {
    from: `"${clientName} via Studio Arka" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO || process.env.SMTP_USER,
    replyTo: clientEmail,
    subject: `[STUDIO ARKA ${type.toUpperCase()}] New Submission from ${clientName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #e2d9d0; border-radius: 12px; background-color: #faf9f6; color: #2c2c2c;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #8E7B6D;">
          <h1 style="color: #8E7B6D; font-family: Georgia, serif; margin: 0; font-size: 24px;">STUDIO ARKA</h1>
          <p style="color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">Architectural Interiors</p>
        </div>

        <h2 style="color: #8E7B6D; margin-top: 25px; font-size: 18px;">New ${type} Inquiry</h2>
        
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 20px;">
          <p style="font-size: 14px; margin: 8px 0;"><strong>Client Name:</strong> ${clientName}</p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Email Address:</strong> <a href="mailto:${clientEmail}" style="color: #8E7B6D; font-weight: bold;">${clientEmail}</a></p>
          <p style="font-size: 14px; margin: 8px 0;"><strong>Phone Number:</strong> ${clientPhone}</p>
          
          ${Object.entries(data).map(([key, value]) => {
            if (['name', 'email', 'phone'].includes(key)) return '';
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            const displayVal = typeof value === 'object' ? JSON.stringify(value) : value;
            return `<p style="font-size: 14px; margin: 8px 0;"><strong>${label}:</strong> ${displayVal}</p>`;
          }).join('')}
        </div>

        <div style="background-color: #f4efe9; padding: 15px; border-left: 4px solid #8E7B6D; border-radius: 4px; font-size: 13px; color: #555;">
          <strong>Tip:</strong> Click "Reply" in your email software to reply directly to <strong>${clientEmail}</strong>.
        </div>

        <div style="margin-top: 25px; font-size: 11px; color: #999; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
          Received via Studio Arka Architectural Interiors Digital Platform
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

