const Joi = require("joi");


const signupValidator = Joi.object().keys({
	username: Joi.string().min(4).required(),
	email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
	mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
	password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/).min(6).max(15).required().label('Password'),

  
});


const signinValidator = Joi.object().keys({
	email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
	password:Joi.string().min(6).max(15).required().label('Password'),
	//password: Joi.string().pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/).min(6).max(15).required().label('Password'),
 
});


const updateUserValidator = Joi.object().keys({
	username: Joi.string().min(4),
	password: Joi.string().alphanum().min(6).max(15).required().label('Password'),
});
 

module.exports = { signupValidator, updateUserValidator, signinValidator };