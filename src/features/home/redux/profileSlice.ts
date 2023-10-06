import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod } from "../../../core/services/NetworkServices";

interface ProfileState {
    data: any;
    error: any;
    loading: boolean;
    bannerImage: string | null;
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
    bannerImage: null,
};

export const getCurrentUserData = createAsyncThunk<any>(
    'api/currentUserData',
    async (_, thunkAPI) => {
        let data = null;
        try {
            const response = await authenticatedGetMethod('/user/currentUser');
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUserData.fulfilled, (state, action) => {
            if (action.payload.appearance != null) {
                const appearance: string = action.payload.appearance;
                if (appearance.includes('bannerImage')) {
                    const dataList = appearance.split(',');
                    dataList.forEach((data) => {
                        if (data.includes('bannerImage')) {
                            let val = data.split('"')
                            state.bannerImage = val[3];
                        }
                    })
                }
                else {
                    state.bannerImage = null;
                }
            }
            else {
                state.bannerImage = null;
            }
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getCurrentUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;