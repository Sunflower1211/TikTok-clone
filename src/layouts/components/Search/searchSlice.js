import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        q: '',
    },
    reducers: {
        searchAccount: (state, action) => {
            state.q = action.payload;
        },
    },
});

export const { searchAccount } = searchSlice.actions;

export default searchSlice.reducer;
