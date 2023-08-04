import { createSlice } from "@reduxjs/toolkit"

export const playersSlice = createSlice({
    name: "players",
    initialState: {
        players: [],
    },
    reducers: {
        setPlayers: (state, action) => {
            console.log("Set players", state.players)
            state.players = action.payload
        },
        resetPlayers: (state) => {
            state.players = []
        },
        removePlayer: (state, action) => {
            console.log(state.players, action)
            
            state.players = state.players.filter((bot,i)=> bot.name !== action.payload)
        },
        addPlayer: (state, action) => {
            console.log("add players", state.players)

            state.players = action.payload
        },
    }
})

export const { setPlayers, resetPlayers, removePlayer, addPlayer } = playersSlice.actions

export default playersSlice.reducer