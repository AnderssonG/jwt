import axios from 'axios';

const API_URL = 'https://node-js-vula.onrender.com/director';

export const getDirectors = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createDirector = async (director) => {
    const response = await axios.post(API_URL, director);
    return response.data;
};
export const getDirectorById = async (id) => {
    const response = await axios.get(`${API_URL}/?${id}`);
    return response.data;
};

// Actualizar género
export const updateDirector = async (id, directorData) => {
    const response = await axios.put(`${API_URL}/${id}`, directorData);
    return response.data;
};