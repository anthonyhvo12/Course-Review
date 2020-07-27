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

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find(req.query)
        console.log('reviews')
        if (!reviews) {
            res.status(400).send('Review not found!')
        }
        res.status(200).send(reviews)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/:id', async (req, res) => {
    // find this user
    // apply each update with foreach
    const updates = Object.keys(req.body)
    try {
        const review = await Review.findById(req.params.id)
        console.log(review)
        if (!review) {
            res.status(404).send('Review not found!')
        }
        updates.forEach((update) => review[update] = req.body[update])

        //must also save review
        await review.save()
        res.send(review) //200 code
    }
    catch (e) {
        res.status(400).send(e)
    }
})
// delete
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        if (!review) {
            res.status(404).send('Review not found!')
        }
        res.send(review) //204 code
    }
    catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router