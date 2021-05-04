//Pull in validator and is-empty dependencies
const Validator = require("validator");
const isEmpty = require("is-empty");

//Export the function validateRegisterInput, which takes in data as a parameter sent from our frontend registration form
module.exports = function validateLoginInput(data) {
    //errors object
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = isEmpty(data.username) ? "" : data.username;
    data.password = isEmpty(data.password) ? "" : data.password;
    
    // username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username field is required";
    } 

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
