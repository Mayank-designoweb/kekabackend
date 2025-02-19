const regex={
    nameRegex: /^[A-Za-z\s]+$/,  // Only letters and spaces
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,// Standard email format
    passwordRegex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, // At least 8 chars, 1 uppercase, 1 number
    phoneRegex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
}

module.exports = regex;


