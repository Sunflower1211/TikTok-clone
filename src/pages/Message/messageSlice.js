import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        userReceiver: [],
    },
    reducers: {
        createUserReceiver: (state, action) => {
            state.userReceiver = [];
            state.userReceiver.push(action.payload);
        },
    },
});

export const { createUserReceiver } = messageSlice.actions;

export default messageSlice.reducer;
