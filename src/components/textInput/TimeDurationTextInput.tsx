import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import AppColors from '../../constants/AppColors'
import FontFamily from '../../constants/FontFamily'

const TimeDurationTextInput = (
    props: {
        placeholder: string,
        value: string,
        errorText?: string,
        onChangeText: ((text: string) => void)
    }
) => {

    const [focus, setFocus] = useState(false);

    return (
        <View style={[styles.textBox, focus ? { borderColor: AppColors.GRAY4 } : {},]}>
            <TextInput

                style={[
                    styles.textInputBox,
                    ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
                ]}
                placeholder={props.placeholder}
                underlineColorAndroid={AppColors.TRANSPARENT}
                placeholderTextColor={AppColors.GRAY4}
                value={props.value}
                onChangeText={(value) => { props.onChangeText(value) }}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
            />
            <View style={styles.suffixTextBox}>
                <Text style={styles.suffixText}>minutes</Text>
            </View>
        </View>
    )
}

export default TimeDurationTextInput

const styles = StyleSheet.create({
    textBox: {
        flex: 1,
        flexDirection: "row",
        height: 44,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
        alignItems: "center"
    },
    textInputBox: {
        height: 40,
        color: AppColors.BLACK,
        paddingRight: 12,
        marginRight: 50
    },
    suffixTextBox: {
        marginLeft: 'auto',
        marginHorizontal: 8
    },
    suffixText: {
        color: AppColors.GRAY4,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
})