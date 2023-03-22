const mongoose = require("mongoose");
const { Schema } = require("mongoose");


const otpSchema = new Schema({
 
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number
    }
},
    // {timestamps: true}
);

module.exports = mongoose.model("Otp", otpSchema);
