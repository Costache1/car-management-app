import React, { useState } from 'react';

const CarForm = ({ onSubmit, initialData }) => {
    const [make, setMake] = useState(initialData ? initialData.make : '');
    const [model, setModel] = useState(initialData ? initialData.model : '');
    const [year, setYear] = useState(initialData ? initialData.year : '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!make || !model || !year) {
            setError('All fields are required');
            return;
        }
        setError('');
        onSubmit({ make, model, year });
        setMake('');
        setModel('');
        setYear('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? 'Edit Car' : 'Add Car'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>
                    Make:
                    <input
                        type="text"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Model:
                    <input
                        type="text"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Year:
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit">{initialData ? 'Update Car' : 'Add Car'}</button>
        </form>
    );
};

export default CarForm;