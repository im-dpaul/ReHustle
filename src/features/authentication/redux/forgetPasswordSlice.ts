import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postMethod } from "../../../core/services/NetworkServices";
import { ValidateEmail } from "../../../utils";

export interface ForgetPasswordState {
    data: any,
    loading: boolean,
    error: errorType,
    emailAddress: string,
    validated: boolean,
    snackbarVisiblity: boolean
    snackbarMessage: string
}

type errorType = {
    message: string;
    emailError: string;
}

const noError: errorType = {
    message: '',
    emailError: '',
}

const initialState: ForgetPasswordState = {
    data: null,
    loading: false,
    error: noError,
    emailAddress: "",
    validated: false,
    snackbarVisiblity: false,
    snackbarMessage: ''
};

export const resetPassword = createAsyncThunk<any>(
    'resetPassword',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: ForgetPasswordState = state.forgetPassword;

        const emailAddress = stateValue.emailAddress;
        const authCredentials = { "email": emailAddress }

        let data = null;
        try {
            const response = await postMethod('/auth/resetPassword', authCredentials);
            data = response.data;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const forgetPasswordSlice = createSlice({
    name: 'forgetPassword',
    initialState: initialState,
    reducers: {
        setEmailAddress: (state, action) => {
            state.emailAddress = action.payload;
        },
        checkValidation: (state) => {
            if (state.emailAddress != '') {
                let isEmail = ValidateEmail(state.emailAddress)
                if (isEmail) {
                    state.error.emailError = ''
                    state.validated = true
                }
                else {
                    state.error.emailError = 'Please provide a valid Email Address'
                    state.validated = false
                }
            }
            else {
                state.error.emailError = 'Email Address is required'
                state.validated = false
            }
        },
        setSnackbar: (state, action) => {
            const { visibility, message } = action.payload;
            state.snackbarVisiblity = visibility
            if (visibility == true) {
                state.snackbarMessage = message
            }
            else {
                state.snackbarMessage = ''
            }
        },
        clearData: (state) => {
            state.data = null
            state.loading = false
            state.error = noError
            state.emailAddress = ""
            state.validated = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true
            state.validated = false
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = noError
            state.snackbarVisiblity = true
            state.snackbarMessage = 'Reset password link sent successfully'
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            const error: any = action.payload
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.loading = false
            state.data = null
        });
    }
})

export const { setEmailAddress, clearData, checkValidation, setSnackbar } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;