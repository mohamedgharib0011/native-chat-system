/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:29:21 
 * @Last Modified time: 2018-06-17 22:29:21 
 * 
 * db connection operations
 */

//require mongoose module
const mongoose = require('mongoose'),
    path = require('path'),
    db = require(path.join(__dirname, '..', 'config')).db;


mongoose.connect(db.url);

mongoose.connection.on('connected', function () {
    console.log("********** Mongoose default connection is open to " + db.url);
});

mongoose.connection.on('error', function (err) {
    console.log("********** Mongoose default connection has occured " + err + " error");
});

mongoose.connection.on('disconnected', function () {
    console.log("********** Mongoose default connection is disconnected");
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log("********** Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    });
});