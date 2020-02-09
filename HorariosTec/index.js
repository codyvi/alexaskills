// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a Horarios TEC. Puedes preguntarme cual es el horario, a que hora cierran o abren puntos de interes dentro del campus monterrey';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const horarioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'horario';
    },
    async handle(handlerInput) {
        const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares'); //Esta va ser usada para obtener los datos de la base de datos

        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id); //El id esta siendo usado para comparar
        
        let speakOutput = '';

        if (answerSlot === 'idTecStore'){
             speakOutput = 'Tec store tiene un horario de Lunes a Viernes de 8  a 1  y 2:30  5:30.  su telefono es 81 1599 8634 y la página para comprar el línea es store punto tec punto mx';
         }
        
        else if (answerSlot === 'idCafeteria') {
            speakOutput = 'Los horarios de cafeterias y restaurantes varian, por ejemplo, Centrales de 7:30 a 7 de la tarde. Jubileo de 7:00 a 5:30 y Starbucks de biblioteca de 8:30 a 10:00 de la noche';
         }
        
         else if (answerSlot === 'idBiblioTec') {
             speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana.';
        }
        
        else if (answerSlot === 'idPuntoAzul') {
            speakOutput = 'Punto Azul abre';
        
        }
        
        else if (answerSlot === 'idGym') {
            speakOutput = 'El gimnasio abre';
         }
        
        else if (answerSlot === 'idCIMA') {
            speakOutput = 'Cima abre ';
        
        }

        else if (answerSlot === 'idLocatec') {
        
            speakOutput = 'Entre semana, Locatec abre a las 8 de la mañana y cierra a las 8 de la noche. Los sábados abren de 8 de la mañana a 1 de la tarde.';
        }
        
        else if (answerSlot === 'idTimHortons') {
            speakOutput = 'El horario de Tim Hortons es de 6 de la mañana a 10 de la noche de lunes a viernes. El sábado abre de 9 de la mañana a 6 de la tarde y el domingo abre de 11 de la mañana a 9 de la noche.';
        }        
         else if (answerSlot === 'idOxxo') {
           speakOutput = '';
       }        
       
       else if (answerSlot === 'idPanem') {
            speakOutput = 'Panem abre a las 7:30 de la mañana y cierra a las 9:30 de la noche a excepción del sábado, que cierran a las 5:00 de la tarde. Los domingos no abren.';
        }
        
        else if (answerSlot === 'idBBVA') {
             speakOutput = 'El banco BBVA abre de 8:30 de la mañana a 5 de la tarde. No abre en sábado y domingo.';
         }
        
        else if (answerSlot === 'idEnfermeria') {
           speakOutput = '';
        }

         else if (answerSlot === 'idSantander') {
             speakOutput = 'Santander se encuentra abierto de 9 de la mañana a 4 de la tarde. No abre en sábado y domingo.';
         }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const aperturaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'apertura';
    },
    handle(handlerInput) {
        const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');

        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        if (answerSlot === 'idTecStore'){
            speakOutput = 'Tec store abre de Lunes a Viernes en dos horarios, el primero a las 8 de la mañana y por la tarde a las 2:30, en línea el servicio es las 24 horas en store punto tec punto mx';
        }
        else if (answerSlot === 'idCafeteria') {
            speakOutput = 'en Centrales te podemos dar servicio a partir de las 7:30 de la mañana. En Jubileo te recibimos desde las 7:00 de la mañana y Starbucks de biblioteca desde las 8:30';
        }
        else if (answerSlot === 'idBiblioTec') {
            speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
        }

        else if (answerSlot === 'idPuntoAzul') {
            speakOutput = '';
        }

        else if (answerSlot === 'idGym') {
           speakOutput = '';
        }
       
        else if (answerSlot === 'idCIMA') {
        speakOutput = '';

        }
        
        else if (answerSlot === 'idLocatec') {
            speakOutput = 'Locatec abre a las 8 de la mañana de lunes a sábado.';
        }

        else if (answerSlot === 'idTimHortons') {
            speakOutput = 'Entre semana, Tim Hortons abre a las 6 de la mañana. El sábado abre a las de 9 de la mañana y el domingo abre de 11 de la mañana.';
        }        
        
        else if (answerSlot === 'idOxxo') {
            speakOutput = '';
        }  

        else if (answerSlot === 'idPanem') {
            speakOutput = 'Panem abre a las 7:30 de la mañana de lunes a sábado. Los domingos no abren.';
        }  

        else if (answerSlot === 'idBBVA') {
            speakOutput = 'El banco BBVA abre a las 8:30 de la mañana. No abre en sábado y domingo.';
        }

       else if (answerSlot === 'idEnfermeria') {
          speakOutput = '';
       }

        else if (answerSlot === 'idSantander') {
            speakOutput = 'Santander abre 9 de la mañana. No abre en sábado y domingo.';
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const cierreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'cierre';
    },
    handle(handlerInput) {
        const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        if (answerSlot === 'idTecStore'){
            speakOutput = 'En Tec store cerramos a la 1 de la tarde, regresamos a las 2:30 y nos vamos a las 5:30 de la tarde. En línea el servicio es las 24 horas en store punto tec punto mx';
        }
        else if (answerSlot === 'idCafeteria') {
            speakOutput = 'Centrales cierra a las 7 de la tarde. Jubileo a las 5:30 y Starbucks de biblioteca te atiende hasta las 10:00 de la noche';
        }
        else if (answerSlot === 'idBiblioTec') {
            speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
        }    

     else if (answerSlot === 'idPuntoAzul') {
          speakOutput = '';
        }

      else if (answerSlot === 'idGym') {
             speakOutput = '';
         }

        else if (answerSlot === 'idCIMA') {
       speakOutput = '';
        }
        else if (answerSlot === 'idLocatec') {
            speakOutput = 'Locatec cierra a las 8 de la noche de lunes a viernes. Los sábados cierran a l 1 de la tarde.';
        }
        else if (answerSlot === 'idTimHortons') {
            speakOutput = 'Entre semana, Tim Hortons cierra a las 10 de la noche. El sábado cierra a las 6 de la tarde y el domingo cierra a las 9 de la noche.';
        }        
        // else if (answerSlot === 'idOxxo') {
        //     speakOutput = '';
        // }        
        else if (answerSlot === 'idPanem') {
            speakOutput = 'Panem cierra a las 9:30 de la noche. Los sábados cierran a las 5:00 de la tarde y los domingos no abren.';
        }
        else if (answerSlot === 'idBBVA') {
            speakOutput = 'El banco BBVA cierra a las 5 de la tarde. No abre en sábado y domingo.';
        }
        // else if (answerSlot === 'idEnfermeria') {
        //     speakOutput = '';
        // }
        else if (answerSlot === 'idSantander') {
            speakOutput = 'Santander cierra a las 4 de la tarde. No abre en sábado y domingo.';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const dondePuedoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dondePuedo';
    },
    handle(handlerInput) {
        const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'acciones');
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.acciones.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        if (answerSlot === 'idImprimir'){ 
            speakOutput = 'Se puede imprimir en los centros de impresión CIMA.';
        }
        else if (answerSlot === 'idComer'){
            speakOutput = 'Hay distintos lugares para comer dentro del campus, entre ellos las cafeterias Centrales y Jubileo.';
        }        
        else if (answerSlot === 'idTramites'){
            speakOutput = 'Se pueden realizar tramites directamente en Punto Azul.';
        }
        else if (answerSlot === 'idPagar'){
            speakOutput = 'Puedes hacerlo a través de mitec.itesm.mx o directamente en Punto Azul.';
        }
        else if (answerSlot === 'idLost'){
            speakOutput = 'Puedes buscar cosas perdidas en Locatec.'
        }
        else if (answerSlot === 'idCoffee'){
            speakOutput = 'Puedes encontrar café en distintos puntos dentro del campus, los más comunes son Starbucks, Tim Hortons y Panem.';
        }
        else if (answerSlot === 'idEstacionarse'){
            speakOutput = ''
        }
        else if (answerSlot === 'idChecarme') {
            speakOutput = 'Si te sientes mal, puedes ir a checarte a la enfermería, ubicada entre la cafeteria Centrales y Panem.';
        }
        else if (answerSlot === 'idDepositar') {
            speakOutput = 'Dentro del campus se encuentra un banco BBVA y Santander.';
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const dondeQuedaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dondeQueda';
    },
    handle(handlerInput) {
        const nameSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
        const answerSlot = (handlerInput.requestEnvelope.request.intent.slots.lugares.resolutions.resolutionsPerAuthority[0].values[0].value.id);
        let speakOutput = '';
        if (answerSlot === 'idPuntoAzul'){
            speakOutput = 'Punto Azul se encuentra en el sotano de Cetec, conocido también como el servilletero.';
        }
        else if (answerSlot === 'idGym'){
            speakOutput = 'El gimnasio se encuentra debajo de Centro de Congresos, a un lado de la cafeteria Jubileo.';
        }        
        else if (answerSlot === 'idTecStore'){
            speakOutput = 'La Tec Store se encuentra en BiblioTec primer piso, conectada a Tim Hortons.';
        }
        else if (answerSlot === 'idBiblioTec'){
            speakOutput = 'La BiblioTec se encuentra al centro del campus, a un lado del Jardín de Carreras.';
        }
        else if (answerSlot === 'idLocatec'){
            speakOutput = 'Locatec se encuentra en el primer piso de aulas 1.'
        }
        else if (answerSlot === 'idCanchasEscamilla'){
            speakOutput = '';
        }
        else if (answerSlot === 'idCIMA'){
             speakOutput = '';
        }
        else if (answerSlot === 'idTimHortons') {
            speakOutput = 'Tim Hortons se encuentra en el primer piso de BiblioTec.';
        }        
        else if (answerSlot === 'idOxxo') {
            speakOutput = 'Un Oxxo queda junto a la cafeteria Centrales y otro a un costado de Aulas 4.';
        }        
        else if (answerSlot === 'idPanem') {
            speakOutput = 'Panem se encuentra entre Aulas 1 y Aulas 2. Bastante cerca de Rectoría y de la cafeteria Centrales.';
        }
        else if (answerSlot === 'idEnfermeria') {
            speakOutput = 'La enfermería se encuentra entre la cafeteria Centrales y Panem.';
        }
        else if (answerSlot === 'idSantander') {
           speakOutput = '';
        }
        else if (answerSlot === 'idBBVA') {
            speakOutput = '';
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Te puedo ayudar con otra cosa?')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '¡Nos vemos!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        horarioIntentHandler,
        aperturaIntentHandler,
        cierreIntentHandler,
        dondePuedoIntentHandler,
        dondeQuedaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();