import { createSlice } from "@reduxjs/toolkit"

export const savedStateSlice = createSlice({
    name: "savedState",
    initialState: {
        savedState: [],
    },
    reducers: {
        setSavedState: (state, action) => {
            state.savedState = action.payload
        },
        
    }
})

export const { setSavedState } = savedStateSlice.actions
export default savedStateSlice.reducer