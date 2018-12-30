"use strict";

const Alexa = require("ask-sdk-core");
const constants = require("./constants");

// ココだよ
const SimpleReplyIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "SimpleReplyIntent"
    );
  },
  handle(handlerInput) {
    const kokodayo = `<audio src='${constants.voiceData.kokodayo}'/>`;
    return handlerInput.responseBuilder.speak(kokodayo).getResponse();
  }
};

// 歌うよ
const SingIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" && request.intent.name === "SingIntent"
    );
  },
  handle(handlerInput) {
    return controller.play(handlerInput);
  }
};

// 停止
const PauseIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      (request.intent.name === "AMAZON.CancelIntent" ||
        request.intent.name === "AMAZON.StopIntent" ||
        request.intent.name === "AMAZON.PauseIntent")
    );
  },
  handle(handlerInput) {
    return controller.stop(handlerInput);
  }
};

// 再開
const ResumeIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.ResumeIntent"
    );
  },
  async handle(handlerInput) {
    const AudioPlayer = handlerInput.requestEnvelope.context.AudioPlayer;
    const offset = AudioPlayer.offsetInMilliseconds;
    return controller.play(handlerInput, offset);
  }
};

// スキル起動時またはスキルの使い方を尋ねるインテントのハンドラ
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "LaunchRequest" ||
      (request.type === "IntentRequest" &&
        request.intent.name === "AMAZON.HelpIntent")
    );
  },
  handle(handlerInput) {
    const kokodayo = `<audio src='${constants.voiceData.kokodayo}'/>`;
    return handlerInput.responseBuilder.speak(kokodayo).getResponse();
  }
};

/* HELPER FUNCTIONS */

// 音楽再生コントローラ
const controller = {
  play(handlerInput, offset = 0) {
    const { responseBuilder } = handlerInput;
    const song = constants.audioData[0];
    responseBuilder
      .withShouldEndSession(true)
      .addAudioPlayerPlayDirective(
        "REPLACE_ALL",
        song.url,
        song.title,
        offset,
        null
      );

    return responseBuilder.getResponse();
  },
  stop(handlerInput) {
    return handlerInput.responseBuilder
      .addAudioPlayerStopDirective()
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

// Lambda関数のメイン処理
exports.handler = skillBuilder
  .addRequestHandlers(
    SimpleReplyIntentHandler,
    SingIntentHandler,
    PauseIntentHandler,
    ResumeIntentHandler,
    HelpHandler
  )
  .lambda();
