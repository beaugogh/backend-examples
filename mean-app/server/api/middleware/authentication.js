const jwt = require('jsonwebtoken');
/**
 * This interceptor is used to intercept express calls (when needed),
 * and verify if a call has the authorized token
 */
module.exports = (req, res, next) => {
	/**
	 * Assuming the token to be in the request headers, more precisely,
	 * to be in the req.headers.authorization.
	 * This requires frontend to intercept outgoing http calls and
	 * set the autorization header with the token
	 */
	try {
		// assuming the authorization stirng format: 'Bearer tokenstringrandom'
		const token = req.headers.authorization.split(' ')[1];
		/**
		 * The decoded token contains the structure that has been defined
		 * in the /user/login route (see api/routes/user.js),
		 * where the encoded token was sent to frontend when the user logs in.
		 * This encoded token will be used by the frontend to make further requests
		 * to the backend. Here we intercept that encoded token and make use of it.
		 */
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		/**
		 * We can provide additional properties to the request and pass it along.
		 */
		req.userData = { email: decodedToken.email, userId: decodedToken.userId };
		next();
	} catch (err) {
		res.status(401).json({
			message: 'Authentication failed.'
		});
	}
};
