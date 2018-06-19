/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:57:09 
 * @Last Modified time: 2018-06-17 22:57:09 
 */

const express = require('express'),
  ChatMessage = require('../models/chatMessage'),
  router = express.Router();

/**
 * @author:mgharib
 * get the conversation between the current user and passed user id
 */
router.get('/conversation/:userId', function (req, res, next) {
  const currentUserId = req.currentUserInfo.userId;
  console.log("******* current User: "+currentUserId);
  
  
  ChatMessage.find({
    $or
      : [
        { sender:currentUserId , receiver:req.params.userId },
        { receiver:currentUserId ,sender:req.params.userId }
      ]
  }
  )
    .sort({ date: 1 }).exec(function (err, data) {
      console.log("******* received conversation "+data);
      res.json(data);
    })
});

/**
 * @author: mgharib
 * add new converstion (array of messages is expected)
 */
router.post('/conversation', function (req, res, next) {
  ChatMessage.create(req.body, function (err, data) {
    res.status(201).json(data);
  });
});

module.exports = router;
