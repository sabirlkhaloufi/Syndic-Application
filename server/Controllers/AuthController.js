require("dotenv").config()
const Admin = require("../Models/Admin")
const {generateToken, generateTokenReset} = require("../Utils/generateToken");
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");

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
    const getAdmin = await Admin.findOne({username: process.env.NAMEADMIN})
    if (!getAdmin) {
        const passHash = await bcrypt.hash(process.env.PASSADMIN, 10)
        const admin = await Admin.create({username: process.env.NAMEADMIN, password:passHash})
    }
    
}

// method  : get
// url     : api/auth/logout
// acces   : private
const Logout = async(req,res)=>{
    res.clearCookie('token');
    res.send('Logout');
}


module.exports = {
    Login,
    Logout,
    createAdmin
}