const { validationResult } = require('express-validator');
const UserDTO = require('../dto/userDto');
const User = require('../model/userModel')
const mongodb = require('mongodb');


const createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const db = req.app.locals.db; // Accede a la conexión de MongoDB
    
    // Convierte la entrada en un DTO
    const userDto = new UserDTO(req.body);
    
    // Opcional: Usar un modelo para preparar el documento antes de insertar
    const obj = new User();
    
    // Inserta el nuevo usuario en la colección 'users'
    const result = db.collection('users').insertOne(userDto);
    console.log(result);
  res.status(201).json({logica: obj.findOneById(userDto)});
};
const getUser = async (req, res) => {
  const db = req.app.locals.db; // Accede a la conexión de MongoDB
    console.log(req.params); // Imprime los parámetros de la solicitud para depuración

    // Busca al usuario por nombre
    const user = await db.collection('users').findOne({ name: req.params.nombre });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Devuelve el usuario encontrado
}
const dropUser = async (req, res) => {
  const db = req.app.locals.db; // Accede a la conexión de MongoDB
    console.log(req.params); // Imprime los parámetros de la solicitud para depuración

    // Busca al usuario por nombre
    const user = await db.collection('users').deleteOne({ name: req.params.nombre });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Devuelve el usuario encontrado
}


module.exports = { createUser, getUser, dropUser };