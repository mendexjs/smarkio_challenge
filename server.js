const express = require('express')
const cors = require('cors')
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 4008

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended : true}))

app.use(express.static(__dirname + '/public'))
app.use(cors());
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
        console.log(user)
})

app.get('/reviews', (req, res) => { // TO-DO
    const reviews = [
            {
                "user_name": "Matheus Mendes",
                "photo": "https://i.pravatar.cc/300",
                "comment": "Pretty nice!",
                "created_at": "18/04/2021 15:03:22"
            },
            {
                "user_name": "Harry Steven",
                "photo": "https://i.pravatar.cc/305",
                "comment": "Luke was the best person!",
                "created_at": "18/04/2021 15:03:22"
            },
            {
                "user_name": "Jonny Kingston",
                "photo": "https://i.pravatar.cc/302",
                "comment": "That was the best experience that i've!",
                "created_at": "18/04/2021 15:03:22"
            },
            
        ];
        res.json(reviews);
})

app.post('/reviews', (req, res) => { // TO-DO
    
})