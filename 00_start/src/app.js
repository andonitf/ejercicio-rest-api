import { 
    addCarRows, 
    retrieveCarId, 
    populateEditCarForm,
    retrieveCarFormEditCarForm,
    cleanTable,
} from './uiHelpers';
import { 
   getAllCars,
   getCarById,
   addCar 
} from './API/carsApi';

let maxId = 0;

document.addEventListener('DOMContentLoaded', () => {
    const buttonLoadCars = document.getElementById('loadcars');
    buttonLoadCars.addEventListener('click', (event) => {
        event.stopPropagation();
        cleanTable('cars-table');
        getAllCars().then((result) => {      
            maxId = Math.max.apply(Math, result.data.map(function(o) { return o.car_id; }));      
            addCarRows(result.data, 'cars-table');
        });
    });

    const buttonLoadCar = document.getElementById('loadcar');
    buttonLoadCar.addEventListener('click', (event) => {
        event.stopPropagation();
        const carId = retrieveCarId();
        getCarById(carId)
            .then((r) => populateEditCarForm(r));
    });

    const buttonAddCar = document.getElementById('add');
    buttonAddCar.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        const car = retrieveCarFormEditCarForm();
        maxId++;
        car['car_id'] = maxId;
        addCar(car)
            .then((_) => {
                cleanTable('cars-table');
                return getAllCars();
            })
            .then((result) => {
                addCarRows(result.data, 'cars-table');
            });
    });
});