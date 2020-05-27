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
            const speakOutput = 'Hola, bienvenido a Futures Lab, empieza diciendome tu nombre '; 
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    };
    const NombreIntentHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Saludo';
        },
        async handle(handlerInput) {
            const nombreQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.Nombre.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            var speakOutput = '';
            let Nivel = await API.findnivel(nombreQueRecibo);
            var NivelStr = '';
    

            if(Nivel === 0)
            {
                speakOutput = `Hola ${nombreQueRecibo}! Esta sera nuestra primera sesión, ¿Quieres conocer tu nivel, o te gustaría saber más información?`;
            }

            else{
                if(Nivel === 1 ){
                    NivelStr = 'Básico';
                }
                else if(Nivel === 2){
                    NivelStr = 'Intermedio';
                }
                else if(nivel === 3){
                    NivelStr = 'Avanzado';
                }
                speakOutput =  `Hola ${nombreQueRecibo}, tu nivel es ${NivelStr}, quieres iniciar tu rutina diaria, o te gustaría saber como te fue en la semana`;
            }
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            prevSession["Nombre"] = nombreQueRecibo;
            handlerInput.attributesManager.setSessionAttributes(prevSession);

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Recuerda que puedes obtener más información diciendo "Quiero más información"')
                .getResponse();
        }
    };
    const InfoIntentHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MasInfo';
        },
        async handle(handlerInput) {
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            var speakOutput = `Claro ${name}, al conocer tu nivel se te harán dos preguntas para determinar tu condición física y motivación`
            speakOutput += '¿Te gustaría realizar la prueba?'

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    };
    const SubirIntentHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'SubirNivel';
        },
        async handle(handlerInput) {
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            let Nivel = await API.findnivel(name);
            if(Nivel === 1){
                API.UpdateNivel(name, 2)
            }

            else if(Nivel === 2){
                API.UpdateNivel(name, 3)
            }


            var speakOutput = `Claro ${name}, el nuevo nivel ha sido asignado, di salir y vuelve a entrar para entrenar con tu nuevo nivel.`
           

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Di salir para ver el nuevo nivel')
                .getResponse();
        }
    };

    const IniciarEntrenaminetoHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IniciarRutina';
        },
        async handle(handlerInput) {
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            var audioFile =  "https://audios-de-alexa.s3.amazonaws.com/Basico+VT+GaD.mp3";


            var audioMedio1 = "https://audios-de-alexa.s3.amazonaws.com/VT+medio+GD+V4.mp3";


            var audioDificil1 = "https://audios-de-alexa.s3.amazonaws.com/VT+Avanzado+8+minGaD.mp3";
     


            var speakOutput = '';

            let nivel = await API.findnivel(name)
            // speakOutput += nivel;
            var minutos = 0;
            if(nivel === 1)
            {
                let direccion = audioFile
                console.log(`${direccion}`);
                handlerInput.responseBuilder
                .addDirective({
                type: "AudioPlayer.Play",
                playBehavior: "REPLACE_ALL",
                audioItem: {
                    stream: {     
                        url: `${direccion}`,
                         token: "0",
                         offsetInMilliseconds: 0
                        }
                    }
                }); 
                speakOutput = `Claro ${name}, iniciando nivel Basico,. Recuerda que puedes conocer tus datos de la semana diciendo ¿Como me fue en la semana?`;
                minutos = 5;
            }

            else if(nivel === 2)
            {
                let direccion = audioMedio1
                console.log(`${direccion}`);
                handlerInput.responseBuilder
                .addDirective({
                type: "AudioPlayer.Play",
                playBehavior: "REPLACE_ALL",
                audioItem: {
                    stream: {     
                        url: `${direccion}`,
                         token: "0",
                         offsetInMilliseconds: 0
                        }
                    }
                }); 

                speakOutput = `Claro ${name}, iniciando nivel Intermedio, . Recuerda que puedes conocer tus datos de la semana diciendo ¿Como me fue en la semana?`;
                minutos = 7;
            }
            
            else if(nivel === 3)
            {
                let direccion = audioDificil1
                console.log(`${direccion}`);
                handlerInput.responseBuilder
                .addDirective({
                type: "AudioPlayer.Play",
                playBehavior: "REPLACE_ALL",
                audioItem: {
                    stream: {     
                        url: `${direccion}`,
                         token: "0",
                         offsetInMilliseconds: 0
                        }
                    }
                }); 

                
                speakOutput = `Claro ${name}, iniciando nivel Avanzado,  . Recuerda que puedes conocer tus datos de la semana diciendo ¿Como me fue en la semana?`;
                minutos = 9;
            }

            var currTiem = await API.findTiempoAcum(name);
            var currDias = await API.findDiasAcum(name);

            currTiem += minutos;
            currDias += 1;

            API.UpdateTiempoAcum(name, currTiem);
            API.UpdateDiasAcum(name, currDias);
            

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    };
    const IniciarTestHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IniciarTest';
        },
        async handle(handlerInput) {
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            var speakOutput = `Claro ${name}, ¿Cuántos días de la semana vas a entrenar?`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    };

    const ExpTestHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Experiencia';
        },
        async handle(handlerInput) {
            const slotResp = (handlerInput.requestEnvelope.request.intent.slots.Exp.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;

            API.UpdateExp(name, slotResp)
            var speakOutput = ` Gracias por tu respuesta, nos vemos ${name}`;
            //speakOutput += slotResp;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    };
    
    const DatosHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Datos';
        },
        async handle(handlerInput) {
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            var speakOutput = `Hola ${name}, vamos a ver tus datos`;
            let diasAcum = await API.findDiasAcum(name);
            let tiemAcum = await API.findTiempoAcum(name);
            let nivel = await API.findnivel(name);
            
            speakOutput = `Esta semana llevas ${diasAcum} días y de tiempo ${tiemAcum} minutos. `;

            if(nivel === 1 && diasAcum >= 5 && tiemAcum >= 50){
                var frases = [" Vas muy bien, sigue así ", " Buen trabaj o", " Que bien vas "];
                var rand = Math.floor(Math.random() * 3);
                speakOutput += frases[rand];
                speakOutput += " ,Te sugiero probar el nivel intermedio, para esto di Si quiero subir de nivel";
            }
            else if(nivel === 1 && diasAcum < 5 && tiemAcum < 50){
                var frasesmalas = [" Prueba a tratar de entrenar más ", " Echale ganas ", " Prueba "];
                var rand3 = Math.floor(Math.random() * 3);
                speakOutput += frasesmalas[rand3];
            }

            else if(nivel === 2 && diasAcum >= 7 && tiemAcum >= 90){
                var frases2 = [" Vas muy bien, sigue así ", " Buen trabajo ", " Que bien vas "];
                var rand2 = Math.floor(Math.random() * 3);
                speakOutput += frases2[rand2];
                speakOutput += " ,Te sugiero probar el nivel avanzado, para esto Si quiero subir de nivel ";
            }

            else if(nivel === 2 && diasAcum < 7 && tiemAcum < 90){
                var frasesmalas2 = [" Prueba a tratar de entrenar más ", " Echale ganas ", " Prueba "];
                var rand32 = Math.floor(Math.random() * 3);
                speakOutput += frasesmalas2[rand32];
            }

            else if(nivel === 3){
                var frases3 = [" Vas muy bien, sigue así ", " Buen trabajo ", " Que bien vas "];
                var rand33 = Math.floor(Math.random() * 3);
                speakOutput += frases3[rand33];
            }

            speakOutput += ' ,Puedes decir salir para acabar, o puedes empezar a entrenar.';

            var randExp = Math.floor(Math.random()*5);

            if(randExp === 3){
                speakOutput += ' Nos gustaría conocer tu experiencia, puedes decir dar experiencia para darla.';
            }
            


            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();
        }
    };
    const NivelIntentHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NivelIntent';
        },
        async handle(handlerInput) {
            const decidirNivel = (handlerInput.requestEnvelope.request.intent.slots.Respuestas.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            if(decidirNivel === '1'){
                API.UpdateNivel(name, 1);
            }

            else if(decidirNivel === '2'){
                API.UpdateNivel(name, 2)
            }

            else if(decidirNivel === '3'){
                API.UpdateNivel(name,3)
            }

            var speakOutput = `Perfecto ${name}, Tu nivel ha sido determinado,  ${decidirNivel}, para que se guarde di salir.`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('add a reprompt if you want to keep the session open for the user to respond')
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
        async handle(handlerInput) {
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
            NombreIntentHandler,
            InfoIntentHandler,
            IniciarEntrenaminetoHandler,
            DatosHandler,
            SubirIntentHandler,
            IniciarTestHandler, 
            NivelIntentHandler,
            HelpIntentHandler,
            ExpTestHandler,
            CancelAndStopIntentHandler,
            SessionEndedRequestHandler,
            IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        )
        .addErrorHandlers(
            ErrorHandler,
        )
        .lambda();
