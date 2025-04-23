const nodemailer = require("nodemailer");
const smartshopTemplate = require("../../template/smartshopTemplate");
const autoReplyTemplate = require("../../template/autoReplyTemplate");

exports.sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required (name, email, message)."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_EMAIL}>`,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: `📨 Contact from ${name} - SmartShop`,
      html: smartshopTemplate({ name, email, message })
    });

    await transporter.sendMail({
      from: `"SmartShop Support" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `✅ We've received your message - SmartShop`,
      html: autoReplyTemplate({ name, message })
    });

    return res.status(200).json({ success: true, message: "Message sent and auto-reply delivered!" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
};
