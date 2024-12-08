// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateJWT, validateAdminRole } = require('../middlewares/validar');
const User = require('../models/user');

const router = express.Router();

// Registro de usuario
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar usuario' });
    }
});

// Inicio de sesión
router.post('/log', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, "QWdqQlA1V3Y2VUhFbmZKNUNGRjljRW5HNTlzUkdQd3E1MkFOeHF0ak9uQnhoTnBXaHRxUzROZlQ=", {
            expiresIn: '4h'
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
});

// Ruta protegida para ADMIN
router.get('/admin', validateJWT, validateAdminRole, (req, res) => {
    res.status(200).json({ msg: 'Bienvenido, Administrador' });
});

module.exports = router;
