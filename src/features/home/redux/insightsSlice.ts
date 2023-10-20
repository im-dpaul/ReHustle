import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticatedGetMethod } from "../../../core/services/NetworkServices";

interface InsightsState {
    data: any;
    error: any;
    loading: boolean;
    productWiseSales: any[];
    profileViews: number;
    monthlySales: number;
    weeklySales: number;
}

const initialState: InsightsState = {
    data: null,
    loading: false,
    error: null,
    productWiseSales: [],
    profileViews: 0,
    monthlySales: 0,
    weeklySales: 0,
};

export const getInsightsData = createAsyncThunk<any>(
    'api/getInsightsData',
    async (_, thunkAPI) => {
        let data = null;
        try {
            const response = await authenticatedGetMethod('/user/insights');
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const insightsSlice = createSlice({
    name: 'insights',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInsightsData.pending, (state) => {
            state.loading = true;
            state.productWiseSales = [];
            state.profileViews = 0;
            state.monthlySales = 0;
            state.weeklySales = 0;
        });
        builder.addCase(getInsightsData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.productWiseSales = action.payload.productWiseSales;
            state.profileViews = action.payload.profileViews;
            state.monthlySales = action.payload.summary.monthlySales;
            state.weeklySales = action.payload.summary.weeklySales;
        });
        builder.addCase(getInsightsData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default insightsSlice.reducer;