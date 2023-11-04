import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import AppColors from '../../constants/AppColors';
import FontFamily from '../../constants/FontFamily';

interface SnackbarProps {
    message: string,
    position: SnackbarPosition,
    visible: boolean
}

export enum SnackbarPosition {
    TOP = 'top',
    BOTTOM = 'bottom'
}

const CommonSnackbar = (props: SnackbarProps) => {
    const { message, position, visible } = props;

    const animatedValue = useRef(new Animated.Value(0))

    const showSnackbar = () => {
        Animated.timing(
            animatedValue.current,
            {
                toValue: 1,
                useNativeDriver: false
            }).start();
    }

    const hideSnackbar = () => {
        Animated.timing(
            animatedValue.current,
            {
                toValue: 0,
                useNativeDriver: false
            }).start();
    }

    useEffect(() => {
        visible ? showSnackbar() : hideSnackbar()
    }, [visible])

    return (
        <Animated.View
            style={[
                styles.snackbar,
                {
                    [position]: animatedValue.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-200, 10],
                    }),
                },
            ]}>
            <View style={styles.content}>
                <Text style={styles.textStyle}>{message}</Text>
            </View>
        </Animated.View>
    )
}

export default CommonSnackbar

const styles = StyleSheet.create({
    snackbar: {
        position: 'absolute',
        width: '100%',
        // top: 0,
        alignContent: 'center',
        height: 60,
    },
    content: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: AppColors.GREEN2,
        borderRadius: 16
    },
    textStyle: {
        color: AppColors.WHITE,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})