import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPutMethod } from "../../../core/services/NetworkServices";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageKeys from "../../../constants/StorageKeys";

export interface FinishAccountCreationState {
    data: any,
    error: ErrorType,
    loading: boolean,
}

type ErrorType = {
    message: string;
}

const noError: ErrorType = {
    message: '',
}

const initialState: FinishAccountCreationState = {
    data: null,
    error: noError,
    loading: false,
}

export const finishCreation = createAsyncThunk<any>(
    'api/finishCreation',
    async (_, thunkAPI) => {

        let values = { "setupStage": 4 }
        const url = `/user/update`
        let data = null;

        try {
            const response = await authenticatedPutMethod(url, values);
            data = response.data.result;

            let name = data.name ?? "";
            let email = data.email ?? "";
            let userName = data.userName ?? "";
            let profileImage = data.profileImage ?? "";
            let id = data._id ?? "";

            await LocalStorage.SetData(StorageKeys.EMAIL, email);
            await LocalStorage.SetData(StorageKeys.NAME, name);
            await LocalStorage.SetData(StorageKeys.USER_NAME, userName);
            await LocalStorage.SetData(StorageKeys.PROFILE_IMAGE, profileImage);
            await LocalStorage.SetData(StorageKeys.ID, id);

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const finishAccountCreationSlice = createSlice({
    name: 'finishAccountCreation',
    initialState,
    reducers: {
        clearData: (state) => {
            state.data = null;
            state.error = noError;
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(finishCreation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(finishCreation.fulfilled, (state, action) => {
            state.data = action.payload;
            state.error = noError;
            state.loading = false;
        });
        builder.addCase(finishCreation.rejected, (state, action) => {
            const error: any = action.payload;
            if (error.hasOwnProperty('message')) {
                state.error.message = error.message
            }
            state.data = null;
            state.loading = false;
        });
    }
});

export const { clearData } = finishAccountCreationSlice.actions;

export default finishAccountCreationSlice.reducer;