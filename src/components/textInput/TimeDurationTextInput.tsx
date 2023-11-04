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
        <View>
            <View style={[
                styles.textBox,
                focus ? { borderColor: AppColors.GRAY4 } : {},
                ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
            ]}>
                <TextInput
                    style={styles.textInputBox}
                    placeholder={props.placeholder}
                    underlineColorAndroid={AppColors.TRANSPARENT}
                    placeholderTextColor={AppColors.GRAY4}
                    value={props.value}
                    keyboardType='numeric'
                    onChangeText={(value) => { props.onChangeText(value) }}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}
                />
                <View style={styles.suffixTextBox}>
                    <Text style={styles.suffixText}>minutes</Text>
                </View>
            </View>
            {
                ((props.errorText ?? 0) != 0)
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.error}>{props.errorText}</Text>
                    </View>
                    : null
            }
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
        marginRight: 50,
        flex: 1
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
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})