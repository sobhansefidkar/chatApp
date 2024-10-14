import { useSelector } from "react-redux";
import "./myProfile.css"
import notification from "../../errorHandling/notification";
import { userInfo, updateUserRequest } from "../../requests/requests";
import { updateUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyProfile({ openMyProfile, setOpenMyProfile }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.entities.auth)

    const image = (e) => {
        const file = e.target.files[0]
        const maxSize = 1000 * 1024
        if (!file) return dispatch(updateUser({ ...user, profilePic: "../../images/userprofile.png" }))
        const validateTypes = ["image/jpeg", "image/jpg", "image/png"]
        if (validateTypes.includes(file.type) && file.size <= maxSize) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                dispatch(updateUser({ ...user, profilePic: reader.result }))
            }
            reader.onerror = () => {
                notification({ error: true, message: "something went wrong try again" })
            }
        } else {
            return notification({ error: true, message: "please upload jpg/jpeg/png format file and the max size should be less than 500kb" })
        }
    }
    const updateUserInfo = async (e) => {
        e.preventDefault()
        if (user.username === "" || user.email === "") return notification({ error: true, message: "fill the inputs" })
        try {
            const res = await updateUserRequest(user)

            if (res.notification.error) return notification(res.notification)

            return notification(res.notification)
        } catch (err) {
            return notification(err)
        }
    }
    const closeMyProfile = async (e) => {
        e.preventDefault()
        setOpenMyProfile(false)
        try {
            const res = await userInfo()
            if (res.notification.error) {
                return navigate("/login")
            }
            dispatch(updateUser(res.response))
        } catch (err) {

        }
    }
    return (
        <div className={`myprofile ${openMyProfile ? "open" : "close"} absolute w-full h-full top-0 left-0 flex items-center justify-center bg-[#00000070]`}>
            <div className="card">
                <div className="card2">
                    <form onSubmit={updateUserInfo}>
                        <div className="form flex gap-2 p-3">
                            <div className=" w-20 h-20 overflow-hidden rounded-full flex items-center justify-center">
                                <img className=" w-full rounded-full" src={user?.profilePic ? user.profilePic : "../../images/userprofile.png"} alt="user profile" />
                            </div>
                            <label className=" cursor-pointer text-white mt-2">
                                choose picture
                                <input className=" hidden" type="file" accept="image/*" onChange={image} />
                            </label>
                        </div>
                        <div className=" flex flex-col p-5">
                            <label htmlFor="username" className=" text-white">username :</label>
                            <input className=" p-1 rounded-lg" onChange={(e) => dispatch(updateUser({ ...user, username: e.target.value }))} type="text" placeholder={user.username} />
                        </div>
                        <div className=" flex flex-col p-5">
                            <label htmlFor="username" className=" text-white">email :</label>
                            <input className=" p-1 rounded-lg" onChange={(e) => dispatch(updateUser({ ...user, email: e.target.value }))} type="email" placeholder={user.email} />
                        </div>
                        <div className=" flex justify-end p-6 gap-5">
                            <button onClick={closeMyProfile} className=" text-white">
                                cancel
                            </button>
                            <button className="button">
                                update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;