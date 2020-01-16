// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

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
    handle(handlerInput) {
            const nombreQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.Nombre.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            let elproyecto;
           
            if (nombreQueRecibo === 'Pascual') {    
                elproyecto = 'Hola Pascual, prueba a preguntar cuanto llevas gastado.';
            }
            
            if (nombreQueRecibo === 'Juan') {
                elproyecto = 'Hola Juan, prueba a preguntar cuanto llevas gastado.';    
            }

            if (nombreQueRecibo === 'Héctor') {    
                elproyecto = 'Hola Héctor, prueba a preguntar cuanto llevas gastado.';
            }
            
            if (nombreQueRecibo === 'Hernán') {
                elproyecto = 'Hola Hernán, prueba a preguntar cuanto llevas gastado.';      
            }

            if (nombreQueRecibo === 'Guillermo') {    
                elproyecto = 'Hola Guillermo, prueba a preguntar cuanto llevas gastado.';
            }
            
            if (nombreQueRecibo === 'Felisa') {
                elproyecto = 'Hola Felisa, prueba a preguntar cuanto llevas gastado.';    
            }

            if (nombreQueRecibo === 'Elizabeth') {    
                elproyecto = 'Hola Elizabeth, prueba a preguntar cuanto llevas gastado.';
            }
            
            if (nombreQueRecibo === 'David') {
                elproyecto = 'Hola David, prueba a preguntar cuanto llevas gastado.';      
            }

            if (nombreQueRecibo === 'Bruno') {
                elproyecto = 'Hola Bruno, prueba a preguntar cuanto llevas gastado.';      
            }
            
            if (nombreQueRecibo === 'Salvador') {
                elproyecto = 'Hola Pascual, prueba a preguntar cuanto llevas gastado.';      
            }

        const speakOutput = elproyecto;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
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
        const speakOutput = 'Nos vemos!';
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
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
