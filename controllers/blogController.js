const Blog = require('../models/blog');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, image, callback) => {
        callback(null, '/Users/mac/Documents/NodeProjects/course/public/uploads/');
    },
    filename: (req, image, callback) => {
        callback(null, Date.now()+image.originalname);
    }
});
const uploads = multer({storage});

const blog_index = (req, res) => {
    Blog.find()
    .then((result) => {
        // when using ejs files, you don't need to use sendFile
        res.render('index', {title: 'home', blogs: result});
    })
    .catch((err) => {
        console.error(err);
    }) 
}

const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create'});
}

const blog_create_post = (req, res) => {
    // console.log(req.body);
    console.log(req.file);
    const body = req.body;
    body.image = req.file.filename;
    const blog = new Blog(body);
    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
}

const blog_view = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            if (result == null){
                res.render('404', {title: '404'});
            }
            res.render('details', {title: 'Details', blog: result});
        })
        .catch((err) => {
            res.render('404', {title: '404'});
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
            res.render('404', {title: '404'});
        })
}

const blog_edit_get = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('edit', {title: 'Edit', blog: result});
        })
        .catch(err => {
            console.log(err);
            res.render('404', {title: '404'});
        })
}

const blog_edit_post = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    body.image = req.file?.filename;
    Blog.findByIdAndUpdate(id, body)
        .then((result) => {
            // result.title = body.title;
            // result.snippet = body.snippet;
            // result.body = body.body;
            // result.isNew = false;
            // result.save();
            // console.log(req.file)
            // console.log(req.body);
            res.redirect('/blogs/'+result.id);
        })
        .catch((err) => {
            console.log(err);
            res.render('404', {title: '404'});
        })
}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_view,
    blog_delete,
    uploads,
    blog_edit_get,
    blog_edit_post
}