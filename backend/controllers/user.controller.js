import User from '../models/user.model.js';

export const getUsersForSidebar=async(req,res)=>{
    try {

        const loggedInUserId=req.user._id; 
        //all users leaving you ,for the chatting 
        const filteredUsers=await User.find({_id: {$ne: loggedInUserId}}).select("-password"); //ne-not equal to logged in user 

        res.status(200).json(filteredUsers); 
        
    } catch (error) {
         console.log('error in logout  controller ',error.message);
        res.status(500).json({error:'Internal server error '});
    }
}