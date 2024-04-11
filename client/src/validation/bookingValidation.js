// bookingValidation.js


export const validateGuests = (numberOfGuests) => {
    // Check if number of guests is greater than 0
    return parseInt(numberOfGuests) > 0;
};

export const validateName = (name) => {
    // Check if name is not empty
    return name.trim() !== '';
};

export const validateMobile = (mobile) => {
    // Check if mobile number is a valid Indian mobile number
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
};
