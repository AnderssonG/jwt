const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: String
});

module.exports = mongoose.model('genero', genreSchema);
