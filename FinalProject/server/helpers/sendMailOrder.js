const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendVerifyEmailOrder(email, message) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailData = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Status Update",
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailData);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

module.exports = sendVerifyEmailOrder;
