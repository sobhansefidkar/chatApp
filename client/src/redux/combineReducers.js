import { combineReducers } from "@reduxjs/toolkit";
import entitesReducer from "./entities"

export default combineReducers({
    entities : entitesReducer
})