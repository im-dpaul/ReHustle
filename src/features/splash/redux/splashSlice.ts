import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";

export interface SplashState {
    data: any;
    error: errorType;
    loading: boolean;
    setupStage: number;
    userExist: boolean | null
}

type errorType = {
    message: string;
}

const noError: errorType = {
    message: ''
}

const initialState: SplashState = {
    data: null,
    loading: false,
    error: noError,
    setupStage: -2,
    userExist: null,
};

export const getUserData = createAsyncThunk<any>('api/getUserData',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: SplashState = state.splash;

        let data = null;
        try {
            const response = await authenticatedGetMethod('/user/currentUser');
            data = response.data.result;

            let name = data.name ?? "";
            let email = data.email ?? "";
            let userName = data.userName ?? "";
            let profileImage = data.profileImage ?? "";
            let id = `${data._id}` ?? "";

            await LocalStorage.SetData(StorageKeys.ID, id);
            await LocalStorage.SetData(StorageKeys.EMAIL, email);
            await LocalStorage.SetData(StorageKeys.NAME, name);
            await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);

            return data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const splashSlice = createSlice({
    name: 'splash',
    initialState: initialState,
    reducers: {
        userExists: (state, action) => {
            state.userExist = action.payload;
        },
        clearData: (state) => {
            state.data = null
            state.loading = false
            state.error = noError
            state.setupStage = -2
            state.userExist = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.loading = false;
            state.setupStage = action.payload.setupStage;
            state.data = action.payload;
        });
        builder.addCase(getUserData.rejected, (state, action) => {
            state.loading = false;
            state.error.message = 'Something went wrong!';
            state.setupStage = -1;
        });
    },
});

export const { userExists, clearData } = splashSlice.actions;

export default splashSlice.reducer;