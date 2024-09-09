const express = require("express");
const path = require('path');
const app = express();
const router = require("./router");
const cors = require('cors');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

app.use(cors({}));
app.use(express.json());

app.use(router);

app.use((req, res) => {
  res.status(404).json({message: "No tiene autorización"});
});

// Configuración de la conexión a MongoDB
async function connectToMongoDB() {
  try {
    const client = new mongodb.MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    await client.connect();
    console.log('Conectado a MongoDB');
    
    // Puedes acceder a la base de datos aquí
    const db = client.db('Usuarios');

    // Puedes pasar la conexión de la base de datos a tus routers, o guardar el cliente para utilizarlo en otros lugares
    app.locals.db = db;
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // Salir de la aplicación si la conexión falla
  }
}

// Llamar a la función para conectar a MongoDB antes de levantar el servidor
connectToMongoDB().then(() => {
  let config = {
    host: process.env.VITE_HOST,
    port: process.env.EXPRESS_PORT
  };
  
  app.listen(config.port, config.host, () => {
    console.log(`http://${config.host}:${config.port}`);
  });
});
