const baseUrl = 'http://localhost:3050';
const axios = require('axios');


export const getAllCars = () => {
    return axios.get(`${baseUrl}/api/cars`);
}

export const getCarById = (id) => {
    return axios.get(`${baseUrl}/api/cars`)
        .then((result) => {
            return result.data.map((i) => i)
                .find((c) => c.car_id === id);
        });
    ;
}

export const addCar = (car) => {
    return axios.post(`${baseUrl}/api/cars`, car);
};