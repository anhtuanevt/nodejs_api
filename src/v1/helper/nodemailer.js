const nodemailer = require("nodemailer");

const sendEmail = async (link) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anhtuanevt@gmail.com',
        pass: 'wooo fszg stwi hxgg'
    }
    });

    var mailOptions = {
    from: 'anhtuanevt@gmail.com',
    to: 'anhtuanevt@gmail.com',
    subject: 'Sending Email using Node.js',
    text: link
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}
module.exports = sendEmail
   
