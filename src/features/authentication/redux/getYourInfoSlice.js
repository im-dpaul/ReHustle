import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";

const initialState = {
    twitterProfile: '',
    loading: false,
    twitterApiData: null,
    twitterApiError: null,
    profileImage: null,
    data: null,
    error: null
};

export const getTwitterProfile = createAsyncThunk('api/getTwitterProfile', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().getYourInfo;
    const twitterProfile = state.twitterProfile;
    const url = `/social/p/${twitterProfile}`
    let data = null;
    // try {
    const response = await authenticatedGetMethod(url);
    data = response.data;

    let profileImage = data.result.profileImage ?? "";

    await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const saveProfile = createAsyncThunk('api/saveProfile', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().getYourInfo;
    const twitterApiData = state.twitterApiData;

    const emailID = await LocalStorage.GetData(StorageDataTypes.EMAIL);
    const token = await LocalStorage.GetData(StorageDataTypes.TOKEN);
    const id = await LocalStorage.GetData(StorageDataTypes.ID);

    let values = {
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

    const url = `/user/update`
    let data = null;
    // try {
    const response = await authenticatedPutMethod(url, values);
    data = response.data;

    let name = data.result.name ?? "";
    let email = data.result.email ?? "";
    let userName = data.result.userName ?? "";
    let profileImage = data.result.profileImage ?? "";

    await LocalStorage.SetData(StorageDataTypes.EMAIL, email);
    await LocalStorage.SetData(StorageDataTypes.NAME, name);
    await LocalStorage.SetData(StorageDataTypes.USER_NAME, userName);
    await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);

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
    }
});

export const { addTwitterProfile } = getYourInfoSlice.actions;

export default getYourInfoSlice.reducer;