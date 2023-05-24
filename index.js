const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const moongose = require('mongoose');

const cookieParser = require('cookie-parser')

const Post = require('./models/PostModel');



moongose.connect('mongodb://127.0.0.1:27017/express-blog');




app.use('/files', express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());


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


app.get('/', function(_req, res){
    res.render('home', 
    {
        title: post.title, 
        content: post.content, 
        displayTitle: false,
        names: ['Adam', 'Ola', 'Kasia', 'Tomek']
    
    });
});



const blogRouter = require('./routes/blogRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const blogApiRouter = require('./routes/blogApiRouter.js');

const authMiddleware = require('./middlewares/authMiddleware')

app.use('/blog', authMiddleware, blogRouter);
app.use('/user', userRouter);

app.use('/api/posts', blogApiRouter);

app.listen(8080, function(){
    console.log('Serwer Node.js działa');
})