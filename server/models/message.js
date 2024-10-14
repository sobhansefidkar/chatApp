import mongoose from "mongoose";

const messageShema = new mongoose.Schema({
    chatId : {type : String , required : true},
    senderId : {type : String , required : true},
    text : {type : String , required : true}
} , {timestamps : true})

export default mongoose.model("Message" , messageShema)