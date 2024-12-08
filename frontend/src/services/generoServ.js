import axios from 'axios';

const API_URL = 'https://node-js-vula.onrender.com/genero';

export const getgenero = async() => {

    const response = await axios.get(API_URL);
    return response.data;

};

export const creategenero = async(genero) => {

    const response = await axios.post(API_URL,genero);
    return response.data;

};

// Obtener género por ID
export const getGenreById = async (id) => {
    const response = await axios.get(`${API_URL}/?${id}`);
    return response.data;
};

// Actualizar género
export const updateGenre = async (id, genreData) => {
    const response = await axios.put(`${API_URL}/${id}`, genreData);
    return response.data;
};