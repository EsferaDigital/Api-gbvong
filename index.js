'use strict'

// Importamos librerias
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

// Configuración del administrador de firebase
const serviceAccount = require("./assets/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://crud-gbvong.firebaseio.com/'
});

// Controlador de consultas de patentes
const PatenteController = require('./controllers/patentes');
const RegistroController = require('./controllers/registros');


// Servidor express y middleware bodyParser
const server = express();
server.use(bodyParser.urlencoded({extended:true}));
// Servidor usa bodyParser para tratar archivos json
server.use(bodyParser.json());
// Para que acepte peticiones de otros dominios
server.use(cors({origin: true}));


// Rutas
// Consulta patente
server.post('/patente', PatenteController.patente);

// Obtener registros
server.get('/registros', RegistroController.getRegistros)

// Ambientes local o hosting firebase
// Cuando lo pasemos a false lanzamos el comando firebase deploy (desde functions) para subir nuestro backend
const local = false; // para ejecutar servidor en local
if(local){
  server.listen((process.env.PORT || 3000), () => {
    console.log('Servidor corriendo en el puerto 3000');
  });
}else{
  // Para firebase
  exports.patentes = functions.https.onRequest(server);
}