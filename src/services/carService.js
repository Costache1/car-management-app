export const fetchCars = async () => {
    try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

export const addCar = async (car) => {
    try {
        const response = await fetch('/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const newCar = await response.json();
        return newCar;
    } catch (error) {
        console.error('Error adding car:', error);
        throw error;
    }
};

export const updateCar = async (carId, updatedCar) => {
    try {
        const response = await fetch(`/api/cars/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCar),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const car = await response.json();
        return car;
    } catch (error) {
        console.error('Error updating car:', error);
        throw error;
    }
};

export const deleteCar = async (carId) => {
    try {
        const response = await fetch(`/api/cars/${carId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
    }
};