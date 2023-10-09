import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CommonDivider from '../../../components/divider/CommonDivider'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import AppColors from '../../../constants/AppColors'
import MenuOptions from '../../../constants/MenuOptions'
import HomeAppBar from '../components/HomeAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../app/store'
import { setEmailAddress, updateBankDetails, setName, setIFSC, setAccNo, setVerifyAccNo, setValidation, clearData, setSnackbar } from "../redux/settingsSlice";
import FontFamily from '../../../constants/FontFamily'
import LocalStorage from '../../../data/local_storage/LocalStorage'
import StorageDataTypes from '../../../constants/StorageDataTypes'
import CommonButton from '../../../components/buttons/CommonButton'
import CommonTextInput from '../../../components/textInput/CommonTextInput'
import CommonSnackbar, { SnackbarPosition } from '../../../components/snackbar/CommonSnackbar'

const SettingsScreen = (): JSX.Element => {
    const settingsStore = useSelector((state: any) => state.settings);
    const dispatch = useDispatch<AppDispatch>()
    console.log('settings store: ', settingsStore);

    const setAcName = (name: string) => {
        dispatch(setName(name))
    }

    const setAcIFSC = (ifsc: string) => {
        dispatch(setIFSC(ifsc))
    }

    const setAccountNo = (acc: string) => {
        dispatch(setAccNo(acc))
    }

    const verifyAccountNo = (acc: string) => {
        dispatch(setVerifyAccNo(acc))
    }

    const saveDetails = () => {
        dispatch(setValidation())
    }

    useEffect(() => {
        LocalStorage.GetData(StorageDataTypes.EMAIL).then((value) => {
            if (value != null && value != undefined) {
                dispatch(setEmailAddress(value))
            }
        })
    }, [])

    useEffect(() => {
        if (settingsStore.validated == true) {
            dispatch(updateBankDetails())
        }
    }, [settingsStore.validated])

    useEffect(() => {
        if (settingsStore.data != null) {
            if (settingsStore.data.status == true) {
                dispatch(clearData())
                setTimeout(() => {
                    dispatch(setSnackbar(false))
                }, 3000)
            }
        }
    }, [settingsStore.data])

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ height: 74 }}>
                <HomeAppBar
                    title={MenuOptions.SETTINGS} />
                <CommonDivider />
            </View>
            <View style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
                <ScrollView>
                    <View style={styles.main}>
                        <Text style={[styles.title, { fontSize: 14, color: AppColors.GRAY1 }]}>Bank Account Information</Text>
                        <View style={{ height: 16 }}></View>
                        <Text style={styles.title}>Account Holder Name</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder='Account Holder Name'
                            errorText={settingsStore.error.nameError}
                            onChangeText={(name) => { setAcName(name) }}
                        />
                        <View style={{ height: 16 }}></View>
                        <Text style={styles.title}>IFSC Code</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder='IFSC Code'
                            errorText={settingsStore.error.ifscError}
                            onChangeText={(ifsc) => { setAcIFSC(ifsc) }}
                        />
                        <View style={{ height: 16 }}></View>
                        <Text style={styles.title}>Account Number</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder='Account Number'
                            errorText={settingsStore.error.accountNoError}
                            onChangeText={(acc) => { setAccountNo(acc) }}
                        />
                        <View style={{ height: 16 }}></View>
                        <Text style={styles.title}>Verify Account Number</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder='Verify Account Number'
                            errorText={settingsStore.error.verifyAccountNoError}
                            onChangeText={(acc) => { verifyAccountNo(acc) }}
                        />
                        <View style={{ height: 24 }}></View>
                        <Text style={[styles.title, { fontSize: 14, color: AppColors.GRAY1 }]}>ReHustle Account</Text>
                        <View style={{ height: 16 }}></View>
                        <Text style={styles.title}>Registered Email</Text>
                        <View style={{ height: 8 }}></View>
                        <CommonTextInput
                            placeholder={settingsStore.emailAddress}
                            editable={false}
                            onChangeText={() => { }}
                        />
                        <View style={{ height: 8 }}></View>
                        <Text style={[styles.title, { color: AppColors.GRAY4 }]}>Registered email cannot be changed. Please reachout to hello@rehustle.co for further details.</Text>
                        {
                            settingsStore.error.message != ''
                                ? <View>
                                    <View style={{ height: 16 }}></View>
                                    <Text style={styles.error}>{settingsStore.error.message}</Text>
                                </View>
                                : null
                        }
                        <View style={{ height: 24 }}></View>
                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            settingsStore.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Save changes' onPress={saveDetails} />
                        }
                    </View>
                </View>
                <CommonSnackbar
                    message='Updated Successfully!'
                    position={SnackbarPosition.TOP}
                    visible={settingsStore.showSnackbar}
                />
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    main: {
        margin: 24,
    },
    title: {
        color: AppColors.GRAY2,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
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