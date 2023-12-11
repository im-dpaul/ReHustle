import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postMethod } from '../../../core/services/NetworkServices';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageKeys from '../../../constants/StorageKeys';
import { MoEAppUpdate, MoESetEmail, MoESetUniqueID, ValidateEmail } from '../../../utils';
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import DeviceInfo from 'react-native-device-info';

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
    googleSignUpError: string
}

const noError: errorType = {
    message: '',
    emailError: '',
    passwordError: '',
    userNameError: '',
    googleSignUpError: ''
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

export const googleSignup = createAsyncThunk<any>(
    'api/googleSignup',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: CreateAccountState = state.createAccount;

        let data = null;
        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: '91194681066-qk09a4hci98arje9v0hfltn8ut0innia.apps.googleusercontent.com',
            iosClientId: '91194681066-3jhk1mldv66u3jqf17jj1p7ag6pn54l0.apps.googleusercontent.com',
        });
        const hasPlayServices = await GoogleSignin.hasPlayServices();
        let errors: errorType = {
            userNameError: '',
            emailError: '',
            googleSignUpError: '',
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

                    const url = '/auth/social/g/signup'
                    const userId = stateValue.userName;
                    const payload = {
                        "access_token": token.accessToken,
                        "userName": userId
                    }

                    const response = await postMethod(url, payload);
                    data = response.data.result;

                    let name = data.name ?? "";
                    let userToken = data.token ?? "";
                    let email = data.email ?? "";
                    let userName = data.userName ?? "";
                    let profileImage = data.profileImage ?? "";
                    let id = data._id ?? "";

                    if (userName != '') {
                        MoESetUniqueID(userName);
                    }
                    if (email != '') {
                        MoESetEmail(email);
                    }

                    let currentVersion = DeviceInfo.getVersion();
                    MoEAppUpdate(false);
                    await LocalStorage.SetData(StorageKeys.APP_VERSION, currentVersion);

                    await LocalStorage.SetData(StorageKeys.TOKEN, userToken);
                    await LocalStorage.SetData(StorageKeys.EMAIL, email);
                    await LocalStorage.SetData(StorageKeys.NAME, name);
                    await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
                    await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);
                    await LocalStorage.SetData(StorageKeys.ID, id);

                    return data;
                }
                errors.googleSignUpError = 'Something went wrong.'
                return thunkAPI.rejectWithValue(errors)
            }
            catch (e: any) {
                if (e.code === statusCodes.SIGN_IN_CANCELLED) {
                    errors.googleSignUpError = 'Sign in cancelled.'
                } else if (e.code === statusCodes.IN_PROGRESS) {
                    errors.googleSignUpError = 'Sign in inprogress already.'
                } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    errors.googleSignUpError = 'Google Play services not available or outdated.'
                } else if (e.hasOwnProperty('message')) {
                    errors.message = e.message
                } else {
                    errors.message = 'Something went wrong.'
                }
                return thunkAPI.rejectWithValue(errors)
            }
        } else {
            errors.googleSignUpError = 'Google Play services not available.'
            return thunkAPI.rejectWithValue(errors)
        }
    }
);

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

            if (userName != '') {
                MoESetUniqueID(userName);
            }
            if (email != '') {
                MoESetEmail(email);
            }

            let currentVersion = DeviceInfo.getVersion();
            MoEAppUpdate(false);
            await LocalStorage.SetData(StorageKeys.APP_VERSION, currentVersion);

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
        userNameValidation: (state) => {
            if (state.userName == '') {
                state.error.userNameError = 'Username is required'
            }
            else {
                state.error.userNameError = ''
            }
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
            state.error = noError
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
            state.data = null
        });
        builder.addCase(googleSignup.pending, (state) => {
            state.loading = true;
            state.validated = false
            state.error = noError
        });
        builder.addCase(googleSignup.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = noError
        });
        builder.addCase(googleSignup.rejected, (state, action) => {
            const errors: any = action.payload
            if (errors.message != '') {
                state.error.message = errors.message
            }
            if (errors.googleSignUpError != '') {
                state.error.googleSignUpError = errors.googleSignUpError
            }
            state.loading = false;
            state.data = null
        });
    },
})

export const { setEmailAddress, setPassword, setUserName, clearData, checkValidation, userNameValidation } = createAccountSlice.actions;

export default createAccountSlice.reducer;