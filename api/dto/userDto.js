const bcrypt = require('bcrypt');

class UserDTO {
  constructor({ nombre, email, contrasena }) {
    this.name = nombre;
    this.email = email;
    this.password = this.hashPassword(contrasena);
  }

  // Método para hashear la contraseña
  hashPassword(password) {
    const saltRounds = 10; // Número de rondas de sal para el hash
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  templateCreateUser(data) {
    console.log(data);
    return {
      status: 201,
      message: data,
    };
  }
}

module.exports = UserDTO;
