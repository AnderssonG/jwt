import React, { useState, useEffect } from 'react';
import { updateGenre, getGenreById } from '../services/generoServ';

const GenreUpdateForm = ({ genreId, onUpdate }) => {
    const [genreData, setGenreData] = useState({
        name: '',
        status: true,
        description: ''
    });

    useEffect(() => {
        if (genreId) {
            fetchGenreById(genreId);
        }
    }, [genreId]);

    const fetchGenreById = async (id) => {
        const genre = await getGenreById(id);
        setGenreData(genre);
    };

    const handleChange = (e) => {
        setGenreData({ ...genreData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGenre(genreId, genreData);
            onUpdate();  // Callback para recargar la lista de géneros o mostrar un mensaje de éxito
            alert('Género actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el género:', error);
            alert('Error al actualizar el género');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre del género"
                value={genreData.name}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Descripción"
                value={genreData.description}
                onChange={handleChange}
            />
            <label>
                Activo:
                <input
                    type="checkbox"
                    name="status"
                    checked={genreData.status}
                    onChange={() => setGenreData({ ...genreData, status: !genreData.status })}
                />
            </label>
            <button type="submit">Actualizar Género</button>
        </form>
    );
};

export default GenreUpdateForm;
