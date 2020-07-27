const mongoose = require('mongoose')
const validator = require('validator')

const collegeSchema = mongoose.Schema({
    'Country Code': {
        type: String,
        required: true
    },
    'Name': {
        type: String,
        required: true,
    },
    'URL': {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Invalid URL!')
            }
        }
    }
})

const College = mongoose.model('College', collegeSchema, 'universities-list')
module.exports = College