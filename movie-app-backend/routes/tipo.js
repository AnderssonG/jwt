const express = require('express');
const router = express.Router();
const Type = require('../models/tipo');

// Crear un nuevo tipo
router.post('/', async (req, res) => {
    try {
        const type = new Type(req.body);
        await type.save();
        res.status(201).send(type);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtener todos los tipos
router.get('/', async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).send(types);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Actualizar un tipo
router.put('/:id', async (req, res) => {
    try {
        const type = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!type) {
            return res.status(404).send();
        }
        res.status(200).send(type);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Eliminar un tipo
router.delete('/:id', async (req, res) => {
    try {
        const type = await Type.findByIdAndDelete(req.params.id);
        if (!type) {
            return res.status(404).send();
        }
        res.status(200).send(type);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
