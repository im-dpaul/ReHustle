import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedDeleteMethod, authenticatedGetMethod, authenticatedPostMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import { AppDispatch } from "../../../app/store";

interface Service {
    _id: string;
}

interface ServicesState {
    data: any;
    error: any;
    loading: boolean;
    screenLoading: boolean;
    servicesData: any[];
    servicesError: any;
    showAddServiceModal: boolean,
}

type ThunkAPI = {
    getState: () => ServicesState;
    dispatch: AppDispatch;
    extra: {};
};

const initialState: ServicesState = {
    data: null,
    error: null,
    loading: false,
    screenLoading: false,
    servicesData: [],
    servicesError: null,
    showAddServiceModal: false,
}

export const getAllServices = createAsyncThunk<any[]>(
    'api/getAllServices',
    async (_, thunkAPI) => {

        let data: any = null;
        try {
            const response = await authenticatedGetMethod('/p/products');
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }

    })

export const addNewServices = createAsyncThunk<Service, any, ThunkAPI>(
    'api/addNewServices',
    async (values, thunkAPI) => {
        const state = thunkAPI.getState();

        const url = `/p/product`
        let data: any = null;
        // try {
        const response = await authenticatedPostMethod(url, values);
        data = response.data.result;
        // } catch (e) {
        //     console.log('Error -> ', e);
        // }
        return data;
    });

export const updateService = createAsyncThunk<any, any>(
    'api/updateService',
    async (service, thunkAPI) => {
        const id = service._id;
        const url = `p/product/${id}`;

        try {
            const response = await authenticatedPutMethod(url, service);
            const data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }

    });

export const deleteService = createAsyncThunk<string, string>(
    'api/deleteService',
    async (id, thunkAPI) => {
        const url = `p/product/${id}`;

        try {
            const response = await authenticatedDeleteMethod(url);
            const data = response.data.result;

            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = [];
        },
        showAddServiceModal: (state, action) => {
            state.showAddServiceModal = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllServices.pending, (state) => {
            state.screenLoading = true;
        });
        builder.addCase(getAllServices.fulfilled, (state, action) => {
            state.servicesData = action.payload;
            state.screenLoading = false;
        });
        builder.addCase(getAllServices.rejected, (state, action) => {
            state.servicesError = action.payload;
            state.screenLoading = false;
        });
        builder.addCase(addNewServices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addNewServices.fulfilled, (state, action) => {
            state.servicesData.unshift(action.payload);
            state.loading = false;
        });
        builder.addCase(addNewServices.rejected, (state, action) => {
            state.servicesError = action.payload;
            state.loading = false;
        });
        builder.addCase(updateService.pending, (state) => {
        });
        builder.addCase(updateService.fulfilled, (state, action) => {
            let allData = state.servicesData;
            const newData = allData.map((service) => {
                if (service._id == action.payload._id) {
                    return action.payload
                }
                else {
                    return service
                }
            });
            state.servicesData = newData;
        });
        builder.addCase(updateService.rejected, (state, action) => {
            state.servicesError = action.payload;
        });
        builder.addCase(deleteService.pending, (state) => {
        });
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.servicesData = state.servicesData.filter((service) => service._id !== action.payload)
        });
        builder.addCase(deleteService.rejected, (state, action) => {
            state.servicesError = action.payload;
        });
    }
});

export const { clearData, showAddServiceModal } = servicesSlice.actions;

export default servicesSlice.reducer;