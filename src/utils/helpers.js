// This file contains utility functions that assist with various tasks throughout the application.

export const formatCarData = (car) => {
    return {
        id: car.id,
        make: car.make.charAt(0).toUpperCase() + car.make.slice(1),
        model: car.model.charAt(0).toUpperCase() + car.model.slice(1),
        year: car.year,
        price: `$${car.price.toFixed(2)}`,
    };
};

export const validateCarForm = (formData) => {
    const errors = {};
    if (!formData.make) {
        errors.make = "Make is required.";
    }
    if (!formData.model) {
        errors.model = "Model is required.";
    }
    if (!formData.year || isNaN(formData.year) || formData.year < 1886 || formData.year > new Date().getFullYear()) {
        errors.year = "Please enter a valid year.";
    }
    if (!formData.price || isNaN(formData.price) || formData.price < 0) {
        errors.price = "Please enter a valid price.";
    }
    return errors;
};

export const sortCarsByYear = (cars) => {
    return cars.sort((a, b) => b.year - a.year);
};