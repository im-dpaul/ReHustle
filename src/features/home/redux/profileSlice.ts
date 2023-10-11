import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import StorageKeys from "../../../constants/StorageKeys";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import { SocialProfileDataType } from "../../../data/constants/AllSocialProfileType";

export interface ProfileState {
    data: any;
    error: errorType;
    loading: boolean;
    buttonLoading: boolean;
    name: string;
    link: string;
    about: string;
    profileImage: string;
    bannerImage: string;
    validated: boolean;
    showSnackbar: boolean;
    socialProfileIDs: string[];
    socialProfiles: SocialProfileDataType[];
    customProfiles: CustomProfileType[]
}

export type CustomProfileType = {
    id: string,
    title: string,
    url: string,
}

type errorType = {
    nameError: string;
    linkError: string;
    message: string;
    profileLinkEmptyError: string;
    customLinkEmptyError: string;
}

const noError: errorType = {
    nameError: '',
    linkError: '',
    message: '',
    profileLinkEmptyError: '',
    customLinkEmptyError: ''
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    buttonLoading: false,
    error: noError,
    name: '',
    link: '',
    about: '',
    profileImage: '',
    bannerImage: '',
    showSnackbar: false,
    validated: false,
    socialProfileIDs: [],
    socialProfiles: [],
    customProfiles: []
};

export const getCurrentUserData = createAsyncThunk<any>(
    'api/currentUserData',
    async (_, thunkAPI) => {
        let data = null;
        try {
            const response = await authenticatedGetMethod('/user/currentUser');
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const updateProfile = createAsyncThunk<any>(
    'api/updateProfile',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: ProfileState = state.profile;

        let data = null;
        let bannerImg = ''
        let profileImg = ''
        if (stateValue.bannerImage == undefined) {
            bannerImg = '';
        }
        else {
            bannerImg = stateValue.bannerImage
        }
        if (stateValue.profileImage == undefined) {
            profileImg = '';
        }
        else {
            profileImg = stateValue.profileImage
        }
        const values = {
            "name": stateValue.name,
            "userName": stateValue.link,
            "description": stateValue.about == undefined ? '' : stateValue.about,
            "profileImage": stateValue.profileImage == '' ? null : stateValue.profileImage,
            "profileUrls": stateValue.customProfiles,
            "socialLinks": stateValue.socialProfiles,
            "appearance": `{\"color\":\"\",\"bannerImage\":\"${bannerImg}\",\"profileImage\":\"${profileImg}\",\"buttonRounded\":\"\"}`
        };

        try {
            const response = await authenticatedPutMethod('/user/update', values);
            data = response.data.result;

            let name = data.name ?? "";
            let userName = data.userName ?? "";
            let profileImage = data.profileImage ?? "";

            await LocalStorage.SetData(StorageKeys.NAME, name);
            await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

const getPlaceholderValue = (title: string) => {
    let placeholder: string = '';
    if (title == 'appleMusic') {
        placeholder = 'Apple Music'
    } else if (title == 'productHunt') {
        placeholder = 'Product Hunt'
    } else {
        let ch = title.charAt(0);
        placeholder = ch.toUpperCase() + title.substring(1);
    }
    return placeholder
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateLink: (state, action) => {
            state.link = action.payload;
        },
        updateAbout: (state, action) => {
            state.about = action.payload;
        },
        setValidation: (state) => {
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
            if (state.customProfiles.length != 0) {
                state.customProfiles.forEach((profile) => {
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
            if ((state.name != '') && (state.link != '') && !emptyProfileLinks && !emptyCustomLinks) {
                state.validated = true
                state.error = noError
            }
            else {
                if (state.name == '') {
                    state.error.nameError = 'Name is required'
                } else {
                    state.error.nameError = ''
                }
                if (state.link == '') {
                    state.error.linkError = 'Username is required'
                } else {
                    state.error.linkError = ''
                }
                state.validated = false
            }
        },
        setSnackbar: (state, action) => {
            state.showSnackbar = action.payload
        },
        addSocialProfile: (state, action) => {
            const profile: SocialProfileDataType = action.payload;
            state.socialProfiles.push(profile);
            state.socialProfileIDs.push(action.payload.title);
        },
        removeSocialProfile: (state, action) => {
            const title: string = action.payload;
            state.socialProfiles = state.socialProfiles.filter((profile) => profile.title !== title)
            state.socialProfileIDs = state.socialProfileIDs.filter((ID) => ID !== title)
        },
        updateSocialProfile: (state, action) => {
            let profiles: SocialProfileDataType[];
            profiles = state.socialProfiles.map((profile) => {
                let localProfile: SocialProfileDataType = profile;
                if (action.payload.title == profile.title) {
                    localProfile = action.payload;
                }
                return localProfile;
            });
            state.socialProfiles = profiles;
        },
        addCustomProfile: (state) => {
            const profile: CustomProfileType = {
                id: nanoid(),
                title: '',
                url: '',
            }
            state.customProfiles.push(profile);
        },
        removeCustomProfile: (state, action) => {
            state.customProfiles = state.customProfiles.filter((profile) => profile.id !== action.payload.id)
        },
        updateCustomProfile: (state, action) => {
            const profiles: CustomProfileType[] = state.customProfiles.map((profile) => {
                let localProfile: CustomProfileType = profile;
                if (action.payload.id == localProfile.id) {
                    localProfile = action.payload;
                }
                return localProfile;
            });
            state.customProfiles = profiles;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUserData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUserData.fulfilled, (state, action) => {
            if (action.payload.appearance != null) {
                const appearance: string = action.payload.appearance;
                if (appearance.includes('bannerImage')) {
                    const dataList = appearance.split(',');
                    dataList.forEach((data) => {
                        if (data.includes('bannerImage')) {
                            let val = data.split('"')
                            state.bannerImage = val[3];
                        }
                    })
                }
                else {
                    state.bannerImage = '';
                }
            }
            else {
                state.bannerImage = '';
            }

            const customProfilesLocalData: { addedOn: string, url: string, title: string }[] = action.payload.profileUrls;
            let customProfilesList: CustomProfileType[] = []
            if (customProfilesLocalData.length) {
                customProfilesLocalData.forEach((profile) => {
                    let localSocialProfile: CustomProfileType = {
                        id: nanoid(),
                        title: profile.title,
                        url: profile.url,
                    };
                    customProfilesList.push(localSocialProfile);
                })
                state.customProfiles = customProfilesList;
            }

            const socialLinksLocalData: { addedOn: string, link: string, title: string }[] = action.payload.socialLinks;
            let socialProfilesList: SocialProfileDataType[] = []
            if (socialLinksLocalData.length) {
                socialLinksLocalData.forEach((profile) => {
                    let localSocialProfile: SocialProfileDataType = {
                        title: profile.title.toLowerCase(),
                        placeholder: getPlaceholderValue(profile.title),
                        link: profile.link,
                    };
                    socialProfilesList.push(localSocialProfile);
                    state.socialProfileIDs.push(profile.title.toLowerCase())
                })
                state.socialProfiles = socialProfilesList;
            }

            state.name = action.payload.name;
            state.link = action.payload.userName;
            state.about = action.payload.description;
            state.profileImage = action.payload.profileImage;
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getCurrentUserData.rejected, (state, action) => {
            state.loading = false;
            // state.error = action.payload;
        });
        builder.addCase(updateProfile.pending, (state) => {
            state.buttonLoading = true;
            state.data = null;
            state.error = noError;
            state.validated = false
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.buttonLoading = false;
            state.data = action.payload;
            state.error = noError;
            state.showSnackbar = true;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.buttonLoading = false;
            const error: any = action.payload;

            if (error.hasOwnProperty('errors')) {
                if (error.errors.hasOwnProperty('name')) {
                    state.error.nameError = error.errors.name
                }
                if (error.errors.hasOwnProperty('userName')) {
                    state.error.linkError = error.errors.userName
                }
            }
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
                if (error.message.includes('username')) {
                    state.error.linkError = error.message
                }
            }
            state.data = null;
        });
    },
});

export const {
    updateName,
    updateLink,
    updateAbout,
    setSnackbar,
    setValidation,
    addSocialProfile,
    removeSocialProfile,
    updateSocialProfile,
    addCustomProfile,
    removeCustomProfile,
    updateCustomProfile
} = profileSlice.actions;

export default profileSlice.reducer;