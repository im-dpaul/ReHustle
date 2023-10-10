import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPutMethod } from "../../../core/services/NetworkServices";
import StorageDataTypes from "../../../constants/StorageDataTypes";
import LocalStorage from "../../../data/local_storage/LocalStorage";

interface ProfileState {
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
}

type errorType = {
    nameError: string;
    linkError: string;
    message: string;
}

const noError: errorType = {
    nameError: '',
    linkError: '',
    message: ''
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
    validated: false
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
            "profileUrls": [],
            "socialLinks": [],
            "appearance": `{\"color\":\"\",\"bannerImage\":\"${bannerImg}\",\"profileImage\":\"${profileImg}\",\"buttonRounded\":\"\"}`
        };

        try {
            const response = await authenticatedPutMethod('/user/update', values);
            data = response.data.result;

            let name = data.name ?? "";
            let userName = data.userName ?? "";
            let profileImage = data.profileImage ?? "";

            await LocalStorage.SetData(StorageDataTypes.NAME, name);
            await LocalStorage.SetData(StorageDataTypes.USER_NAME, userName);
            await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);

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
            if ((state.name != '') && (state.link != '')) {
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

export const { updateName, updateLink, updateAbout, setSnackbar, setValidation } = profileSlice.actions;

export default profileSlice.reducer;