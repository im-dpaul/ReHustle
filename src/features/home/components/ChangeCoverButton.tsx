import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AppColors, FontFamily } from '../../../constants'

const ChangeCoverButton = (props: { onPress: () => void }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => { props.onPress() }}>
                <View style={styles.button}>
                    <Text style={styles.uploadImageText}>Change cover photo</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ChangeCoverButton

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: AppColors.WHITE,
        borderRadius: 4,
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