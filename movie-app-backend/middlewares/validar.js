
const jwt = require('jsonwebtoken');

// Validar JWT
const validateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No hay token en la petición' });
    }

    try {
        const { id, role } = jwt.verify(token, "QWdqQlA1V3Y2VUhFbmZKNUNGRjljRW5HNTlzUkdQd3E1MkFOeHF0ak9uQnhoTnBXaHRxUzROZlQ=");
        req.user = { id, role };
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Token no válido' });
    }
};

// Validar rol de administrador
const validateAdminRole = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ msg: 'No tienes permiso para realizar esta acción' });
    }
    next();
};

module.exports = { validateJWT, validateAdminRole };
