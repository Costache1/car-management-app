// This file contains unit tests for the carService functions, verifying that data management operations work correctly.

import { fetchCars, addCar, updateCar, deleteCar } from '../../src/services/carService';

describe('Car Service', () => {
    let cars = [];

    beforeEach(() => {
        cars = [
            { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
            { id: 2, make: 'Honda', model: 'Accord', year: 2021 },
        ];
    });

    test('fetchCars should return the list of cars', () => {
        const result = fetchCars();
        expect(result).toEqual(cars);
    });

    test('addCar should add a new car to the list', () => {
        const newCar = { id: 3, make: 'Ford', model: 'Mustang', year: 2022 };
        addCar(newCar);
        const result = fetchCars();
        expect(result).toContainEqual(newCar);
    });

    test('updateCar should update an existing car', () => {
        const updatedCar = { id: 1, make: 'Toyota', model: 'Camry', year: 2021 };
        updateCar(updatedCar);
        const result = fetchCars();
        expect(result).toContainEqual(updatedCar);
    });

    test('deleteCar should remove a car from the list', () => {
        deleteCar(1);
        const result = fetchCars();
        expect(result).not.toContainEqual(cars[0]);
    });
});