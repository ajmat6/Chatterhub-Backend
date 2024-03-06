const Message = require("../models/Message");
const User = require("../models/User");
const mongoose = require('mongoose')

exports.addMessage = async (req, res, next) => {
    try {
        const {message, from, to} = req.body;
        // finding from and to users from db:
        const sender = await User.findOne({_id: from});
        const reciever = await User.findOne({_id: to});

        if(!sender || !reciever) return res.status(400).send("Sender and Reciever of the message are not found");

        // checking if a user is online currently:
        // const isOnline = onlineUser.get(to); // passing in online user, the to user to check if it is online
        const isOnline = false
        if(message && from && to) {
            const newMessage = new Message({
                sender,
                senderId: from,
                reciever,
                recieverId: to,
                message,
                messageStatus: isOnline ?'delivered' : 'sent'
            })

            await newMessage.save();
            return res.status(201).json({message: newMessage});
        }
        else return res.status(400).send("From, to and message is required");
    }
    catch(err) {
        next(err);
    }
}

exports.getMessages = async (req, res, next) => {
    const {from, to} = req.params;
    console.log(from, to)
    try {
        // we have to find those messages from the db whose sender is from and reciever is to and also those whose sender is to and reciver is from:
        const messages = await Message.find({
            $or: [
                {$and: [{senderId: from}, {recieverId: to}]}, 
                {$and: [{senderId: to}, {recieverId: from}]}
            ]
        }).sort({_id: 1})
        // console.log(messages)

        const unreadMessages = [];
        messages.forEach((message, index) => {
            // this is going to be called when someone opens up the chat of a person:
            // now when we opens up the chat of a person, then all the unread messages got read:
            if(message.messageStatus !== 'read' && message.senderId === to) {
                message.messageStatus = 'read';
                unreadMessages.push(message._id); // to be able to update the status of all the messages in unread messages in db as update
            }
        })

        // now update unread messages in db as read:
        await Message.updateMany({_id: {$in: unreadMessages}}, { // in mongodb notes
            $set: {
                messageStatus: 'read'
            }
        }, {new: true})

        res.status(200).json({messages});
    }
    catch(err) {
        next(err)
    }
}