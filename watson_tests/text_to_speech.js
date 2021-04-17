const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const env = require('../public/assets/environment');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: env.environment.ibm.api_key,
  }),
  serviceUrl: env.environment.ibm.urls.text_to_speech,
});
