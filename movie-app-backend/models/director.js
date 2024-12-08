const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('director', directorSchema);
