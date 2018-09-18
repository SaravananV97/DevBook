const validator = require("validator");
const isEmpty = require("./is_empty");
module.exports = (data) => {
    let errors = {}
    if(!validator.isEmail(data.email))
        errors.email = "Enter a Valid Email"
    return {
        errors,
        isValid:isEmpty(errors)
}
}
