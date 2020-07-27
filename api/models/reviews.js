const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
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
        required: true,
        validate(value) {
            if (!(1 <= value && value <= 5)) {
                throw new Error('Invalid rating - must be between 1 and 5')
            }
        }
    },
    review: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review