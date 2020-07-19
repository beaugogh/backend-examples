const mongoose = require('mongoose');
// A third-party plugin for mongoose to perform unique validation
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Note that the unique field in this mongoose schema is not for validation,
 * it is just a field for mongoose to do internal optimization
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
