const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const dataSchema = new Schema({
	title: {
		type: String,
		required: true
	}, 
	detail: {
		type: String,
		required: true
	},
	attachment: {
		type: String,
	},
	startdate: {
		type: Date,
		default: (new Date()).getTime() 
	},
	email: {
		type: String,
		required:true,
	}

});
module.exports = mongoose.model("Data", dataSchema);
