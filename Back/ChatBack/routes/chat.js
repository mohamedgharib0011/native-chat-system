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
  const currentUserId = 1;
  ChatMessage.find({
    $or
      : [
        { sender: { $in: [currentUserId, req.params.userId] } },
        { reciever: { $in: [currentUserId, req.params.userId] } }
      ]
  }
  )
    .sort({ date: 1 }).exec(function (err, data) {
      res.json(data);
    })
});

/**
 * @author: mgharib
 * add new converstion (array of messages is expected)
 */
router.post('/conversation', function (req, res, next) {
  console.log("******************" + req.body);

  ChatMessage.create(req.body, function (err, data) {
    res.status(201).json(data);
  })
});

module.exports = router;
