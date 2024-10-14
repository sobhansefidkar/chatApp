import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
    name : "onlineUsers",
    initialState :{
        users : []
    },
    reducers : {
        addOnlineUser : (state , action) => {
            state.users = action.payload
        },
        deleteOnlineUsers : (state ) => {
            state.users = []
        }
    }
})

export const {addOnlineUser , deleteOnlineUsers} = onlineUserSlice.actions;
export default onlineUserSlice.reducer