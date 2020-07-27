const express = require('express')
const College = require('../models/colleges.js')
const router = new express.Router()

//get all unis
router.get('/', async (req, res) => {
    try {
        const colleges = await College.find({})
        res.status(200).send(colleges)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router