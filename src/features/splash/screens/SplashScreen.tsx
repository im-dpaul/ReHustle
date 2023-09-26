import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LocalStorage from '../../../data/local_storage/LocalStorage'
import StorageDataTypes from '../../../constants/StorageDataTypes'
import { SafeAreaView } from 'react-native-safe-area-context'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import ReHustleTitle from '../../../components/text/ReHustleTitle'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppColors from '../../../constants/AppColors'

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashProps) => {
    let userExist = false;
    LocalStorage.GetData(StorageDataTypes.TOKEN).then((value) => {
        if ((value ?? '').length != 0) {
            userExist = true;
        }
    });

    setTimeout(() => {
        if (userExist) {
            navigation.replace('Home');
        }
        else {
            navigation.replace('SignIn');
        }
    }, 3000);

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ReHustleTitle />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})