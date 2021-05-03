//Pull in validator and is-empty dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");
//// we cant use isEmpty from validator pkg as it needs its param to be a string

//Export the function validateRegisterInput, which takes in data as a parameter sent from our frontend registration form
module.exports = function validateRegisterInput(data) {
    //Instantiate our errors object
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = isEmpty(data.username) ? "" : data.username;
    data.password = isEmpty(data.password) ? "" : data.password;
    //data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    // Name checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    }
    
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    // if (Validator.isEmpty(data.password2)) {
    //     errors.password2 = "Confirm password field is required";
    // }
    if (
        !Validator.isEmpty(data.username) &&
        !Validator.isLength(data.username, { min: 2, max: 30 })
    ) {
        errors.username = "Name must be between 2 and 30 characters";
    }
    // if (!Validator.equals(data.password, data.password2)) {
    //     errors.password2 = "Passwords must match";
    // }

    //Return our errors object with any and all errors contained as well as an isValid boolean that checks to see if we have any errors
    return {
        errors,
        isValid: isEmpty(errors)
    };
};