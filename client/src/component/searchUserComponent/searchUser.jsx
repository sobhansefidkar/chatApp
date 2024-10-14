import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import { createChatRequest, searchUserRequest } from "../../requests/requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./searchUser.css"
import { Link } from "react-router-dom";
import { addSearchBoxUser } from "../../redux/searchBoxUsers";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../redux/messages";

function SearchUser({ openSearchBox, setOpenSearchBox }) {
    const [value, setValue] = useState("")
    const user = useSelector(state => state.entities.auth)
    const searchBoxUsers = useSelector(state => state.entities.searchBoxUsers.users)
    const dispatch = useDispatch()

    const searchUser = async () => {
        try {
            const res = await searchUserRequest(value)
            const filter = res.response.filter(item => item._id !== user.id)
            dispatch(addSearchBoxUser(filter))
        } catch (err) {
            toast.error(err)
        }
    }

    useEffect(() => {
        searchUser()
    }, [value, user, dispatch])

    

    return (
        <div className={`${openSearchBox ? "search-box open" : "search-box"}`}>
            <div className="search-user absolute w-full h-full bg-[#0000007e] top-0 left-0" onClick={() => setOpenSearchBox(false)}></div>
            <div className="search-user-container relative w-[400px] h-auto bg-[#4e4e4e] p-2 rounded-md smmax:w-[90%]">
                <div className=" flex flex-col">
                    <div className="top-search flex w-full justify-center items-center relative">
                        <input className=" p-1 rounded-md w-full" type="text" placeholder="search user..." onChange={(e) => setValue(e.target.value)} />
                        <span className=" absolute right-1">
                            <IoSearch size={25} color="black" />
                        </span>
                    </div>
                    <div className="bottom-search w-full h-auto max-h-[400px] relative overflow-auto p-2 mt-2">
                        {
                            searchBoxUsers &&
                            searchBoxUsers.map((item, i) => {
                                return (
                                    <div className="search-user-card relative flex items-center justify-center my-2 h-20 overflow-hidden" key={i} onClick={() => setOpenSearchBox(false)}>
                                        <Link onClick={() => dispatch(deleteMessage())} to={`/${item._id}`} className=" z-30 w-[98%] h-[95%]  rounded-md flex cursor-pointer px-2">
                                            <div className=" h-full flex items-center relative">
                                                <img className=" w-14 rounded-full" src={item?.profilePic ? item.profilePic : "../../images/userprofile.png"} alt="" />
                                                {/* {
                                                    user.onlineUser.includes(item._id) &&
                                                    <div className="online absolute w-4 h-4 rounded-full bg-[#05fa05] border-2 bottom-3 right-0"></div>
                                                } */}
                                            </div>
                                            <div className=" flex flex-col h-full justify-center mx-2 text-white">
                                                <span>{item.username}</span>
                                                <span>{item.email}</span>
                                            </div>
                                        </Link>
                                        <div className="spinner"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchUser;