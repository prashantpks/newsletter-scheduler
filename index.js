const connectToMongo = require('./db');
const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
connectToMongo();
require('dotenv').config();

const app = express();
app.use(express.json());


//Available Routes
app.use('/',require('./routes/newsletter.route'));

//Sending newsletters

var transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   secure:false,
   requireTLS:true,
   auth: {
     user: process.env.DEV_MAIL, // enter your email address
     pass: process.env.DEV_MAIL_PASSWORD  // enter your visible/encripted password
   }
 });
 
 var mailOptions = {
   from: process.env.DEV_MAIL,
   to: 'prashantr@gmail.com',
   subject: "helklo",
   text: "hkjhk"
 };
 
//  transporter.sendMail(mailOptions, function(error, info){
//    if (error) {
//      console.log(error);
//    } else {
//      console.log('Email was sent successfully: ' + info.response);
//    }
//  });


//Listen for connections
const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`Currently Listening at http://localhost:${port}`);
});
