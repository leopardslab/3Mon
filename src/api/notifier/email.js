// change to DI
import nodemailer from "nodemailer";
import config from "../../config.json";

const transporter = nodemailer.createTransport({
  host: "gmail.com",
  port: 2525,
  auth: {
    user: "yourUser",
    pass: "yourPass"
  }
});

export default params => {
  this.from = "yourEmail";

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
