require("dotenv").config()
const Admin = require("../Models/Admin")
const {generateToken, generateTokenReset} = require("../Utils/GenerateToken");
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// method : post
// url    : api/auth/login
// acces  : public
const Login =  asyncHandler(async(req,res) => {
    // check is value is empty
     if(!req.body.username || !req.body.password){
        res.status(400)
        throw new Error("please enter email or password")
    }

    // check user by email
    const user = await Admin.findOne({username: req.body.username})

    //check by email and compaer password with password hashed
    if(user && (await bcrypt.compare(req.body.password,user.password))){
        
        //generate token => id , => role
        const token = generateToken(user)

        res.cookie("token",token); 
        res.status(200).json({
            token
        })
    }
    else{
        res.status(400)
        throw new Error('invalid email or password')
    }
})


const createAdmin = async(req,res)=>{

     //hash password bcriptJs
     const password = "sabir123";
     const username = "sabir";

    const getAdmin = await Admin.findOne({username: username})
    if (!getAdmin) {
        const passHash = bcrypt.hash(process.env.PASSADMIN, 10)
        const admin = await Admin.create({username: process.env.NAMEADMIN, password:password})
    }
    
}

// method  : get
// url     : api/auth/logout
// acces   : private
const Logout = async(req,res)=>{
    res.clearCookie('token');
    res.send('Logout');
}


// method  : get
// url     : api/auth/verifyToken/:token
// acces   : private
const verifyToken = async(req,res)=>{
    const {token} = req.params;
    try {
       const infoToken =  jwt.verify(token, process.env.JWT_SECRET)
       res.send(infoToken)
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    Login,
    Logout,
    verifyToken,
    createAdmin
}