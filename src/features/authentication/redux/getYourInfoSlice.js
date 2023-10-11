import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";

const initialState = {
    twitterProfile: 'https://twitter.com/',
    loading: false,
    twitterApiData: null,
    twitterApiError: null,
    profileImage: null,
    data: null,
    error: null
};

export const getTwitterProfile = createAsyncThunk('api/getTwitterProfile', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().getYourInfo;
    let twitterProfile = state.twitterProfile;
    twitterProfile = twitterProfile.replace('https://twitter.com/', '')
    const url = `/social/p/${twitterProfile}`
    let data = null;
    // try {
    const response = await authenticatedGetMethod(url);
    data = response.data;

    let profileImage = data.result.profileImage ?? "";

    await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const saveProfile = createAsyncThunk('api/saveProfile', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().getYourInfo;
    const twitterApiData = state.twitterApiData;

    const emailID = await LocalStorage.GetData(StorageKeys.EMAIL);
    const token = await LocalStorage.GetData(StorageKeys.TOKEN);
    const id = await LocalStorage.GetData(StorageKeys.ID);

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
            // "token": token,
            "url": twitterApiData.url,
            "userName": twitterApiData.userName,
            // "_id": id,
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
            // "token": token,
            // "_id": id,
        };
    }

    const url = `/user/update`
    let data = null;
    // try {
    const response = await authenticatedPutMethod(url, values);
    data = response.data;

    let name = data.result.name ?? "";
    let email = data.result.email ?? "";
    let userName = data.result.userName ?? "";
    let profileImage = data.result.profileImage ?? "";

    await LocalStorage.SetData(StorageKeys.EMAIL, email);
    await LocalStorage.SetData(StorageKeys.NAME, name);
    await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
    await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const skipProfile = createAsyncThunk('api/skipProfile', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().getYourInfo;

    let values = {
        "setupStage": 1,
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

export const getYourInfoSlice = createSlice({
    name: 'getYourInfo',
    initialState: initialState,
    reducers: {
        addTwitterProfile: (state, action) => {
            state.twitterProfile = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTwitterProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getTwitterProfile.fulfilled, (state, action) => {
            state.twitterApiData = action.payload.result;
            state.twitterApiError = null;
            state.loading = false;
            state.profileImage = action.payload.result.profileImage;
        });
        builder.addCase(getTwitterProfile.rejected, (state, action) => {
            state.twitterApiError = action.error.message;
            state.twitterApiData = null;
            state.loading = false;
        });
        builder.addCase(saveProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveProfile.fulfilled, (state, action) => {
            state.data = action.payload.result;
            state.loading = false;
        });
        builder.addCase(saveProfile.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(skipProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(skipProfile.fulfilled, (state, action) => {
            state.data = action.payload.result;
            state.loading = false;
        });
        builder.addCase(skipProfile.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }
});

export const { addTwitterProfile } = getYourInfoSlice.actions;

export default getYourInfoSlice.reducer;