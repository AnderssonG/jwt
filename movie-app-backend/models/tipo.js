const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    description: String
});

module.exports = mongoose.model('tipo', typeSchema);
