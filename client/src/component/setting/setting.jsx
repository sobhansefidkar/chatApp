import "./setting.css"
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import notification from "../../errorHandling/notification"
import { logoutRequest } from "../../requests/requests";
import { useNavigate } from "react-router-dom";
import MyProfile from "../myprofile/myProfile";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { logoutContacts } from "../../redux/contacts";
import { logoutSearchBox } from "../../redux/searchBoxUsers";
import { deleteMessage } from "../../redux/messages";
import { deleteOnlineUsers } from "../../redux/onlineUsers";
import { useState } from "react";

function Setting({ setOpenSetting, openSetting }) {
    const [openMyProfile, setOpenMyProfile] = useState(false)
    const user = useSelector(state => state.entities.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            const res = await logoutRequest()
            dispatch(logoutUser())
            dispatch(logoutContacts())
            dispatch(logoutSearchBox())
            dispatch(deleteMessage())
            dispatch(deleteOnlineUsers())
            if (res.notification.error) return notification(res.notification)
            navigate("/login")
            return notification(res.notification)
        } catch (err) {
            notification({ error: true, message: err })
        }
    }
    return (
        <>
            <div onClick={() => setOpenSetting(false)} className={`setting ${openSetting ? "" : "hidden"} absolute top-0 left-0 w-full h-full bg-[#00000070]`}></div>
            <div className={` ${openSetting ? "setting-container open " : "setting-container"} w-[450px] transition-all h-full bg-[#4e4e4e] absolute top-0 left-0`}>
                <div className="top-setting flex flex-col border-b-[1px] border-[gray] p-6 bg-[#1e7fff] ">
                    <div className=" flex justify-between items-center">
                        <div className="img-profile w-20 h-20 rounded-full mb-4 overflow-hidden relative">
                            <img className=" w-[90%] h-[90%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] absolute rounded-full z-10" src={user?.profilePic ? user.profilePic : "../../images/userprofile.png"} alt="" />
                        </div>
                        <button className=" cursor-pointer" onClick={() => setOpenSetting(false)}>
                            <IoMdClose size={25} color="white" />
                        </button>
                    </div>
                    <span className=" mx-3 font-semibold text-white">{user.username}</span>
                    <span className=" mx-3 font-semibold text-white">{user.email}</span>
                </div>
                <div className="bottom-setting p-6">
                    <ul>
                        <li className=" transition-all  border-[gray] border-b-[1px] hover:bg-[#1e7fff] rounded-md cursor-pointer">
                            <button onClick={() => setOpenMyProfile(true)} className="flex gap-2 items-center w-full h-full p-3">
                                <CgProfile size={25} color="lightgray" />
                                <span className=" text-white">my profile</span>
                            </button>
                        </li>
                        <li className=" transition-all text-[crimson] border-b-[1px] border-[gray] hover:bg-[#1e7fff] rounded-md cursor-pointer">
                            <button onClick={logout} className="flex gap-2 items-center w-full h-full p-3">
                                <BiLogOut size={25} />
                                <span className=" text-white">logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <MyProfile openMyProfile={openMyProfile} setOpenMyProfile={setOpenMyProfile} />
        </>
    );
}

export default Setting;