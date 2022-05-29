const Restaurant = require('../restaurant')

const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')


db.once('open', () => {
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