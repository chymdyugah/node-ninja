const express = require('express');
const app = express();
const blogRouter = require('./routers/blogRouter');
const apiRouter = require('./routers/apiRouter');
const bodyParser = require('body-parser');

// morgan is a logging middleware i installed
const morgan = require('morgan');

// for db
const mongoose = require('mongoose')

// set the template engine to use
app.set('view engine', 'ejs');

const dbURL = "mongodb+srv://chymdy:chymdy@testcluster.ttrvryp.mongodb.net/testDb?retryWrites=true&w=majority";
mongoose.connect(dbURL)
    .then((result) => {
        app.listen(3000);
        console.log("server listening on port 3000");
    })
    .catch((err) => {
        console.error(err);
    });

// this is regarded as a middleware
app.use((req, res, next) => {
    console.log(req.path);
    // call next to allow it move on to the next function
    next();
});

// third party middlware for logging
app.use(morgan('dev'));

// middleware for better handling of post requests
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

// set folder for static files
// without it, you will not be able to link css files in your ejs files
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     // res.send('Home Page');
//     res.sendFile('./views/index.html', {root: __dirname});  // __dirname returns the folder that this file is in
// });
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

// use the blog router
app.use('/blogs', blogRouter);

// use the api router
app.use('/api', apiRouter);

// use a middleware for error handling
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
})

// to use a 404 page. 
// this method must be the last. 
// It basically runs for all requests that does not match any path
// this is a middleware
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
});