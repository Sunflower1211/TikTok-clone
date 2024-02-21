import { createSlice } from '@reduxjs/toolkit';

export const articleContentSlice = createSlice({
    name: 'articleContent',
    initialState: {
        volume: false,
    },
    reducers: {
        volumeOn: (state, action) => {
            state.volume = 0.6;
        },
        volumeOff: (state, action) => {
            state.volume = 0;
        },
    },
});

export const { volumeOn, volumeOff } = articleContentSlice.actions;

export default articleContentSlice.reducer;
