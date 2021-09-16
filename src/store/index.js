import { configureStore } from '@reduxjs/toolkit'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import authReducer from './authSlice'
import settingsReducer from './settingsSlice'
import playerReducer from './playerSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        settings: settingsReducer,
        player: playerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})