import React, { useState, useEffect } from 'react';
import { getDirectors, createDirector } from '../services/directorServ';
import GenreUpdateForm from './directorUp';

const DirectorList = () => {
    const [directors, setDirectors] = useState([]);
    const [newDirector, setNewDirector] = useState('');

    const [selectedDirectorId,setDirectorId]= useState(null);

    useEffect(() => {
        fetchDirectors();
    }, []);

    const fetchDirectors = async () => {
        const data = await getDirectors();
        setDirectors(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newDirector.trim()) {
            await createDirector({ name: newDirector });
            setNewDirector('');
            fetchDirectors();
        }
    };

    const handleUpdateClick = (id) => {
        setDirectorId(id); // Establecer el ID del género seleccionado
    };

    return (
        <div>
            <h2>Lista de Directores</h2>
            <ul>
                {directors.map((director) => (
                    <li key={director._id}>{director.name}<button onClick={() => handleUpdateClick(director._id) }>Actualizar</button>
                    </li>
                ))}
            </ul>

            {selectedDirectorId && (
                <div>
                    <h3>Actualizar Director</h3>
                    <GenreUpdateForm
                        directorId={selectedDirectorId}
                        onUpdate={fetchDirectors} // Callback para recargar la lista después de la actualización
                    />
                </div>
            )}

            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del director"
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                />
                <button type="submit">Agregar Director</button>
            </form>
        </div>
    );
};

export default DirectorList;
