import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        id : "",
        username : "",
        email : "",
        profilePic : "",
    },
    reducers : {
        addUser : (state , action) => {
            state.id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
            state.profilePic = action.payload.profilePic
        },
        updateUser : (state , action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.profilePic = action.payload.profilePic
        },
        asideUser : (state , action) => {
            state.asideUser = action.payload
        },
        logoutUser : (state , action) => {
            state.id = ""
            state.username = ""
            state.email = ""
            state.profilePic = ""
        }
    }
})

export const {addUser , updateUser , logoutUser , asideUser} = userSlice.actions
export default userSlice.reducer