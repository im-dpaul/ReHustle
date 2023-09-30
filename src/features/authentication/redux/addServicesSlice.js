import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPostMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";

const initialState = {
    services: [],
    servicesId: [],
    data: null,
    error: null,
    loading: false,
    screenLoading: false,
    servicesData: [],
    servicesError: [],
}

export const getAllServices = createAsyncThunk('api/getAllServices', async () => {
    let data = null;

    const response = await authenticatedGetMethod('/p/products');
    data = response.data.result;
    return data;
})

export const skipServices = createAsyncThunk('api/skipServices', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().addServices;

    let values = {
        "setupStage": 3,
    };

    const url = `/user/update`
    let data = null;
    // try {
    const response = await authenticatedPutMethod(url, values);
    data = response.data;

    let name = data.result.name ?? "";
    let email = data.result.email ?? "";
    let userName = data.result.userName ?? "";
    let profileImage = data.result.profileImage ?? "";
    let id = data.result._id ?? "";
    let setupStage = `${data.result.setupStage}` ?? "";

    await LocalStorage.SetData(StorageDataTypes.EMAIL, email);
    await LocalStorage.SetData(StorageDataTypes.NAME, name);
    await LocalStorage.SetData(StorageDataTypes.USER_NAME, userName);
    await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);
    await LocalStorage.SetData(StorageDataTypes.ID, id);
    await LocalStorage.SetData(StorageDataTypes.SETUP_STAGE, setupStage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const addNewServices = createAsyncThunk(
    'api/addNewServices',
    async (values, thunkAPI, _) => {
        const state = thunkAPI.getState().addServices;

        const url = `/p/product`
        let data = null;
        // try {
        const response = await authenticatedPostMethod(url, values);
        data = response.data.result;
        // } catch (e) {
        //     console.log('Error -> ', e);
        // }
        return data;
    });

export const addServicesSlice = createSlice({
    name: 'addServices',
    initialState,
    reducers: {
        addService: (state, action) => {
            const service = {
                id: nanoid(),
                data: action.payload
            };
            state.services.push(service);
            state.servicesId.push(action.payload.ID);
        },
        removeService: (state, action) => {
            state.services = state.services.filter((service) => service.data.ID !== action.payload.ID)
            state.servicesId = state.servicesId.filter((id) => id !== action.payload.ID)
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
        });
        builder.addCase(getAllServices.rejected, (state, action) => {
            state.servicesError = action.error.message;
            state.screenLoading = false;
        });
        builder.addCase(skipServices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(skipServices.fulfilled, (state, action) => {
            state.data = action.payload.result;
            state.loading = false;
        });
        builder.addCase(skipServices.rejected, (state, action) => {
            state.error = action.error.message;
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
            state.servicesError = action.error.message;
            state.screenLoading = false;
        });
    }
});

export const { addService, removeService, clearData } = addServicesSlice.actions;

export default addServicesSlice.reducer;