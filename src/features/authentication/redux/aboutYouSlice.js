import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPutMethod } from "../../../core/services/NetworkServices";
import StorageDataTypes from "../../../constants/StorageDataTypes";
import LocalStorage from "../../../data/local_storage/LocalStorage";

const initialState = {
    name: '',
    data: null,
    loading: false,
    error: null,
    socialProfiles: [],
    socialProfileIDs: [],
    customLinks: [{
        ID: nanoid(),
        title: '',
        url: '',
    }]
};

export const addProfileLinks = createAsyncThunk('api/addProfileLinks', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().aboutYou;
    let updateName = '';
    if (state.name != '') {
        updateName = state.name;
    }
    else {
        const val = await LocalStorage.GetData(StorageDataTypes.NAME);
        if (val != null) {
            updateName = val;
        }
    }

    let localProfiles = [];
    if (state.socialProfiles.length) {
        localProfiles = state.socialProfiles.map((profile) => {
            let localProfile = {
                title: profile.title,
                link: profile.link
            };
            return localProfile;
        });
    }

    let localLinks = [];
    if (state.customLinks.length) {
        localLinks = state.customLinks.map((profile) => {
            if (profile.title != '' && profile.url != '') {
                let localLink = {
                    title: profile.title,
                    url: profile.url
                };
                return localLink;
            }
        });
        localLinks = localLinks.filter((lcoalLink) => lcoalLink != undefined)
    }

    let values = {
        "setupStage": 2,
        "name": updateName,
        "profileUrls": localLinks,
        "socialLinks": localProfiles,
    };

    console.log(values);

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

export const skipAboutYou = createAsyncThunk('api/skipAboutYou', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().aboutYou;

    let values = {
        "setupStage": 2,
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

export const aboutYouSlice = createSlice({
    name: 'aboutYou',
    initialState: initialState,
    reducers: {
        addName: (state, action) => {
            state.name = action.payload;
        },
        addSocialProfile: (state, action) => {
            const profile = action.payload;
            state.socialProfiles.push(profile);
            state.socialProfileIDs.push(action.payload.ID);
        },
        removeSocialProfile: (state, action) => {
            state.socialProfiles = state.socialProfiles.filter((profile) => profile.ID !== action.payload.ID)
            state.socialProfileIDs = state.socialProfileIDs.filter((ID) => ID !== action.payload.ID)
        },
        updateSocialProfile: (state, action) => {
            let profiles;
            profiles = state.socialProfiles.map((profile) => {
                let localProfile = profile;
                if (action.payload.ID == profile.ID) {
                    localProfile = action.payload;
                }
                return localProfile;
            });
            state.socialProfiles = profiles;
        },
        addCustomLink: (state, action) => {
            const link = {
                ID: nanoid(),
                title: '',
                url: '',
            }
            state.customLinks.push(link);
        },
        removeCustomLink: (state, action) => {
            state.customLinks = state.customLinks.filter((link) => link.ID !== action.payload.ID)
        },
        updateCustomLink: (state, action) => {
            let links;
            links = state.customLinks.map((link) => {
                let localLink = link;
                if (action.payload.ID == localLink.ID) {
                    localLink = action.payload;
                }
                return localLink;
            });
            state.customLinks = links;
        },
        clearData: (state, action) => {
            state.data = action.payload;
            state.name = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProfileLinks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addProfileLinks.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(addProfileLinks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.data = null;
        });
    }
});

export const { addName, addSocialProfile, removeSocialProfile, updateSocialProfile, addCustomLink, removeCustomLink, updateCustomLink, clearData } = aboutYouSlice.actions;

export default aboutYouSlice.reducer;