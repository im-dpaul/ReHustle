import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticatedGetMethod, authenticatedPostMethod, authenticatedPutMethod, fileUploadMethod } from "../../../core/services/NetworkServices";
import { AddServiceType, FileType, ScheduleType, StorageKeys } from "../../../constants";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import { MessagingServicePlatformType, ServiceDataModel, ServiceModel } from '../../../data'
import { CapitalizeFirstWord } from "../../../utils";
import { launchImageLibrary } from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker'

export interface CreateServiceState {
    data: any
    error: ErrorType
    loading: boolean
    screenLoading: boolean
    validated: boolean

    /// Service details
    serviceType: string
    serviceId: string
    serviceName: string
    serviceDescription: string
    amount: string
    servicePaymentType: string
    isActive: boolean
    bannerImage: string
    currency: string
    bannerImageLoading: boolean

    /// Event Services
    serviceEventUrl: string
    serviceEventDuration: string
    serviceDate: string
    serviceTime: string

    /// Sell Product Services
    fileType: string
    externalFileUrl: string
    uploadFileUrl: string
    uploadFileLoading: boolean

    /// Sell Time Services
    scheduleType: string
    email: string
    videoCallUrl: string
    calendlyUrl: string
    meetingDuration: string

    /// Chat Services
    platformIdsList: string[]
    platformList: MessagingServicePlatformType[]
}

type PlatformLinkError = {
    sms: string
    email: string
    messenger: string
    whatsapp: string
    signal: string
    telegram: string
    other: string
}

type ErrorType = {
    nameError: string;
    descriptionError: string;
    bannerImageError: string
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
    platformLinksError: string
    platformLinkError: PlatformLinkError
    message: string;
}

const noPlatformLinkError = {
    sms: '',
    email: '',
    messenger: '',
    whatsapp: '',
    signal: '',
    telegram: '',
    other: '',
}

const noError: ErrorType = {
    nameError: '',
    descriptionError: '',
    bannerImageError: '',
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
    platformLinksError: '',
    platformLinkError: noPlatformLinkError,
    message: ''
}

const initialState: CreateServiceState = {
    serviceType: '',
    data: null,
    error: noError,
    loading: false,
    screenLoading: true,
    validated: false,

    /// Service details
    serviceId: '',
    serviceName: '',
    serviceDescription: '',
    amount: '',
    servicePaymentType: 'Paid',
    isActive: true,
    bannerImage: '',
    currency: 'INR',
    bannerImageLoading: false,

    /// Event Services
    serviceEventUrl: '',
    serviceEventDuration: '',
    serviceDate: '',
    serviceTime: '',

    /// Sell Product Services
    fileType: FileType.INTERNAL,
    externalFileUrl: '',
    uploadFileUrl: '',
    uploadFileLoading: false,

    /// Sell Time Services
    scheduleType: ScheduleType.EMAIL,
    meetingDuration: '',
    email: '',
    videoCallUrl: '',
    calendlyUrl: '',

    /// Chat Services
    platformIdsList: [],
    platformList: []
}

export const uploadBannerImage = createAsyncThunk<any>(
    'api/uploadBannerImage',
    async (_, thunkApi) => {
        const state: any = thunkApi.getState();
        const stateValue: CreateServiceState = state.createService;
        try {
            const imageFile = await launchImageLibrary({
                mediaType: "photo",
                quality: 1,
                selectionLimit: 1,
            })
            let e: any = {}
            if (imageFile.didCancel) {
                e.message = 'Image not selected'
                return thunkApi.rejectWithValue(e)
            }
            if (imageFile.errorCode) {
                if (imageFile.errorCode == 'permission') {
                    e.message = 'Access denied'
                } else if (imageFile.errorMessage) {
                    e.message = imageFile.errorMessage
                } {
                    e.message = 'Something went wrong'
                }
                return thunkApi.rejectWithValue(e)
            }
            if (imageFile.assets) {
                let imageUrl = ''
                let signedUrl = ''
                const filePath = imageFile.assets[0].uri?.replace('file://', '') ?? ''
                const fileType: string[] = (imageFile.assets[0].type)?.split('/') ?? []
                const url = '/p/mediaUrl'
                const mType = fileType[0]
                const cType = fileType[1]
                const queryParams = {
                    mType: mType.toUpperCase(),
                    cType: cType.toUpperCase()
                }

                const getSignedUrlResponse = await authenticatedGetMethod(url, queryParams)

                if (getSignedUrlResponse.data.result) {
                    imageUrl = getSignedUrlResponse.data.result.url
                    signedUrl = getSignedUrlResponse.data.result.signedUrl

                    const contentType = `${mType}/${cType}`

                    const response = await fileUploadMethod(signedUrl, filePath, contentType)

                    if (response.respInfo.status == 200) {
                        return imageUrl
                    } else {
                        e.message = 'Something went wrong'
                        return thunkApi.rejectWithValue(e)
                    }
                }
            }
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

export const uploadFile = createAsyncThunk<any>(
    'api/uploadFile',
    async (_, thunkApi) => {
        const state: any = thunkApi.getState();
        const stateValue: CreateServiceState = state.createService;
        try {
            const file = await DocumentPicker.pickSingle({
                allowMultiSelection: false,
                type: ['audio/*', 'image/*', 'application/pdf', 'video/*', 'application/zip']
            })
            let e: any = {}

            if (file.uri != '') {
                let fileUrl = ''
                let signedUrl = ''
                const filePath = file.uri.replace('file://', '') ?? ''
                const fileType: string[] = (file.type)?.split('/') ?? []
                const url = '/p/mediaUrl'
                const mType = fileType[0]
                const cType = fileType[1]
                const queryParams = {
                    mType: mType == 'application' ? 'DOCUMENTS' : mType.toUpperCase(),
                    cType: cType.toUpperCase()
                }

                const getSignedUrlResponse = await authenticatedGetMethod(url, queryParams)

                if (getSignedUrlResponse.data.result) {
                    fileUrl = getSignedUrlResponse.data.result.url
                    signedUrl = getSignedUrlResponse.data.result.signedUrl

                    const contentType = `${mType}/${cType}`

                    const response = await fileUploadMethod(signedUrl, filePath, contentType)

                    if (response.respInfo.status == 200) {
                        return fileUrl
                    } else {
                        e.message = 'Something went wrong'
                        return thunkApi.rejectWithValue(e)
                    }
                }
            }
        } catch (e) {
            const cancelled = DocumentPicker.isCancel((e))
            const inProgress = DocumentPicker.isInProgress((e))
            let err: any = {}
            if (cancelled) {
                err.message = 'No file selected'
                return thunkApi.rejectWithValue(err)
            }
            if (inProgress) {
                err.message = 'File selection is in progress'
                return thunkApi.rejectWithValue(err)
            }

            return thunkApi.rejectWithValue(e)
        }
    }
)

export const addNewService = createAsyncThunk<any>(
    'api/addNewService',
    async (_, thunkAPI) => {
        const state: any = thunkAPI.getState();
        const stateValue: CreateServiceState = state.createService;

        // Set Service Details
        let service: ServiceDataModel = {
            serviceType: ''
        }

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
                serviceType: AddServiceType.EVENT,
                date: dateTimeStamp,
                duration: stateValue.serviceEventDuration,
                url: stateValue.serviceEventUrl,
            }
        }

        /// Sell Product service
        if (stateValue.serviceType == AddServiceType.DIGITAL_PRODUCT) {
            if (stateValue.fileType == FileType.INTERNAL) {
                service = {
                    serviceType: AddServiceType.DIGITAL_PRODUCT,
                    assets: {
                        fileType: stateValue.fileType,
                        file: stateValue.uploadFileUrl
                    }
                }
            } else {
                service = {
                    serviceType: AddServiceType.DIGITAL_PRODUCT,
                    assets: {
                        fileType: stateValue.fileType,
                        url: stateValue.externalFileUrl
                    }
                }
            }
        }

        /// Sell Time service
        if (stateValue.serviceType == AddServiceType.CALL) {
            if (stateValue.scheduleType == ScheduleType.EMAIL) {
                service = {
                    serviceType: AddServiceType.CALL,
                    scheduleType: ScheduleType.EMAIL,
                    email: stateValue.email,
                    duration: stateValue.meetingDuration
                }
            } else {
                const email = await LocalStorage.GetData(StorageKeys.EMAIL) ?? ""
                service = {
                    serviceType: AddServiceType.CALL,
                    scheduleType: stateValue.scheduleType,
                    email: email,
                    duration: stateValue.meetingDuration,
                    url: stateValue.scheduleType == ScheduleType.VIDEO_CALL ? stateValue.videoCallUrl : stateValue.calendlyUrl
                }
            }
        }

        /// Chat service
        if (stateValue.serviceType == AddServiceType.CHAT) {
            let links: { [key: string]: string; } = {}
            stateValue.platformList.forEach((platform) => {
                links[platform.title] = platform.link
            })
            service = {
                serviceType: AddServiceType.CHAT,
                links: links
            }
        }

        let data: any = null;
        let response: any
        let values: ServiceModel = {
            bannerImage: stateValue.bannerImage,
            title: stateValue.serviceName,
            description: stateValue.serviceDescription,
            paymentMode: stateValue.servicePaymentType.toLowerCase(),
            isActive: true,
            service: service,
            price: {
                currency: stateValue.currency,
                amount: Number(stateValue.amount),
            }
        }

        try {
            if (stateValue.serviceId == '') {
                /// Create Service
                const url = `/p/product`
                response = await authenticatedPostMethod(url, values);
            } else {
                /// Update Service
                const url = `/p/product/${stateValue.serviceId}`
                response = await authenticatedPutMethod(url, values);
            }

            data = response.data.result;

            return data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e)
        }
    });

export const createServiceSlice = createSlice({
    name: 'createService',
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
            state.validated = false

            /// Service details
            state.serviceId = ''
            state.serviceName = ''
            state.serviceDescription = ''
            state.amount = ''
            state.servicePaymentType = 'Paid'
            state.isActive = true
            state.bannerImage = ''
            state.currency = 'INR'
            state.bannerImageLoading = false

            /// Event Services
            state.serviceEventUrl = ''
            state.serviceEventDuration = ''
            state.serviceDate = ''
            state.serviceTime = ''

            /// Sell Product Services
            state.fileType = FileType.INTERNAL
            state.externalFileUrl = ''
            state.uploadFileUrl = ''
            state.uploadFileLoading = false

            /// Sell Time Services
            state.scheduleType = ScheduleType.EMAIL
            state.meetingDuration = ''
            state.email = ''
            state.videoCallUrl = ''
            state.calendlyUrl = ''

            /// Chat Services
            state.platformIdsList = []
            state.platformList = []
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
            state.amount = action.payload.replace(/[^0-9]/g, '')
            state.error.priceError = ''
        },
        setPaymentType: (state, action) => {
            if (action.payload == 'Free') {
                state.amount = '0';
                state.error.priceError = ''
            }
            else {
                state.amount = ''
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

        /// Chat Services
        addPlatforms: (state, action) => {
            let platform: MessagingServicePlatformType = action.payload

            state.platformIdsList.push(platform.title)
            state.platformList.push(platform)
        },
        removePlatforms: (state, action) => {
            state.platformIdsList = state.platformIdsList.filter((platform) => platform !== action.payload)
            state.platformList = state.platformList.filter((platform) => platform.title !== action.payload)
            state.error.platformLinksError = ''
            state.error.platformLinkError = noPlatformLinkError
        },
        setPlatformValue: (state, action) => {
            let platforms: MessagingServicePlatformType[];
            platforms = state.platformList.map((platform) => {
                let localplatform: MessagingServicePlatformType = platform;
                if (action.payload.title == localplatform.title) {
                    localplatform = action.payload;
                }
                return localplatform;
            });
            state.platformList = platforms;
            state.error.platformLinksError = ''
            state.error.platformLinkError = noPlatformLinkError
        },

        /// Update service functions
        setInitialValues: (state, action) => {
            const serviceData: ServiceModel = action.payload

            state.serviceId = serviceData._id ?? ""
            state.serviceName = serviceData.title
            state.serviceDescription = serviceData.description
            state.isActive = serviceData.isActive
            state.bannerImage = serviceData.bannerImage
            state.servicePaymentType = CapitalizeFirstWord(serviceData.paymentMode)
            state.currency = serviceData.price.currency
            state.amount = serviceData.price.amount.toString()
            // Event
            state.serviceEventUrl = serviceData.service.url ?? ''
            state.serviceEventDuration = (serviceData.service.duration == undefined) ? '' : serviceData.service.duration.toString()
            state.serviceDate = serviceData.service.date == undefined ? '' : serviceData.service.date.toString()
            state.serviceTime = serviceData.service.date == undefined ? '' : serviceData.service.date.toString()
            // Product
            state.fileType = serviceData.service.assets?.fileType ?? ''
            state.uploadFileUrl = serviceData.service.assets?.file ?? ''
            state.externalFileUrl = serviceData.service.assets?.url ?? ''
            // Time
            state.scheduleType = serviceData.service.scheduleType ?? ''
            state.email = serviceData.service.email ?? ''
            state.meetingDuration = (serviceData.service.duration == undefined) ? '' : serviceData.service.duration.toString()
            state.videoCallUrl = (serviceData.service.scheduleType == ScheduleType.VIDEO_CALL) ? (serviceData.service.url ?? '') : ''
            state.calendlyUrl = (serviceData.service.scheduleType == ScheduleType.CALENDLY) ? (serviceData.service.url ?? '') : ''
            // Chat
            if (serviceData.service.links != undefined) {
                state.platformIdsList = Object.keys(serviceData.service.links)

                const platforms: [string, string][] = Object.entries(serviceData.service.links)
                platforms.forEach((e) => {
                    state.platformList.push({
                        title: e[0],
                        link: e[1]
                    })
                })
            }
        },

        /// Validation check function
        checkValidation: (state) => {
            if (state.serviceName != '' && state.serviceDescription != '' && state.amount != '') {
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
                if (state.serviceType == AddServiceType.CHAT) {
                    if (state.platformList.length == 0) {
                        state.validated = false
                        state.error.platformLinksError = 'Please add at least 1 link'
                    } else {
                        let v = true
                        state.platformList.forEach((platform) => {
                            if (platform.link.length == 0) {
                                v = false
                                return
                            }
                        })
                        if (v) {
                            state.validated = true
                            state.error = noError
                        } else {
                            state.validated = false
                            state.error.platformLinksError = 'Please provide all link'
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
                    if (state.amount != '' && state.amount != '0') {
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
                        if (e.errors.service.hasOwnProperty('links.email')) {
                            state.error.platformLinkError.email = e.errors.service['links.email']
                        }
                        if (e.errors.service.hasOwnProperty('links.messenger')) {
                            state.error.platformLinkError.messenger = e.errors.service['links.messenger']
                        }
                        if (e.errors.service.hasOwnProperty('links.telegram')) {
                            state.error.platformLinkError.telegram = e.errors.service['links.telegram']
                        }
                        if (e.errors.service.hasOwnProperty('links.sms')) {
                            state.error.platformLinkError.sms = e.errors.service['links.sms']
                        }
                        if (e.errors.service.hasOwnProperty('links.whatsapp')) {
                            state.error.platformLinkError.whatsapp = e.errors.service['links.whatsapp']
                        }
                        if (e.errors.service.hasOwnProperty('links.signal')) {
                            state.error.platformLinkError.signal = e.errors.service['links.signal']
                        }
                        if (e.errors.service.hasOwnProperty('links.other')) {
                            state.error.platformLinkError.other = e.errors.service['links.other']
                        }
                    }
                }
                state.screenLoading = false;
                state.data = null
            });
        builder.addCase(uploadBannerImage.pending,
            (state) => {
                state.bannerImageLoading = true
            });
        builder.addCase(uploadBannerImage.fulfilled,
            (state, action) => {
                state.bannerImage = action.payload
                state.bannerImageLoading = false
                state.error.bannerImageError = ''
            });
        builder.addCase(uploadBannerImage.rejected,
            (state, action) => {
                let e: any = action.payload
                state.bannerImageLoading = false
                state.error.bannerImageError = e.message
            });
        builder.addCase(uploadFile.pending,
            (state) => {
                state.uploadFileLoading = true
            });
        builder.addCase(uploadFile.fulfilled,
            (state, action) => {
                state.uploadFileLoading = false
                state.uploadFileUrl = action.payload
                state.error.uploadFileUrlError = ''
            });
        builder.addCase(uploadFile.rejected,
            (state, action) => {
                let e: any = action.payload
                state.uploadFileLoading = false
                state.error.uploadFileUrlError = e.message
            });
    }
});

export const { clearData, setName, setDescription, setPrice, setEventUrl, setPaymentType, setEventDuration, setDate, setTime, checkValidation, setServiceType, setFileType, setExternalFileUrl, setScheduleType, setMeetingDuration, setCalendlyUrl, setEmail, setVideoCallUrl, addPlatforms, removePlatforms, setPlatformValue, setInitialValues } = createServiceSlice.actions;

export default createServiceSlice.reducer;