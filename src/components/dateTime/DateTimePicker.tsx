import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../../constants/AppColors'
import FontFamily from '../../constants/FontFamily'
import { ArrowDown } from '../../../assets/images'

const DateTimePicker = (props: { onDateChange: (date: string) => void, onTimeChange: (time: string) => void, }): JSX.Element => {
    return (
        <View>
            <View style={styles.titleRow}>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.title}>Start time</Text>
            </View>
            <View style={{ height: 8 }}></View>
            <View style={styles.dataTimeRow}>
                <TouchableOpacity
                    onPress={() => props.onDateChange('01/01/2024')}
                    style={styles.itemBox}>
                    <Text style={styles.dateTimeText}>01/01/2024</Text>
                    <ArrowDown style={styles.arrowStyle} />
                </TouchableOpacity>
                <View style={{ width: 1, backgroundColor: AppColors.GRAY6 }}></View>
                <TouchableOpacity
                    onPress={() => props.onTimeChange('09:30 AM')}
                    style={styles.itemBox}>
                    <Text style={styles.dateTimeText}>09:30 AM</Text>
                    <ArrowDown style={styles.arrowStyle} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DateTimePicker

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