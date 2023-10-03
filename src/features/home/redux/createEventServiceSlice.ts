import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPostMethod } from "../../../core/services/NetworkServices";

interface CreateEventServiceState {
    data: any;
    error: any;
    loading: boolean;
    screenLoading: boolean;
    serviceName: string;
    serviceDescription: string,
    servicePrice: string,
    serviceEventUrl: string,
    servicePaymentType: string,
    serviceEventDuration: string,
    serviceDate: string,
    serviceTime: string,
}

const initialState: CreateEventServiceState = {
    data: null,
    error: null,
    loading: false,
    screenLoading: true,
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    serviceEventUrl: '',
    servicePaymentType: 'Paid',
    serviceEventDuration: '',
    serviceDate: '',
    serviceTime: '',
}

export const addNewService = createAsyncThunk<any>(
    'api/addNewService',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue = state.createEventService;

        let price = Number(stateValue.servicePrice);

        const url = `/p/product`
        let data: any = null;
        let values: any = {
            "bannerImage": "",
            "title": stateValue.serviceName == "" ? "New Event" : stateValue.serviceName,
            "description": stateValue.serviceDescription == "" ? "Trying to create a new event, it's the description" : stateValue.serviceDescription,
            "paymentMode": stateValue.servicePaymentType.toLowerCase(),
            "isActive": true,
            "service": {
                "serviceType": "event",
                "date": 1704112200000,
                "duration": stateValue.serviceEventDuration == "" ? "45" : stateValue.serviceEventDuration,
                "url": "https://www.abc.com/event/499"
            },
            "price": {
                "currency": "INR",
                "amount": Number.isNaN(price) ? 150 : price,
            }
        }

        try {
            const response = await authenticatedPostMethod(url, values);
            data = response.data.result;

            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const createEventServiceSlice = createSlice({
    name: 'createEventService',
    initialState,
    reducers: {
        clearData: (state, action) => {
            state = initialState;
        },
        setName: (state, action) => {
            state.serviceName = action.payload;
        },
        setDescription: (state, action) => {
            state.serviceDescription = action.payload;
        },
        setPrice: (state, action) => {
            state.servicePrice = action.payload;
        },
        setEventUrl: (state, action) => {
            state.serviceEventUrl = action.payload;
        },
        setPaymentType: (state, action) => {
            if (action.payload == 'Free') {
                state.servicePrice = '0';
            }
            state.servicePaymentType = action.payload;
        },
        setEventDuration: (state, action) => {
            state.serviceEventDuration = action.payload;
        },
        setDate: (state, action) => {
            state.serviceDate = action.payload;
        },
        setTime: (state, action) => {
            state.serviceTime = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            addNewService.pending,
            (state) => {
                state.screenLoading = true;
            });
        builder.addCase(
            addNewService.fulfilled,
            (state, action) => {
                state.screenLoading = false;
                state.data = action.payload
            });
        builder.addCase(
            addNewService.rejected,
            (state, action) => {
                state.screenLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearData, setName, setDescription, setPrice, setEventUrl, setPaymentType, setEventDuration, setDate, setTime } = createEventServiceSlice.actions;

export default createEventServiceSlice.reducer;