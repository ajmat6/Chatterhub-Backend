const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    senderId: {
        type: String,
        required: true,
        trim: true
    },

    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    recieverId: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true,
        trim: true
    },

    messageStatus: {
        type: String,
        default: 'sent'
    }
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema);