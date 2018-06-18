/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:48:30 
 * @Last Modified time: 2018-06-17 22:48:30 
 */

const express = require('express'),
  router = express.Router(),
  jwt=require('jsonwebtoken'),
  config = require('../config'),
  User = require('../models/user');

/**
 * list all users
 * @author: mgharib
 */
router.get('/', function (req, res, next) {
  User.find({}, (err, user) => {
    res.json(user);
  });
});

/**
 * serch users by email or name and sort the result with the most relevant.
 * @author: mgharib
 */
router.post('/search', function (req, res, next) {
  console.log("******** " + req.body.searchText);

  User.find({ $text: { $search: req.body.searchText } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: 'textScore' } })
    .exec((err, users) => {
      res.json(users);
    });
});

/**
 * create new user
 * @author:mgharib
 */
router.post('/', function (req, res, next) {
  new User(req.body).save((err, data) => {
    console.log(err);

    res.status(201).json(data);
  });
});

/**
 * @author: mgharib
 * authenticate the user and return token in case of valid credentials
 */
router.post('/authenticate', (req, res, next) => {
  User.find({ email: req.body.email, password: req.body.password }, (err, user) => {

    if (user) {
      const payload = {
        userId: user._id,
        admin: user.admin
      }
      const token = jwt.sign(payload, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      // return the information including token as JSON
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });

    } else {

    }

  });

});

module.exports = router;
