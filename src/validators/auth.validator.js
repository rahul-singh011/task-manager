const {body} = require('express-validator');

const registerValidator = [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required.")
      .isLength({min: 2}).withMessage("Name must be atleast 2 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Enter a valid email"),

    body("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isLength({min: 6}).withMessage("Password must be atleast 6 characters"),
    
];

const loginValidator = [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Enter valid email"),
    
    body("password")
      .notEmpty().withMessage("Password is required"),    
];

module.exports = {registerValidator, loginValidator};