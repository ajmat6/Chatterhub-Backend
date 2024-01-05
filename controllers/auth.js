const User = require("../models/User");

const checkUser = async (req, res, next) => {
    try
    {
        const email = req.body.email;
        if(!email) return res.json({message: "Please enter the email!", status: false});

        const user = await User.findOne({email: email});
        if(!user) return res.json({message: "User not found!", status: false});
        else return res.json({message: "User found!", status: true});
    }
    
    catch(err)
    {
        next(err)
    }
}

module.exports = {checkUser}