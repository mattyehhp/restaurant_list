const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

const restaurantList = require('../../restaurant.json')
const restaurant = require('../restaurant')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
    restaurantList.results.forEach((result) => {
        Restaurant.create({
            name: result.name,
            category: result.category,
            image: result.image,
            location: result.location,
            phone: result.phone,
            google_map: result.google_map,
            rating: result.rating,
            description: result.description
        })
    })
    console.log('done')
})