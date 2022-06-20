import nodemailer from "nodemailer";

export default async function(user, link, res) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ID,
        pass: process.env.PW,
      },
    });
  
    const details = {
      from: process.env.ID,
      to: user,
      subject: "Request a password reset",
      text: `
        <p>Request a password reset</p>
        <p>Click this <a href="http://localhost:1000/reset/${link}">link</a> to set a new Password.</p>
      `,
    };
  
    await transporter.sendMail(details, (err) => {
      if (err) return console.error(err);
      console.log("success sendmail");
      return res.redirect("/");
    });
  } catch (err) {
    console.error(err);
  }
}
