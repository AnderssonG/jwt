const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    slogan: String,
    description: String
});

module.exports = mongoose.model('productora', producerSchema);
