import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticatedPostMethod } from "../../../core/services/NetworkServices";

type errorType = {
    nameError: string;
    ifscError: string;
    accountNoError: string;
    verifyAccountNoError: string;
    message: string;
}

interface SettingsState {
    data: any;
    error: errorType;
    loading: boolean;
    accountName: string;
    ifsc: string;
    accountNumber: string;
    verifyAccountNumber: string;
    emailAddress: string;
    validated: boolean;
    showSnackbar: boolean;
}

const noError: errorType = {
    nameError: '',
    ifscError: '',
    accountNoError: '',
    verifyAccountNoError: '',
    message: ''
}

const initialState: SettingsState = {
    data: null,
    error: noError,
    loading: false,
    accountName: '',
    accountNumber: '',
    verifyAccountNumber: '',
    ifsc: '',
    emailAddress: '',
    validated: false,
    showSnackbar: false
}

export const updateBankDetails = createAsyncThunk<any>(
    'api/updateBankDetails',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: SettingsState = state.settings;

        let data = null
        let values = {
            "accountName": stateValue.accountName,
            "ifsc": stateValue.ifsc,
            "accountNumber": stateValue.accountNumber
        }

        try {
            const response = await authenticatedPostMethod('/bank/details/update', values);
            data = response.data.result;

            return data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e)
        }

    }
)

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setEmailAddress: (state, action) => {
            state.emailAddress = action.payload
        },
        setName: (state, action) => {
            state.accountName = action.payload
        },
        setIFSC: (state, action) => {
            state.ifsc = action.payload
        },
        setAccNo: (state, action) => {
            state.accountNumber = action.payload
        },
        setVerifyAccNo: (state, action) => {
            state.verifyAccountNumber = action.payload
        },
        setValidation: (state) => {
            if ((state.accountName != '') && (state.ifsc != '') && (state.accountNumber != '') && (state.accountNumber == state.verifyAccountNumber)) {
                state.validated = true
                state.error = noError
            }
            else {
                if (state.accountName == '') {
                    state.error.nameError = 'Name is required'
                } else {
                    state.error.nameError = ''
                }
                if (state.ifsc == '') {
                    state.error.ifscError = 'IFSC Code is required'
                } else {
                    state.error.ifscError = ''
                }
                if (state.accountNumber == '') {
                    state.error.accountNoError = 'Account Number is required'
                } else {
                    state.error.accountNoError = ''
                }
                if (state.verifyAccountNumber == '') {
                    state.error.verifyAccountNoError = 'Account Number is required'
                } else {
                    state.error.verifyAccountNoError = ''
                }
                if (state.accountNumber != '') {
                    if (state.accountNumber != state.verifyAccountNumber) {
                        state.error.verifyAccountNoError = 'Account Number is not matching'
                    } else {
                        state.error.verifyAccountNoError = ''
                    }
                }
                state.validated = false
            }
        },
        setSnackbar: (state, action) => {
            state.showSnackbar = action.payload
        },
        clearData: (state) => {
            state.data = null
            state.error = noError
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateBankDetails.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = noError;
            state.validated = false
        });
        builder.addCase(updateBankDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = noError;
            state.showSnackbar = true;
        });
        builder.addCase(updateBankDetails.rejected, (state, action) => {
            state.loading = false;
            const error: any = action.payload;

            if (error.hasOwnProperty('errors')) {
                if (error.errors.hasOwnProperty('ifsc')) {
                    state.error.ifscError = error.errors.ifsc
                }
                if (error.errors.hasOwnProperty('accountNumber')) {
                    state.error.accountNoError = error.errors.accountNumber
                }
                if (error.errors.hasOwnProperty('accountName')) {
                    state.error.nameError = error.errors.ifsc
                }
                if (error.errors.hasOwnProperty('message')) {
                    state.error.message = error.message
                }
            } else if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.data = null;
        });
    }
})

export const { setEmailAddress, setName, setIFSC, setAccNo, setVerifyAccNo, setValidation, clearData, setSnackbar } = settingsSlice.actions

export default settingsSlice.reducer