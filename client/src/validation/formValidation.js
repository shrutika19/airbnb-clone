const validateAccommodationForm = (formData) => {
    const { title, address, description } = formData;
    const errors = {};

    if (!title.trim()) {
        errors.title = 'Title is required';
    }

    if (!address.trim()) {
        errors.address = 'Address is required';
    }

    if (!description.trim()) {
        errors.description = 'Description is required';
    }

    return errors;
};

export default validateAccommodationForm;
