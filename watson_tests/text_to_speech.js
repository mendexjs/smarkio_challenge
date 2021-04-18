const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const env = require('../public/assets/environment');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: env.environment.ibm.api_key,
  }),
  serviceUrl: env.environment.ibm.urls.text_to_speech,
});

const myText = {
  text: 'Texto teste, apenas pare verificar o funcionamento do recurso.',
  accept: 'audio/wav',
  voice: 'pt-BR_IsabelaV3Voice',
};

textToSpeech.synthesize(myText)
  .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
    return textToSpeech.repairWavHeaderStream(response.result);
  })
  .then(buffer => {
    fs.writeFileSync('watson_tests/wise_words.wav', buffer);
  })
  .catch(err => {
    console.log('algo deu errado:', err);
  });