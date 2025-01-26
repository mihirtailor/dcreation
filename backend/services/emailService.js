const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendAdminNotification = async (contactData) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "New Contact Request - DCreation",
        html: `
      <h2>New Contact Request Received</h2>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone}</p>
      <p><strong>Company:</strong> ${contactData.company}</p>
      <p><strong>Service:</strong> ${contactData.service}</p>
      <p><strong>Message:</strong> ${contactData.message}</p>
    `,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendAdminNotification,
};
