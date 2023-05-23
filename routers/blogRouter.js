const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/create', blogController.blog_create_get);

router.get('/', blogController.blog_index);

router.post('/', blogController.uploads.single('image'), blogController.blog_create_post);

router.get('/:id', blogController.blog_view);

router.delete('/:id', blogController.blog_delete);

router.get('/:id/edit', blogController.blog_edit_get);

router.post('/:id/edit', blogController.uploads.single('image'), blogController.blog_edit_post);

module.exports = router;