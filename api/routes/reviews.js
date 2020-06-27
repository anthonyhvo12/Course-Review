const express = require('express')
const Review = require('../models/reviews.js')
const router = new express.Router()

router.post('/', async (req,res) => {
    const review = new Review(req.body)
    try {
        await review.save()
        res.status(201).send(review)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/get', async (req, res) => {
    try {
        const params = Object.keys(req.body)
        console.log(params)
        params.forEach((param) => {
            if (req.body[param] === '') {
                throw new Error('Params cannot be blank')
            }
        })
        const reviews = await Review.find(req.body)
        if (!reviews) {
            res.status(400).send('Review not found!')
        }
        res.status(200).send(reviews)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// also use post for patch??
router.post('/:id', async (req, res) => {
    // find this user
    // apply each update with foreach
    const updates = Object.keys(req.body)
    try {
        const review = await Review.findOne(req.params.id)
        if (!review) {
            res.status(404).send('Review not found!')
        }
        updates.forEach((update) => review[update] = req.body[update])

        //must also save review
        await review.save()
        res.send(review)
    }
    catch (e) {
        res.status(400).send(e)
    }
})
// delete
router.post('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        if (!review) {
            res.status(404).send('Review not found!')
        }
        res.send(review)
    }
    catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router