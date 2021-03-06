/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:28:58 
 * @Last Modified time: 2018-06-17 22:28:58 
 */

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    email: {type:String, unique:true},
    name: String,
    online:{type:Boolean,default:false},
    password: String,
    admin: {type:Boolean, default:false},
    pref_lang: {type:String, default:"en"},
})

// using fulltext index for searching name and email instead of using regex
userSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('User', userSchema);