class UserDTO {
  constructor({ nombre, email, contrasena }) {
    this.name = nombre;
    this.email = email;
    this.password = contrasena;
  }
  templateCreateUser(data){
    console.log(data);
    return{
      status: 201,
      message: data
    }
  }
}

module.exports = UserDTO;