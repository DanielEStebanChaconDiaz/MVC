const { authenticateToken } = require('./authentication/user');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const { createUser, getUser, dropUser, findUserByName } = require('./controllers/userController');
const { userValidationRules } = require('./validators/userValidator');

// Ruta pública
router.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, process.env.EXPRESS_STATIC, 'views/users.html'));
});

const loginUser = async (req, res) => {
    const { username, password } = req.body;  
    const db = req.app.locals.db;

    try {
        const user = await findUserByName(db, username); // Usa la función para buscar al usuario
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la contraseña hasheada almacenada usando bcrypt
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si el usuario es autenticado, crea un token JWT
        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '5s' }
        );
        
        return res.json({ token }); // Devuelve el token al cliente
    } catch (err) {
        console.error(err); // Agrega el log del error para depuración
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};



// Rutas protegidas
router.post('/users/v1', userValidationRules(), createUser);
router.get('/users/v2/:nombre', authenticateToken, getUser); // Añadido `authenticateToken`
router.get('/users/v3/:nombre', authenticateToken, dropUser); // Añadido `authenticateToken`
router.post('/login', loginUser);

module.exports = router;
