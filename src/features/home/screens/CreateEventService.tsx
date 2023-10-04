import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppColors from '../../../constants/AppColors'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import CreateServiceAppBar from '../components/CreateServiceAppBar'
import { RootStackParamList } from '../../../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HalfCalender, HalfStar } from '../../../../assets/images'
import FontFamily from '../../../constants/FontFamily'
import UploadButton from '../../../components/buttons/UploadButton'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import CommonDivider from '../../../components/divider/CommonDivider'
import PriceTextInput from '../../../components/textInput/PriceTextInput'
import { setName, setDescription, setPrice, clearData, setEventUrl, setPaymentType, setEventDuration, setDate, setTime, addNewService } from "../redux/createEventServiceSlice";
import { AppDispatch } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import ToggleTabButton from '../../../components/buttons/ToggleTabButton'
import TimeDurationTextInput from '../../../components/textInput/TimeDurationTextInput'
import DateTimePicker from '../../../components/dateTime/DateTimePicker'
import { StackActions } from '@react-navigation/native';

type CreateEventServiceProps = NativeStackScreenProps<RootStackParamList, 'CreateEventService'>

const CreateEventService = ({ navigation }: CreateEventServiceProps): JSX.Element => {
    const createEventServiceReducer = useSelector((state: any) => state.createEventService)
    const dispatch = useDispatch<AppDispatch>();

    // console.log("Create event service store", createEventServiceReducer);

    const onCreate = () => {
        dispatch(addNewService());
    }

    const onBackPress = () => {
        navigation.pop();
    }
    const onImageUpload = () => { }

    const onNameChange = (name: string) => {
        dispatch(setName(name));
    }

    const onChangeDescription = (desc: string) => {
        dispatch(setDescription(desc));
    }

    const onLinkChange = (url: string) => {
        dispatch(setEventUrl(url));
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
        if (createEventServiceReducer.servicePaymentType != type) {
            dispatch(setPaymentType(type))
        }
    }

    useEffect(() => {
        if (createEventServiceReducer.data != null) {
            if (createEventServiceReducer.data._id != '') {
                dispatch(clearData({}));
                navigation.navigate('Services', { refresh: true })
            }
        }
    }, [createEventServiceReducer.data])

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
                                        <Image style={{ height: 134, width: 216 }} source={HalfCalender} />
                                        <Image style={{ height: 42, width: 66, position: 'absolute' }} source={HalfStar} />
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
                            placeholder='Give it a name'
                            onChangeText={(name) => onNameChange(name)}
                        />
                    </View>
                    <View style={{ height: 24 }}></View>
                    <View>
                        <Text style={styles.title}>Short Description</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder='A little something to get people intigued'
                            onChangeText={(desc) => onChangeDescription(desc)}
                        />
                        <View style={{ height: 8 }}></View>
                        <Text style={styles.wordCount}>{createEventServiceReducer.serviceDescription.length}/250</Text>
                    </View>
                    <View style={{ marginVertical: 24 }}>
                        <CommonDivider />
                    </View>
                    <View>
                        <Text style={styles.title}>Video Event link (Zoom, Google Meet, Teams etc.)</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder='https://zoom.us/j/xxxxxxxxx'
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
                            value={createEventServiceReducer.serviceEventDuration}
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
                            selectedButton={createEventServiceReducer.servicePaymentType}
                            onPress={(value) => onPaymentTypeSelection(value)}
                        />
                        <View style={{ height: 24 }}></View>
                        <Text style={styles.title}>Price</Text>
                        <View style={{ height: 8 }}></View>
                        <PriceTextInput
                            placeholder='0'
                            value={createEventServiceReducer.servicePrice}
                            editable={createEventServiceReducer.servicePaymentType == 'Paid' ? true : false}
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
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'right'
    },
})