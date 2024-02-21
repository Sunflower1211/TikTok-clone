import { createSlice } from '@reduxjs/toolkit';

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        contentComment: '',
        deleteCommentId: '',
    },
    reducers: {
        createContentComment: (state, action) => {
            state.contentComment = action.payload;
        },
        deleteComment: (state, action) => {
            state.deleteCommentId = action.payload;
        },
    },
});

export const { createContentComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
