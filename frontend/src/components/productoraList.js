import React, { useState, useEffect } from 'react';
import { getProducers, createProducer } from '../services/productoraServ';
import ProductoraUpdateForm from './productoraUp';
const ProducerList = () => {
    const [producers, setProducers] = useState([]);
    const [newProducer, setNewProducer] = useState('');
    const [newSlogan, setNewSlogan] = useState('');

    const [selectedProducerId, setSelectedProducerId] = useState(null);

    useEffect(() => {
        fetchProducers();
    }, []);

    const fetchProducers = async () => {
        const data = await getProducers();
        setProducers(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newProducer.trim()) {
            await createProducer({ name: newProducer, slogan: newSlogan });
            setNewProducer('');
            setNewSlogan('');
            fetchProducers();
        }
    };
    const handleUpdateClick = (id) => {
        setSelectedProducerId(id); // Establecer el ID del género seleccionado
    };

    return (
        <div>
            <h2>Lista de Productoras</h2>
            <ul>
                {producers.map((producer) => (
                    <li key={producer._id}>{producer.name} - {producer.slogan}<button onClick={() => handleUpdateClick(producer._id) }>Actualizar</button>
                    </li>
                ))}
            </ul>

            {selectedProducerId && (
                <div>
                    <h3>Actualizar productora</h3>
                    <ProductoraUpdateForm
                        producerId={selectedProducerId}
                        onUpdate={fetchProducers} // Callback para recargar la lista después de la actualización
                    />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de la productora"
                    value={newProducer}
                    onChange={(e) => setNewProducer(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Slogan"
                    value={newSlogan}
                    onChange={(e) => setNewSlogan(e.target.value)}
                />
                <button type="submit">Agregar Productora</button>
            </form>
        </div>
    );
};

export default ProducerList;
