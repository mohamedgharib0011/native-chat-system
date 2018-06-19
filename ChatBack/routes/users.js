/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:48:30 
 * @Last Modified time: 2018-06-17 22:48:30 
 * 
 */

const express = require('express'),
  router = express.Router(),
  User = require('../models/user');

/**
 * list all users
 * @author: mgharib
 */
router.get('/allexceptcurrent', function (req, res, next) {
  const currentUserId = req.currentUserInfo.userId;
  User.find({_id:{$not:{$eq:currentUserId}}}, (err, user) => {
    res.json(user);
  });
});

/**
 * serch users by email or name and sort the result with the most relevant.
 * @author: mgharib
 */
router.post('/search', function (req, res, next) {
  User.find({ $text: { $search: req.body.searchText } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: 'textScore' } })
    .exec((err, users) => {
      res.json(users);
    });
});



module.exports = router;
