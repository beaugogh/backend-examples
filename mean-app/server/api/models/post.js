const mongoose = require('mongoose');

/**
 * The creator of a post is a user,
 * thus the type of the creator field is the objectId of that user,
 * and 'ref' field refers to the 'User' model
 */
const postSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: true },
	content: { type: String, required: false, default: '' },
	imagePath: { type: String, required: false, default: null },
	creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Post', postSchema);
