import { createSlice } from '@reduxjs/toolkit';

export const editProfile = createSlice({
    name: 'editProfile',
    initialState: {
        show: false,
    },
    reducers: {
        setShowEditProfile: (state, action) => {
            state.show = action.payload;
        },
    },
});

export const { setShowEditProfile } = editProfile.actions;

export default editProfile.reducer;
