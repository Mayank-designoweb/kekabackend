const Joi = require("joi");

// validation schema for signup

const signupSchema = Joi.object({
    firstName: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(30).required().messages({
        "string.pattern.base": "First name should only contain alphabets",
        "string.empty": "First name is required",
    }),
    lastName: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(30).required().messages({
        "string.pattern.base": "Last name should only contain alphabets",
        "string.empty": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    password: Joi.string().min(8).max(20)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            "string.pattern.base": "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
            "string.empty": "Password is required",
        }),
    contact: Joi.string().length(10).pattern(/^[0-9]+$/).allow(null, "").optional().messages({  // ✅ Allow null or empty contact
        "string.length": "Contact number must be 10 digits",
        "string.pattern.base": "Contact number should contain only numbers",
    }),
});

// validation schema for login

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
    }),
});

// Middleware function for signup validation

const validateSignup = (req, res, next) => {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

// Middleware function for login validation

const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

module.exports = { validateSignup, validateLogin };  //  Exporting both validators
