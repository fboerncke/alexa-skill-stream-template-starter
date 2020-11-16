"use strict";
/* eslint-disable  func-names */
/* eslint-disable  no-console */
const Alexa = require("ask-sdk-core");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    let locale = handlerInput.requestEnvelope.request.locale;

    let title = "Newsflash";
    let browserSupportText =
      "You need an Alexa device with a screen to use this skill. ";

    let documentData = {
      properties: {
        title: title,
        browserSupportText: browserSupportText,
      },
    };

    let SPEAK_TEXT = "Newsflash";
    const viewportProfile = Alexa.getViewportProfile(
      handlerInput.requestEnvelope
    );
    if (viewportProfile === "HUB-ROUND-SMALL") {
      SPEAK_TEXT = browserSupportText;
    }

    if (
      Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)[
        "Alexa.Presentation.APL"
      ]
    ) {
      return handlerInput.responseBuilder
        .speak(SPEAK_TEXT)
        .addDirective({
          type: "Alexa.Presentation.APL.RenderDocument",
          token: "someToken",
          document: {
            src: "doc://alexa/apl/documents/APL.json",
            type: "Link",
          },
          datasources: { documentData },
        })
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak("You need an Alexa device with a screen to use this skill.")
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    let locale = handlerInput.requestEnvelope.request.locale;
    return handlerInput.responseBuilder
      .speak(
        "Start watching news TV stations right from your screen based Alexa device."
      )
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Good Bye";
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`
    );

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    return handlerInput.responseBuilder.speak("").getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
