import Chat from "../models/chatModel.js"

export const createChat = async (req , res) =>{
    const {firstId ,secondId} = req.body
    try{
        const chat = await Chat.findOne({members : { $all : [firstId , secondId]}})
    
        if(chat) return res.json({response : chat})
        
        const newChat = new Chat({
            members : [firstId , secondId]
        })
        const response = await newChat.save()
    
        res.json({response , notification : {success : true , message : "added to your contacts"}})
    }catch(err){
        console.log(err)
    }
}

export const findUserChats = async (req , res) => {
    const userId = req.params.userId
    try{
        const chats = await Chat.find({members : {$in : [userId]}})

        res.json({response : chats})
    }catch(err){
        console.log(err)
    }
}

export const findUser = async (req , res) => {
    const {firstId , secondId } = req.params
    try{
        const chats = await Chat.findOne({members : { $all : [firstId , secondId]}})

        res.json({response : chats})
    } catch (err) {
        console.log(err)
    }
}