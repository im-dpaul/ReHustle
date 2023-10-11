import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '../../../constants/AppColors'
import FontFamily from '../../../constants/FontFamily'
import { NoServicesImage } from '../../../../assets/images/svg_index'

const NoServicesPresent = () => {
    return (
        <View style={styles.container}>
            <NoServicesImage style={styles.image} />
            <View style={{ height: 24 }}></View>
            <Text style={styles.title}>No services present</Text>
            <View style={{ height: 8 }}></View>
            <Text style={styles.subTitle}>Tap to Add services</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        minHeight: 238,
        minWidth: 238,
    },
    title: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    subTitle: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.NUNITO_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    }
})

export default NoServicesPresent
