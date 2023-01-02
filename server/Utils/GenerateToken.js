
const jwt = require("jsonwebtoken");
//generate token for send in email and login
const generateToken = (id,role) => {
    return jwt.sign({id,role}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}

// generate token for reset password
const generateTokenReset = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '10m'
    })
}

module.exports = {
    generateToken,generateTokenReset
}