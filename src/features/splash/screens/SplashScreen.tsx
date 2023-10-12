import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LocalStorage from '../../../data/local_storage/LocalStorage'
import StorageKeys from '../../../constants/StorageKeys'
import { SafeAreaView } from 'react-native-safe-area-context'
import CommonStatusBar from '../../../components/layouts/CommonStatusBar'
import ReHustleTitle from '../../../components/text/ReHustleTitle'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppColors from '../../../constants/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { SplashState, getUserData, userExists, clearData } from '../redux/splashSlice';
import { RehustleLogo } from '../../../../assets/images'

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashProps) => {

    const splash: SplashState = useSelector((state: any) => state.splash);
    const dispatch = useDispatch<AppDispatch>();
    // console.log("Splash store ", splash);

    let userExist: boolean | null = null;
    if (splash.userExist == null) {
        LocalStorage.GetData(StorageKeys.TOKEN).then((value) => {
            userExist = (value != null) ? true : false;
            dispatch(userExists(userExist));
        });
    }

    const goToPage = () => {
        if (splash.userExist == true) {
            dispatch(getUserData());
        }
        else {
            navigation.replace('SignIn');
            dispatch(clearData());
        }
    }

    useEffect(() => {
        if (splash.userExist != null) {
            goToPage();
        }
    }, [splash.userExist]);

    useEffect(() => {
        if (splash.userExist != null) {
            if (splash.setupStage == -1) {
                navigation.replace('SignIn');
            }
            else if (splash.setupStage == 0) {
                navigation.replace('GetYourInfo');
            }
            else if (splash.setupStage == 1) {
                navigation.replace('AboutYou');
            }
            else if (splash.setupStage == 2) {
                navigation.replace('AddServices');
            }
            else if (splash.setupStage == 3) {
                navigation.replace('FinishAccountCreation');
            }
            else if (splash.setupStage == 4) {
                navigation.replace('Services');
            }
            else {
                navigation.replace('SignIn');
            }
            dispatch(clearData());
        }
    }, [splash.setupStage]);

    // setTimeout(() => {
    //     if (userExist) {
    //         navigation.replace('Services');
    //     }
    //     else {
    //         navigation.replace('SignIn');
    //     }
    // }, 3000);

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 140, width: 140 }} source={RehustleLogo} />
                <View style={{ height: 24 }}></View>
                <ReHustleTitle />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})