
const jwt = require("jsonwebtoken");

//generate token for send in email and login
const generateToken = (user) => {
    const {_id, username} = user;
    return jwt.sign({_id,username}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}

module.exports = {
    generateToken
}