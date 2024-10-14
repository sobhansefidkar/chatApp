import Message from "../models/message.js"

export const createMessage = async (req , res) => {
    const {chatId , senderId , text} = req.body
    const newMessage = new Message({
        chatId , senderId , text
    })
    try{
        const response = await newMessage.save()
        res.json({response})
    }catch(err){
        console.log(err)
    }
}

export const getMessage = async (req , res) => {
    const {chatId} = req.params;
    try {
        const response = await Message.find({chatId})

        res.json({response , notification : {success : true , message : "messages fetched successfully"}})
    } catch (err) {
        console.log(err)
    }
}