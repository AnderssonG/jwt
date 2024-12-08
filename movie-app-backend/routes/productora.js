const express = require('express');
const router = express.Router();
const Producer = require('../models/productora');

// Crear una nueva productora
router.post('/', async (req, res) => {
    try {
        const producer = new Producer(req.body);
        await producer.save();
        res.status(201).send(producer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtener todas las productoras
router.get('/', async (req, res) => {
    try {
        const producers = await Producer.find();
        res.status(200).send(producers);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar una productora
router.put('/:id', async (req, res) => {
    try {
        const producer = await Producer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!producer) {
            return res.status(404).send();
        }
        res.status(200).send(producer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar una productora
router.delete('/:id', async (req, res) => {
    try {
        const producer = await Producer.findByIdAndDelete(req.params.id);
        if (!producer) {
            return res.status(404).send();
        }
        res.status(200).send(producer);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
