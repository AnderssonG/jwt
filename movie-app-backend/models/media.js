const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    serial: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    synopsis: String,
    url: { type: String, unique: true, required: true },
    coverImage: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    releaseYear: Number,
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
    producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }
});

module.exports = mongoose.model('Media', mediaSchema);
