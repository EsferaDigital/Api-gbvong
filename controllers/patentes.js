'use strict'

// Importamos librerias
const admin = require('firebase-admin');
// Importamos modelo de respuesta por consulta de patente
const resPatente = require('../models/res_patente');
// Base de datos Cloud Firestore
const db = admin.firestore();


// Recibe la patente de Dialogflow, construye y devuelve una respuesta
async function buscarPatente(patenteDF){
  let resultado;
  let respuesta;
  // Pasamos la patente a string y mayuscula
  let patentestring = JSON.stringify(patenteDF).toUpperCase();
  // Volvemos a transformar la patente a formato json
  let patente = JSON.parse(patentestring);

  // console.log(patente);
  
  // Hacemos referencia a la coleccion registros
  const registroRef = db.collection('victimas');
  // Guardamos en la variable consulta el resultado de la consulta
  const consulta = await registroRef.where('patente', '==', patente).get()
  const data = consulta.docs.map(doc => doc.data())
  if(!data.length){
    resultado = `La patente ${patente} no se encuentra en nuestros registros`;
  }else{
    let nombres = consulta.docs.map(doc => doc.data())[0].nombres;
    let moredata = consulta.docs.map(doc => doc.data())[0].moredata;
    resultado = `El vehículo con la patente ${patente} fue denunciado por ${nombres} y cuenta con la siguiente descripción: ${moredata}`
  }
  // Devuelver respuesta
  // Obtener el modelo de respuesta
  respuesta = resPatente.resPatente(resultado);
  return respuesta;
}


// // Funcion para manejar la consulta de DF
async function patente(req, res){
  // Obtenemos la patente que nos envía DF (dialogflow)
  let patenteDF = req.body.queryResult.parameters.patente;
  // Guardamos en la variable respuesta lo que nos devuelve la función buscarPatente
  let respuesta = await buscarPatente(patenteDF);
  // Enviamos la respuesta a dialogflow
  res.json(respuesta);
}


 module.exports = {
  patente
}