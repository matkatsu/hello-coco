"use strict";

const Alexa = require('ask-sdk-core');

const sounds = {
  "kokodayo": "https://s3-ap-northeast-1.amazonaws.com/romiogaku/alexa/hello-koko/sounds/kokodayo.mp3"
}

// シンプル返答インテントハンドラ
const SimpleReplyIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "IntentRequest" && request.intent.name === "SimpleReplyIntent";
  },
  handle(handlerInput) {
    const kokodayo = `<audio src='${sounds.kokodayo}'/>`
    return handlerInput.responseBuilder.speak(kokodayo).getResponse();
  }
}

// スキル起動時またはスキルの使い方を尋ねるインテントのハンドラ
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "LaunchRequest"
      || (request.type === "IntentRequest"
        && request.intent.name === "AMAZON.HelpIntent");
  },
  handle(handlerInput) {
    const kokodayo = `<audio src='${sounds.kokodayo}'/>`
    return handlerInput.responseBuilder
      .speak(kokodayo)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

// Lambda関数のメイン処理
exports.handler = skillBuilder
  .addRequestHandlers(
    HelpHandler,
    SimpleReplyIntentHandler
  )
  .lambda();