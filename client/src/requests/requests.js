import axios from "axios";
import toast from "react-hot-toast";
const API = "https://chat-app-server-blush.vercel.app"


// register
export const registerRequest = async (data) => {
    try{
        const res = await axios.post(`${API}/api/register` , data)
        return res.data
    }catch(err){
        toast.error(err)
    }
}
//login
export const loginRequest = async (data) => {
    try{
        const res = await axios.post(`${API}/api/login` , data)
        return res.data
    }catch(err){
        toast.error(err)
    }
}
//user info (check user)
export const userInfo = async () => {
    try {
        const res = await axios.get(`${API}/api/userInfo`)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//logout
export const logoutRequest = async () => {
    try {
        const res = await axios.get(`${API}/api/logout`)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//updete user info
export const updateUserRequest = async (data) => {
    try {
        const res = await axios.put(`${API}/api/updateUser` , data)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//search to find user
export const searchUserRequest = async (value) => {
    try {
        const res = await axios.get(`${API}/api/searchUser?value=${value}`)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//find user
export const privateUserRequest = async (id) => {
    try {
        const res = await axios.get(`${API}/api/user/${id}`)
        return res
    } catch (err) {
        toast.error(err)
    }
}
//get chats
export const getChatsRequest = async (id) => {
    try {
        const res = await axios.get(`${API}/api/findUserChats/${id}`)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//get aside user
export const getAsideUserRequest = async (members) => {
    try {
        const res = await axios.post(`${API}/api/findasideUsers` , {ids : members})
        return res.data
    } catch (err) {
        toast.error(err)
    }
} 
//get chat
export const getChatRequest = async (firstId , secondId) => {
    try {
        const res = await axios.get(`${API}/api/findUser/${firstId}/${secondId}`)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//get messages
export const getMessagesRequest = async (chatId) => {
    try {
        const res = await axios.get(`${API}/api/getMessage/${chatId}`)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//create chat
export const createChatRequest = async (body) => {
    try {
        const res = await axios.post(`${API}/api/createChat` , body)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
//create message
export const createMessageRequest = async (body) => {
    try {
        const res = await axios.post(`${API}/api/createMessage` , body)
        return res.data
    } catch (err) {
        toast.error(err)
    }
}
