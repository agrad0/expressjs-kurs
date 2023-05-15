const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const moongose = require('mongoose');

const Post = require('./models/PostModel');

moongose.connect('mongodb://127.0.0.1:27017/express-blog');

const postController = require('./controllers/postController');


app.use('/files', express.static('public'));

app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

app.get('/mongoose/:id', function(req, res){
    Post.findById(req.params.id).then((post, err) => {
        res.render('home', {
        title: post.title, 
        content: post.content, 
        displayTitle: true,
        names: ['Adam', 'Ola', 'Kasia', 'Tomek']
    });
    })
});


app.get('/', function(req, res){
    res.render('home', 
    {
        title: post.title, 
        content: post.content, 
        displayTitle: false,
        names: ['Adam', 'Ola', 'Kasia', 'Tomek']
    
    });
});



app.get('/blog', postController.index)


app.listen(8080, function(){
    console.log('Serwer Node.js działa');
})