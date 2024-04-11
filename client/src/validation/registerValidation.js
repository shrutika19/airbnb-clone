// validation/registerValidation.js
const validateRegister = (name, email, password) => {
    const errors = {};

    if (!name) {
        errors.name = 'Name is required';
    }

    if (!email) {
        errors.email = 'Email is required';
    }

    if (!password) {
        errors.password = 'Password is required';
    }

    return errors;
}

export default validateRegister;
