import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedPostMethod } from "../../../core/services/NetworkServices";
import { AddServiceType, FileType, ScheduleType, StorageKeys } from "../../../constants";
import LocalStorage from "../../../data/local_storage/LocalStorage";

export interface CreateEventServiceState {
    serviceType: string
    data: any;
    error: ErrorType;
    loading: boolean;
    screenLoading: boolean;
    validated: boolean

    /// Service details
    serviceName: string;
    serviceDescription: string,
    servicePrice: string,
    servicePaymentType: string,

    /// Event Services
    serviceEventUrl: string,
    serviceEventDuration: string,
    serviceDate: string,
    serviceTime: string,

    /// Sell Product Services
    fileType: string
    externalFileUrl: string
    uploadFileUrl: string

    /// Sell Time Services
    scheduleType: string
    email: string
    videoCallUrl: string
    calendlyUrl: string
    meetingDuration: string
}

type ErrorType = {
    nameError: string;
    descriptionError: string;
    eventLinkError: string;
    dateError: string;
    timeError: string;
    durationError: string;
    priceError: string;
    uploadFileUrlError: string;
    externalFileUrlError: string;
    meetingDuration: string
    emailError: string
    videoCallUrlError: string
    calendlyUrlError: string
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
    uploadFileUrlError: '',
    externalFileUrlError: '',
    meetingDuration: '',
    emailError: "",
    videoCallUrlError: "",
    calendlyUrlError: "",
    message: ''
}

const initialState: CreateEventServiceState = {
    serviceType: '',
    data: null,
    error: noError,
    loading: false,
    screenLoading: true,
    validated: false,

    /// Service details
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    servicePaymentType: 'Paid',

    /// Event Services
    serviceEventUrl: '',
    serviceEventDuration: '',
    serviceDate: '',
    serviceTime: '',

    /// Sell Product Services
    fileType: FileType.INTERNAL,
    externalFileUrl: '',
    uploadFileUrl: 'https://rehustle-user-assets.s3.amazonaws.com/products/65322107bc14c6028a50126c_1698397690988',

    /// Sell Time Services
    scheduleType: ScheduleType.EMAIL,
    meetingDuration: '',
    email: '',
    videoCallUrl: '',
    calendlyUrl: ''
}

export const addNewService = createAsyncThunk<any>(
    'api/addNewService',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: CreateEventServiceState = state.createEventService;

        // Set price
        let price = (stateValue.servicePrice != '') ? Number(stateValue.servicePrice) : 250;

        // Set Service Details
        let service = {}

        /// Event service
        if (stateValue.serviceType == AddServiceType.EVENT) {
            // Set TimeStamp from date & time
            let d = new Date(stateValue.serviceDate)
            let t = new Date(stateValue.serviceTime)
            let day = d.getDate()
            let month = d.getMonth()
            let year = d.getFullYear()
            let hour = t.getHours()
            let minute = t.getMinutes()
            let dateTimeStamp = new Date(year, month, day, hour, minute).getTime()

            service = {
                "serviceType": AddServiceType.EVENT,
                "date": dateTimeStamp,
                "duration": stateValue.serviceEventDuration == "" ? "45" : stateValue.serviceEventDuration,
                "url": stateValue.serviceEventUrl == "" ? "https://meet.google.com/" : stateValue.serviceEventUrl,
            }
        }

        /// Sell Product service
        if (stateValue.serviceType == AddServiceType.DIGITAL_PRODUCT) {
            if (stateValue.fileType == FileType.INTERNAL) {
                service = {
                    "serviceType": AddServiceType.DIGITAL_PRODUCT,
                    "assets": {
                        "fileType": stateValue.fileType,
                        "file": stateValue.uploadFileUrl
                    }
                }
            } else {
                service = {
                    "serviceType": AddServiceType.DIGITAL_PRODUCT,
                    "assets": {
                        "fileType": stateValue.fileType,
                        "url": stateValue.externalFileUrl
                    }
                }
            }
        }

        /// Sell Time service
        if (stateValue.serviceType == AddServiceType.CALL) {
            if (stateValue.scheduleType == ScheduleType.EMAIL) {
                service = {
                    "serviceType": AddServiceType.CALL,
                    "scheduleType": ScheduleType.EMAIL,
                    "email": stateValue.email,
                    "duration": stateValue.meetingDuration
                }
            } else {
                const email = await LocalStorage.GetData(StorageKeys.EMAIL)
                service = {
                    "serviceType": AddServiceType.CALL,
                    "scheduleType": stateValue.scheduleType,
                    "email": email,
                    "duration": stateValue.meetingDuration,
                    "url": stateValue.scheduleType == ScheduleType.VIDEO_CALL ? stateValue.videoCallUrl : stateValue.calendlyUrl
                }
            }
        }

        const url = `/p/product`
        let data: any = null;
        let values: any = {
            "bannerImage": "https://rehustle-images.s3.amazonaws.com/images/virtual-coffee-banner.jpeg",
            "title": stateValue.serviceName == "" ? "New Event" : stateValue.serviceName,
            "description": stateValue.serviceDescription == "" ? "Event description" : stateValue.serviceDescription,
            "paymentMode": stateValue.servicePaymentType.toLowerCase(),
            "isActive": true,
            "service": service,
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
        /// Common functions
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
            state.fileType = FileType.INTERNAL
            state.externalFileUrl = ''
            state.uploadFileUrl = 'https://rehustle-user-assets.s3.amazonaws.com/products/65322107bc14c6028a50126c_1698397690988'
            state.scheduleType = ScheduleType.EMAIL
            state.meetingDuration = ''
            state.email = ''
            state.calendlyUrl = ''
            state.videoCallUrl = ''
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

        /// Event Services functions
        setEventUrl: (state, action) => {
            state.serviceEventUrl = action.payload;
            state.error.eventLinkError = ''
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

        /// Sell Product Services functions
        setFileType: (state, action) => {
            state.fileType = action.payload
        },
        setExternalFileUrl: (state, action) => {
            state.externalFileUrl = action.payload
        },

        /// Sell Time Services functions
        setScheduleType: (state, action) => {
            state.scheduleType = action.payload
        },
        setMeetingDuration: (state, action) => {
            state.meetingDuration = action.payload.replace(/[^0-9]/g, '')
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setVideoCallUrl: (state, action) => {
            state.videoCallUrl = action.payload
        },
        setCalendlyUrl: (state, action) => {
            state.calendlyUrl = action.payload
        },

        /// Validation check function
        checkValidation: (state) => {
            if (state.serviceName != '' && state.serviceDescription != '' && state.servicePrice != '') {
                if (state.serviceType == AddServiceType.EVENT) {
                    if (state.serviceEventUrl != '' && state.serviceEventDuration != '') {
                        state.validated = true
                        state.error = noError
                    } else {
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
                        state.validated = false
                    }
                }
                if (state.serviceType == AddServiceType.DIGITAL_PRODUCT) {
                    if (state.fileType == FileType.INTERNAL) {
                        if (state.uploadFileUrl != '') {
                            state.error.uploadFileUrlError = ''
                            state.validated = true
                        } else {
                            state.error.uploadFileUrlError = 'Please add 1 file.'
                            state.validated = false
                        }
                    } else {
                        if (state.externalFileUrl != '') {
                            state.error.externalFileUrlError = ''
                            state.validated = true
                        } else {
                            state.error.externalFileUrlError = 'This field is mandatory.'
                            state.validated = false
                        }
                    }
                }
                if (state.serviceType == AddServiceType.CALL) {
                    let v = false
                    if (state.scheduleType == ScheduleType.EMAIL) {
                        if (state.email != '') {
                            state.error.emailError = ''
                            v = true
                        } else {
                            state.error.emailError = 'This field is mandatory.'
                        }
                    } else if (state.scheduleType == ScheduleType.VIDEO_CALL) {
                        if (state.videoCallUrl != '') {
                            state.error.videoCallUrlError = ''
                            v = true
                        } else {
                            state.error.videoCallUrlError = 'This field is mandatory.'
                        }
                    } else if (state.scheduleType == ScheduleType.CALENDLY) {
                        if (state.calendlyUrl != '') {
                            state.error.calendlyUrlError = ''
                            v = true
                        } else {
                            state.error.calendlyUrlError = 'This field is mandatory.'
                        }
                    }
                    if (v && state.meetingDuration != '') {
                        state.validated = true
                        state.error = noError
                    }
                    else {
                        state.validated = false
                        if (state.meetingDuration == '') {
                            state.error.meetingDuration = 'This field is mandatory.'
                        }
                    }

                }
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
                        if (e.errors.service.hasOwnProperty('url')) {
                            state.error.eventLinkError = e.errors.service.url
                            if (state.serviceType == AddServiceType.CALL) {
                                if (state.scheduleType == ScheduleType.VIDEO_CALL) {
                                    state.error.videoCallUrlError = e.errors.service.url
                                }
                                if (state.scheduleType == ScheduleType.CALENDLY) {
                                    state.error.calendlyUrlError = e.errors.service.url
                                }
                            }
                        }
                        if (e.errors.service.hasOwnProperty('assets.url')) {
                            state.error.externalFileUrlError = e.errors.service['assets.url']
                        }
                        if (e.errors.service.hasOwnProperty('email')) {
                            state.error.emailError = e.errors.service.email
                        }
                    }
                }
                state.screenLoading = false;
                state.data = null
            });
    }
});

export const { clearData, setName, setDescription, setPrice, setEventUrl, setPaymentType, setEventDuration, setDate, setTime, checkValidation, setServiceType, setFileType, setExternalFileUrl, setScheduleType, setMeetingDuration, setCalendlyUrl, setEmail, setVideoCallUrl } = createEventServiceSlice.actions;

export default createEventServiceSlice.reducer;