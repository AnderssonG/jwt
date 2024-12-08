import React, { useState, useEffect } from 'react';
import { getTypeById, updateType } from '../services/tipoServ';

const TypeUpdateForm = ({ typeId, onUpdate }) => {
    const [typeData, setTypeData] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (typeId) {
            fetchTypeById(typeId);
        }
    }, [typeId]);

    const fetchTypeById = async (id) => {
        const type = await getTypeById(id);
        setTypeData(type);
    };

    const handleChange = (e) => {
        setTypeData({ ...typeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateType(typeId, typeData);
            onUpdate(); // Callback para actualizar la lista después de modificar
            alert('Tipo actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el tipo:', error);
            alert('Error al actualizar el tipo');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre del tipo"
                value={typeData.name}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Descripción"
                value={typeData.description}
                onChange={handleChange}
            />
            <button type="submit">Actualizar Tipo</button>
        </form>
    );
};

export default TypeUpdateForm;
