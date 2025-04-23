module.exports = function autoReplyTemplate({ name }) {
  return `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; padding: 32px; max-width: 600px; margin: auto; border-radius: 12px; background-color: #f0fdf4; border: 1px solid #d1fae5;">
        <div style="text-align: center;">
          <h2 style="color: #059669; font-size: 28px;">💬 Hello ${name},</h2>
          <p style="font-size: 16px; color: #374151; margin-top: 16px;">
            Thank you for reaching out to <strong>SmartShop</strong>!<br />
            We’ve successfully received your message and one of our team members will respond within <strong>24 hours</strong>.
          </p>
          <p style="font-size: 15px; color: #4b5563; margin-top: 24px;">
            While waiting, feel free to browse our website or follow us on social media for the latest updates!
          </p>
          <div style="margin-top: 32px;">
            <a href="https://smart-shop-fe.vercel.app" target="_blank" style="background-color: #10b981; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 15px;">
              Visit SmartShop 🛍️
            </a>
          </div>
        </div>
  
        <hr style="margin: 40px 0; border: none; border-top: 1px dashed #ccc;" />
  
        <p style="text-align: center; font-size: 13px; color: #9ca3af;">
          This is an automatic reply from <strong>SmartShop.vn</strong> – your trusted source for smart devices, combos, and packages.
        </p>
      </div>
    `;
};
