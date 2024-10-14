import { createSlice } from "@reduxjs/toolkit";

const searchBoxUserSlice = createSlice({
    name : "searchBoxUser",
    initialState : {
        users : []
    },
    reducers : {
        addSearchBoxUser : (state , action) => {
            state.users = action.payload
        },
        logoutSearchBox : (state , action) => {
            state.users = []
        },
    }
})

export const {addSearchBoxUser , logoutSearchBox} = searchBoxUserSlice.actions
export default searchBoxUserSlice.reducer