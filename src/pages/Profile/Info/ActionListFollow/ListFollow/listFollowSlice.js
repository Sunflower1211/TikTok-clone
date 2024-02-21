import { createSlice } from '@reduxjs/toolkit';

export const listFollow = createSlice({
    name: 'listFollow',
    initialState: {
        show: false,
        data: [],
        type: '',
    },
    reducers: {
        setShowListFollow: (state, action) => {
            state.show = action.payload;
        },
        createData: (state, action) => {
            state.data = action.payload.data;
            state.type = action.payload.type;
        },
        deleteData: (state, action) => {
            state.data = [];
            state.type = '';
        },
    },
});

export const { createData, setShowListFollow, deleteData } = listFollow.actions;

export default listFollow.reducer;
