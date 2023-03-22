const Joi = require("joi");


const newDataValidator = Joi.object().keys({
    title: Joi.string(),
     detail: Joi.string(), 
     attachment: Joi.any(),
     startdate: Joi.date(),
     enddate: Joi.date(),
     taskstatus: Joi.number().valid(0, 1, 2),

});     
  
module.exports = { newDataValidator };  