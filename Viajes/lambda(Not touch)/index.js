// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const fetch = require('node-fetch');
const API = require('./apiUtil.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, bienvenido a tu presupuesto de viajes! Di tu nombre para autenticarte y ver tu información sobre el presupuesto.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const NombreHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Saludo';
    },
    async handle(handlerInput) {
            const nombreQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.Nombre.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            const preguntaQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.Pregunta.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            let elproyecto;
            //elproyecto = `Hola ${nombreQueRecibo}, tu pregunta es ${preguntaQueRecibo}.`;

            if (preguntaQueRecibo === '¿Cuanto llevo gastado en viajes en la vicepresidencia?' || preguntaQueRecibo === '¿Cuanto llevo gastado en gastos de viaje?')
            {
                elproyecto = `Claro ${nombreQueRecibo}, tus gastos en  la vicepresidencia `;
                let vicepresidencia = await API.findvpName(nombreQueRecibo);
                elproyecto += vicepresidencia + ' el periodo agosto-diciembre del 2019 son ';
                let gastos = await API.findgastosjd19(nombreQueRecibo);
                elproyecto += gastos + ' millones de pesos.';
            }

             else if(nombreQueRecibo === 'David' && preguntaQueRecibo === '¿Cuál de las áreas es la que está excedida?')
             {
                 elproyecto = 'Hola David, este es un ejemplo de otra pregunta que puedes hacer!'
             }

             
            const speakOutput = elproyecto;
        
            return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Prueba a preguntar cuanto llevas gastado')
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
        const speakOutput = 'Nos vemos! Aqui estare cuando quieras conocer más de tus gastos de viajes.';
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
        console.log(`~~~~ Error handled: ${error.stack}`);
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
        NombreHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
