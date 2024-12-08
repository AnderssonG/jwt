const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// Crear un nuevo director
router.post('/', async (req, res) => {
    try {
        const director = new Director(req.body);
        await director.save();
        res.status(201).send(director);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtener todos los directores
router.get('/', async (req, res) => {
    try {
        const directors = await Director.find();
        res.status(200).send(directors);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar un director
router.put('/:id', async (req, res) => {
    try {
        const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!director) {
            return res.status(404).send();
        }
        res.status(200).send(director);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un director
router.delete('/:id', async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) {
            return res.status(404).send();
        }
        res.status(200).send(director);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
