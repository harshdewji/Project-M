import nodemailer from 'nodemailer';

export const sendInquiryEmail = async (data, type) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: process.env.EMAIL_TO,
    subject: `[STUDIO M ${type.toUpperCase()}] New Submission from ${data.name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #8E7B6D; border-bottom: 1px solid #eee; padding-bottom: 10px;">New ${type} Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        ${Object.entries(data).map(([key, value]) => {
          if (['name', 'email', 'phone'].includes(key)) return '';
          return `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</p>`;
        }).join('')}
        <div style="margin-top: 20px; font-size: 0.8rem; color: #999;">
          Submitted via Studio M Digital Portfolio (Next.js)
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
