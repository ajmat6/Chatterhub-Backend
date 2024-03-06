const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    }, 

    about: {
        type: String,
        required: true,
        trim: true
    },

    profilePic: {
        type: String,
        required: true
    },

    sentMessages: [
        {
            userWiseMessages: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                required: true
            }
        }
    ],

    recievedMessages: [
        {
            userWiseMessages: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message',
                required: true
            }
        }
    ]

}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema);