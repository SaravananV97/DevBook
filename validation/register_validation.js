const validator = require("validator");
const isEmpty = require("./is_empty")
module.exports = (data) => { 
    let errors = {};
    let check = validator.isLength(data.name, {min: 2, max: 30})
    if(!check)
        errors.name = "The name must be atleast 2 Charecters"
    if(!validator.isEmail(data.email))
        errors.email = "Please Enter a valid Email"
    console.log(errors)
    return {
        errors,
        isValid: isEmpty(errors)
}
}