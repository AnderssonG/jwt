import React, { useState, useEffect } from 'react';
import { updateMedia, getMediaById } from '../services/mediaServ';

const MediaUpdateForm = ({ mediaId, onUpdate }) => {
    const [mediaData, setMediaData] = useState({
        serial: '',
        title: '',
        synopsis: '',
        url: '',
        coverImage: '',
        releaseYear: '',
        genre: '',
        director: '',
        producer: '',
        type: ''
    });

    useEffect(() => {
        if (mediaId) {
            fetchMediaById(mediaId);
        }
    }, [mediaId]);

    const fetchMediaById = async (id) => {
        const media = await getMediaById(id);
        setMediaData(media);
    };

    const handleChange = (e) => {
        setMediaData({ ...mediaData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMedia(mediaId, mediaData);
            onUpdate();  // Callback para recargar la lista de media o mostrar un mensaje de éxito
            alert('Media actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar la media:', error);
            alert('Error al actualizar la media');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="serial"
                placeholder="Serial"
                value={mediaData.serial}
                onChange={handleChange}
            />
            <input
                type="text"
                name="title"
                placeholder="Título"
                value={mediaData.title}
                onChange={handleChange}
            />
            <textarea
                name="synopsis"
                placeholder="Sinopsis"
                value={mediaData.synopsis}
                onChange={handleChange}
            />
            <input
                type="text"
                name="url"
                placeholder="URL de la película"
                value={mediaData.url}
                onChange={handleChange}
            />
            <input
                type="text"
                name="coverImage"
                placeholder="Imagen de portada (URL)"
                value={mediaData.coverImage}
                onChange={handleChange}
            />
            <input
                type="number"
                name="releaseYear"
                placeholder="Año de estreno"
                value={mediaData.releaseYear}
                onChange={handleChange}
            />
            <button type="submit">Actualizar Media</button>
        </form>
    );
};

export default MediaUpdateForm;
