import { configureStore } from "@reduxjs/toolkit";
import playersReducer from './players'
import savedStateReducer from "./savedState";
import arenaDataReducer from "./arenaData";

export default configureStore({
    reducer:{
        players: playersReducer,
        savedState: savedStateReducer,
        arenaData: arenaDataReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})