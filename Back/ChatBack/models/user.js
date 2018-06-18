/*
 * @Author: mgharib 
 * @Date: 2018-06-17 22:28:58 
 * @Last Modified time: 2018-06-17 22:28:58 
 */

const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    email: {type:String, unique:true},
    name: String,
    password: String,
    admin: {type:Boolean, default:false},
    pref_lang: {type:String, default:"en"},
})

// using fulltext index for searching name and email instead of using regex
userSchema.index({ name: 'text', email: 'text' });

// userSchema.pre('save',(next)=>{
//      // only hash the password if it has been modified (or is new)
//     //  if (!this.isModified('password')) return next();
    
//     console.log("*********** this: "+Object.values(this));
    
//     // generate a salt
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);
//         console.log("********** password: "+this.password+" salt: "+salt);
//         // hash the password along with our new salt
//         bcrypt.hash(this.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             this.password = hash;
//             next();
//         });
//     });
// })

module.exports = mongoose.model('User', userSchema);