import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppColors from '../../constants/AppColors'
import FontFamily from '../../constants/FontFamily'
import { ArrowDown } from '../../../assets/images'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import moment from 'moment'

type CommonDateTimePickerProps = {
    date: string,
    time: string,
    onDateChange: (date: number) => void,
    onTimeChange: (time: number) => void
}

const CommonDateTimePicker = (props: CommonDateTimePickerProps): React.JSX.Element => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState<boolean>(false);
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')

    const onDateChange = (value: DateTimePickerEvent) => {
        setDatePickerVisibility(false)
        if (value.type == 'set') {
            props.onDateChange(value.nativeEvent.timestamp)
        }
    }

    const onTimeChange = (value: DateTimePickerEvent) => {
        setTimePickerVisibility(false)
        if (value.type == 'set') {
            props.onTimeChange(value.nativeEvent.timestamp)
        }
    }

    useEffect(() => {
        let d = moment(props.date).format('DD/MM/yyyy')
        let t = moment(props.time).format('hh:mm A')
        setDate(d)
        setTime(t)
    }, [props.date, props.time])

    return (
        <View>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.title}>Start time</Text>
            </View>
            <View style={{ height: 8 }}></View>
            <View style={styles.dataTimeRow}>
                <TouchableOpacity
                    onPress={() => setDatePickerVisibility(true)}
                    style={styles.itemBox}>
                    <Text style={styles.dateTimeText}>{date}</Text>
                    <ArrowDown style={styles.arrowStyle} />
                    {
                        isDatePickerVisible
                            ? <RNDateTimePicker
                                mode='date'
                                value={new Date(props.date)}
                                minimumDate={new Date()}
                                onChange={(date) => onDateChange(date)}
                            />
                            : null
                    }
                </TouchableOpacity>
                <View style={{ width: 1, backgroundColor: AppColors.GRAY6 }}></View>
                <TouchableOpacity
                    onPress={() => setTimePickerVisibility(true)}
                    style={styles.itemBox}>
                    <Text style={styles.dateTimeText}>{time}</Text>
                    <ArrowDown style={styles.arrowStyle} />
                    {
                        isTimePickerVisible
                            ? <RNDateTimePicker
                                mode='time'
                                display='spinner'
                                value={new Date(props.time)}
                                minimumDate={new Date()}
                                minuteInterval={15}
                                onChange={(date) => onTimeChange(date)}
                            />
                            : null
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CommonDateTimePicker

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: 'row'
    },
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
        flex: 1
    },
    dataTimeRow: {
        flexDirection: 'row',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
    },
    itemBox: {
        flex: 1,
        margin: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateTimeText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    arrowStyle: {
        maxWidth: 16,
        maxHeight: 16
    }
})