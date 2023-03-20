const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		minlength: 5,
		maxlength:20,
		required: true
	},
	email: {
		type: String,
		required: true
	}, 
	password: {
		type: String,
		required: true, 
		minlength: 8
	}
});
module.exports = mongoose.model("User", userSchema);
