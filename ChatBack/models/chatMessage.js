/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:30:39 
 * @Last Modified time: 2018-06-17 22:30:39 
 */

const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    origin_lang: String,
    date: Date,
    message: String
})

// to be used when fetching the converstion between two users
chatMessageSchema.index({ sender: 1, receiver: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);