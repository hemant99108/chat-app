import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup=async(req,res)=>{
    try {
        const {fullName,username,password,confirmPassword,gender}=req.body;

        if(password!=confirmPassword){
            return res.status(400).json({error:"Password do not match"});
        }

        const user=await User.findOne({username});

        if(user){
            res.status(400).json({error:"username already exists"});
        }

        //HASH PASS HERE 
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);


        const allProfilePic=`https://i.pravatar.cc/150?u=${username}`;

        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic:allProfilePic
        });

       if(newUser){
            //generate the JWT tokens here 
          generateTokenAndSetCookie(newUser._id,res);

            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic 
            });

       }
       else{
            res.status(400).json({error:"Invalid User data entered"});
       }


    } catch (error) {
        console.log('error in signup controller ',error.message);
        res.status(500).json({error:'Internal server error '});
    }
}

export const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});

        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Username or Password "});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        });



    } catch (error) {
         console.log('error in login controller ',error.message);
        res.status(500).json({error:'Internal server error '});
    }
    
}

export const logout=(req,res)=>{
    try {

        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"});
        
        
    } catch (error) {
        console.log('error in logout  controller ',error.message);
        res.status(500).json({error:'Internal server error '});
    }
}