import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../../constants/AppColors'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import { RootStackParamList } from '../../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontFamily from '../../../constants/FontFamily'
import UploadButton from '../../../components/buttons/UploadButton'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import CommonDivider from '../../../components/divider/CommonDivider'
import PriceTextInput from '../../../components/textInput/PriceTextInput'
import { setName, setDescription, setPrice, clearData, setPaymentType, setDate, setTime, addNewService, CreateEventServiceState, checkValidation, setServiceType, setEmail } from "../redux/createEventServiceSlice";
import { AppDispatch } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import ToggleTabButton from '../../../components/buttons/ToggleTabButton'
import { AddEventDetails, AddMeetingDetails, AddMessagingDetails, AddProductDetails, CreateServiceAppBar } from '../components'
import { ServiceBannerImage } from '../../../components'
import { AddServiceType, StorageKeys } from '../../../constants'
import LocalStorage from '../../../data/local_storage/LocalStorage'

type CreateEventServiceProps = NativeStackScreenProps<RootStackParamList, 'CreateEventService'>

const CreateEventService = ({ navigation, route }: CreateEventServiceProps): React.JSX.Element => {
    const createEventServiceR: CreateEventServiceState = useSelector((state: any) => state.createEventService)
    const dispatch = useDispatch<AppDispatch>();

    // console.log("Create event service store", createEventServiceR);

    const onCreate = () => {
        dispatch(checkValidation())
    }

    const onBackPress = () => {
        dispatch(clearData())
        navigation.pop()
    }
    const onImageUpload = () => { }

    const onNameChange = (name: string) => {
        dispatch(setName(name))
    }

    const onChangeDescription = (desc: string) => {
        dispatch(setDescription(desc))
    }

    const onPriceChange = (price: string) => {
        dispatch(setPrice(price))
    }

    const onPaymentTypeSelection = (type: string) => {
        if (createEventServiceR.servicePaymentType != type) {
            dispatch(setPaymentType(type))
        }
    }

    const getTitle = () => {
        let title = ''
        switch (createEventServiceR.serviceType) {
            case AddServiceType.EVENT:
                title = 'Organise an event'
                break;
            case AddServiceType.DIGITAL_PRODUCT:
                title = 'Sell a product'
                break;
            case AddServiceType.CALL:
                title = 'Sell your time'
                break;
            case AddServiceType.CHAT:
                title = 'Chat services'
                break;
            default:
                break;
        }
        return title
    }

    useEffect(() => {
        const routeParams = route.params
        const serviceType = routeParams.serviceType
        dispatch(setServiceType(serviceType))

        if (serviceType == AddServiceType.EVENT) {
            const d = new Date()
            dispatch(setDate(d.getTime()))
            dispatch(setTime(d.getTime()))
        }
        if (serviceType == AddServiceType.CALL) {
            LocalStorage.GetData(StorageKeys.EMAIL).then((email) => {
                if (email != null) {
                    dispatch(setEmail(email))
                }
            })
        }
    }, [])

    useEffect(() => {
        if (createEventServiceR.validated == true) {
            dispatch(addNewService())
        }
    }, [createEventServiceR.validated])

    useEffect(() => {
        if (createEventServiceR.data != null) {
            dispatch(clearData())
            navigation.navigate('Services', { refresh: true })
        }
    }, [createEventServiceR.data])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <CreateServiceAppBar
                title={getTitle()}
                onCreate={() => onCreate()}
                onBackPress={() => onBackPress()}
            />
            <ScrollView>
                <View style={styles.mainBody}>
                    <View style={{ height: 8 }}></View>
                    <View>
                        <View style={styles.imageContainer}>
                            {
                                (true)
                                    ? <ServiceBannerImage serviceType={createEventServiceR.serviceType} />
                                    : <Image style={styles.imageContainer} source={{ uri: '' }} />
                            }
                        </View>
                        <View style={{ position: 'absolute', bottom: 14, right: 14 }}>
                            <UploadButton onPress={() => onImageUpload()} />
                        </View>
                    </View>
                    <View style={{ height: 18 }}></View>
                    <View>
                        <Text style={styles.title}>Name</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            value={createEventServiceR.serviceName}
                            placeholder='Give it a name'
                            errorText={createEventServiceR.error.nameError}
                            onChangeText={(name) => onNameChange(name)}
                        />
                    </View>
                    <View style={{ height: 24 }}></View>
                    <View>
                        <Text style={styles.title}>Short Description</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            value={createEventServiceR.serviceDescription}
                            placeholder='A little something to get people intigued'
                            errorText={createEventServiceR.error.descriptionError}
                            onChangeText={(desc) => onChangeDescription(desc)}
                        />
                        <View style={{ height: 8 }}></View>
                        <Text style={styles.wordCount}>{createEventServiceR.serviceDescription.length}/250</Text>
                    </View>
                    <View style={{ marginVertical: 24 }}>
                        <CommonDivider />
                    </View>
                    {
                        createEventServiceR.serviceType == AddServiceType.EVENT
                            ? <AddEventDetails />
                            : createEventServiceR.serviceType == AddServiceType.DIGITAL_PRODUCT
                                ? <AddProductDetails />
                                : createEventServiceR.serviceType == AddServiceType.CALL
                                    ? <AddMeetingDetails />
                                    : createEventServiceR.serviceType == AddServiceType.CHAT
                                        ? <AddMessagingDetails />
                                        : null
                    }
                    <View style={{ marginVertical: 24 }}>
                        <CommonDivider />
                    </View>
                    <View>
                        <Text style={[styles.title, { fontSize: 14 }]}>Pricing</Text>
                        <View style={{ height: 8 }}></View>
                        <Text style={styles.title}>Payment type</Text>
                        <View style={{ height: 8 }}></View>
                        <ToggleTabButton
                            firstButtonName='Free'
                            secondButtonName='Paid'
                            selectedButton={createEventServiceR.servicePaymentType}
                            onPress={(value) => onPaymentTypeSelection(value)}
                        />
                        <View style={{ height: 24 }}></View>
                        <Text style={styles.title}>Price</Text>
                        <View style={{ height: 8 }}></View>
                        <PriceTextInput
                            placeholder='0'
                            errorText={createEventServiceR.error.priceError}
                            value={createEventServiceR.servicePrice}
                            editable={createEventServiceR.servicePaymentType == 'Paid' ? true : false}
                            onChangeText={(price) => onPriceChange(price)}
                        />
                    </View>
                    <View style={{ height: 48 }}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateEventService

const styles = StyleSheet.create({
    mainBody: {
        marginHorizontal: 24
    },
    imageContainer: {
        backgroundColor: AppColors.SECONDARY_COLOR,
        height: 178,
        borderRadius: 8,
    },
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    wordCount: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'right'
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})