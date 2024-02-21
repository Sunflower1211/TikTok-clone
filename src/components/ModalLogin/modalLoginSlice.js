import { createSlice } from '@reduxjs/toolkit';

export const modalLoginSlice = createSlice({
    name: 'modalLogin',
    initialState: {
        show: false,
    },
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShow } = modalLoginSlice.actions;

export default modalLoginSlice.reducer;
