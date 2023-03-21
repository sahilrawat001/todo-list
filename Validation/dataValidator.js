const Joi = require("joi");


const newDataValidator = Joi.object().keys({
    title: Joi.string(),
    email: Joi.string().email({ tlds: { allow: ["com", "in", "net"] } }).lowercase().required(),
    detail: Joi.string(),
     taskstatus: Joi.number().valid(0,1,2 ).required(),

});

module.exports = { newDataValidator };       