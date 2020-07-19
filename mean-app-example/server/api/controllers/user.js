// third-party library to handle encryption/decryption
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
	// encrypt user password
	bcrypt.hash(req.body.password, 10).then(hash => {
		const user = new User({
			_id: new mongoose.Types.ObjectId(),
			email: req.body.email,
			password: hash
		});
		user
			.save()
			.then(result => {
				res.status(201).json({
					message: 'user created',
					result: result
				});
			})
			.catch(err => {
				res.status(500).json({
					message: 'Invalid authentication credentials!'
				});
			});
	}).catch(err => {
		res.status(500).json({
			message: 'Cannot hash user data.'
		});
	})
}

exports.login = (req, res, next) => {
	let fetchedUser;
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(401).json({
					message: 'Invalid authentication credentials!'
				});
			}
			fetchedUser = user;
			return bcrypt.compare(req.body.password, user.password);
		})
		.then(result => {
			if (!result) {
				return res.status(401).json({
					message: 'Invalid authentication credentials!'
				});
			}
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				process.env.JWT_KEY,
				{ expiresIn: '1h' }
			);
			res.status(200).json({
				token: token,
				expiresIn: 3600000,
				userId: fetchedUser._id
			});
		})
		.catch(err => {
			console.error(err);
			return res.status(401).json({
				message: 'Invalid authentication credentials!'
			});
		});
}
