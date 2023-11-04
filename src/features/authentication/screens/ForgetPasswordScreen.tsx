import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import ReHustleTitle from '../../../components/text/ReHustleTitle'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import CommonButton from '../../../components/buttons/CommonButton'
import AppColors from '../../../constants/AppColors'
import FontFamily from '../../../constants/FontFamily'
import ResetPasswordText from '../components/ResetPasswordText'
import RememberPasswordLogin from '../components/RememberPasswordLogin'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../../app/store'
import { ForgetPasswordState, checkValidation, clearData, setEmailAddress, resetPassword, setSnackbar } from "../redux/forgetPasswordSlice";
import CommonSnackbar, { SnackbarPosition } from '../../../components/snackbar/CommonSnackbar'

type ForgetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgetPassword'>

const ForgetPasswordScreen = ({ navigation }: ForgetPasswordProps): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const forgetPasswordR: ForgetPasswordState = useSelector((state: any) => state.forgetPassword)
    // console.log('ForgetPassword store', forgetPasswordR);

    const onChangeEmailField = (email: string) => {
        dispatch(setEmailAddress(email));
    }

    const onSubmit = () => {
        dispatch(checkValidation())
    }

    const onLoginTap = () => {
        navigation.replace('SignIn')
        dispatch(clearData());
    }

    useEffect(() => {
        if (forgetPasswordR.validated == true) {
            dispatch(resetPassword())
        }
    }, [forgetPasswordR.validated])

    useEffect(() => {
        if (forgetPasswordR.data != null) {
            dispatch(clearData())
            setTimeout(() => {
                dispatch(setSnackbar({ visibility: false, message: '' }))
            }, 3000)
        }
    }, [forgetPasswordR.data])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <ScrollView>
                <View style={styles.mainBody}>
                    <ReHustleTitle />
                    <View style={{ height: 34 }}></View>
                    <ResetPasswordText />
                    <View style={{ height: 36 }}></View>
                    <CommonTextInput
                        value={forgetPasswordR.emailAddress}
                        placeholder='Email address'
                        errorText={forgetPasswordR.error.emailError}
                        onChangeText={((value) => onChangeEmailField(value))}
                    />
                    <View style={{ height: 18 }}></View>
                    {
                        forgetPasswordR.loading
                            ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                            : <CommonButton title='Submit' onPress={onSubmit} />
                    }
                    {
                        (forgetPasswordR.error.message != '')
                            ? <View style={{ marginTop: 8 }}>
                                <Text style={styles.error}>{forgetPasswordR.error.message}</Text>
                            </View>
                            : null
                    }
                    <View style={{ height: 24 }}></View>
                    <RememberPasswordLogin onPress={onLoginTap} />
                </View>
                <CommonSnackbar
                    message={forgetPasswordR.snackbarMessage}
                    position={SnackbarPosition.TOP}
                    visible={forgetPasswordR.snackbarVisiblity}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 38,
        flex: 1,
        color: AppColors.WHITE
    },
    checkBoxRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
})