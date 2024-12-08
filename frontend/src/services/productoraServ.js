import axios from 'axios';

const API_URL = 'https://node-js-vula.onrender.com/productora';

export const getProducers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProducer = async (producer) => {
    const response = await axios.post(API_URL, producer);
    return response.data;
};

export const getProductoraById = async (id) => {
    const response = await axios.get(`${API_URL}/?${id}`);
    return response.data;
};

// Actualizar género
export const updateproductora = async (id, productoraData) => {
    const response = await axios.put(`${API_URL}/${id}`, productoraData);
    return response.data;
};