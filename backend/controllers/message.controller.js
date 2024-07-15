 import Message from '../models/message.model.js';
 import Conversation from '../models/conversation.model.js';

export const sendMessage=async(req,res)=>{
    try {

        const {message}=req.body;
        const { id: recieverId }=req.params;
        const senderId=req.user._id;

        let conversation=await Conversation.findOne({
            participants:{ $all: [senderId,recieverId]},
        });

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,recieverId],
                //if no message then its default is [] -empty array 
            })
        }

        //creating new message 
        const newMessage=new Message({
            senderId,
            recieverId,
            message,
        });

        if(newMessage){
            //set the message with the conversation 
            conversation.messages.push(newMessage._id);
        }

        //SOCKET IO FUNCITONALITY WILL GO HERE 





        //these will be slower for the operation 
        // await conversation.save();
        // await newMessage.save(); 

        //this will run parallel so faster 
        await Promise.all([conversation.save(),newMessage.save()]);


        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log('error in send message controller ',error.message);
        res.status(500).json({error:'Internal server error '});
    }
};


export const getMessage=async(req,res)=>{
        try {
            const {id:userToChatId}=req.params;
            const senderId=req.user._id;

            const conversation=await Conversation.findOne({
                participants:{$all :[senderId,userToChatId]},
            }).populate("messages");  //not the refeerence of the message model but the actual message 

            if(!conversation) return res.status(200).json([]);

            const message=conversation.messages;


            res.status(200).json(messages);

            
        } catch (error) {
            console.log('error in get  message controller ',error.message);
            res.status(500).json({error:'Internal server error '});
        }
}