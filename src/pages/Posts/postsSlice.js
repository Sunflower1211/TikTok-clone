import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        show: false,
        dataPosts: '',
    },
    reducers: {
        setShowPosts: (state, action) => {
            state.show = action.payload;
        },
        insertDataPosts: (state, action) => {
            state.dataPosts = action.payload;
        },
        deleteDataPosts: (state, action) => {
            state.dataPosts = '';
        },
    },
});

export const { setShowPosts, insertDataPosts, deleteDataPosts } = postsSlice.actions;

export default postsSlice.reducer;
