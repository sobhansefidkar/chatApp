import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import contactSlice from "./contacts"
import searchBoxUserSlice from "./searchBoxUsers"
import messageSlice from "./messages"
import onlineUserSlice from "./onlineUsers";

export default combineReducers ({
    auth : userSlice,
    contacts : contactSlice,
    searchBoxUsers : searchBoxUserSlice,
    messages : messageSlice,
    onlineUser : onlineUserSlice,
})