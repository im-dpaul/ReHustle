import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
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
import { setName, setDescription, setPrice, clearData, setPaymentType, setDate, setTime, addNewService, CreateServiceState, checkValidation, setServiceType, setEmail, setInitialValues, uploadBannerImage } from "../redux/createServiceSlice";
import { AppDispatch } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import ToggleTabButton from '../../../components/buttons/ToggleTabButton'
import { AddEventDetails, AddMeetingDetails, AddMessagingDetails, AddProductDetails, CreateServiceAppBar } from '../components'
import { ServiceBannerImage } from '../../../components'
import { AddServiceType, StorageKeys } from '../../../constants'
import LocalStorage from '../../../data/local_storage/LocalStorage'

type CreateServiceProps = NativeStackScreenProps<RootStackParamList, 'CreateService'>

const CreateServiceScreen = ({ navigation, route }: CreateServiceProps): React.JSX.Element => {
    const createServiceR: CreateServiceState = useSelector((state: any) => state.createService)
    const dispatch = useDispatch<AppDispatch>();

    // console.log("Create event service store", createServiceR);

    const onCreate = () => {
        dispatch(checkValidation())
    }

    const onBackPress = () => {
        dispatch(clearData())
        navigation.pop()
    }
    const onImageUpload = () => {
        dispatch(uploadBannerImage())
    }

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
        if (createServiceR.servicePaymentType != type) {
            dispatch(setPaymentType(type))
        }
    }

    const getTitle = () => {
        let title = ''
        switch (createServiceR.serviceType) {
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
        const routeParams = route.params
        if (routeParams.serviceData != undefined) {
            dispatch(setInitialValues(routeParams.serviceData))
        }
    }, [])

    useEffect(() => {
        if (createServiceR.validated == true) {
            dispatch(addNewService())
        }
    }, [createServiceR.validated])

    useEffect(() => {
        if (createServiceR.data != null) {
            dispatch(clearData())
            const routeParams = route.params
            if (routeParams.stack == 'AddService') {
                navigation.navigate('AddServices', { refresh: true })
            }
            else {
                navigation.navigate('Services', { refresh: true })
            }
        }
    }, [createServiceR.data])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <CreateServiceAppBar
                title={getTitle()}
                buttonTitle={createServiceR.serviceId == '' ? 'Create Now' : 'Update'}
                onCreate={() => onCreate()}
                onBackPress={() => onBackPress()}
            />
            <ScrollView>
                <View style={styles.mainBody}>
                    <View style={{ height: 8 }}></View>
                    <View>
                        <View style={styles.imageContainer}>
                            {
                                createServiceR.bannerImage == ''
                                    ? <ServiceBannerImage serviceType={createServiceR.serviceType} />
                                    : <Image style={styles.imageContainer} source={{ uri: createServiceR.bannerImage }} />
                            }
                            {
                                createServiceR.bannerImageLoading
                                    ? <View style={[styles.imageContainer, { position: 'absolute', backgroundColor: AppColors.WHITE, width: '100%', justifyContent: 'center', opacity: 0.5 }]}>
                                        <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                    </View>
                                    : null
                            }
                        </View>
                        <View style={{ position: 'absolute', bottom: 14, right: 14 }}>
                            <UploadButton onPress={() => onImageUpload()} />
                        </View>
                    </View>
                    {
                        (createServiceR.error.bannerImageError != '')
                            ? <View style={{ marginTop: 4 }}>
                                <Text style={styles.error}>{createServiceR.error.bannerImageError}</Text>
                            </View>
                            : null
                    }
                    <View style={{ height: 18 }}></View>
                    <View>
                        <Text style={styles.title}>Name</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            value={createServiceR.serviceName}
                            placeholder='Give it a name'
                            errorText={createServiceR.error.nameError}
                            onChangeText={(name) => onNameChange(name)}
                        />
                    </View>
                    <View style={{ height: 24 }}></View>
                    <View>
                        <Text style={styles.title}>Short Description</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            value={createServiceR.serviceDescription}
                            placeholder='A little something to get people intigued'
                            errorText={createServiceR.error.descriptionError}
                            onChangeText={(desc) => onChangeDescription(desc)}
                        />
                        <View style={{ height: 8 }}></View>
                        <Text style={styles.wordCount}>{createServiceR.serviceDescription.length}/250</Text>
                    </View>
                    <View style={{ marginVertical: 24 }}>
                        <CommonDivider />
                    </View>
                    {
                        createServiceR.serviceType == AddServiceType.EVENT
                            ? <AddEventDetails />
                            : createServiceR.serviceType == AddServiceType.DIGITAL_PRODUCT
                                ? <AddProductDetails />
                                : createServiceR.serviceType == AddServiceType.CALL
                                    ? <AddMeetingDetails />
                                    : createServiceR.serviceType == AddServiceType.CHAT
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
                            selectedButton={createServiceR.servicePaymentType}
                            onPress={(value) => onPaymentTypeSelection(value)}
                        />
                        <View style={{ height: 24 }}></View>
                        <Text style={styles.title}>Price</Text>
                        <View style={{ height: 8 }}></View>
                        <PriceTextInput
                            placeholder='0'
                            errorText={createServiceR.error.priceError}
                            value={createServiceR.amount}
                            editable={createServiceR.servicePaymentType == 'Paid' ? true : false}
                            onChangeText={(price) => onPriceChange(price)}
                        />
                    </View>
                    <View style={{ height: 48 }}></View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateServiceScreen

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