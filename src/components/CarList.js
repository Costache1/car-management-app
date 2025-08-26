import React, { useEffect, useState } from 'react';
import { fetchCars } from '../services/carService';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCars = async () => {
            try {
                const carData = await fetchCars();
                setCars(carData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCars();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Car List</h2>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>
                        {car.make} {car.model} - {car.year}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;