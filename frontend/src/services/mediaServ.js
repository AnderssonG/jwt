import axios from 'axios';

const API_URL = 'https://node-js-vula.onrender.com/media';

export const getMedia = async()=> {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createMedia = async (media) => {
    const response = await axios.post(API_URL, media);
    
    return response.data;
};
// Obtener media por ID
export const getMediaById = async (id) => {
    const response = await axios.get(`${API_URL}/?${id}`);
    return response.data;
};

// Actualizar media
export const updateMedia = async (id, mediaData) => {
    const response = await axios.put(`${API_URL}/${id}`, mediaData);
    return response.data;
};