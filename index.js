const connectToMongo = require('./db');
const express = require('express');
const cron = require('node-cron');
const moment = require('moment');
const nodemailer = require('nodemailer');
const Subscribers = require('./models/subs.model');
const Content = require('./models/content.model');
connectToMongo();
require('dotenv').config();

const app = express();
app.use(express.json());


//Available Routes
app.use('/',require('./routes/newsletter.route'));

//Reference from: https://codingstatus.com/node-js-send-email/#:~:text=How%20to%20send%20Email%20in%20Node.js%201%20Install,email%20address%2C%20subject%20%26%20message%20in%20the%20form.
//Sending newsletters using nodemailer
const sendEmail = async (content)=>{
  const subs = await Subscribers.find({topic_name: content.topic});
  const receiver = subs[0].subsList;
  const receiverString = receiver.join(', ');

  // console.log(receiverString[0].subsList.join(', '));
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    requireTLS:true,
    auth: {
      user: process.env.DEV_MAIL, 
      pass: process.env.DEV_MAIL_PASSWORD
    }
  });

  let subject = 'CureLink | '+content.topic+' | '+content.title;
  console.log(subject);
  let text = content.content_body;
  console.log(text);

  let mailOptions = {
    from: process.env.DEV_MAIL,
    to: receiverString,
    subject,
    text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Newsletter sent successfully: ' + info.response);
    }
  }); 
}

//Reference from Stackoverflow: https://stackoverflow.com/questions/65647286/booking-reminder-nodemailer-node-cron-mongodb
//Scheduling our email using node-cron
cron.schedule('00 * * * * *', ()=>{
  Content.find({isSent: false}).then((contents)=>{
    let cList = [];
    for(let content of contents){
      let send_time = moment(content.send_at).valueOf();
      let cur_time = moment.utc().valueOf();
      // console.log(send_time,cur_time);
      if(Math.abs(send_time-cur_time)<=59000){
        cList.push(content);
      }
      
    }
    return cList;
  }).then((cList)=>{
    for(let li of cList){
      sendEmail(li);
      Content.findByIdAndUpdate(li._id,{"$set": {"isSent": true}},
      function(err){
        if(err){ 
            return res.status(400).json({success,error:err});
        }
    });
    }
  })
})


//Listen for connections
const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`Currently Listening at http://localhost:${port}`);
});
