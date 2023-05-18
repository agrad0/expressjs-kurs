const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
}, {
    timestamps: true
})

User.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function(err, salt){
        if (err) {
            return next();
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', User)