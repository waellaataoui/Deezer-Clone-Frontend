import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
export const login = createAsyncThunk(
    'login',
    async (data, thunkAPI) => {
        try {
            await axios.post('/api/auth/logout');
            const response = await axios.post('/api/auth/login', data);
            //fetch the user
            // thunkAPI.dispatch(getUser())
            return await response.data
        } catch (error) {

            return thunkAPI.rejectWithValue(error.response.data.message);
        }


    }
)
export const getUser = createAsyncThunk(
    'getUser',
    async (data, thunkAPI) => {
        try {
            const response = await axios.get('/api/user');
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue({ error: error.message });
        }

    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: true,
        loginLoading: false,
        registerLoading: false,
        loginError: null
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
        },
        //probably belongs in its own reducer but.. 🤷‍♂️
        addFavourite: (state, { payload }) => {
            state.user.favouriteTracks.tracks.push(payload)
        },
        removeFavourite: (state, { payload }) => {
            state.user.favouriteTracks.tracks = state.user.favouriteTracks.tracks.filter(track => track.id !== payload.id)
        },

    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed

        [getUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        [getUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [login.pending]: (state, action) => {
            state.loginLoading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loginLoading = false
            state.user = action.payload.user
            state.loginError = null

        },
        [login.rejected]: (state, action) => {
            state.loginLoading = false
            state.loginError = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setUser, addFavourite, removeFavourite } = authSlice.actions


export default authSlice.reducer