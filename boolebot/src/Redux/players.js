import { createSlice } from "@reduxjs/toolkit"

export const playersSlice = createSlice({
    name: "players",
    initialState: {
        botsArr: [],
    },
    reducers: {
        setBotsArr: (state, action) => {
            state.botsArr = action.payload
        },
        resetPlayers: (state) => {
            state.botsArr = []
        },
        removePlayer: (state, action) => {
            state.botsArr = state.filter((bot,i)=> bot.name !== action.payload)
        },
        addPlayer: (state, action) => {
            state.botsArr = [...state, action.payload]
        },
    }
})

export const { setBotsArr, resetPlayers, removePlayer, addPlayer } = playersSlice.actions

export default playersSlice.reducer