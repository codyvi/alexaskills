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
            //const speakOutput = 'Hola, bienvenido a tu presupuesto de viajes! Di tu nombre para ver tu información sobre el presupuesto.';
            const speakOutput = 'Bienvenido a tus gastos de viaje. Di tu nombre para conocer tu información sobre el presupuesto.';
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
        
            let elproyecto;

            if(nombreQueRecibo === 'David' || nombreQueRecibo === 'Salvador')
            {
                elproyecto = `Hola ${nombreQueRecibo}, tus gastos en `
                let vicepresidencia = await API.findvpName(nombreQueRecibo);
                elproyecto += vicepresidencia +' en el periodo agosto-dicembre del 2019 son ';
                let gastos = await API.findgastosjd19(nombreQueRecibo);
                elproyecto += gastos + ' millones de pesos. ' + saberAlgoMas;
            }

            else
            {
                elproyecto = `Hola ${nombreQueRecibo}, tus gastos en la vicepresidencia `;
                let vicepresidencia = await API.findvpName(nombreQueRecibo);
                elproyecto += vicepresidencia + ' en el periodo agosto-diciembre del 2019 son ';
                let gastos = await API.findgastosjd19(nombreQueRecibo);
                elproyecto += gastos + ' millones de pesos. ' + saberAlgoMas;
            }

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


    const FollowUpUnoHandler = {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FollowUpUno';
        },
        async handle(handlerInput) {
            const preguntaQueRecibo = (handlerInput.requestEnvelope.request.intent.slots.Pregunta.resolutions.resolutionsPerAuthority[0].values[0].value.name);
            const prevSession = handlerInput.attributesManager.getSessionAttributes();
            let name = prevSession.Nombre;
            let elproyecto;
            if (name)
            {
                
                if (preguntaQueRecibo === '¿Cuanto llevo gastado en viajes en la vicepresidencia?' || preguntaQueRecibo === '¿Cuanto llevo gastado en gastos de viaje?')
                {
                    if(name === 'David' || name === 'Salvador')
                    {
                        elproyecto = `Claro, tus gastos en `
                        let vicepresidencia = await API.findvpName(name);
                        elproyecto += vicepresidencia +' en el periodo agosto-dicembre del 2019 son ';
                        let gastos = await API.findgastosjd19(name);
                        elproyecto += gastos + ' millones de pesos. ' + saberAlgoMas;
                    }
        
                    else
                    {
                        elproyecto = `Claro, tus gastos en la vicepresidencia `;
                        let vicepresidencia = await API.findvpName(name);
                        elproyecto += vicepresidencia + ' en el periodo agosto-diciembre del 2019 son ';
                        let gastos = await API.findgastosjd19(name);
                        elproyecto += gastos + ' millones de pesos. ' + saberAlgoMas;
                    }
                }

                else if(preguntaQueRecibo === '¿Cómo voy con mi plan?' || preguntaQueRecibo === '¿Cómo voy respecto al plan?' || preguntaQueRecibo === '¿Cuánto me he excedido de mi plan?' || preguntaQueRecibo === '¿He gastado más de lo que debo?' || preguntaQueRecibo === '¿Cómo voy comparado con mi plan?')
                {
                    elproyecto = `Vas `;
                    let exce = await API.findvarvsplan2019(name);
                    let porcentaje = ( (await API.findgastosjd19(name) / (await API.findplanjd19(name))-1)*100).toFixed(1);  // Correción AA
                    //let porcentaje = ((await API.findgastosjd19(name) / await API.findplanjd19(name))*10).toFixed(1);  Porcentajes Luis 
                    if(exce > 0)
                    {
                        elproyecto += porcentaje + '% excedido, el equivalente a '
                        if(exce < 1)
                        {
                            exce = exce*1000000;
                            elproyecto += exce + ' pesos. ' + saberAlgoMas;
                        }
                        else
                        {
                            elproyecto += exce + ' millones de pesos. ' + saberAlgoMas; 
                        }
                        
                    }

                    else
                    {
                        elproyecto += porcentaje + '% por debajo del plan, el equivalente a '
                        let newexce = Math.abs(exce);
                        if(newexce < 1)
                        {
                            exce = Math.abs(exce*1000000);
                            elproyecto += exce + '  pesos. ' + saberAlgoMas;
                        }
                        else
                        {
                            exce = Math.abs(exce);
                            elproyecto += exce + ' millones de pesos. ' + saberAlgoMas;
                        }
                        
                    }
                    
                }

                else if(preguntaQueRecibo === 'Comparame con el año anterior' || preguntaQueRecibo === '¿Como voy contra el año anterior?' || preguntaQueRecibo === 'Como voy comparado con el año anterior')
                {
                    let porcentaje = (((await API.findgastosjd19(name) / await API.findgastosjd18(name))-1)*100).toFixed(1); // Correción AA
                    // let porcentaje = ((await API.findgastosjd19(name) / await API.findgastosjd18(name))*10).toFixed(1);  // Porcenajes Luis
                    let exce = await API.findvarvsplan2018(name);
                    if(exce > 0)
                    {
                        elproyecto = `En comparación, en este periodo has gastado `;
                        elproyecto += porcentaje + '% más que el año anterior, que equivale a '
                        if(exce < 1)
                        {
                            exce = exce*1000000;
                            elproyecto += exce + ' pesos. ' + saberAlgoMas;
                        }
                        else
                        {
                            elproyecto += exce + ' millones de pesos. ' + saberAlgoMas; 
                        }
                    }

                    else
                    {
                        elproyecto = `Tienes una eficiencia de `;
                        elproyecto += porcentaje + '%, que equivale a '
                        let newexce = Math.abs(exce);
                        if(newexce < 1)
                        {
                            exce = Math.abs(exce*1000000);
                            elproyecto += exce + ' pesos. ' + saberAlgoMas;
                        }

                        else
                        {
                            exce = Math.abs(exce);
                            elproyecto += exce + ' millones de pesos. ' + saberAlgoMas;
                        }
                    }
                }

                else if(preguntaQueRecibo === 'Dame toda la información' || preguntaQueRecibo === 'Dime toda la información que tengas de mi presupuesto')
                {
                    if(name === 'David' || name === 'Salvador')
                    {
                        elproyecto = `Claro, tus gastos en `
                        let vicepresidencia = await API.findvpName(name);
                        elproyecto += vicepresidencia +' en el periodo agosto-dicembre del 2019 son ';
                        let gastos = await API.findgastosjd19(name);
                        elproyecto += gastos + ' millones de pesos.';
                        elproyecto += ` Comparado con tu plan vas `;
                        let exce = await API.findvarvsplan2019(name);
                        if(exce > 0)
                        {
                            if(exce < 1)
                            {
                                exce = exce*1000000;
                                elproyecto += exce + ' pesos excedidos.';
                            }
                            else
                            {
                                elproyecto += exce + ' millones de pesos excedidos.'; 
                            }
                            
                        }
    
                        else
                        {
                            let newexce = Math.abs(exce);
                            if(newexce < 1)
                            {
                                exce = exce*1000000;
                                elproyecto += exce + ' miles por debajo de tu plan.';
                            }
    
                            else
                            {
                                elproyecto += exce + ' millones excedidos.';
                            }
                        }

                        elproyecto += ` Comparado con el año anterior vas `;
                        let exce2 = await API.findvarvsplan2018(name);
                        if(exce2 > 0)
                        {
                            if(exce2 < 1)
                            {
                                exce2 = exce2*1000000;
                                elproyecto += exce2 + ' pesos excedidos. ' + saberAlgoMas;
                            }
                            else
                            {
                                elproyecto += exce2 + ' millones de pesos excedidos. ' + saberAlgoMas; 
                            }
                            
                        }
    
                        else
                        {
                            let newexce = Math.abs(exce2);
                            if(newexce < 1)
                            {
                                exce2 = exce2*1000000;
                                elproyecto += exce2 + ' miles por debajo de tu plan. ' + saberAlgoMas;
                            }
    
                            else
                            {
                                elproyecto += exce2 + ' millones excedidos. ' + saberAlgoMas;
                            }
                        }
                   
                    }
        
                    else
                    {
                        elproyecto = `Claro, tus gastos en la vicepresidencia `;
                        let vicepresidencia = await API.findvpName(name);
                        elproyecto += vicepresidencia + ' en el periodo agosto-diciembre del 2019 son ';
                        let gastos = await API.findgastosjd19(name);
                        elproyecto += gastos + ' millones de pesos.';
                        elproyecto = ` Comparado con tu plan vas `;
                        let exce = await API.findvarvsplan2019(name);
                        if(exce > 0)
                        {
                            if(exce < 1)
                            {
                                exce = exce*1000000;
                                elproyecto += exce + ' pesos excedidos.';
                            }
                            else
                            {
                                elproyecto += exce + ' millones de pesos excedidos.'; 
                            }
                            
                        }
    
                        else
                        {
                            let newexce = Math.abs(exce);
                            if(newexce < 1)
                            {
                                exce = exce*1000000;
                                elproyecto += exce + ' miles por debajo de tu plan. ';
                            }
    
                            else
                            {
                                elproyecto += exce + ' millones excedidos.';
                            }
                        }

                        elproyecto += ` Comparado con el año anterior vas `;
                        let exce2 = await API.findvarvsplan2018(name);
                        if(exce2 > 0)
                        {
                            if(exce2 < 1)
                            {
                                exce2 = exce2*1000000;
                                elproyecto += exce2 + ' pesos excedidos. ' + saberAlgoMas;
                            }
                            else
                            {
                                elproyecto += exce2 + ' millones de pesos excedidos. ' + saberAlgoMas; 
                            }
                            
                        }
    
                        else
                        {
                            let newexce = Math.abs(exce2);
                            if(newexce < 1)
                            {
                                exce2 = exce2*1000000;
                                elproyecto += exce2 + ' miles por debajo de tu plan. ' + saberAlgoMas;
                            }
    
                            else
                            {
                                elproyecto += exce2 + ' millones excedidos. ' + saberAlgoMas;
                            }
                        }
                        
                    }
                }
                
            }

            const speakOutput = elproyecto;
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
            const speakOutput = 'Nos vemos! Aqui estare cuando quieras conocer más de tus gastos de viaje.';
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
            const speakOutput = `Lo siento, tuve problemas para entenderte, intenta preguntando de nuevo`;

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
            HelpIntentHandler,
            CancelAndStopIntentHandler,
            SessionEndedRequestHandler,
            IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
        )
        .addErrorHandlers(
            ErrorHandler,
        )
        .lambda();