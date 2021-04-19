const express = require('express')
const faker = require('faker')
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const env = require('./public/assets/environment');
const { ibm } = env.environment;

const expressLayouts = require('express-ejs-layouts')
const app = express()
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const port = process.env.PORT || 4016;//random(4002, 9000);


//Database Connection
const database = require('./db');
// const watson = require('./watson/text_to_speech');
const Review = require('./models/review');

async function connectDb(){
    try {
        const result = await database.sync();
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

connectDb();

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: ibm.api_key,
  }),
  serviceUrl: ibm.urls.text_to_speech,
});

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended : true}))
app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
    console.log(`Running in http://localhost:${port}`)
})

const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    photo: 'https://i.pravatar.cc/300'
}

app.get('/', (req, res) => {

    res.render('pages/home', {
        current_user: user
    })
})

app.get('/reviews', (req, res) => { // TO-DO
    Review.findAll()
    .then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
    });
})

app.post('/reviews', (req, res) => { // TO-DO
    const { user_name, photo, comment, readable_created_at } = req.body;
    
    Review.create({
        user_name          : user_name,
        photo              : photo,
        comment            : comment,
        readable_created_at: readable_created_at,
    })
    .then((data) => {
        res.send(data);
    })
    .catch((error) => {
        console.log(error);
    });

})

app.post('/api/text_to_speech', (req, res) => { // TO-DO
    const { text } = req.body;
    textToSpeech.synthesize({
      text: text,
      accept: 'audio/wav',
      voice: ibm.voice,
    })
    .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
        return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
        fs.writeFileSync('public/assets/audios/last_audio.wav', buffer);
        res.status(200).end();
    })
    .catch(err => {
        console.log('algo deu errado: ', err);
        res.status(500).end();
    });
    
    
    

})