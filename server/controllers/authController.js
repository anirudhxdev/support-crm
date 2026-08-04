const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req,res) => {
    console.log(req.body);
    try{
        const {name, email, password } = req.body;
        
        const existingUser = await User.findOne({ email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message :"User registered successfully",
            data : user,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const loginUser = async (req,res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid email or password",
            });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message:"Invalid email or password",
            });
        }
        console.log("JWT Secret:", process.env.JWT_SECRET);
        console.log("User:", user);
        console.log("User ID:", user._id);
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {expiresIn : "7d"}
        );

        res.status(200).json({
            success: true,
            message : "Login successful",
            token,
        });
    } catch(error){
        res.status(500).json({
            success : false,
            message : error.message,
        });
    }
};

module.exports ={
    registerUser,
    loginUser,
}