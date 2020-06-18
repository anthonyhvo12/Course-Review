const express = require('express')
const Review = require('../models/reviews.js')
const router = new express.Router()

router.post('/', async (req,res) => {
    const review = new Review(req.body)
    console.log(review)
    try {
        await review.save()
        res.status(201).send(review)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router