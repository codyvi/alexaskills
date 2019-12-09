const Alexa = require('ask-sdk-core');

const Util = require('util.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola Pascual, bienvenido a Mi Presupuesto! Di abrir y el nombre de proyecto que quieras abrir. (Para saber que proyectos hay, di proyectos)';
         
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


const CursosHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'cursos';
    },
    handle(handlerInput) {
            const cursoQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.curso.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            let elproyecto;
            if (cursoQueRecibo === 'Destiny') 
            {    
                elproyecto = 'Para saber tu presupuesto, di Presupuesto Destiny';
                elproyecto += ' , para saber tu dinero erogado, di Erogado Destiny';
                elproyecto += ' , para saber tu dinero comprometido, di Comprometido Destiny';
                elproyecto += ' , y por ultimo, para saber tu dinero disponible, di Disponible Destiny';
            }
            
            if (cursoQueRecibo === 'Gravity') {
                elproyecto = 'Para saber tu presupuesto, di Presupuesto Gravity';
                elproyecto += ' , para saber tu dinero erogado, di Erogado Gravity';
                elproyecto += ' , para saber tu dinero comprometido, di Comprometido Gravity';
                elproyecto += ' , y por ultimo, para saber tu dinero disponible, di Disponible Gravity';
                
            }
            else{
                elproyecto = 'Ese proyecto no se encuentra disponible, di proyectos para saber cuales estan disponibles';
            }

        const speakOutput = elproyecto;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ErogadoHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'erogado';
    },
    handle(handlerInput) {
            const cursoQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.curso.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            let elproyecto;
            if (cursoQueRecibo === 'Destiny') 
            {    
                elproyecto = 'Tu dinero erogado en Destiny es 8521.12';
            }
            
            if (cursoQueRecibo === 'Gravity') {
                elproyecto = 'Tu dinero erogado en Gravity es 8315.30';
                
            }

        const speakOutput = elproyecto;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ProyectosHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'proyectos';
    },
    handle(handlerInput) {
        const speakOutput = 'Los proyectos disponibles por ahora son Destiny y Gravity';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = `Ups. Hubo un error.`;

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
        CursosHandler,
        ProyectosHandler,
        ErogadoHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
