import { createSlice } from '@reduxjs/toolkit'


const slice = createSlice({
    name: 'player',
    initialState: {
        queue: [],
        currentTrack: null,
        playing: false
    },
    reducers: {
        updateQueue: (state, { payload }) => {
            state.queue = payload
        },
        setCurrentTrack: (state, { payload }) => {
            state.currentTrack = payload
        },
        setPlaying: (state, { payload }) => {
            state.playing = payload
        }


    },

})
export const { updateQueue, setCurrentTrack, setPlaying } = slice.actions

export default slice.reducer
