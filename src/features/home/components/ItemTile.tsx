import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppColors from '../../../constants/AppColors'
import FontFamily from '../../../constants/FontFamily'
import { VideoIcon } from '../../../../assets/images'

const ItemTile = (props: { product: any }) => {

    return (
        <View style={styles.itemBox}>
            <VideoIcon style={{ height: 12, width: 12 }} />
            <View style={{ width: 12 }}></View>
            <View>
                <Text style={styles.titleText}>{props.product.title}</Text>
                <View style={{ height: 4 }}></View>
                <Text style={styles.typeText}>{props.product.type}</Text>
            </View>
            <View style={{ marginLeft: 'auto' }}>
                <Text style={[styles.typeText, { fontSize: 14 }]}>{props.product.sales} sales</Text>
            </View>
        </View>
    )
}

export default ItemTile

const styles = StyleSheet.create({
    itemBox: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    typeText: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
})