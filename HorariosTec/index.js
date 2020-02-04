// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenido a Horarios TEC. Puedes preguntarme cual es el horario, a que hora cierra o abre puntos de interes dentro del campus monterrey';
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
    handle(handlerInput) {
        const answerSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
        let speakOutput = '';
        if (answerSlot === 'tecstore'){
            speakOutput = 'Tec store tiene un horario de Lunes a Viernes de 8  a 1  y 2:30  5:30.  su telefono es 81 1599 8634 y la página para comprar el línea es store punto tec punto mx';
        }
        else if (answerSlot === 'cafeteria') {
            speakOutput = 'Los horarios de cafeterias y restaurantes varian, por ejemplo, Centrales de 7:30 a 7 de la tarde. Jubileo de 7:00 a 5:30 y Starbucks de biblioteca de 8:30 a 10:00 de la noche';
        }
        else if (answerSlot === 'biblioteca') {
            speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
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
        const answerSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
        let speakOutput = '';
        if (answerSlot === 'tecstore'){
            speakOutput = 'Tec store abre de Lunes a Viernes en dos horarios, el primero a las 8 de la mañana  y por la tarde a las 2:30, en línea el servicio es las 24 horas en store punto tec punto mx';
        }
        else if (answerSlot === 'cafeteria') {
            speakOutput = 'en Centrales te podemos dar servicio a partir de las 7:30 de la mañana. En Jubileo te recibimos desde las 7:00 de la mañana y Starbucks de biblioteca desde las 8:30';
        }
        else if (answerSlot === 'biblioteca') {
            speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
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
        const answerSlot = Alexa.getSlotValue(handlerInput.requestEnvelope, 'lugares');
        let speakOutput = '';
        if (answerSlot === 'tecstore'){
            speakOutput = 'En Tec store cerramos a la 1 de la tarde, regresamos a las 2:30 y nos vamos a las 5:30 de la tarde. En línea el servicio es las 24 horas en store punto tec punto mx';
        }
        else if (answerSlot === 'cafeteria') {
            speakOutput = 'Centrales cierra a las 7 de la tarde. Jubileo a las 5:30 y Starbucks de biblioteca te atiende hasta las 10:00 de la noche';
        }
        else if (answerSlot === 'biblioteca') {
            speakOutput = 'Biblio TEC, permanece abierta las 24 horas los 7 dias de la semana';
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
        const speakOutput = 'Goodbye!';
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
        aperturaIntentHandler,
        cierreIntentHandler,
        horarioIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();