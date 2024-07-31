const nodemailer = require("nodemailer");


module.exports = {
  emailService: async (auth, from, to, subject, text) => {
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: auth.user,
          pass: auth.password,
        },
      });

      var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
          return error;
        } else {
            console.log(info)
          return info.response;
        }
      });
    } catch (e) {}
  },
  
};
