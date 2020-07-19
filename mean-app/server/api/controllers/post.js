const mongoose = require('mongoose');
const Post = require('../models/post');

/**
 * Get the total number of posts
 */
exports.totalCount = (req, res, next) => {
	Post.count((err, count) => {
		res.status(200).json({ count: count });
	});
};

/**
 * Get posts with pagination
 */
exports.getPosts = (req, res, next) => {
	const pageSize = Number(req.query.pageSize);
	const page = Number(req.query.page);
	// Mongoose chaining of queries
	const postQuery = Post.find();
	if (pageSize && page) {
		postQuery.skip(pageSize * (page - 1)).limit(pageSize);
	}
	postQuery
		.then(docs => {
			res.status(200).json(docs);
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				message: 'Fetching posts failed.'
			});
		});
};

exports.addPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    /**
     * construct the mongoose Post object,
     * note that the creator field will be filled with
     * req.userData.userId since the userData object
     * is passed down by the 'authentication' middleware
     */
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    // persist to mongoDB
    post
        .save()
        .then(result => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Creating a post failed.'
            });
        });
};

exports.getPost = (req, res, next) => {
	const id = req.params.id;
	Post.findById(id)
		.then(doc => {
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({
					message: 'Cannot find post.'
				});
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				message: 'Fetching post failed.'
			});
		});
};

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    /**
     * the payload,
     * note that req.params.id == req.body.id,
     * as they refer to the same post that is being edited
     */
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    /**
     * the conditions for mongoose to find the matching post,
     * note that the creator id is passed down by the
     * authentication middleware via req.userData.userId
     */
    const query = {
        _id: req.params.id,
        creator: req.userData.userId
    };
    Post.updateOne(query, post)
        .then(result => {
            /**
             * note that
             * when the user who is editing the post (req.userData.userId)
             * is not the creator of that post, update will not happen,
             * but there will be no error thrown by mongoose,
             * we need to use the 'n' field of the response
             * to tell if the targeted post has indeed been updated
             */
            if (result.n > 0) {
                // update successful
                res.status(200).json(post);
            } else {
                res.status(401).json({
                    message: 'Post update not authorized!'
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Cannot update post.'
            });
        });
};

exports.deletePost = (req, res, next) => {
	const postId = req.params.id;
	const creatorId = req.userData.userId;
	Post.deleteOne({ _id: postId, creator: creatorId })
		.then(result => {
			// similar response handling as updating a post
			if (result.n > 0) {
				// deletion successful
				res.status(200).json(result);
			} else {
				res.status(401).json({
					message: 'Post deletion not authorized!'
				});
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({
				message: 'Fetching post failed.'
			});
		});
};