import React, { useState, useEffect } from 'react';
import { getTypes, createType } from '../services/tipoServ';
import GenreUpdateForm from './tipoUp';

const TypeList = () => {
    const [types, setTypes] = useState([]);
    const [newType, setNewType] = useState('');

    const [selectedTipoId, setSelectedTipoId] = useState(null);

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        const data = await getTypes();
        setTypes(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newType.trim()) {
            await createType({ name: newType });
            setNewType('');
            fetchTypes();
        }
    };

    const handleUpdateClick = (id) => {
        setSelectedTipoId(id); // Establecer el ID del género seleccionado
    };

    return (
        <div>
            <h2>Lista de Tipos</h2>
            <ul>
                {types.map((type) => (
                    <li key={type._id}>{type.name}
                    <button onClick={() => handleUpdateClick(type._id) }>Actualizar</button>
                    </li>
                ))}
            </ul>

            {selectedTipoId && (
                <div>
                    <h3>Actualizar Género</h3>
                    <GenreUpdateForm
                        typeId={selectedTipoId}
                        onUpdate={fetchTypes} // Callback para recargar la lista después de la actualización
                    />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del tipo"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                />
                <button type="submit">Agregar Tipo</button>
            </form>
        </div>
    );
};

export default TypeList;
