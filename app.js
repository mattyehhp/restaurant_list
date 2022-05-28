const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    Restaurant.find()
    .lean()
    .then(restaurants => {
        restaurant_query =  restaurants.filter(restaurant => {
            return restaurant.category.toLowerCase().includes(keyword.toLowerCase())||restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        })
        res.render('index', { restaurants: restaurant_query, keyword: keyword })
    })
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
    return res.render('new')
})

app.post('/restaurants', (req, res) => {
    const result = req.body
    return Restaurant.create({ name: result.name,
        category: result.category,
        image: result.image,
        location: result.location,
        phone: result.phone,
        google_map: result.google_map,
        rating: result.rating,
        description: result.description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error)) 
})


app.get('/restaurants/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch((error) => console.log(error))
})


app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    const result = req.body
    return Restaurant.findById(id) 
        .then((restaurant) => {
            restaurant.name = result.name
            restaurant.category = result.category
            restaurant.image = result.image
            restaurant.location = result.location
            restaurant.phone = result.phone
            restaurant.google_map = result.google_map
            restaurant.rating = result.rating
            restaurant.description = result.description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then((restaurant) => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})



app.listen(port, () => {
	console.log(`Express is listening on localhost:${port}`)
})