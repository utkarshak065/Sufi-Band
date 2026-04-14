const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* EMAIL TRANSPORT */
const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});

/* TEST ROUTE */
app.get("/", (req, res) => {
res.send("🚀 !ttefaqq Backend Running");
});

/* CONTACT API */
app.post("/send", async (req, res) => {

const { name, email, message } = req.body;

/* VALIDATION */
if (!name || !email || !message) {
return res.status(400).json({ message: "All fields are required" });
}

try {

/* SEND EMAIL */
await transporter.sendMail({
from: `"${name}" <${process.env.EMAIL_USER}>`,
to: process.env.EMAIL_USER,
subject: "🎤 New Booking Request - !ttefaqq",
html: `
<h2>🎶 New Booking Request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
<hr/>
<p style="color:gray;">Sent from !ttefaqq Website</p>
`
});

/* SUCCESS */
res.json({ message: "Message sent successfully ✅" });

} catch (error) {
console.error("❌ Email Error:", error);
res.status(500).json({ message: "Failed to send message ❌" });
}

});

/* START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});