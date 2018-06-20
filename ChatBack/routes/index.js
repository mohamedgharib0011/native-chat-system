/*
 * @Author: mgharib 
 * @Date: 2018-06-18 18:45:08 
 * @Last Modified time: 2018-06-18 18:45:08 
 * 
 * contains all non-protected resources
 */

const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken'),
  config = require('../config'),
  User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


/**
 * @author: mgharib
 * authenticate the user and return token in case of valid credentials
 */
router.post('/authenticate', (req, res, next) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, (err, user) => {
    console.log("******* user: " + user);

    if (user) {
      const payload = {
        userId: user._id,
        admin: user.admin,
        pref_lang: user.pref_lang,
        name: user.name,
        email: user.email
      }
      console.log("******* payload: " + payload.userId);
      const token = jwt.sign(payload, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      // return the information including token as JSON
      res.status(200).json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });

    } else {
      res.json({
        success: false,
        message: "No user found."
      });
    }

  });

});


/**
 * signup
 * @author:mgharib
 */
router.post('/signup', function (req, res, next) {
  new User(req.body).save((err, user) => {
    //console.log(err);
    if (user) {
      const payload = {
        userId: user._id,
        admin: user.admin,
        pref_lang: user.pref_lang,
        name: user.name,
        email: user.email
      }
      // console.log("******* payload: " + payload.userId);
      const token = jwt.sign(payload, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      // return the information including token as JSON
      res.status(200).json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    } else {
      res.json({
        success: false
      });
    }
    //res.status(201).json(data);
  });
});

module.exports = router;