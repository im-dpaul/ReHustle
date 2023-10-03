import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppColors from '../../constants/AppColors'
import FontFamily from '../../constants/FontFamily'

const ToggleTabButton = (props: { firstButtonName: string, secondButtonName: string, selectedButton: string, onPress: (value: string) => void }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => props.onPress(props.firstButtonName)}
                        style={[
                            styles.firstButton,
                            (props.selectedButton == props.firstButtonName)
                                ? { backgroundColor: AppColors.PRIMARY_COLOR }
                                : {}
                        ]}>
                        <Text
                            style={
                                (props.selectedButton == props.firstButtonName)
                                    ? styles.selectedButtonTitle
                                    : styles.buttonTitle
                            }>
                            {props.firstButtonName}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => props.onPress(props.secondButtonName)}
                        style={[
                            styles.secondButton,
                            (props.selectedButton == props.secondButtonName)
                                ? { backgroundColor: AppColors.PRIMARY_COLOR }
                                : {}
                        ]}>
                        <Text style={
                            (props.selectedButton == props.secondButtonName)
                                ? styles.selectedButtonTitle
                                : styles.buttonTitle
                        }>
                            {props.secondButtonName}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ToggleTabButton

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 4,
        borderColor: AppColors.GRAY6,
        borderWidth: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstButton: {
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    secondButton: {
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },
    buttonTitle: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    selectedButtonTitle: {
        color: AppColors.WHITE,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})