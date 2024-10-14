import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name : "messages",
    initialState : {
        texts : []
    },
    reducers : {
        addMessage : (state , action) => {
            state.texts = action.payload
        },
        updateMessage : (state , action) => {
            const check = state.texts.some(item =>  item?.chatId === action.payload.chatId)
            if(check || state.texts.length === 0){
                state.texts.push(action.payload)
            }
        },
        deleteMessage : (state , action) => {
            state.texts = []
        }
    }
})

export const {addMessage , updateMessage , deleteMessage} = messageSlice.actions
export default messageSlice.reducer