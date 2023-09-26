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
};

export const signIn = createAsyncThunk('api/signIn', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().signIn;
    const emailAddress = state.emailAddress;
    const password = state.password;

    const authCredentials = {
        "email": emailAddress,
        "password": password
    };
    console.log("abcde", authCredentials);
    let data = null;
    // try {
    const response = await postMethod('/auth/signin', authCredentials);
    data = response.data;

    const save = await LocalStorage.GetData(StorageDataTypes.REMEMBER_ME);

    if (save == 'true') {
        let name = data.result.name ?? "";
        let token = data.result.token ?? "";
        let email = data.result.email ?? "";
        let userName = data.result.userName ?? "";
        let profileImage = data.result.profileImage ?? "";

        await LocalStorage.SetData(StorageDataTypes.TOKEN, token);
        await LocalStorage.SetData(StorageDataTypes.EMAIL, email);
        await LocalStorage.SetData(StorageDataTypes.NAME, name);
        await LocalStorage.SetData(StorageDataTypes.USER_NAME, userName);
        await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);
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
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setEmailAddress, setPassword } = signInSlice.actions;

export default signInSlice.reducer;