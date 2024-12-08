const express = require('express');
const router = express.Router();
const Media = require('../models/media');

// Crear una nueva producción
router.post('/', async (req, res) => {
    try {
        const media = new Media(req.body);
        await media.save();
        res.status(201).send(media);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtener todas las producciones
router.get('/', async (req, res) => {
    try {
        const media = await Media.find();
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar una producción
router.put('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!media) {
            return res.status(404).send();
        }
        res.status(200).send(media);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar una producción
router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) {
            return res.status(404).send();
        }
        res.status(200).send(media);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
