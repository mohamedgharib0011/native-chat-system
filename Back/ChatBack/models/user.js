/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:28:58 
 * @Last Modified time: 2018-06-17 22:28:58 
 */

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    pref_lang: String,
})

// using fulltext index for searching name and email instead of using regex
userSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('User', userSchema);