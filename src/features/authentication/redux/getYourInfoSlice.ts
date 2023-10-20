import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";

export interface GetYourInfoState {
    data: any,
    loading: boolean,
    twitterProfile: string,
    twitterApiData: any,
    error: errorType,
}

type errorType = {
    message: string;
    twitterApiError: string;
}

const noError: errorType = {
    message: '',
    twitterApiError: '',
}

const initialState: GetYourInfoState = {
    data: null,
    loading: false,
    twitterProfile: 'https://twitter.com/',
    twitterApiData: null,
    error: noError
};

export const getTwitterProfile = createAsyncThunk<any>(
    'api/getTwitterProfile',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: GetYourInfoState = state.getYourInfo;

        let twitterProfile = stateValue.twitterProfile;
        twitterProfile = twitterProfile.replace('https://twitter.com/', '')

        const url = `/social/p/${twitterProfile}`
        let data = null;
        try {
            const response = await authenticatedGetMethod(url);
            data = response.data.result;

            let profileImage = data.profileImage ?? "";
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);

            return data;
        } catch (e) {
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, '');
            return thunkAPI.rejectWithValue(e)
        }
    });

export const saveProfile = createAsyncThunk<any>(
    'api/saveProfile',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: GetYourInfoState = state.getYourInfo;

        const twitterApiData = stateValue.twitterApiData;
        const emailID = await LocalStorage.GetData(StorageKeys.EMAIL);

        let values;

        if (twitterApiData != null) {
            values = {
                "appearance": `{\"profileImage\":\"${twitterApiData.profileImage}\"}`,
                "description": twitterApiData.description,
                "email": emailID,
                "emailVerified": false,
                "location": twitterApiData.location,
                "name": twitterApiData.name,
                "profileImage": twitterApiData.profileImage,
                "profileType": "normal",
                "profileUrls": [],
                "setupStage": 1,
                "socialLinks": [],
                "url": twitterApiData.url,
                "userName": twitterApiData.userName,
            };
        }
        else {
            values = {
                "email": emailID,
                "emailVerified": false,
                "profileType": "normal",
                "profileUrls": [],
                "setupStage": 1,
                "socialLinks": [],
            };
        }

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

export const skipProfile = createAsyncThunk<any>(
    'api/skipProfile',
    async (_, thunkAPI) => {
        let values = { "setupStage": 1 };

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

export const getYourInfoSlice = createSlice({
    name: 'getYourInfo',
    initialState: initialState,
    reducers: {
        addTwitterProfile: (state, action) => {
            state.twitterProfile = action.payload;
        },
        clearData: (state) => {
            state.data = null
            state.loading = false
            state.error = noError
            state.twitterApiData = null
            state.twitterProfile = "https://twitter.com/"
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTwitterProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTwitterProfile.fulfilled, (state, action) => {
            state.twitterApiData = action.payload;
            state.error = noError;
            state.loading = false;
        });
        builder.addCase(getTwitterProfile.rejected, (state, action) => {
            state.error.twitterApiError = 'User not found!';
            state.twitterApiData = null;
            state.loading = false;
        });
        builder.addCase(saveProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveProfile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.error = noError;
            state.loading = false;
        });
        builder.addCase(saveProfile.rejected, (state) => {
            state.error.twitterApiError = 'Something went wrong!';
            state.loading = false;
            state.data = null
        });
        builder.addCase(skipProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(skipProfile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.error = noError;
            state.loading = false;
        });
        builder.addCase(skipProfile.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.data = null
            state.loading = false;
        });
    }
});

export const { addTwitterProfile, clearData } = getYourInfoSlice.actions;

export default getYourInfoSlice.reducer;