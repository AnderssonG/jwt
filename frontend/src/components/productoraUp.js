import React, { useState, useEffect } from 'react';
import { getProductoraById, updateproductora } from '../services/productoraServ';

const ProducerUpdateForm = ({ producerId, onUpdate }) => {
    const [producerData, setProducerData] = useState({
        name: '',
        status: true,
        slogan: '',
        description: ''
    });

    useEffect(() => {
        if (producerId) {
            fetchProducerById(producerId);
        }
    }, [producerId]);

    const fetchProducerById = async (id) => {
        const producer = await getProductoraById(id);
        setProducerData(producer);
    };

    const handleChange = (e) => {
        setProducerData({ ...producerData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setProducerData({ ...producerData, status: e.target.checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateproductora(producerId, producerData);
            onUpdate(); // Callback para actualizar la lista después de modificar
            alert('Productora actualizada con éxito');
        } catch (error) {
            console.error('Error al actualizar la productora:', error);
            alert('Error al actualizar la productora');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Nombre de la productora"
                value={producerData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="slogan"
                placeholder="Slogan"
                value={producerData.slogan}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Descripción"
                value={producerData.description}
                onChange={handleChange}
            />
            <label>
                Activo:
                <input
                    type="checkbox"
                    name="status"
                    checked={producerData.status}
                    onChange={handleCheckboxChange}
                />
            </label>
            <button type="submit">Actualizar Productora</button>
        </form>
    );
};

export default ProducerUpdateForm;
