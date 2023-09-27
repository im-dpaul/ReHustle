import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";

const initialState = {
    data: null,
    loading: false,
    error: null,
    emailAddress: "",
    password: "",
    rememberMe: false,
    setupStage: null,
};

export const signIn = createAsyncThunk('api/signIn', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().signIn;
    const emailAddress = state.emailAddress;
    const password = state.password;

    const authCredentials = {
        "email": emailAddress,
        "password": password
    };
    let data = null;
    // try {
    const response = await postMethod('/auth/signin', authCredentials);
    data = response.data;

    if (state.rememberMe == true) {
        let name = data.result.name ?? "";
        let token = data.result.token ?? "";
        let email = data.result.email ?? "";
        let userName = data.result.userName ?? "";
        let profileImage = data.result.profileImage ?? "";
        let id = data.result._id ?? "";

        await LocalStorage.SetData(StorageDataTypes.TOKEN, token);
        await LocalStorage.SetData(StorageDataTypes.EMAIL, email);
        await LocalStorage.SetData(StorageDataTypes.NAME, name);
        await LocalStorage.SetData(StorageDataTypes.USER_NAME, userName);
        await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);
        await LocalStorage.SetData(StorageDataTypes.ID, id);
    }
    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const signInSlice = createSlice({
    name: 'signIn',
    initialState: initialState,
    reducers: {
        setEmailAddress: (state, action) => {
            state.emailAddress = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        },
        clearData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.setupStage = `${action.payload.result.setupStage}`;
            state.data = action.payload;
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.setupStage = '';
        });
    },
});

export const { setEmailAddress, setPassword, setRememberMe, clearData } = signInSlice.actions;

export default signInSlice.reducer;