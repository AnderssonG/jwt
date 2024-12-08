import axios from 'axios';

const API_URL = 'https://node-js-vula.onrender.com/tipo';

export const getTypes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createType = async (type) => {
    const response = await axios.post(API_URL, type);
    return response.data;
};

export const getTypeById = async (id) => {
    const response = await axios.get(`${API_URL}/?${id}`);
    return response.data;
};

// Actualizar género
export const updateType = async (id, tipoData) => {
    const response = await axios.put(`${API_URL}/${id}`, tipoData);
    return response.data;
};