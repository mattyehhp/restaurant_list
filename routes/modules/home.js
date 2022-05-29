const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
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

module.exports = router
