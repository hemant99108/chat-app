import jwt from "jsonwebtoken";

const generateTokenAndSetCookie=(userId,res)=>{

    const token =jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:'30d',
    });

    res.cookie('jwt',token,{
        maxAge:30*24*60*60*1000,
        httpOnly:true,//prevent XSS attack ,cross side scripting attacks 
        sameSite:"strict",//CRSF attack cross side request forgery attack 
        secure:process.env.NODE_ENV !=='development',
    });
};


export default generateTokenAndSetCookie;