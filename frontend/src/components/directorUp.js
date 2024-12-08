import React, { useState, useEffect } from 'react';
import { getDirectorById, updateDirector } from '../services/directorServ';

const DirectorUpdateForm = ({ directorId, onUpdate }) => {
    const [directorData, setDirectorData] = useState({
        name: '',
        status: true
    });

    useEffect(() => {
        if (directorId) {
            fetchDirectorById(directorId);
        }
    }, [directorId]);

    const fetchDirectorById = async (id) => {
        const director = await getDirectorById(id);
        setDirectorData(director);
    };

    const handleChange = (e) => {
        setDirectorData({ ...directorData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setDirectorData({ ...directorData, status: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDirector(directorId, directorData);
            onUpdate(); // Callback para actualizar la lista después de modificar
            alert('Director actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el director:', error);
            alert('Error al actualizar el director');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre del director"
                value={directorData.name}
                onChange={handleChange}
                required
            />
            <label>
                Activo:
                <input
                    type="checkbox"
                    name="status"
                    checked={directorData.status}
                    onChange={handleCheckboxChange}
                />
            </label>
            <button type="submit">Actualizar Director</button>
        </form>
    );
};

export default DirectorUpdateForm;
