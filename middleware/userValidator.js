/* eslint-disable no-undef */
const { signupValidator, signinValidator, updateUserValidator } = require("../Validation/userValidator");

function validateData (schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            console.log(result.error.message);
            res.status(400).send({ error: result.error.message });
        }
        else {
            console.log("ok");
            next();
        }
    };
}



module.exports = { validateData };