const mongoose = require('mongoose');
const {Schema} = mongoose;

const subSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    topic_name: {
        type: String,
        required: true
    },
    subsList: [
        {
            type: String,
        }
    ]
});

module.exports = mongoose.model('subscribers',subSchema);