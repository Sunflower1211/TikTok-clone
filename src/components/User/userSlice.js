import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: false,
    },
    reducers: {
        setDataUser: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setDataUser } = userSlice.actions;

export default userSlice.reducer;
