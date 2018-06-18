/*
 * @Author: mgharib 
 * @Date: 2018-06-18 19:08:26 
 * @Last Modified time: 2018-06-18 19:08:26 
 * 
 * This middleware is responsible for validating the jwt for protected routes
 */


const config = require('../config'),
  jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

  // validate authentication header has value
  if (!req.headers.authorization) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  // validate authentication header value format
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'please follow the following format  Bearer [token]'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.json({ success: false, message: 'Failed to authenticate token.' });

    // attach the decoded token so we can use without the need to hit db
    req.token = decoded;

    console.log(decoded);

    next();
  });
}