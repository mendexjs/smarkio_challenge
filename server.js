const express = require('express')
const faker = require('faker')
// const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const port = process.env.PORT || 4015;//random(4002, 9000);


//Database Connection
const database = require('./db');
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
        console.log(data);
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