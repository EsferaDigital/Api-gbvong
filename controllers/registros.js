'use strict'

const admin = require('firebase-admin')
const db = admin.firestore()

// Para obtener todos los registros
async function getRegistros(req, res){
  const registros = [];
  try {
    const registrosRef = await db.collection('registros').where('motivo', '==', 'Me robaron un vehículo').get()
    registrosRef.forEach((doc) =>{
      registros.push(doc.data())
    })
    console.log(registros.length)
  } catch(e){
    console.log(e)
  }

  return res.json(registros)
}

module.exports = {
  getRegistros
}