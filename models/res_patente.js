'use strict'

// Formato de respuesta para la consulta de patentes a dialogflow para telegram
// Recibe un string con la respuesta que necesita enviar
const resPatente = (resultado) => {
  let resTelegram = {
    "fulfillmentText": resultado,
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            resultado
          ]
        },
        "platform": "TELEGRAM"
      },
      {
        "text": {
          "text": [
            resultado
          ]
        }
      }
    ]
  }
  return resTelegram;
}

module.exports = {
  resPatente
}