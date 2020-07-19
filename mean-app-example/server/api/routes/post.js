const express = require('express');
// add the auth middleware the route with auth
const authentication = require('../middleware/authentication');
// add the file-upload middleware for parsing file upload
const fileUpload = require('../middleware/file-upload');
// the post controller
const postController = require('../controllers/post');
const router = express.Router();

// get the total number of posts
router.get('/totalCount', postController.totalCount);

// get posts with pagination
router.get('/', postController.getPosts);

router.post('', authentication, fileUpload, postController.addPost);
// get a post with its ID
router.get('/:id', postController.getPost);

router.patch('/:id', authentication, fileUpload, postController.updatePost);

router.delete('/:id', authentication, postController.deletePost);

module.exports = router;
