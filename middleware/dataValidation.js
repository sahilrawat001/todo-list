const { newDataValidator } = require("../Validation/dataValidator");


const newDataValidate = (req, res, next) => {
    const result = newDataValidator.validate(req.body);
    if (result.error) {
        console.log(result.error.message);
        res.status(400).send({ error: result.error.message });
    }
    else {
        console.log("ok");
        next();
    }
};   

module.exports = { newDataValidate };