const validator = require("Validator");
const isEmpty = require("./is_empty");
const errors = {};
module.exports = (profile) =>{
    profile.handle = isEmpty(profile.handle)?"":profile.handle //to handle null values to strings
    profile.skills = isEmpty(profile.skills)?"":profile.skills 
    profile.status = isEmpty(profile.status)?"":profile.status
    if(validator.isEmpty(profile.handle))
        errors.handle = "Handle Cannot be Empty"
    if(!validator.isLength(profile.handle,{min: 2, max: 40}))
        errors.handle = "Handle length can be min 2 and max 40 charecters"
    else
        delete errors.handle
    if(validator.isEmpty(profile.skills))
        errors.skills = "Skills fields Cannot be Empty"
    if(!validator.isLength(profile.skills,{min: 5}))
        errors.skills = "Enter atleast one skill"    
    if(validator.isEmpty(profile.status))
        errors.handle = "Status Cannot be Empty"
    if(!validator.isLength(profile.status,{min: 2, max: 40}))
        errors.handle = "Handle length can be min 2 and max 40 charecters"
    if(!isEmpty(profile.website))
        if(!validator.isURL(profile.website))
            errors.website = "Enter a valid website"
    if(!isEmpty(profile.about))
            if(!validator.isLength(profile.about, {min: 10, max: 200}))
                errors.about = "Tell more about you but in less than 200 charecters!"
    if(!isEmpty(profile.location))
        if(!validator.isLength(profile.location,{min:3, max:50}))
            errors.location = "Location must be atleast 3 charecters"
    if(!isEmpty(profile.linkedin))
        if(!validator.isURL(profile.linkedin, {protocols:['https',"http"]}))
            errors.linkedin = "Enter a valid url"
    if(!isEmpty(profile.facebook))
        if(!validator.isURL(profile.facebook, {protocols:['https',"http"]}))
            errors.facebook = "Enter a valid url"
    if(!isEmpty(profile.twitter))
        if(!validator.isURL(profile.facebook, {protocols:['https',"http"]}))
            errors.twitter = "Enter a valid url"
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

