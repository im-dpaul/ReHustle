import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";
import { ValidateEmail } from "../../../utils";

export interface SigninState {
    data: any,
    loading: boolean,
    error: errorType,
    emailAddress: string,
    password: string,
    rememberMe: boolean,
    setupStage: number,
    validated: boolean
}

type errorType = {
    message: string;
    emailError: string;
    passwordError: string;
}

const noError: errorType = {
    message: '',
    emailError: '',
    passwordError: '',
}

const initialState: SigninState = {
    data: null,
    loading: false,
    error: noError,
    emailAddress: "",
    password: "",
    rememberMe: false,
    setupStage: -2,
    validated: false
};

export const signIn = createAsyncThunk<any>(
    'api/signIn',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: SigninState = state.signIn;

        const emailAddress = stateValue.emailAddress;
        const password = stateValue.password;

        const authCredentials = {
            "email": emailAddress,
            "password": password
        };
        let data = null;
        try {
            const response = await postMethod('/auth/signin', authCredentials);
            data = response.data.result;

            // if (stateValue.rememberMe == true) {
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
            // }
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
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
        clearData: (state) => {
            state.data = null
            state.loading = false
            state.error = noError
            state.emailAddress = ""
            state.password = ""
            state.rememberMe = false
            state.setupStage = -2,
                state.validated = false
        },
        checkValidation: (state) => {
            let isEmail = ValidateEmail(state.emailAddress)
            if (isEmail && (state.password != '')) {
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
                state.validated = false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
            state.validated = false
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.setupStage = action.payload.setupStage;
            state.data = action.payload;
        });
        builder.addCase(signIn.rejected, (state, action) => {
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
            state.setupStage = -1;
        });
    },
});

export const { setEmailAddress, setPassword, setRememberMe, clearData, checkValidation } = signInSlice.actions;

export default signInSlice.reducer;