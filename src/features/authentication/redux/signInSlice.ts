import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";
import { ValidateEmail } from "../../../utils";
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';

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
    googleSigninError: string;
}

const noError: errorType = {
    message: '',
    emailError: '',
    passwordError: '',
    googleSigninError: '',
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

export const googleSignin = createAsyncThunk<any>(
    'api/googleSignin',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: SigninState = state.signIn;

        let data = null;
        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: '91194681066-qk09a4hci98arje9v0hfltn8ut0innia.apps.googleusercontent.com',
        });
        const hasPlayServices = await GoogleSignin.hasPlayServices();
        let errors: errorType = {
            emailError: '',
            googleSigninError: '',
            message: '',
            passwordError: ''
        };

        if (hasPlayServices) {
            try {
                await GoogleSignin.signOut()
                const user: User = await GoogleSignin.signIn()
                if (user != null) {
                    const token: { idToken: string; accessToken: string } = await GoogleSignin.getTokens()

                    // console.log('Access Token -', token.accessToken);

                    const url = '/auth/social/g/signin'
                    const payload = { "access_token": token.accessToken }

                    const response = await postMethod(url, payload);
                    data = response.data.result;

                    let name = data.name ?? "";
                    let userToken = data.token ?? "";
                    let email = data.email ?? "";
                    let userName = data.userName ?? "";
                    let profileImage = data.profileImage ?? "";
                    let id = data._id ?? "";

                    await LocalStorage.SetData(StorageKeys.TOKEN, userToken);
                    await LocalStorage.SetData(StorageKeys.EMAIL, email);
                    await LocalStorage.SetData(StorageKeys.NAME, name);
                    await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
                    await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);
                    await LocalStorage.SetData(StorageKeys.ID, id);

                    return data;
                }
                errors.googleSigninError = 'Something went wrong.'
                return thunkAPI.rejectWithValue(errors)
            }
            catch (e: any) {
                if (e.code === statusCodes.SIGN_IN_CANCELLED) {
                    errors.googleSigninError = 'Sign in cancelled.'
                } else if (e.code === statusCodes.IN_PROGRESS) {
                    errors.googleSigninError = 'Sign in inprogress already.'
                } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    errors.googleSigninError = 'Google Play services not available or outdated.'
                } else if (e.hasOwnProperty('message')) {
                    errors.message = e.message
                } else {
                    errors.message = 'Something went wrong.'
                }
                return thunkAPI.rejectWithValue(errors)
            }
        } else {
            errors.googleSigninError = 'Google Play services not available.'
            return thunkAPI.rejectWithValue(errors)
        }
    }
);

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
            state.setupStage = -2
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
            state.error = noError
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
        builder.addCase(googleSignin.pending, (state) => {
            state.loading = true;
            state.validated = false
        });
        builder.addCase(googleSignin.fulfilled, (state, action) => {
            state.loading = false;
            state.setupStage = action.payload.setupStage;
            state.data = action.payload;
            state.error = noError
        });
        builder.addCase(googleSignin.rejected, (state, action) => {
            const errors: any = action.payload
            if (errors.message != '') {
                state.error.message = errors.message
            }
            if (errors.googleSigninError != '') {
                state.error.googleSigninError = errors.googleSigninError
            }
            state.loading = false;
            state.data = null
        });
    },
});

export const { setEmailAddress, setPassword, setRememberMe, clearData, checkValidation } = signInSlice.actions;

export default signInSlice.reducer;