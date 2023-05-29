const Post = require('../models/PostModel');
const User = require('../models/UserModel');

module.exports = {
    index: (req, res) => {
        const findConfig = req.query.authorId ? { author: req.query.authorId } : {};

        Post.find(findConfig)
            .populate('author')
            .lean()
            .then((posts) => {
                res.status(200).json(posts)


            }).catch((err) => {
                res.send(500).json({error: err})
            })
    },
    post: (req, res) => {
        Post.findById(req.params.id)
            .populate('author')
            .lean()
            .then((post) => {
                res.status(200).json(post)
            }).catch((err) => {
                res.status(404).json({error: 'Resource not found'})
            })
    }
}