import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticatedGetMethod } from "../../../core/services/NetworkServices";

interface ProfileState {
    data: any;
    error: any;
    loading: boolean;
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

export const insightsSlice = createSlice({
    name: 'insights',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default insightsSlice.reducer;