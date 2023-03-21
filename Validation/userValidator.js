const Joi = require("joi");


const signupValidator = Joi.object().keys({
	username: Joi.string().min(4).required(),
	email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
	password: Joi.string().alphanum().min(6).max(15).required().label('Password'),
	mobile:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  
});


const signinValidator = Joi.object().keys({
	email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
	password: Joi.string().alphanum().min(6).max(15).required().label('Password'),
 
});


const updateUserValidator = Joi.object().keys({
	username: Joi.string().min(4),
	password: Joi.string().alphanum().min(6).max(15).required().label('Password'),
});
 

module.exports = { signupValidator, updateUserValidator, signinValidator };