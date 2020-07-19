/**
 * use multer to parse uploaded files
 * 
 * insert multer specs as middleware into express calls,
 * multer will extract the image property from the
 * incoming request and pass it down as req.file
 */
const multer = require('multer');
const MIME_TYPE_MAP = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/jpg': 'jpg'
};
// multer configuration that indicates
// where/how to store uploaded files
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		const isValid = MIME_TYPE_MAP[file.mimetype];
		let error = isValid ? null : new Error('Invalid mime type');
		/**
		 * Important note:
		 * During deployment, the destination path to 
		 * the images directory should be relative to the server.js file, 
		 * which in this case, is simply './images'
		 */
		callback(error, 'server/images');
	},
	filename: (req, file, callback) => {
		const name = file.originalname
			.toLowerCase()
			.split(' ')
			.join('-');
		const ext = MIME_TYPE_MAP[file.mimetype];
		callback(null, name + '-' + Date.now() + '.' + ext);
	}
});

module.exports = multer({ storage: storage }).single('image');