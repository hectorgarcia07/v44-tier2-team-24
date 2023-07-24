import { createSlice } from "@reduxjs/toolkit"

export const playersSlice = createSlice({
    name: "players",
    initialState: {
        players: [],
    },
    reducers: {
        setPlayers: (state, action) => {
            state.players = action.payload
        },
        resetPlayers: (state) => {
            state.players = []
        },
        removePlayer: (state, action) => {
            state.players = state.filter((bot,i)=> bot.name !== action.payload)
        },
        addPlayer: (state, action) => {
            state.players = action.payload
        },
    }
})

export const { setPlayers, resetPlayers, removePlayer, addPlayer } = playersSlice.actions

export default playersSlice.reducer