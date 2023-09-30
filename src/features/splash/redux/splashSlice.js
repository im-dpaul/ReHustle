import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";

const initialState = {
    data: null,
    loading: false,
    error: null,
    setupStage: null,
    userExist: null,
};

export const getUserData = createAsyncThunk('api/getUserData', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().splash;

    let data = null;
    // try {
    const response = await authenticatedGetMethod('/user/currentUser');
    data = response.data;

    let name = data.result.name ?? "";
    let token = data.result.token ?? "";
    let email = data.result.email ?? "";
    let userName = data.result.userName ?? "";
    let profileImage = data.result.profileImage ?? "";
    let setupStage = `${data.result.setupStage}` ?? "";
    let id = `${data.result._id}` ?? "";

    await LocalStorage.SetData(StorageDataTypes.TOKEN, token);
    await LocalStorage.SetData(StorageDataTypes.ID, id);
    await LocalStorage.SetData(StorageDataTypes.EMAIL, email);
    await LocalStorage.SetData(StorageDataTypes.NAME, name);
    await LocalStorage.SetData(StorageDataTypes.USER_NAME, userName);
    await LocalStorage.SetData(StorageDataTypes.SETUP_STAGE, setupStage);
    await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const splashSlice = createSlice({
    name: 'splash',
    initialState: initialState,
    reducers: {
        userExists: (state, action) => {
            state.userExist = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.setupStage = `${action.payload.result.setupStage}`;
            state.data = action.payload;
        });
        builder.addCase(getUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.setupStage = '';
        });
    },
});

export const { userExists } = splashSlice.actions;

export default splashSlice.reducer;