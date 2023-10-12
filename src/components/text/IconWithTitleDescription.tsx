import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '../../constants/AppColors'
import FontFamily from '../../constants/FontFamily'

const IconWithTitleDescription = (props: { title: string, description: string, imageIcon: any, active?: boolean }) => {
    return (
        <View style={styles.container}>
            <View style={styles.prefixIcon}>
                {
                    props.imageIcon
                }
            </View>
            <View style={{ marginLeft: 14 }}>
                <Text style={[styles.titleText, props.active == true ? { color: AppColors.IRIS, } : {}]}>{props.title}</Text>
                <View style={{ height: 2 }}></View>
                <Text style={styles.descriptionText}>{props.description}</Text>
            </View>
        </View>
    )
}

export default IconWithTitleDescription

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    prefixIcon: {
        height: 24,
        width: 24,
    },
    titleText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    descriptionText: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.NUNITO_REGULAR,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400'
    },
})