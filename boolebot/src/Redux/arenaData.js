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
        resetArenaData: (state, action) => {
            state.arenaData = {
                tileNum: 3,
                speed: 500,
                operator: "AND",
            }
        },
        setArenaData: ( state, action ) => {
            state.arenaData = action.payload
        }
    }
})

export const { resetArenaData, setArenaData } = arenaData.actions

export default arenaData.reducer