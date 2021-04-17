const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = process.env.PORT || 4002

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
    avatar: 'http://placebear.com/280/280'
}

app.get('/', (req, res) => {

    res.render('pages/home', {
        current_user: user
    })
        console.log(user)
})

app.post('/review', (req, res) => { // TO-DO
    res.render('pages/home', { 
        current_user: user
    })
})