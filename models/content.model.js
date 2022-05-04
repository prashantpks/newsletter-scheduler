const mongoose = require('mongoose');
const {Schema} = mongoose;

const contentSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('content', contentSchema);