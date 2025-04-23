module.exports = function smartshopTemplate({ name, email, message }) {
    return `
      <div style="font-family: 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: auto; padding: 24px; background-color: #f8fafc; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08);">
        <h2 style="color: #00b33c; border-bottom: 2px solid #00b33c; padding-bottom: 10px;">
          💡 SmartShop - New Contact Message
        </h2>
        
        <p style="font-size: 16px; margin-bottom: 12px;">You have received a new inquiry from the contact form on your website.</p>
  
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">👤 Name:</td>
            <td style="padding: 8px 0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">📧 Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">📝 Message:</td>
            <td style="padding: 8px 0; background: #ffffff; border-radius: 6px; border: 1px solid #ddd;">
              <div style="padding: 12px; white-space: pre-line; line-height: 1.5;">${message}</div>
            </td>
          </tr>
        </table>
  
        <hr style="margin: 30px 0; border: none; border-top: 1px dashed #ccc;" />
  
        <p style="font-size: 13px; color: #888; text-align: center;">
          🛒 This message was sent via <strong>SmartShop.vn</strong> – your smart device & package marketplace.
          <br/>Please respond within 24h for better customer experience.
        </p>
      </div>
    `;
  };
  