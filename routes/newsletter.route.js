const express = require('express');
const router = express.Router();
const {v4 : uuidv4} = require('uuid');
const Subscribers = require('../models/subs.model');
const Content = require('../models/content.model');

//ROUTE 1: POST: /addsub to add subscribers in the topic
router.post('/addsub', async (req,res)=>{
    let status = 'failed';

    try{
        const subs = req.body;
        const subEmail = subs.email;
        const topic = subs.topic;
        const oldTopic = await Subscribers.findOne({topic_name: topic});

        //If the topic already exists push the subscriber in subsList of that topic, else create a topic and push the subscriber
        if(oldTopic){
            const id = oldTopic._id;
            let flag = false;
            let sList = oldTopic.subsList;

            //Adding unique email in subscribers list
            for(let x = 0;x<sList.length; x++){
                if(sList[x] === subEmail){
                    flag = true;
                    break;
                }
            }

            if(flag){
                return res.status(400).json({status, error: "Email already in subscribers list"});
            }

            Subscribers.updateOne({_id: id}, { "$push": { "subsList" : subEmail } },
            {"new": true},
            function(err){
                if(err){ 
                    return res.status(400).json({status,error:err});
                }else{
                    status = "success";
                    return res.status(200).json({status,message: "Added suscriber successfully"});
                }
            });
        }else{
            let sList = [];
            sList.push(subEmail);
            const newSub = {
                _id: uuidv4(),
                topic_name: topic,
                subsList: sList
            }

            const subItem = await Subscribers.create(newSub);
            if(!subItem){
                return res.status(400).json({status,error: "Can't add subscriber!"});
            }

            status = "success";
            return res.status(200).json({status, message:"Added subscriber successfully!"});
        }

    }catch(err){
        return res.status(500).json({status,error:err.message,message:"Internal server error"});
    }
});

//ROUTE 2: POST: /addcontent to add content
router.post('/addcontent', async (req,res)=>{
    let status = "failed";

    //Create the content sent as req body
    try{
        const ctitle = req.body.title;
        const ctopic = req.body.topic;
        const cbody = req.body.content_body;
        let stime = new Date(req.body.send_at);

        const newContent = {
            _id: uuidv4(),
            title: ctitle,
            topic: ctopic,
            content_body: cbody,
            send_at: stime
        };

        const content = await Content.create(newContent);
        if(!content){
            return res.status(400).json({status, message: "Can't insert content"});
        }

        status = "success";
        return res.status(200).json({status, content});
    }catch(err){
        return res.status(500).json({status,error:err.message,message:"Internal server error"});
    }
});

module.exports = router;