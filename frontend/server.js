const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();

/* ========================= */
/* MIDDLEWARE */
/* ========================= */
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST"]
}));

app.use(express.json({ limit: "10kb" })); // Guard against large payloads

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

/* ========================= */
/* RATE LIMITING */
/* Prevents spam / abuse on */
/* the contact form          */
/* ========================= */
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // max 5 requests per window
  message: { message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

/* ========================= */
/* EMAIL TRANSPORT */
/* ========================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

/* ========================= */
/* HELPER: Sanitize input    */
/* Strips HTML tags to       */
/* prevent email injection   */
/* ========================= */
function sanitize(str) {
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .trim();
}

/* ========================= */
/* HELPER: Validate email    */
/* ========================= */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ========================= */
/* ROOT ROUTE */
/* ========================= */
app.get("/api", (req, res) => {
  res.json({ status: "🚀 !ttefaqq Backend Running" });
});

/* ========================= */
/* CONTACT / BOOKING API     */
/* ========================= */
app.post("/send", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // --- Validation ---
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (name.length > 100 || message.length > 2000) {
    return res.status(400).json({ message: "Input exceeds maximum allowed length." });
  }

  // --- Sanitize ---
  const safeName    = sanitize(name);
  const safeEmail   = sanitize(email);
  const safeMessage = sanitize(message);

  try {
    // Email to band (notification)
    await transporter.sendMail({
      from: `"!ttefaqq Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: safeEmail,
      subject: `🎤 New Booking Request from ${safeName}`,
      html: `
        <div style="font-family:Georgia,serif; max-width:560px; margin:auto; background:#0c0818; color:#e8dcc8; padding:40px; border-radius:8px; border:1px solid #7a5a1e;">
          <h2 style="color:#e8bf6a; font-size:22px; margin-bottom:8px;">🎶 New Booking Request</h2>
          <hr style="border-color:#7a5a1e; margin-bottom:24px;">
          <p><strong style="color:#e8bf6a;">Name:</strong> ${safeName}</p>
          <p><strong style="color:#e8bf6a;">Email:</strong> <a href="mailto:${safeEmail}" style="color:#e8bf6a;">${safeEmail}</a></p>
          <p style="margin-top:16px;"><strong style="color:#e8bf6a;">Message:</strong></p>
          <p style="background:#130f22; padding:16px; border-radius:4px; border-left:3px solid #c9973a;">${safeMessage}</p>
          <hr style="border-color:#7a5a1e; margin-top:30px;">
          <p style="color:#9a8a72; font-size:13px;">Sent via !ttefaqq booking form</p>
        </div>
      `
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"!ttefaqq Band" <${process.env.EMAIL_USER}>`,
      to: safeEmail,
      subject: "We received your message — !ttefaqq 🎵",
      html: `
        <div style="font-family:Georgia,serif; max-width:560px; margin:auto; background:#0c0818; color:#e8dcc8; padding:40px; border-radius:8px; border:1px solid #7a5a1e;">
          <h2 style="color:#e8bf6a;">Thank you, ${safeName} 🎶</h2>
          <p style="margin-top:16px;">We've received your booking request and will get back to you shortly.</p>
          <p style="margin-top:12px; font-style:italic; color:#9a8a72;">"Music is the shorthand of emotion."</p>
          <hr style="border-color:#7a5a1e; margin-top:30px;">
          <p style="color:#9a8a72; font-size:13px;">— The !ttefaqq Team</p>
        </div>
      `
    });

    res.json({ message: "Message sent successfully ✅" });

  } catch (error) {
    console.error("❌ Email Error:", error.message);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

/* ========================= */
/* CATCH-ALL: serve index    */
/* (for SPA / direct URLs)   */
/* ========================= */
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* ========================= */
/* START SERVER */
/* ========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
