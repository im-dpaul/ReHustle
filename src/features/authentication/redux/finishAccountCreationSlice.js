import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";

const initialState = {
    data: null,
    error: null,
    loading: false,
}

export const finishCreation = createAsyncThunk('api/finishCreation', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().finishAccountCreation;

    let values = {
        "setupStage": 4,
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

    await LocalStorage.SetData(StorageKeys.EMAIL, email);
    await LocalStorage.SetData(StorageKeys.NAME, name);
    await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
    await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);
    await LocalStorage.SetData(StorageKeys.ID, id);
    await LocalStorage.SetData(StorageKeys.SETUP_STAGE, setupStage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const finishAccountCreationSlice = createSlice({
    name: 'finishAccountCreation',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state.data = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(finishCreation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(finishCreation.fulfilled, (state, action) => {
            state.data = action.payload.result;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(finishCreation.rejected, (state, action) => {
            state.error = action.error.message;
            state.data = null;
            state.loading = false;
        });
    }
});

export const { clearData } = finishAccountCreationSlice.actions;

export default finishAccountCreationSlice.reducer;