import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postMethod } from '../../../core/services/NetworkServices';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageKeys from '../../../constants/StorageKeys';
import { ValidateEmail } from '../../../utils';

export interface CreateAccountState {
    data: any,
    loading: boolean,
    error: errorType,
    emailAddress: string,
    password: string,
    userName: string,
    validated: boolean
}

type errorType = {
    message: string;
    emailError: string;
    passwordError: string;
    userNameError: string;
}

const noError: errorType = {
    message: '',
    emailError: '',
    passwordError: '',
    userNameError: ''
}

const initialState: CreateAccountState = {
    data: null,
    loading: false,
    error: noError,
    emailAddress: "",
    password: "",
    userName: "",
    validated: false
}

export const createAccount = createAsyncThunk<any>(
    'api/createAccount',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: CreateAccountState = state.createAccount;

        const emailAddress = stateValue.emailAddress;
        const password = stateValue.password;
        const userName = stateValue.userName;

        const authCredentials = {
            "email": emailAddress,
            "password": password,
            "userName": userName,
        };
        let data = null;
        try {
            const response = await postMethod('/auth/signup', authCredentials);
            data = response.data.result;

            let name = data.name ?? "";
            let token = data.token ?? "";
            let email = data.email ?? "";
            let userName = data.userName ?? "";
            let profileImage = data.profileImage ?? "";
            let id = data._id ?? "";

            await LocalStorage.SetData(StorageKeys.TOKEN, token);
            await LocalStorage.SetData(StorageKeys.EMAIL, email);
            await LocalStorage.SetData(StorageKeys.NAME, name);
            await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);
            await LocalStorage.SetData(StorageKeys.ID, id);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
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
        clearData: (state) => {
            state.data = null
            state.loading = false
            state.error = noError
            state.emailAddress = ""
            state.password = ""
            state.userName = ""
            state.validated = false
        },
        checkValidation: (state) => {
            let isEmail = ValidateEmail(state.emailAddress)
            if (isEmail && (state.password != '') && (state.userName != '')) {
                state.validated = true
                state.error = noError
            }
            else {
                if (state.emailAddress == '') {
                    state.error.emailError = 'Email is required'
                } else if (!isEmail) {
                    state.error.emailError = 'Please provide a valid Email Address'
                } else {
                    state.error.emailError = ''
                }
                if (state.password == '') {
                    state.error.passwordError = 'Password is required'
                } else {
                    state.error.passwordError = ''
                }
                if (state.userName == '') {
                    state.error.userNameError = 'Username is required'
                } else {
                    state.error.userNameError = ''
                }
                state.validated = false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
            state.validated = false
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(createAccount.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('errors')) {
                if (error.errors.hasOwnProperty('email')) {
                    state.error.emailError = error.errors.email
                }
                if (error.errors.hasOwnProperty('password')) {
                    state.error.passwordError = error.errors.password
                }
            } else if (error.hasOwnProperty('message')) {
                state.error.message = error.message
                if (state.error.message.toLowerCase().includes('password')) {
                    state.error.passwordError = error.message
                    state.error.message = ''
                }
                if (state.error.message.toLowerCase().includes('email')) {
                    state.error.emailError = error.message
                    state.error.message = ''
                }
            }
            state.loading = false;
        });
    },
})

export const { setEmailAddress, setPassword, setUserName, clearData, checkValidation } = createAccountSlice.actions;

export default createAccountSlice.reducer;