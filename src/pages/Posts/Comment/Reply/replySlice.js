import { createSlice } from '@reduxjs/toolkit';

export const replySlice = createSlice({
    name: 'reply',
    initialState: {
        deleteReply: {},
    },
    reducers: {
        deleteReply: (state, action) => {
            state.deleteReply = action.payload;
        },
    },
});

export const { deleteReply } = replySlice.actions;

export default replySlice.reducer;
