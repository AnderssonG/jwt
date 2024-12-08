const express = require('express');
const router = express.Router();
const Genre = require('../models/genero');

// Crear un nuevo género
router.post('/', async (req, res) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).send(genre);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtener todos los géneros
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).send(genres);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar un género
router.put('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!genre) {
            return res.status(404).send();
        }
        res.status(200).send(genre);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un género
router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) {
            return res.status(404).send();
            
        }
        res.status(200).send(genre);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
