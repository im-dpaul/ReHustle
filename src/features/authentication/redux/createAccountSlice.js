import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postMethod } from '../../../core/services/NetworkServices';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageDataTypes from '../../../constants/StorageDataTypes';

const initialState = {
    data: null,
    loading: false,
    error: null,
    emailAddress: "",
    password: "",
    userName: "",
}

export const createAccount = createAsyncThunk('api/createAccount', async (arg, thunkAPI) => {
    const state = thunkAPI.getState().createAccount;
    const emailAddress = state.emailAddress;
    const password = state.password;
    const userName = state.userName;

    const authCredentials = {
        "email": emailAddress,
        "password": password,
        "userName": userName,
    };
    let data = null;
    // try {
    const response = await postMethod('/auth/signup', authCredentials);
    data = response.data;

    let name = data.result.name ?? "";
    let token = data.result.token ?? "";
    let email = data.result.email ?? "";
    let userId = data.result.userName ?? "";
    let profileImage = data.result.profileImage ?? "";

    await LocalStorage.SetData(StorageDataTypes.TOKEN, token);
    await LocalStorage.SetData(StorageDataTypes.EMAIL, email);
    await LocalStorage.SetData(StorageDataTypes.NAME, name);
    await LocalStorage.SetData(StorageDataTypes.USER_NAME, userId);
    await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, profileImage);

    // } catch (e) {
    //     console.log('Error -> ', e);
    // }
    return data;
});

export const createAccountSlice = createSlice({
    name: 'createAccount',
    initialState: initialState,
    reducers: {
        setEmailAddress: (state, action) => {
            state.emailAddress = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        clearData: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(createAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
})

export const { setEmailAddress, setPassword, setUserName, clearData } = createAccountSlice.actions;

export default createAccountSlice.reducer;