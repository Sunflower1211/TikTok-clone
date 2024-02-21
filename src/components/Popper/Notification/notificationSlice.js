import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        show: false,
        data: [],
        type: 'listAllNotify',
    },
    reducers: {
        setShowNotification: (state, action) => {
            state.show = action.payload;
        },
        createData: (state, action) => {
            state.data = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
    },
});

export const { setShowNotification, createData, setType } = notificationSlice.actions;

export default notificationSlice.reducer;
