import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../../constants/AppColors'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import CreateServiceAppBar from '../components/CreateServiceAppBar'
import { RootStackParamList } from '../../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontFamily from '../../../constants/FontFamily'
import UploadButton from '../../../components/buttons/UploadButton'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import CommonDivider from '../../../components/divider/CommonDivider'
import PriceTextInput from '../../../components/textInput/PriceTextInput'
import { setName, setDescription, setPrice, clearData, setEventUrl, setPaymentType, setEventDuration, setDate, setTime, addNewService, CreateEventServiceState, checkValidation } from "../redux/createEventServiceSlice";
import { AppDispatch } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import ToggleTabButton from '../../../components/buttons/ToggleTabButton'
import TimeDurationTextInput from '../../../components/textInput/TimeDurationTextInput'
import DateTimePicker from '../../../components/dateTime/DateTimePicker'
import { CalenderHalf, StarHalf } from '../../../../assets/images'

type CreateEventServiceProps = NativeStackScreenProps<RootStackParamList, 'CreateEventService'>

const CreateEventService = ({ navigation }: CreateEventServiceProps): React.JSX.Element => {
    const createEventServiceR: CreateEventServiceState = useSelector((state: any) => state.createEventService)
    const dispatch = useDispatch<AppDispatch>();

    console.log("Create event service store", createEventServiceR);

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

    const onLinkChange = (url: string) => {
        dispatch(setEventUrl(url))
    }

    const onPriceChange = (price: string) => {
        dispatch(setPrice(price))
    }

    const onDateChange = (date: string) => {
        dispatch(setDate(date))
    }

    const onTimeChange = (time: string) => {
        dispatch(setTime(time))
    }

    const onDurationChange = (duration: string) => {
        dispatch(setEventDuration(duration))
    }

    const onPaymentTypeSelection = (type: string) => {
        if (createEventServiceR.servicePaymentType != type) {
            dispatch(setPaymentType(type))
        }
    }

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
                title='Organise an event'
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
                                    ?
                                    <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginTop: 'auto' }}>
                                        <CalenderHalf style={{ maxHeight: 134, maxWidth: 216 }} />
                                        <StarHalf style={{ maxHeight: 42, maxWidth: 66, position: 'absolute' }} />
                                    </View>
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
                    <View>
                        <Text style={styles.title}>Video Event link (Zoom, Google Meet, Teams etc.)</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            value={createEventServiceR.serviceEventUrl}
                            placeholder='https://zoom.us/j/xxxxxxxxx'
                            errorText={createEventServiceR.error.eventLinkError}
                            onChangeText={(url) => onLinkChange(url)}
                        />
                    </View>
                    <View style={{ marginVertical: 24 }}>
                        <CommonDivider />
                    </View>
                    <View>
                        <Text style={[styles.title, { fontSize: 14 }]}>Time and date</Text>
                        <View style={{ height: 8 }}></View>
                        <DateTimePicker
                            onDateChange={(date) => onDateChange(date)}
                            onTimeChange={(time) => onTimeChange(time)}
                        />
                        <View style={{ height: 24 }}></View>
                        <Text style={styles.title}>Duration</Text>
                        <View style={{ height: 8 }}></View>
                        <TimeDurationTextInput
                            placeholder=''
                            errorText={createEventServiceR.error.durationError}
                            value={createEventServiceR.serviceEventDuration}
                            onChangeText={(duration) => onDurationChange(duration)}
                        />
                    </View>
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