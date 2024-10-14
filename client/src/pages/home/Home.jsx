import "./Home.css"
import { useEffect, useId, useState } from "react";
import { userInfo } from "../../requests/requests";
import { useNavigate, useParams } from "react-router-dom";
import { addUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import Setting from "../../component/setting/setting";
import SearchUser from "../../component/searchUserComponent/searchUser";
import { socket } from "../../socketConnection/socket";
import { addOnlineUser } from "../../redux/onlineUsers";


function Home() {
    const dispatch = useDispatch()
    const [openSetting, setOpenSetting] = useState(false)
    const [opensearchBox, setOpenSearchBox] = useState(false)
    const userId = useSelector(state => state.entities.auth.id)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const res = await userInfo()
            if (res.notification.error) {
                return navigate("/login")
            }
            dispatch(addUser(res.response))
        }
        fetchData()
    }, [navigate, dispatch])

    useEffect(() => {
        socket.emit("addNewUser", userId)
        socket.on("getOnlineUsers", (onlineUsers) => {
            const filter = onlineUsers.filter(item => item.userId !== "")
            dispatch(addOnlineUser(filter))
        })

        return () => {
            socket.off("getOnlineUsers")
        }
    }, [socket, dispatch, userId])
    

    return (
        <div className="home relative">
            <div className="home-container">
                <section className="sidebar-section">
                    <Sidebar setOpenSetting={setOpenSetting} setOpenSearchBox={setOpenSearchBox} />
                </section>
                <section className={params.id ? "pv-section open" : "pv-section"}>
                    <Outlet />
                </section>
            </div>
            {
                <Setting setOpenSetting={setOpenSetting} openSetting={openSetting} />
            }
            {
                <SearchUser setOpenSearchBox={setOpenSearchBox} openSearchBox={opensearchBox} />
            }
        </div>
    );
}

export default Home;