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
    content_body: {
        type: String,
        required: true
    },
    send_at: {
        type: Date,
        required: true
    },
    isSent: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('content', contentSchema);