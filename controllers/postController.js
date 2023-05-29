const Post = require('../models/PostModel');
const User = require('../models/UserModel');


module.exports = {
    index: (req, res) => {
        const findConfig = req.query.authorId ? { author: req.query.authorId } : {};

        Post.find(findConfig)
            .populate('author')
            .lean().then((posts) => {

                // res.send('Get posts error')
                res.render('blogViews/blog', { posts: posts })


            }).catch((err) => {
                console.log(err)
            })
    },
    post: (req, res) => {
        Post.findById(req.params.id)
            .populate('author')
            .lean()
            .then((post) => {

                // res.send('Get posts error')
                console.log(post)
                res.render('blogViews/singlePost', post)


            }).catch((err) => {
                console.log(err)
            })
    },
    create: (req, res) => {
        const newPost = new Post({ ...req.body, author: res.locals.userId });
        newPost.save();
       
        User.updateOne(
          { _id: res.locals.userId },
          { $push: { posts: newPost._id } }
        ).catch((err) => {
          res.send(err);
        });
       
        res.redirect("/blog");
      },
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body).then((post) => {
            res.redirect('/blog/' + post._id)
        }).catch((err) => {
            res.send(err)
        })
    },
    delete: (req, res) => {        
        Post.findByIdAndDelete(req.params.id)
        .then(() => {
            User.updateOne({ _id: res.locals.userId }, { $pull: { posts: req.params.id }})
            .catch((err) => {
                res.send(err)
            })
        }).catch((err) => {
            res.send(err)
        })
        res.redirect('/blog');
    },
    editForm: (req, res) => {
        Post.findById(req.params.id).then((post) => {

            // res.send('Get posts error')
            // console.log(posts)
            res.render('blogViews/editPostForm', post)


        }).catch((err) => {
            res.send(err)
        })
    }
}