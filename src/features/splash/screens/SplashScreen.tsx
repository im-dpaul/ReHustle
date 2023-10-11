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
import { getUserData, userExists } from '../redux/splashSlice';
import { RehustleLogo } from '../../../../assets/images/svg_index'

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: SplashProps) => {

    const splashReducer = useSelector((state: any) => state.splash);
    const dispatch = useDispatch<AppDispatch>();
    // console.log("Splash store ", splashReducer);

    let userExist: any = null;
    if (splashReducer.userExist == null) {
        LocalStorage.GetData(StorageKeys.TOKEN).then((value) => {
            userExist = (value != null) ? true : false;
            dispatch(userExists(userExist));
        });
    }
    const goToPage = () => {
        if (splashReducer.userExist == true) {
            dispatch(getUserData());
        }
        else if (splashReducer.userExist == false) {
            navigation.replace('SignIn');
        }
    }

    useEffect(() => {
        goToPage();
    }, [splashReducer.userExist]);

    useEffect(() => {
        if (splashReducer.userExist != null && splashReducer.setupStage != null) {
            if (splashReducer.setupStage == '') {
                navigation.replace('SignIn');
            }
            else if (splashReducer.setupStage == '0') {
                navigation.replace('GetYourInfo');
            }
            else if (splashReducer.setupStage == '1') {
                navigation.replace('AboutYou');
            }
            else if (splashReducer.setupStage == '2') {
                navigation.replace('AddServices');
            }
            else if (splashReducer.setupStage == '3') {
                navigation.replace('FinishAccountCreation');
            }
            else if (splashReducer.setupStage == '4') {
                navigation.replace('Services');
            }
            else {
                navigation.replace('SignIn');
            }
        }
    }, [splashReducer.setupStage]);

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