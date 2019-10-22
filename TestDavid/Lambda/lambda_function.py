# -*- coding: utf-8 -*-

# This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK for Python.
# Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
# session persistence, api calls, and more.
# This sample is built using the handler classes approach in skill builder.
import logging
import random
import boto3
import ask_sdk_core.utils as ask_utils
#check dynamoDB doc
from ask_sdk_core.skill_builder import SkillBuilder
from ask_sdk_core.dispatch_components import AbstractRequestHandler
from ask_sdk_core.dispatch_components import AbstractExceptionHandler
from ask_sdk_core.handler_input import HandlerInput

from ask_sdk_model import Response


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class LaunchRequestHandler(AbstractRequestHandler):
    """Handler for Skill Launch."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool

        return ask_utils.is_request_type("LaunchRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "Hola Daniel, di opciones para ver que podemos hacer!"

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class OpcionesIntentHandler(AbstractRequestHandler):
    """Handler for Opciones Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("OpcionesIntent")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "Para ver cuanto dinero hay en algún proyecto di el nombre de este y podras acceder a el."
        test  = "Recuerda que me puedes decir cualquier cosa"
        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(test)
                .response
        )


class DineroDestinyIntentHandler(AbstractRequestHandler):
    """Handler for Dinero Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("DestinyIntent")(handler_input)

    def handle(self, handler_input):
        #type: (HandlerInput) -> Response

        speak_output = "¿Quieres saber tu dinero de costos o de gasto de Destiny? Di costos Destiny o gastos destiny para acceder"
        test  = "Recuerda que me puedes decir cualquier cosa"
        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(test)
                .response
        )

class PresupuestoDestinyIntentHandler(AbstractRequestHandler):
    """Handler for Dinero Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("PresupuestoDestinyIntent")(handler_input)

    def handle(self, handler_input):
        #type: (HandlerInput) -> Response
        Presupuesto = '80000'
        speak_output = ("Tu presupuesto en Destiny es "+Presupuesto)
        test  = "Recuerda que me puedes decir cualquier cosa"
        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(test)
                .response
        )

class GastosDestinyIntentHandler(AbstractRequestHandler):
    """Handler for Dinero Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("GastosDestinyIntent")(handler_input)

    def handle(self, handler_input):
        #type: (HandlerInput) -> Response
        DineroCostos = '80000'
        speak_output = ("Tu dinero de gastos es "+DineroCostos)
        test  = "Recuerda que me puedes decir cualquier cosa"
        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(test)
                .response
        )


class HelpIntentHandler(AbstractRequestHandler):
    """Handler for Help Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("AMAZON.HelpIntent")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "En que manera te puedo ayudar?"

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )


class CancelOrStopIntentHandler(AbstractRequestHandler):
    """Single handler for Cancel and Stop Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return (ask_utils.is_intent_name("AMAZON.CancelIntent")(handler_input) or
                ask_utils.is_intent_name("AMAZON.StopIntent")(handler_input))

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output = "Nos vemos!"

        return (
            handler_input.response_builder
                .speak(speak_output)
                .response
        )

#Hola


class SessionEndedRequestHandler(AbstractRequestHandler):
    """Handler for Session End."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_request_type("SessionEndedRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response

        # Any cleanup logic goes here.

        return handler_input.response_builder.response


class IntentReflectorHandler(AbstractRequestHandler):
    """The intent reflector is used for interaction model testing and debugging.
    It will simply repeat the intent the user said. You can create custom handlers
    for your intents by defining them above, then also adding them to the request
    handler chain below.
    """
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_request_type("IntentRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        intent_name = ask_utils.get_intent_name(handler_input)
        speak_output = "You just triggered " + intent_name + "."

        return (
            handler_input.response_builder
                .speak(speak_output)
                # .ask("add a reprompt if you want to keep the session open for the user to respond")
                .response
        )


class CatchAllExceptionHandler(AbstractExceptionHandler):
    """Generic error handling to capture any syntax or routing errors. If you receive an error
    stating the request handler chain is not found, you have not implemented a handler for
    the intent being invoked or included it in the skill builder below.
    """
    def can_handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> bool
        return True

    def handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> Response
        logger.error(exception, exc_info=True)

        speak_output = "Perdón, he tenido un problema. Prueba de nuevo"

        return (
            handler_input.response_builder
                .speak(speak_output)
                .ask(speak_output)
                .response
        )

# The SkillBuilder object acts as the entry point for your skill, routing all request and response
# payloads to the handlers above. Make sure any new handlers or interceptors you've
# defined are included below. The order matters - they're processed top to bottom.


sb = SkillBuilder()

sb.add_request_handler(LaunchRequestHandler())
sb.add_request_handler(OpcionesIntentHandler())
sb.add_request_handler(DineroDestinyIntentHandler())
sb.add_request_handler(HelpIntentHandler())
sb.add_request_handler(PresupuestoDestinyIntent())
sb.add_request_handler(GastosDestinyIntent())
sb.add_request_handler(CancelOrStopIntentHandler())
sb.add_request_handler(SessionEndedRequestHandler())
sb.add_request_handler(IntentReflectorHandler()) # make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers

sb.add_exception_handler(CatchAllExceptionHandler())

lambda_handler = sb.lambda_handler()