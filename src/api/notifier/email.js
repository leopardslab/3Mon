// change to DI
import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const from = process.env.EMAIL_FROM;

const transporter = nodemailer.createTransport({
  host: host,
  port: 2525,
  auth: {
    user,
    pass
  }
});

export default params => {
  this.from = from;

  this.send = function() {
    var options = {
      from: this.from,
      to: params.to,
      subject: params.subject,
      text: params.message
    };

    transporter.sendMail(options, function(err, suc) {
      err ? params.errorCallback(err) : params.successCallback(suc);
    });
  };
};
