import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import notification from "../../errorHandling/notification";
import {userInfo, loginRequest} from "../../requests/requests"

function Login() {
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userInfo()
                if(res.notification.success){
                    navigate("/")
                    notification(res.notification)
                }
            } catch (err) {
                console.log(err)
            }   
        }
        fetchData()
    } , [navigate])
    const [user , setUser] = useState({
        email : "",
        password : ""
    })
    const login = async (e) => {
        e.preventDefault()
        const {email , password} = user
        if(email === "" || password === "") return notification({error : true , message : "fill the inputs"})

        const res = await loginRequest(user)
        notification(res.notification)
        if(res.notification.success){
            navigate("/")
        }
    }
    return (
        <div className="register w-full h-auto">
            <div className="register-container w-full h-screen flex items-center justify-center">
                <form onSubmit={login} className="form bg-[#4e4e4e] text-yellow-50 w-80 h-[400px] p-2 rounded-lg" method="post">
                    <div className="w-full h-[15%] flex items-center justify-center">
                        <h2 className=" text-[30px] font-bold">Login</h2>
                    </div>
                    <div className="w-full h-[80%] flex justify-between flex-col">
                        <div className=" flex flex-col m-1">
                            <label htmlFor="email">email :</label>
                            <input id="email" className=" text-black border-b border-slate-400 p-1 rounded-md" type="email" placeholder="email..." onChange={(e) => setUser({...user , email : e.target.value})}/>
                        </div>
                        <div className=" flex flex-col m-1">
                            <label htmlFor="password">password :</label>
                            <input id="password" className=" text-black border-b border-slate-400 p-1 rounded-md" type="text" placeholder="password..." onChange={(e) => setUser({...user , password : e.target.value})}/>
                        </div>
                        <div className="flex flex-col m-1">
                            <button className=" text-white p-2 rounded-md bg-[#1e7fff] font-bold hover:bg-[#469dff]">
                                login
                            </button>
                        </div>
                    </div>
                    <Link className=" block text-center hover:text-[#469dff] hover:underline" to={"/register"}>sign up</Link>
                </form>
            </div>
            
        </div>
    );
}

export default Login;