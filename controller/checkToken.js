/* eslint-disable no-undef */
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const Data = require("../model/dataModel");


const checkAuth = async(req, res, next) => {
	let token = req.headers.token;
	let result = jwt.verify(token, secret);
	let { id } = req.body;
	let check; 
	try {
		check = await Data.findOne({ _id: id });
        
	}
	catch (err) {
		console.log(err);
	}
  
	if ( check.email && check.email == result.email) {
		next();
	}
	else {
		res.status(404).send("authentication error");
	}
};
module.exports = checkAuth;