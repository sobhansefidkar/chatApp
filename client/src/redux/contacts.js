import { createSlice } from "@reduxjs/toolkit";
import notification from "../errorHandling/notification";

const contactSlice = createSlice({
    name : "contacts",
    initialState : {
        users : []
    },
    reducers : {
        addContacts : (state , action) => {
            state.users = action.payload
        },
        updateContacts : (state , action) => {
            const find = state.users.find(item => item._id === action.payload._id)
            if(find){
                notification({error : true , message : "this user is already exist in your contacts"})
            }else{
                state.users.push(action.payload)
            }
        },
        logoutContacts : (state , action) => {
            state.users = []
        }
    }
})


export const {addContacts , updateContacts , logoutContacts} = contactSlice.actions
export default contactSlice.reducer