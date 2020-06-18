const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/course-reviews", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})