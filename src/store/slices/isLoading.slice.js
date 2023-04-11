import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const isLoading = createSlice({
	name: 'isLoading',
    initialState: false,
    reducers: {
       setIsLoading : (state, action) => {
        return action.payload
       }
    }
})

export const { setIsLoading } = isLoading.actions;

export default isLoading.reducer;