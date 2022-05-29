const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
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


router.get('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch((error) => console.log(error))
})


router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then((restaurant) => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router