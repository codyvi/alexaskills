 // This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
    // Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
    // session persistence, api calls, and more.
    const Alexa = require('ask-sdk-core');
    const fetch = require('node-fetch');
    const API = require('./apiUtil.js');
    
    var nombreQueRecibo =""

    const LaunchRequestHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
        },
        handle(handlerInput) {
            //const speakOutput = 'Hola, bienvenido a tu presupuesto de viajes! Di tu nombre para ver tu información sobre el presupuesto.';
            const speakOutput = `Bienvenido a Futures Lab. Di tu nombre para conocer tu información sobre el presupuesto.`;
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
            nombreQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.Nombre.resolutions.resolutionsPerAuthority[0].values[0].value.name);
        // DatosIntent.save_dynamo(handlerInput,nombreQueRecibo,nombreQueRecibo);
            let elproyecto;
            //elproyecto = `Hola ${nombreQueRecibo}, tu pregunta es ${preguntaQueRecibo}.`;

            elproyecto = `Hola ${nombreQueRecibo}, ¿Quieres conocer tus gastos de operación o tus gastos de proyecto?`
    
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            prevSession["Nombre"] = nombreQueRecibo;
            handlerInput.attributesManager.setSessionAttributes(prevSession);
            const speakOutput = elproyecto;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Prueba a preguntar cuánto llevas gastado')
                .getResponse();
        }
    };


    //Gastos de operación
    const FollowUpUnoHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FollowUpUno';
        },
        async handle(handlerInput) {
            const preguntaQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.PreguntasOp.resolutions.resolutionsPerAuthority[0].values[0].value.name);
           // DatosIntent.save_dynamo(handlerInput,nombreQueRecibo,preguntaQueRecibo);
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            let elproyecto = '';

            switch (preguntaQueRecibo) {
                case 'Comparame con el año anterior':
                    var GastadoAnt = await API.findGastadoAnterior(name);
                    var totOpex = await API.findTotalOpex(name);
                    var divGOpex = (totOpex*100)/GastadoAnt;
                    var porc = Math.ceil(100 - divGOpex);
                    elproyecto += `Con respecto al año anterior, para el periodo Junio septiembre, este año has gastado un  ${porc} % menos. ` 
                    elproyecto += saberAlgoMas;
                    break;
                case '¿He gastado más de lo que debo?':
                    var totPopex = await API.findTotalPOpex(name);
                    var totOpex1 = await API.findTotalOpex(name);
                    var divGOpex1 = (totOpex1*100)/totPopex;
                    var porc1 = Math.abs(Math.ceil(100 - divGOpex1));
                    elproyecto += `Si, te has excedido un ${porc1} % con respecto al plan. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto me he excedido de mi plan?':
                    var totPopex2 = await API.findTotalPOpex(name);
                    var totOpex2 = await API.findTotalOpex(name);
                    var excedidoPlan = totOpex2 - totPopex2;
                    elproyecto += ` Para la fecha te has excedido en ${excedidoPlan} pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cómo voy con mi plan?':
                    var totPopex3 = await API.findTotalPOpex(name);
                    var totOpex3= await API.findTotalOpex(name);
                    var divGOpex3 = (totOpex3*100)/totPopex3;
                    var porc3 = Math.abs(Math.ceil(100 - divGOpex3));
                    elproyecto += `A la fecha has gastado  ${totOpex3} de pesos, un ${porc3} % más con respecto al plan. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto dinero he gastado?':
                    var totOpex4= await API.findTotalOpex(name);
                    elproyecto += `A la fecha has gastado ${totOpex4} de pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuanto llevo gastado en viajes?':
                    var GastadoViajes = await API.findGastadoViajes(name);
                    elproyecto += `En gastos de viajes llevas ${GastadoViajes} pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuanto llevo gastado en servicios?':
                    var GastadoSer = await API.findGastadoServicios(name);
                    elproyecto += `En gastos de servicios llevas  ${GastadoSer} pesos. `;
                    elproyecto+= saberAlgoMas;
                    break;
                case '¿Cuanto llevo gastado consultoria?':
                    var gastadoCons = await API.findGastadoConsultoria(name);
                    elproyecto += `En gastos de consultoría llevas  ${gastadoCons} pesos. `;
                    elproyecto+= saberAlgoMas;
                    break;
                case '¿Cuanto llevo gastado en servicios externos?':
                    var gastadoSEx = await API.findGastadoSExternos(name);
                    elproyecto += `En gastos de servicios externos llevas ${gastadoSEx} de pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuanto llevo en otros gastos de operación?':
                    var gastosOp = await API.findGastadoOp(name);
                    elproyecto += `En otros gastos operativos llevas ${gastosOp} pesos. `
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuanto llevo gastado en servicios publicos?':
                    var gastosSerPu = await API.findGastadoSerPu(name);
                    elproyecto += `En gastos de servicios publico llevas  ${gastosSerPu} pesos. `
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto llevo en gastos operativos?':
                    var gastosSuelYSal = await API.findGastadoSuelySal(name);
                    elproyecto += `En gastos de sueldos y salarios llevas  ${gastosSuelYSal} pesos. `
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto es mi presupuesto de operacion?':
                    var totPres = await API.findPresupuestoTotal(name);
                    elproyecto += `Tu presupuesto anual es  ${totPres} pesos. `
                    elproyecto += saberAlgoMas;
                    break;
                default:
                  elproyecto += 'Lo sentimos, esa pregunta no existe. ' + saberAlgoMas;
              }

            const speakOutput = elproyecto;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    };
    
    //Gastos de proyecto
    const FollowUpDosHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FollowUpDos';
        },
        async handle(handlerInput) {
            const preguntaQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.PreguntasProyecto.resolutions.resolutionsPerAuthority[0].values[0].value.name);
           // DatosIntent.save_dynamo(handlerInput,nombreQueRecibo,preguntaQueRecibo);
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            let elproyecto = '';
            switch (preguntaQueRecibo) {
                case '¿Como voy con el proyecto Plataforma?':
                    var gastadoProyecto = await API.findGastadoProyecto(name);
                    elproyecto += `De acuerdo a la fecha llevas gastado  ${gastadoProyecto} pesos. ` 
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto me he excedido de mi plan en el proyecto Plataforma?':
                    var gastadoProyecto2 = await API.findGastadoProyecto(name);
                    var planProyecto2 = await API.findPlanProyecto(name);
                    var div2 = (gastadoProyecto2*100)/planProyecto2;
                    var porc = Math.abs(Math.ceil(100 - div2));
                    elproyecto += `A la fecha te has excedido en un ${porc} % con respecto al presupuesto planificado. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto es mi presupuesto en el proyecto plataforma?':
                    var pres = await API.findPresupuestoProy(name);
                    elproyecto += `Para el proyecto Plataforma el presupuesto es de  ${pres} de pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto llevo gastado en consultoria de proyecto?':
                    var consultoriaG = await API.findConsuProyecto(name);
                    elproyecto += `A la fecha en consultoría se han gastado  ${consultoriaG} pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case 'Test to see if this works':
                    break;
                case '¿Cuánto tengo comprometido en el proyecto plataforma?':
                    var compro = await API.findCompAFech(name);
                    elproyecto += `A la fecha en el proyecto Plataforma existe un monto comprometido de ${compro} pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                case '¿Cuánto llevo gastado en sueldos y salarios de proyecto?':
                    var gasatadoSueldos =  await API.findSueldosYSalariosProyecto(name);
                    elproyecto += `A la fecha en sueldos y salarios se han gastado  ${gasatadoSueldos} de pesos. `;
                    elproyecto += saberAlgoMas;
                    break;
                default:
                        elproyecto += 'Lo sentimos, esa pregunta no existe. ' + saberAlgoMas;
                    }
      
                  const speakOutput = elproyecto;
                  return handlerInput.responseBuilder
                      .speak(speakOutput)
                      .reprompt(speakOutput)
                      .getResponse();
              }
          };

    
    
    //Experiencia
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
            
            var speakOutput = ` Gracias por tu respuesta ${name}. `;
            speakOutput += saberAlgoMas;
            //speakOutput += slotResp;

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
            const speakOutput = 'Nos vemos! Aqui estare cuando quieras conocer más de tus gastos.';
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
            const speakOutput = `Lo siento, tuve problemas para entender tu pregunta, intenta de nuevo`;

            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    };

    // Variables 
    const saberAlgoMas = '¿Quieres saber algo más?';
    
    // The SkillBuilder acts as the entry point for your skill, routing all request and response
    // payloads to the handlers above. Make sure any new handlers or interceptors you've
    // defined are included below. The order matters - they're processed top to bottom.
    exports.handler = Alexa.SkillBuilders.custom()
        .addRequestHandlers(
            LaunchRequestHandler,
            NombreHandler,
            FollowUpUnoHandler,
            FollowUpDosHandler,
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