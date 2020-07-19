const express = require('express');
/**
 * standard path library that comes with nodeJs,
 * can be used for path operations in different OS
 */
const path = require('path');
/**
 * use body parser to expose the body portion
 * of an incoming request as req.body
 */
const bodyParser = require('body-parser');
/**
 * use cors to set headers for cross-origin http calls,  
 * which is equivalent to the following middleware usage
  
  app.use((req, res, next) => {
    console.log('setting the header...');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  }); 
 */
const cors = require('cors');
/**
 * use HTTP request logger middleware for node.js,
 * to get extra log info in console
 */
const morgan = require('morgan');
/**
 * use Mongoose to connect to MongoDB
 * annd make use of schemas
 */
const mongoose = require('mongoose');
mongoose
	.connect(
		'mongodb://localhost:27017/' + process.env.MONGODB_NAME,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('Connected to database!');
	})
	.catch(err => {
		console.error(err);
	});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
/**
 * make the folder /images publicly accessible,
 * and ensure that all calls at /images are directed to /server/images
 * 
 * Important note:
 * During deployment, the destination path to 
 * the images directory should be relative to the server.js file, 
 * which in this case, is simply './images'
 */ 
app.use('/images', express.static(path.join('server/images')));

// set up routes
const postRoutes = require('./api/routes/post');
app.use('/posts', postRoutes);
const userRoutes = require('./api/routes/user');
app.use('/user', userRoutes);

// handle errors
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
