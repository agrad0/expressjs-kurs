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
    },
    post: (req, res) => {
        Post.findById(req.params.id).then((post) => {
            
            // res.send('Get posts error')
            // console.log(posts)
            res.render('blogViews/singlePost', post)


        }).catch((err) => {
            console.log(err)
        })
    },
    create: (req, res) => {

        let newPost = new Post ({...req.body, author: 'Jan K.'})
        newPost.save();
        
        res.redirect('/blog')
    },
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body).then((post) => {
            res.redirect('/blog/' + post._id)
        }).catch((err) => {
            console.log(err)
        })    
    },
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id).then((post) => {
            res.redirect('/blog')
        }).catch((err) => {
            console.log(err)
        }) 
    },
    editForm: (req, res) => {
        Post.findById(req.params.id).then((post) => {
            
            // res.send('Get posts error')
            // console.log(posts)
            res.render('blogViews/editPostForm', post)


        }).catch((err) => {
            console.log(err)
        })
    }
}