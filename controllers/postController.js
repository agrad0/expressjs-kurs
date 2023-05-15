const Post = require('../models/PostModel')


module.exports = {
    index: (req, res) => {
        Post.find({}).lean().then((posts) => {
            
            // res.send('Get posts error')
            // console.log(posts)
            res.render('blogViews/blog', {posts: posts})


        }).catch((err) => {
            console.log(err)
        })
    }
}