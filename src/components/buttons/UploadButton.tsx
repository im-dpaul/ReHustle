import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../../constants/AppColors'
import FontFamily from '../../constants/FontFamily'
import { UploadIcon } from '../../../assets/images/svg_index'

const UploadButton = (props: { onPress: () => void }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => { props.onPress() }}>
                <View style={styles.button}>
                    <UploadIcon style={{ maxHeight: 12, maxWidth: 12 }} />
                    <View style={{ width: 8 }}></View>
                    <Text style={styles.uploadImageText}>Upload Image</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default UploadButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: AppColors.WHITE,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    uploadImageText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_SEMIBOLD,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})