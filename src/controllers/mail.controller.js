import nodemailer from "nodemailer";

import { MAIL_PASS, MAIL_USER } from "../config";

export const sendMail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const contentHTML = `
    <h1>userinformation</h1>
    <ul>
      <li>username: ${name}</li>
      <li>usermail: ${email}</li>
      <li>userphone: ${phone}</li>
    </ul>
    <p>${message}</p>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `Test REPA Mail <${MAIL_USER}>`,
    to: `${email}`,
    subject: "Asunto de prueba",
    html: contentHTML
  })
  console.log("mensaje enviado", info.messageId)
  res.render("email");
};

export const renderMail = (req, res) => {
  res.render("email");
};
