import { useEffect, useState } from "react";
import "./sidebar.css"
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { getAsideUserRequest, getChatsRequest } from "../../requests/requests";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addContacts, updateContacts } from "../../redux/contacts";
import { deleteMessage } from "../../redux/messages";
import Loading from "../loading/loading";
import { socket } from "../../socketConnection/socket";

function Sidebar({ setOpenSetting, setOpenSearchBox }) {
    const userId = useSelector(state => state.entities.auth.id)
    const contacts = useSelector(state => state.entities.contacts.users)
    const onlineUsers = useSelector(state => state.entities.onlineUser.users)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        const getChats = async () => {
            try {
                setLoading(true)
                const res = await getChatsRequest(userId)
                const members = new Set()
                res.response.map(item => {
                    return item.members.map(id => {
                        return members.add(id)
                    })
                })
                members.delete("")
                members.delete(userId)
                const findContacts = await getAsideUserRequest([...members])
                dispatch(addContacts(findContacts.response))
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getChats()
    }, [userId, dispatch])
    
    useEffect(() => {
        socket.on("sendContact" , data => {
            dispatch(updateContacts(data))
        })
    } , [socket , dispatch])
    return (
        <aside>
            <div className="aside-container">
                <div className="top-aside flex items-center bg-[#1e7fff] p-3 gap-5 h-[8%] max-h-[8vh]">
                    <span onClick={() => setOpenSetting(true)} className=" cursor-pointer">
                        <IoReorderThreeOutline size={40} color="white" />
                    </span>
                    <span className=" text-2xl font-bold text-yellow-50">
                        sefidkar
                    </span>
                </div>
                <div className="bottom-aside bg-[#4e4e4e] rounded-t-[40px] overflow-auto h-[92%] max-h-[92vh] relative">
                    {
                        contacts &&
                        contacts.map((item, i) => {
                            return (
                                <Link key={i} to={item._id} onClick={() => dispatch(deleteMessage())}>
                                    <div className="chat flex items-center p-2 justify-betweenw-full h-24 border-b-[1px]">
                                        <div className=" w-[100px] h-full flex items-center justify-center relative">
                                            <img className=" w-14 rounded-full" src={`${item.profilePic ? item.profilePic : "../../images/userprofile.png"}`} alt="" />
                                            {
                                                onlineUsers &&
                                                onlineUsers.some(user => user.userId === item._id) &&
                                                <div className="online absolute w-4 h-4 rounded-full bg-[#05fa05] border-2 bottom-3 right-4"></div>
                                            }
                                        </div>
                                        <div className=" w-[60%] h-full flex flex-col justify-center px-2">
                                            <span className=" font-bold text-yellow-50">{item.username}</span>
                                            <p className=" text-sm text-gray-400">{item.email}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    {
                        contacts.length === 0 & loading == false &&
                        <div className=" w-full h-full flex items-center justify-center">
                            <span>
                                no contacts here
                            </span>
                        </div>
                    }
                    {
                        loading &&
                        <Loading />
                    }
                    <div className=" absolute bottom-3 right-3 w-14 h-14 bg-[#1e7fff] rounded-full">
                        <button className=" w-full h-full flex items-center justify-center cursor-pointer" onClick={() => setOpenSearchBox(true)}>
                            <IoSearch size={25} color="white" />
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;