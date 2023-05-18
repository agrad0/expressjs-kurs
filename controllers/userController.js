const User = require('../models/UserModel');


module.exports = {
    create: (req, res) => {
        let newUser = new User(req.body);
        newUser.save();
        res.redirect('/blog');
    }
}