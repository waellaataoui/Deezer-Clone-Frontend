import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const slice = createSlice({
    name: 'settings',
    initialState: {
        theme: "",
        sideBarFolded: null
    },
    reducers: {
        switchTheme: (state, { payload }) => {
            state.theme = payload
        },
        toggleFolded: (state, { payload }) => {
            state.sideBarFolded = payload
        }

    },

})
export const { switchTheme, toggleFolded } = slice.actions

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['theme'] // only theme will be persisted

}
export default persistReducer(persistConfig, slice.reducer)