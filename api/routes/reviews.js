const express = require('express')
const Review = require('../models/reviews.js')
const router = new express.Router()

router.post('/reviews', async (req,res) => {
    const review = new Review(req.body)
    try {
        await review.save()
        res.status(201).send(review)
    }
    catch (e) {
        res.status(400).send(e)
    }
})