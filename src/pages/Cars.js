import React, { useEffect, useState } from 'react';
import CarList from '../components/CarList';
import CarForm from '../components/CarForm';
import { fetchCars } from '../services/carService';

const Cars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            const carData = await fetchCars();
            setCars(carData);
        };
        getCars();
    }, []);

    return (
        <div>
            <h2>Car Management</h2>
            <CarForm />
            <CarList cars={cars} />
        </div>
    );
};

export default Cars;