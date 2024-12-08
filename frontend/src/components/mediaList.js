import React, { useState, useEffect } from 'react';
import { getMedia, createMedia } from '../services/mediaServ';
import { getgenero } from '../services/generoServ';
import { getDirectors } from '../services/directorServ';
import { getProducers } from '../services/productoraServ';
import { getTypes } from '../services/tipoServ';
import MediaUpdateForm from './mediaUp';

const MediaList = () => {
    const [media, setMedia] = useState([]);
    const [newMedia, setNewMedia] = useState({
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

    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [producers, setProducers] = useState([]);
    const [types, setTypes] = useState([]);

    const [selectedMediaId, setSelectedMediaId]= useState(null);
    
    useEffect(() => {
        fetchMedia();
        fetchGenres();
        fetchDirectors();
        fetchProducers();
        fetchTypes();
    }, []);

    const fetchMedia = async () => {
        const data = await getMedia();
        setMedia(data);
    };

    const fetchGenres = async () => {
        const data = await getgenero();
        setGenres(data);
    };

    const fetchDirectors = async () => {
        const data = await getDirectors();
        setDirectors(data);
    };

    const fetchProducers = async () => {
        const data = await getProducers();
        setProducers(data);
    };

    const fetchTypes = async () => {
        const data = await getTypes();
        setTypes(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMedia.genre && newMedia.director && newMedia.producer && newMedia.type) {
            await createMedia(newMedia);
            setNewMedia({
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
            fetchMedia();
        } else {
            alert('Todos los campos obligatorios deben ser completados.');
        }
    };

    const handleUpdateClick = (id) => {
        setSelectedMediaId(id); // Establecer el ID del género seleccionado
    };

    const handleChange = (e) => {
        setNewMedia({
            ...newMedia,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h2>Lista de Películas/Series</h2>
            <ul>
                {media.map((m) => (
                    <li key={m._id}>
                        <a href={m.url}>{m.title} - {m.serial} ({m.releaseYear})</a>
                        <button onClick={()=> handleUpdateClick(m._id)}>Actualizar</button>
                    </li>
                ))}
            </ul>

            {selectedMediaId && (
                <div>
                    <h3>
                        Actualizar Media
                    </h3>
                    <MediaUpdateForm
                        mediaId={selectedMediaId}
                        onUpdate={fetchMedia}/>
                </div>
            )

            }

            <h3>Agregar Nueva Media</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="serial"
                    placeholder="Serial"
                    value={newMedia.serial}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={newMedia.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="synopsis"
                    placeholder="Sinopsis"
                    value={newMedia.synopsis}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="url"
                    placeholder="URL de la película"
                    value={newMedia.url}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="coverImage"
                    placeholder="Imagen de portada (URL)"
                    value={newMedia.coverImage}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="releaseYear"
                    placeholder="Año de estreno"
                    value={newMedia.releaseYear}
                    onChange={handleChange}
                />

                {/* Dropdown para seleccionar Género */}
                <select name="genre" value={newMedia.genre} onChange={handleChange} required>
                    <option value="">Seleccionar Género</option>
                    {genres.map((genre) => (
                        <option key={genre._id} value={genre._id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                {/* Dropdown para seleccionar Director */}
                <select name="director" value={newMedia.director} onChange={handleChange} required>
                    <option value="">Seleccionar Director</option>
                    {directors.map((director) => (
                        <option key={director._id} value={director._id}>
                            {director.name}
                        </option>
                    ))}
                </select>

                {/* Dropdown para seleccionar Productora */}
                <select name="producer" value={newMedia.producer} onChange={handleChange} required>
                    <option value="">Seleccionar Productora</option>
                    {producers.map((producer) => (
                        <option key={producer._id} value={producer._id}>
                            {producer.name}
                        </option>
                    ))}
                </select>

                {/* Dropdown para seleccionar Tipo */}
                <select name="type" value={newMedia.type} onChange={handleChange} required>
                    <option value="">Seleccionar Tipo</option>
                    {types.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Agregar Media</button>
            </form>
        </div>
    );
};

export default MediaList;
