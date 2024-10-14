import { FaEllipsisVertical } from "react-icons/fa6";
import { BiPaperPlane } from "react-icons/bi";
import "./private.css"
import { Link, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { createMessageRequest, getChatRequest, getMessagesRequest, privateUserRequest } from "../../requests/requests";
import { useSelector } from "react-redux";
import notification from "../../errorHandling/notification"
import { useDispatch } from "react-redux";
import { addMessage, updateMessage } from "../../redux/messages";
import { useRef } from "react";
import Loading2 from "../loading2/loading2";
import Loading3 from "../loading3/loading3";
import { socket } from "../../socketConnection/socket";
import Loading4 from "../loading4/loading4";
import { updateContacts } from "../../redux/contacts";
import { deleteMessage } from "../../redux/messages";
import { createChatRequest } from "../../requests/requests";

function Private() {
    // states
    const [value, setValue] = useState("")
    const [chatter, setChatter] = useState({})
    const [chatId, setChatId] = useState("")
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading4, setLoading4] = useState(false)
    const userId = useSelector(state => state.entities.auth.id)
    const userInfo = useSelector(state => state.entities.auth)
    const texts = useSelector(state => state.entities.messages.texts)
    const onlineUsers = useSelector(state => state.entities.onlineUser.users)
    const contacts = useSelector(state => state.entities.contacts.users)
    const params = useParams()
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const ulRef = useRef(null)
    //////////////////

    // send message
    const sendMessage = async (e) => {
        e.preventDefault()
        setLoading4(true)
        let data = {
            chatId,
            senderId: userId,
            text: value
        }
        if (data.text === "") return notification({ error: true, message: "fill the inputs" })
        const res = await createMessageRequest(data)
        setLoading4(false)
        dispatch(updateMessage(res.response))
        // inputRef.current.value = ""
        const socketId = onlineUsers.find(item => item.userId === params.id)
        if (!socketId) return;
        socket.emit("sendMessage", { message: res.response, socketId: socketId.socket })
        data = {
            chatId: "",
            senderId: "",
            text: ""
        }
    }
    ///////////////////
    // private user
    async function privateUser() {
        setLoading2(true)
        const res = await privateUserRequest(params.id)
        if (res.statusText !== "OK") return notification({ error: true, messages: "user not found" })
        setChatter(res.data.response)
        setLoading2(false)
    }

    useEffect(() => {
        privateUser()
    }, [params])
    ///////////////////
    // user chat
    async function getChat() {
        setLoading(true)
        setLoading4(true)
        const resChat = await getChatRequest(userId, params.id)
        setChatId(resChat?.response?._id)
        setLoading4(false)
        setLoading(false)
    }
    useEffect(() => {
        getChat()
    }, [params, userId])
    //////////////
    // scroll
    useEffect(() => {
        ulRef.current.scrollTop = ulRef.current.scrollHeight
    }, [texts])
    ////////////
    // user messages
    async function getMessages() {
        const resMessages = await getMessagesRequest(chatId)
        if (resMessages.notification.success) {
            dispatch(addMessage(resMessages.response))
        }
        setLoading(false)
    }
    // get realtime message
    function realtimeMessage() {
        socket.on("getMessage", (data) => {
            if (data.chatId !== chatId) {
                return;
            } else {
                dispatch(updateMessage(data))
            }
        })
    }
    ////////////////////
    useEffect(() => {
        if (chatId) {
            getMessages()
            realtimeMessage()
        }
    }, [dispatch, ulRef, chatId])

    //create chat
    const createChat = async () => {
        const data = {
            firstId: userId,
            secondId: params.id
        }
        await createChatRequest(data)
        dispatch(updateContacts(chatter))
        dispatch(deleteMessage())
        getChat()
        const socketId = onlineUsers.find(item => item.userId === params.id)
        if (!socketId) return;
        socket.emit("userInfo", { userInfo : {_id : userInfo.id , username : userInfo.username , email : userInfo.email , profilePic : userInfo.profilePic}, socketId: socketId.socket })
        setLoading4(false)
    }

    return (
        <div className="private w-full h-full flex justify-end">
            <div className="private-container w-[99%] h-full bg-[#1e7fff]">
                <div className="top-pv h-[10%] relative text-white bg-[#4e4e4e]">
                    <div className=" flex h-full px-3 gap-5">
                        {
                            loading2 &&
                            <Loading2 />
                        }
                        {
                            loading2 === false &&
                            <>
                                <div className=" w-[100px] h-full flex items-center justify-center">
                                    <Link to={"/"}>
                                        <MdArrowBackIos />
                                    </Link>
                                    <div className=" relative w-14 h-14 min-w-14 rounded-full overflow-hidden flex items-center justify-center">
                                        <img className=" w-full rounded-full " src={chatter.profilePic ? chatter.profilePic : "../../images/userprofile.png"} alt="" />
                                    </div>
                                </div>
                                <div className=" w-[80%] h-full flex flex-col justify-center px-2">
                                    <span className=" text-xl font-bold">{chatter.username}</span>
                                    {
                                        onlineUsers.some(user => user.userId === chatter._id) &&
                                        <span className=" text-gray-300">online</span>
                                    }
                                    {
                                        !onlineUsers.some(user => user.userId === chatter._id) &&
                                        <span className=" text-gray-300">offline</span>
                                    }
                                </div>
                                {/* <div className=" w-[10%] flex items-center justify-center">
                                    <FaEllipsisVertical size={30} />
                                </div> */}
                            </>
                        }
                    </div>
                </div>
                <div className="middle-pv w-full h-[83%]  rounded-bl-[50px] overflow-hidden">
                    <div className="middle-pv-container w-full h-full">
                        <div className="glass-container w-full h-full  max-h-[793px]">
                            <ul ref={ulRef} className=" h-full overflow-y-scroll overflow-x-hidden flex-col flex relative gap-1 px-3 py-12">
                                {
                                    texts &&
                                    texts.map((item, i) => {
                                        return (
                                            <li key={i} className={`${item.senderId === userId ? " bg-[#1e7fff] ml-[100%] translate-x-[-100%]" : " bg-[#4e4e4e]"} w-64 h-auto p-1 rounded-md`}>
                                                <p className=" flex-wrap h-auto text-white">
                                                    {item.text}
                                                </p>
                                                <p className=" text-right text-gray-300">{item.createdAt.split("T")[1].split(".")[0]}</p>
                                            </li>
                                        )
                                    })
                                }
                                {
                                    texts.length === 0 && loading == false &&
                                    <p className=" block text-center text-white">no message sent yet</p>
                                }
                                {
                                    loading &&
                                    <div className=" w-full h-full flex justify-between flex-col overflow-hidden">
                                        <Loading3 />
                                        <Loading3 />
                                        <Loading3 />
                                        <Loading3 />
                                        <Loading3 />
                                        <Loading3 />
                                        <Loading3 />
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bottom-pv w-full h-[7%] bg-[#1e7fff]">
                    <form onSubmit={sendMessage} className=" w-full h-full flex items-center justify-center">
                        {
                            loading4 &&
                            <Loading4 />
                        }
                        {
                            loading4 === false & contacts.some(item => item._id === params.id) &&
                            <>
                                <input ref={inputRef} onChange={(e) => { setValue(e.target.value) }} className=" p-1 rounded-lg w-[80%]" type="text" placeholder="type something..." />
                                <button className=" p-2"><BiPaperPlane size={20} color="black" /></button>
                            </>
                        }
                        {
                            loading4 === false & !contacts.some(item => item._id === params.id) &&
                            <button onClick={createChat} className=" p-2 bg-teal-400 rounded-md w-full" >add to your contacts</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Private;