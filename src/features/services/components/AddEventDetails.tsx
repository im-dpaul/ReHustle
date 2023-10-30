import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonDateTimePicker } from '../../../components'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import TimeDurationTextInput from '../../../components/textInput/TimeDurationTextInput'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { CreateServiceState, setDate, setEventDuration, setEventUrl, setTime } from '../redux/createServiceSlice'
import { AppColors, FontFamily } from '../../../constants'

const AddEventDetails = () => {
    const createServiceR: CreateServiceState = useSelector((state: any) => state.createService)
    const dispatch = useDispatch<AppDispatch>();

    const onDateChange = (date: number) => {
        dispatch(setDate(date))
    }

    const onTimeChange = (time: number) => {
        dispatch(setTime(time))
    }

    const onDurationChange = (duration: string) => {
        dispatch(setEventDuration(duration))
    }

    const onLinkChange = (url: string) => {
        dispatch(setEventUrl(url))
    }

    return (
        <View>
            <View>
                <Text style={styles.title}>Video Event link (Zoom, Google Meet, Teams etc.)</Text>
                <View style={{ height: 8 }}></View>
                <CommonTextInput
                    value={createServiceR.serviceEventUrl}
                    placeholder='https://zoom.us/j/xxxxxxxxx'
                    errorText={createServiceR.error.eventLinkError}
                    onChangeText={(url) => onLinkChange(url)}
                />
            </View>
            <View style={{ marginVertical: 24 }}>
                <CommonDivider />
            </View>
            <View>
                <Text style={[styles.title, { fontSize: 14 }]}>Time and date</Text>
                <View style={{ height: 8 }}></View>
                <CommonDateTimePicker
                    date={createServiceR.serviceDate}
                    time={createServiceR.serviceTime}
                    onDateChange={(date) => onDateChange(date)}
                    onTimeChange={(time) => onTimeChange(time)}
                />
                <View style={{ height: 24 }}></View>
                <Text style={styles.title}>Duration</Text>
                <View style={{ height: 8 }}></View>
                <TimeDurationTextInput
                    placeholder=''
                    errorText={createServiceR.error.durationError}
                    value={createServiceR.serviceEventDuration}
                    onChangeText={(duration) => onDurationChange(duration)}
                />
            </View>
        </View>
    )
}

export default AddEventDetails

const styles = StyleSheet.create({
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
})