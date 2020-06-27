const mongoose = require('mongoose')
const validator = require('validator')

const Review = mongoose.model('Review', {
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    departmentName: {
        type: String,
        required: true,
        trim: true
    },
    courseNumber: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: String,
        required: true,
        trim: true
    },
    numRating: {
        type: Number,
        validate(value) {
            if (!(1 <= value <= 5)) {
                throw new Error('Invalid rating - must be between 1 and 5')
            }
        }
    },
    review: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = Review