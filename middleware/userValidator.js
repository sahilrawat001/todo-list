/* eslint-disable no-undef */
const { signupValidator, signinValidator, updateUserValidator } = require("../Validation/userValidator");


const signupValidate = (req, res, next) => {
    const result = signupValidator.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(400).send({error:result.error.message});
    }
    else {
        console.log("ok");
        next();
    }
};      
   

const signinValidate = (req, res, next) => {
    const result = signinValidator.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(400).send({ error: result.error.message });
    }
    else {
        console.log("ok");
        next();
    }
};


const updateValidate = (req, res, next) => {
    const result = updateUserValidator.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(400).send({ error: result.error.message });
    }
    else {
        console.log("ok");
        next();
    }
};


module.exports = { signupValidate, signinValidate ,updateValidate };