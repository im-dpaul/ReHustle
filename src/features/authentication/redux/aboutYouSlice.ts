import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPutMethod } from "../../../core/services/NetworkServices";
import StorageKeys from "../../../constants/StorageKeys";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import { SocialMediaDataType } from "../../../data/constants/SocialMediaType";
import { MoESetName } from "../../../utils";

export interface AboutYouState {
    name: string,
    socialProfiles: SocialMediaDataType[],
    socialProfileIDs: number[],
    customLinks: CustomProfileType[],
    data: any,
    loading: boolean,
    error: errorType,
    validated: boolean
}

export type CustomProfileType = {
    id: string,
    title: string,
    url: string,
}

type errorType = {
    message: string;
    nameError: string;
    profileLinkEmptyError: string;
    customLinkEmptyError: string;
}

const noError: errorType = {
    message: '',
    nameError: '',
    customLinkEmptyError: '',
    profileLinkEmptyError: ''
}

const initialState: AboutYouState = {
    name: '',
    data: null,
    loading: false,
    error: noError,
    socialProfiles: [],
    socialProfileIDs: [],
    customLinks: [{
        id: nanoid(),
        title: '',
        url: '',
    }],
    validated: false
};

export const addProfileLinks = createAsyncThunk<any>(
    'api/addProfileLinks',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: AboutYouState = state.aboutYou;

        let updateName = '';
        if (stateValue.name != '') {
            updateName = stateValue.name;
        }
        else {
            const val = await LocalStorage.GetData(StorageKeys.NAME);
            if (val != null) {
                updateName = val;
            }
        }

        type LocalSocialMediaDataType = {
            title: string;
            link: string;
        }
        let localProfiles: LocalSocialMediaDataType[] = [];
        if (stateValue.socialProfiles.length) {
            localProfiles = stateValue.socialProfiles.map((profile) => {
                let localProfile = {
                    title: profile.title,
                    link: profile.link
                };
                return localProfile;
            });
        }

        type LocalCustomLinkDataType = {
            title: string;
            url: string;
        }
        let localLinks: LocalCustomLinkDataType[] = [];
        if (stateValue.customLinks.length) {
            localLinks = stateValue.customLinks.map((profile) => {
                let localLink = {
                    title: profile.title,
                    url: profile.url
                };
                return localLink;
            });
            localLinks = localLinks.filter((lcoalLink) => lcoalLink != undefined)
        }

        let values = {
            "setupStage": 2,
            "name": updateName,
            "profileUrls": localLinks,
            "socialLinks": localProfiles,
        };

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

            if (name != '') {
                MoESetName(name);
            }

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

export const skipAboutYou = createAsyncThunk<any>(
    'api/skipAboutYou',
    async (_, thunkAPI) => {
        let values = { "setupStage": 2 };

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

            if (name != '') {
                MoESetName(name);
            }

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

export const aboutYouSlice = createSlice({
    name: 'aboutYou',
    initialState: initialState,
    reducers: {
        addName: (state, action) => {
            state.name = action.payload;
        },
        addSocialProfile: (state, action) => {
            const profile: SocialMediaDataType = action.payload;
            state.socialProfiles.push(profile);
            state.socialProfileIDs.push(profile.id);
        },
        removeSocialProfile: (state, action) => {
            state.socialProfiles = state.socialProfiles.filter((profile) => profile.id !== action.payload.id)
            state.socialProfileIDs = state.socialProfileIDs.filter((id) => id !== action.payload.id)
        },
        updateSocialProfile: (state, action) => {
            let profiles: SocialMediaDataType[];
            profiles = state.socialProfiles.map((profile) => {
                let localProfile: SocialMediaDataType = profile;
                if (action.payload.id == profile.id) {
                    localProfile = action.payload;
                }
                return localProfile;
            });
            state.socialProfiles = profiles;
        },
        addCustomLink: (state) => {
            const url: CustomProfileType = {
                id: nanoid(),
                title: '',
                url: '',
            }
            state.customLinks.push(url);
        },
        removeCustomLink: (state, action) => {
            state.customLinks = state.customLinks.filter((link) => link.id !== action.payload.id)
        },
        updateCustomLink: (state, action) => {
            let links: CustomProfileType[];
            links = state.customLinks.map((link) => {
                let localLink: CustomProfileType = link;
                if (action.payload.id == localLink.id) {
                    localLink = action.payload;
                }
                return localLink;
            });
            state.customLinks = links;
        },
        clearData: (state) => {
            state.data = null;
            state.name = '';
            state.loading = false
            state.error = noError
            state.socialProfiles = []
            state.socialProfileIDs = []
            state.customLinks = [{
                id: nanoid(),
                title: '',
                url: '',
            }]
            state.validated = false
        },
        checkValidation: (state) => {
            let emptyProfileLinks: boolean = false;
            let emptyCustomLinks: boolean = false;
            if (state.socialProfiles.length != 0) {
                state.socialProfiles.forEach((profile) => {
                    if (profile.link == '') {
                        emptyProfileLinks = true;
                    }
                })
                if (emptyProfileLinks) {
                    state.error.profileLinkEmptyError = 'All links values must be present'
                } else {
                    state.error.profileLinkEmptyError = ''
                }
            }
            if (state.customLinks.length != 0) {
                state.customLinks.forEach((profile) => {
                    if (profile.title == '' || profile.url == '') {
                        emptyCustomLinks = true;
                    }
                })
                if (emptyCustomLinks) {
                    state.error.customLinkEmptyError = 'All links values must be present'
                } else {
                    state.error.customLinkEmptyError = ''
                }
            }
            if ((state.name != '') && !emptyProfileLinks && !emptyCustomLinks) {
                state.validated = true
                state.error = noError
            }
            else {
                if (state.name == '') {
                    state.error.nameError = 'Name is required'
                } else {
                    state.error.nameError = ''
                }
                state.validated = false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProfileLinks.pending, (state) => {
            state.loading = true;
            state.validated = false;
        });
        builder.addCase(addProfileLinks.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = noError;
        });
        builder.addCase(addProfileLinks.rejected, (state, action) => {
            state.loading = false;
            state.error.message = '';
            state.data = null;
        });
        builder.addCase(skipAboutYou.pending, (state) => {
            state.loading = true;
            state.validated = false;
        });
        builder.addCase(skipAboutYou.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = noError;
        });
        builder.addCase(skipAboutYou.rejected, (state, action) => {
            state.loading = false;
            state.error.message = '';
            state.data = null;
        });
    }
});

export const { addName, addSocialProfile, removeSocialProfile, updateSocialProfile, addCustomLink, removeCustomLink, updateCustomLink, clearData, checkValidation } = aboutYouSlice.actions;

export default aboutYouSlice.reducer;