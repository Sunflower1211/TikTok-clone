import { createSlice } from '@reduxjs/toolkit';

export const modalLogoutSlice = createSlice({
    name: 'modalLogout',
    initialState: {
        show: false,
    },
    reducers: {
        setShowLogout: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShowLogout } = modalLogoutSlice.actions;

export default modalLogoutSlice.reducer;
