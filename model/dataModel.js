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
		type:  Date,
	},
	enddate: {
		type: Date,
	},
	email: { 
		type: String,
		required:true,
	},      
	taskstatus: {
	type: Number
	}
},
// {timestamps: true}
);

module.exports = mongoose.model("Data", dataSchema);
