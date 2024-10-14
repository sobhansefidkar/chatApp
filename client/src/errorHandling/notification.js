import toast from "react-hot-toast";

const notification = (notif) => {
    if(notif.error) return toast.error(notif.message)
    return toast.success(notif.message)
}

export default notification;