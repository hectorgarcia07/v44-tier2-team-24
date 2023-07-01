import { createSlice } from "@reduxjs/toolkit"

export const arenaData = createSlice({
    name: "arenaData",
    initialState: {
        arenaData: {
            tileNum: 3,
            speed: 500,
            operator: "AND",
        },
    },
    reducers: {
        
    }
})

export const { updateArenaData, updateSavedState } = arenaData.actions

export default arenaData.reducer