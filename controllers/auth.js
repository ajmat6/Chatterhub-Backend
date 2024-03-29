const User = require("../models/User");

const checkUser = async (req, res, next) => {
    try
    {
        const email = req.body.email;
        if(!email) return res.json({message: "Please enter the email!", status: false});

        const user = await User.findOne({email: email});
        if(!user) return res.json({message: "User not found!", status: false});
        else return res.json({message: "User found!", status: true, user: user});
    }

    catch(err)
    {
        next(err)
    }
}

const newUser = async (req, res, next) => {
    try
    {
        const {name, email, about, profilePic} = req.body
        // const profilePic = req.body.profilePic.blurDataURL;
        console.log(req.body)
        if(!email || !name || !about || !profilePic) return res.send("Email, name, about and profile picture is required!")

        const newUser = await new User({
            email, name, about, profilePic
        })

        await newUser.save();
        return res.json({message: "Success", status: true, user: newUser});
    }
    catch(err)
    {
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find({}).select('_id email name about profilePic');
        const userGroupByInitialLetter = {};
        allUsers.forEach((user) => {
            const firstLetter = user.name.charAt(0).toUpperCase();
            if(!userGroupByInitialLetter[firstLetter]) {
                userGroupByInitialLetter[firstLetter] = [];
            }
            
            userGroupByInitialLetter[firstLetter].push(user);
        })


        return  res.json({message: "Success", status: true, users: userGroupByInitialLetter});
    }

    catch(err) {
        next(err)
    }
}

module.exports = {checkUser, newUser, getAllUsers}