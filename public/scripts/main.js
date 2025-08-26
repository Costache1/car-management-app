document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const sections = {
        home: document.getElementById('home-section'),
        cars: document.getElementById('cars-section'),
        addCar: document.getElementById('add-car-section'),
        reports: document.getElementById('reports-section')
    };
    function showSection(name) {
        Object.values(sections).forEach(sec => sec.style.display = 'none');
        sections[name].style.display = '';
    }
    document.getElementById('nav-home').onclick = () => showSection('home');
    document.getElementById('nav-cars').onclick = () => { showSection('cars'); renderCarList(); };
    document.getElementById('nav-add-car').onclick = () => showSection('addCar');
    document.getElementById('nav-reports').onclick = () => { showSection('reports'); renderReport(); };

    // Data
    let cars = JSON.parse(localStorage.getItem('cars') || '[]');
    let maintenance = JSON.parse(localStorage.getItem('maintenance') || '{}');
    let editingCarId = null;
    let currentMaintenanceCarId = null;

    // Helpers
    function saveData() {
        localStorage.setItem('cars', JSON.stringify(cars));
        localStorage.setItem('maintenance', JSON.stringify(maintenance));
    }
    function notify(msg) {
        const area = document.getElementById('notification-area');
        area.textContent = msg;
        setTimeout(() => { area.textContent = ''; }, 2000);
    }

    // Car List
    function renderCarList() {
        const tbody = document.getElementById('car-list');
        const search = document.getElementById('search-car').value.toLowerCase();
        tbody.innerHTML = '';
        cars.filter(car =>
            car.make.toLowerCase().includes(search) ||
            car.model.toLowerCase().includes(search) ||
            car.vin.toLowerCase().includes(search)
        ).forEach(car => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.vin}</td>
                <td>
                    <button data-id="${car.id}" class="btn-maintenance">View/Add</button>
                </td>
                <td>
                    <button data-id="${car.id}" class="btn-edit">Edit</button>
                    <button data-id="${car.id}" class="btn-delete">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        // Attach events
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.onclick = () => openEditCarModal(btn.dataset.id);
        });
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = () => deleteCar(btn.dataset.id);
        });
        document.querySelectorAll('.btn-maintenance').forEach(btn => {
            btn.onclick = () => openMaintenanceModal(btn.dataset.id);
        });
    }
    document.getElementById('search-car').oninput = renderCarList;

    // Add Car
// Car make/model/year dropdown logic
const makeModelMap = {
    Toyota: ["Corolla", "Camry", "Prius", "RAV4"],
    Ford: ["Fiesta", "Focus", "Mustang", "Explorer"],
    BMW: ["3 Series", "5 Series", "X3", "X5"],
    Volkswagen: ["Golf", "Passat", "Tiguan", "Polo"],
    Honda: ["Civic", "Accord", "CR-V", "Jazz"]
};

const makeSelect = document.getElementById('car-make');
const modelSelect = document.getElementById('car-model');
const yearSelect = document.getElementById('car-year');

// Populate years (e.g., 2000-2025)
(function populateYears() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2000; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
    }
})();

makeSelect.addEventListener('change', function() {
    const models = makeModelMap[this.value] || [];
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    models.forEach(model => {
        const opt = document.createElement('option');
        opt.value = model;
        opt.textContent = model;
        modelSelect.appendChild(opt);
    });
});

document.getElementById('add-car-form').onsubmit = e => {
    e.preventDefault();
    const form = e.target;
    const car = {
        id: Date.now().toString(),
        make: form.make.value,
        model: form.model.value,
        year: form.year.value,
        vin: form.vin.value
    };
    cars.push(car);
    saveData();
    form.reset();
    notify('Car added!');
    showSection('cars');
    renderCarList();
};
    /*document.getElementById('add-car-form').onsubmit = e => {
        e.preventDefault();
        const form = e.target;
        const car = {
            id: Date.now().toString(),
            make: form.make.value,
            model: form.model.value,
            year: form.year.value,
            vin: form.vin.value
        };
        cars.push(car);
        saveData();
        form.reset();
        notify('Car added!');
        showSection('cars');
        renderCarList();
    };
*/

    // Edit Car
    function openEditCarModal(id) {
        editingCarId = id;
        const car = cars.find(c => c.id === id);
        const modal = document.getElementById('edit-car-modal');
        const form = document.getElementById('edit-car-form');
        form.carId.value = car.id;
        form.make.value = car.make;
        form.model.value = car.model;
        form.year.value = car.year;
        form.vin.value = car.vin;
        modal.style.display = 'flex';
    }
    document.getElementById('close-edit-car').onclick = () => {
        document.getElementById('edit-car-modal').style.display = 'none';
    };
    document.getElementById('edit-car-form').onsubmit = e => {
        e.preventDefault();
        const form = e.target;
        const car = cars.find(c => c.id === form.carId.value);
        car.make = form.make.value;
        car.model = form.model.value;
        car.year = form.year.value;
        car.vin = form.vin.value;
        saveData();
        notify('Car updated!');
        document.getElementById('edit-car-modal').style.display = 'none';
        renderCarList();
    };

    // Delete Car
    function deleteCar(id) {
        if (confirm('Delete this car?')) {
            cars = cars.filter(c => c.id !== id);
            delete maintenance[id];
            saveData();
            renderCarList();
            notify('Car deleted!');
        }
    }

    // Maintenance Modal
    function openMaintenanceModal(carId) {
        currentMaintenanceCarId = carId;
        document.getElementById('maintenance-modal').style.display = 'flex';
        renderMaintenanceHistory();
    }
    document.getElementById('close-maintenance').onclick = () => {
        document.getElementById('maintenance-modal').style.display = 'none';
    };
    document.getElementById('add-maintenance-form').onsubmit = e => {
        e.preventDefault();
        const form = e.target;
        const record = {
            date: form.date.value,
            description: form.description.value,
            cost: parseFloat(form.cost.value)
        };
        if (!maintenance[currentMaintenanceCarId]) maintenance[currentMaintenanceCarId] = [];
        maintenance[currentMaintenanceCarId].push(record);
        saveData();
        notify('Maintenance record added!');
        form.reset();
        renderMaintenanceHistory();
    };
    function renderMaintenanceHistory() {
        const ul = document.getElementById('maintenance-history');
        ul.innerHTML = '';
        const records = maintenance[currentMaintenanceCarId] || [];
        records.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = `${rec.date}: ${rec.description} ($${rec.cost.toFixed(2)})`;
            ul.appendChild(li);
        });
    }

    // Reports
    function renderReport() {
        const output = document.getElementById('report-output');
        let html = '<h4>Maintenance Costs by Car</h4><ul>';
        cars.forEach(car => {
            const records = maintenance[car.id] || [];
            const total = records.reduce((sum, r) => sum + r.cost, 0);
            html += `<li>${car.make} ${car.model} (${car.year}): $${total.toFixed(2)}</li>`;
        });
        html += '</ul>';
        output.innerHTML = html;
    }
    document.getElementById('generate-report').onclick = renderReport;

    // Initial
    showSection('home');
});