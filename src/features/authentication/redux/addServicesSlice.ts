import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedDeleteMethod, authenticatedGetMethod, authenticatedPostMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";
import { ServicesDataType } from "../../../data/constants/ServiceType";

export interface AddServicesState {
    servicesTypeId: number[],
    data: any,
    error: errorType,
    loading: boolean,
    screenLoading: boolean,
    servicesData: ServicesDataType[],
    servicesError: any[],
}

type errorType = {
    message: string;
}

const noError: errorType = {
    message: '',
}

const initialState: AddServicesState = {
    servicesTypeId: [],
    data: null,
    error: noError,
    loading: false,
    screenLoading: false,
    servicesData: [],
    servicesError: [],
}

export const getAllServices = createAsyncThunk<any>(
    'api/getAllServices',
    async (_, thunkAPI) => {
        let data = null;
        try {
            const response = await authenticatedGetMethod('/p/products');
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    })

export const skipServices = createAsyncThunk<any>(
    'api/skipServices',
    async (_, thunkAPI) => {
        let values = { "setupStage": 3 }
        const url = `/user/update`
        let data = null;

        try {
            const response = await authenticatedPutMethod(url, values);
            data = response.data.result;

            let name = data.name ?? "";
            let email = data.email ?? "";
            let userName = data.userName ?? "";
            let profileImage = data.profileImage ?? "";
            let id = data._id ?? "";

            await LocalStorage.SetData(StorageKeys.EMAIL, email);
            await LocalStorage.SetData(StorageKeys.NAME, name);
            await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);
            await LocalStorage.SetData(StorageKeys.ID, id);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const addNewServices = createAsyncThunk<any, any>(
    'api/addNewServices',
    async (values, thunkAPI) => {
        const url = `/p/product`
        let data = null;

        try {
            const response = await authenticatedPostMethod(url, values);
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
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

export const deleteService = createAsyncThunk<any, string>(
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

export const addServicesSlice = createSlice({
    name: 'addServices',
    initialState,
    reducers: {
        addService: (state, action) => {
            state.servicesTypeId.push(action.payload);
        },
        removeService: (state, action) => {
            state.servicesTypeId = state.servicesTypeId.filter((id) => id !== action.payload)
        },
        clearData: (state, action) => {
            state.data = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllServices.pending, (state) => {
            state.screenLoading = true;
        });
        builder.addCase(getAllServices.fulfilled, (state, action) => {
            state.servicesData = action.payload;
            state.screenLoading = false;
            state.error = noError
        });
        builder.addCase(getAllServices.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.servicesData = []
            state.screenLoading = false;
        });
        builder.addCase(skipServices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(skipServices.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = noError
        });
        builder.addCase(skipServices.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.data = null;
            state.loading = false;
        });
        builder.addCase(addNewServices.pending, (state) => {
            state.screenLoading = true;
        });
        builder.addCase(addNewServices.fulfilled, (state, action) => {
            state.servicesData.unshift(action.payload);
            state.screenLoading = false;
        });
        builder.addCase(addNewServices.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.screenLoading = false;
        });
        builder.addCase(updateService.pending, (state) => {
        });
        builder.addCase(updateService.fulfilled, (state, action) => {
            let allData: ServicesDataType[] = state.servicesData;
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
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
        });
        builder.addCase(deleteService.pending, (state) => {
        });
        builder.addCase(deleteService.fulfilled, (state, action) => {
            state.servicesData = state.servicesData.filter((service) => service._id !== action.payload)
        });
        builder.addCase(deleteService.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
        });
    }
});

export const { addService, removeService, clearData } = addServicesSlice.actions;

export default addServicesSlice.reducer;