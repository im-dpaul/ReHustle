import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPostMethod } from "../../../core/services/NetworkServices";

export interface CreateEventServiceState {
    serviceType: string
    data: any;
    error: ErrorType;
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
    validated: boolean
}

type ErrorType = {
    nameError: string;
    descriptionError: string;
    eventLinkError: string;
    dateError: string;
    timeError: string;
    durationError: string;
    priceError: string;
    message: string;
}

const noError: ErrorType = {
    nameError: '',
    descriptionError: '',
    eventLinkError: '',
    dateError: '',
    timeError: '',
    durationError: '',
    priceError: '',
    message: ''
}

const initialState: CreateEventServiceState = {
    serviceType: '',
    data: null,
    error: noError,
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
    validated: false
}

export const addNewService = createAsyncThunk<any>(
    'api/addNewService',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: CreateEventServiceState = state.createEventService;

        // Set price
        let price = (stateValue.servicePrice != '') ? Number(stateValue.servicePrice) : 250;

        // Set TimeStamp from date & time
        let d = new Date(stateValue.serviceDate)
        let t = new Date(stateValue.serviceTime)
        let day = d.getDate()
        let month = d.getMonth()
        let year = d.getFullYear()
        let hour = t.getHours()
        let minute = t.getMinutes()
        let dateTimeStamp = new Date(year, month, day, hour, minute).getTime()

        const url = `/p/product`
        let data: any = null;
        let values: any = {
            "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee-banner.jpeg",
            "title": stateValue.serviceName == "" ? "New Event" : stateValue.serviceName,
            "description": stateValue.serviceDescription == "" ? "Event description" : stateValue.serviceDescription,
            "paymentMode": stateValue.servicePaymentType.toLowerCase(),
            "isActive": true,
            "service": {
                "serviceType": "event",
                "date": dateTimeStamp,
                "duration": stateValue.serviceEventDuration == "" ? "45" : stateValue.serviceEventDuration,
                "url": stateValue.serviceEventUrl == "" ? "https://meet.google.com/" : stateValue.serviceEventUrl,
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
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const createEventServiceSlice = createSlice({
    name: 'createEventService',
    initialState,
    reducers: {
        setServiceType: (state, action) => {
            state.serviceType = action.payload
        },
        clearData: (state) => {
            state.serviceType = ''
            state.data = null
            state.error = noError
            state.loading = false
            state.screenLoading = true
            state.serviceName = ''
            state.serviceDescription = ''
            state.servicePrice = ''
            state.serviceEventUrl = ''
            state.servicePaymentType = 'Paid'
            state.serviceEventDuration = ''
            state.serviceDate = ''
            state.serviceTime = ''
            state.validated = false
        },
        setName: (state, action) => {
            state.serviceName = action.payload;
            state.error.nameError = ''
        },
        setDescription: (state, action) => {
            state.serviceDescription = action.payload;
            state.error.descriptionError = ''
        },
        setPrice: (state, action) => {
            state.servicePrice = action.payload.replace(/[^0-9]/g, '')
            state.error.priceError = ''
        },
        setEventUrl: (state, action) => {
            state.serviceEventUrl = action.payload;
            state.error.eventLinkError = ''
        },
        setPaymentType: (state, action) => {
            if (action.payload == 'Free') {
                state.servicePrice = '0';
                state.error.priceError = ''
            }
            else {
                state.servicePrice = ''
            }
            state.servicePaymentType = action.payload;
        },
        setEventDuration: (state, action) => {
            state.serviceEventDuration = action.payload;
            state.error.durationError = ''
        },
        setDate: (state, action) => {
            // let d = new Date(action.payload)
            // let date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
            state.serviceDate = action.payload;
        },
        setTime: (state, action) => {
            let d = new Date(action.payload)
            if (d.getMinutes() > 0 && d.getMinutes() < 16) {
                d.setMinutes(15)
            } else if (d.getMinutes() > 15 && d.getMinutes() < 31) {
                d.setMinutes(30)
            } else if (d.getMinutes() > 30 && d.getMinutes() < 46) {
                d.setMinutes(45)
            } else if (d.getMinutes() > 45) {
                let h = d.getHours()
                d.setHours(h + 1)
                d.setMinutes(0)
            }
            state.serviceTime = d.toISOString();
        },
        checkValidation: (state) => {
            if (state.serviceName != '' && state.serviceDescription != '' && state.serviceEventUrl != '' && state.serviceEventDuration != '' && state.servicePrice != '') {
                state.validated = true
                state.error = noError
            }
            else {
                if (state.serviceName != '') {
                    state.error.nameError = ''
                } else {
                    state.error.nameError = 'This field is required'
                }
                if (state.serviceDescription != '') {
                    state.error.descriptionError = ''
                } else {
                    state.error.descriptionError = 'This field is required'
                }
                if (state.serviceEventUrl != '') {
                    state.error.eventLinkError = ''
                } else {
                    state.error.eventLinkError = 'This field is mandatory.'
                }
                if (state.serviceEventDuration != '') {
                    state.error.durationError = ''
                } else {
                    state.error.durationError = 'This field is mandatory.'
                }
                if (state.servicePaymentType != 'Free') {
                    if (state.servicePrice != '' && state.servicePrice != '0') {
                        state.error.priceError = ''
                    } else {
                        state.error.priceError = 'Please enter amount greater than 0'
                    }
                }
                state.validated = false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            addNewService.pending,
            (state) => {
                state.screenLoading = true
                state.validated = false
            });
        builder.addCase(
            addNewService.fulfilled,
            (state, action) => {
                state.screenLoading = false;
                state.data = action.payload
                state.error = noError
            });
        builder.addCase(
            addNewService.rejected,
            (state, action) => {
                let e: any = action.payload
                state.error.message = e.message
                if (e.hasOwnProperty('errors')) {
                    if (e.errors.hasOwnProperty('service')) {
                        if (e.errors.service.hasOwnProperty('duration')) {
                            state.error.durationError = e.errors.service.duration
                        }
                        if (e.errors.service.hasOwnProperty('duration')) {
                            state.error.eventLinkError = e.errors.service.url
                        }
                        if (e.errors.service.hasOwnProperty('assets.url')) {
                            // state.error.eventLinkError = e.errors.service.assets.url
                        }
                    }
                }
                state.screenLoading = false;
                state.data = null
            });
    }
});

export const { clearData, setName, setDescription, setPrice, setEventUrl, setPaymentType, setEventDuration, setDate, setTime, checkValidation, setServiceType } = createEventServiceSlice.actions;

export default createEventServiceSlice.reducer;