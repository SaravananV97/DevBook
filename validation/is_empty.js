const isEmpty = (errors) => {
    return errors === null || errors === undefined 
    || (typeof errors == "object" && Object.keys(errors).length === 0)
    || (typeof errors === "string" && errors.trim().length === 0);
}

module.exports = isEmpty;
