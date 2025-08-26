import React from 'react';
import { render, screen } from '@testing-library/react';
import CarList from '../../src/components/CarList';
import { fetchCars } from '../../src/services/carService';

jest.mock('../../src/services/carService');

describe('CarList Component', () => {
    beforeEach(() => {
        fetchCars.mockClear();
    });

    test('renders loading message when cars are being fetched', () => {
        fetchCars.mockResolvedValueOnce([]);
        render(<CarList />);
        const loadingMessage = screen.getByText(/loading/i);
        expect(loadingMessage).toBeInTheDocument();
    });

    test('renders car list when cars are fetched successfully', async () => {
        const cars = [
            { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
            { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
        ];
        fetchCars.mockResolvedValueOnce(cars);
        render(<CarList />);
        
        const car1 = await screen.findByText(/Toyota Corolla/i);
        const car2 = await screen.findByText(/Honda Civic/i);
        
        expect(car1).toBeInTheDocument();
        expect(car2).toBeInTheDocument();
    });

    test('renders error message when fetching cars fails', async () => {
        fetchCars.mockRejectedValueOnce(new Error('Failed to fetch'));
        render(<CarList />);
        
        const errorMessage = await screen.findByText(/failed to fetch/i);
        expect(errorMessage).toBeInTheDocument();
    });
});