import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import CommonButton from '../../../components/buttons/CommonButton';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import CommonDivider from '../../../components/divider/CommonDivider';
import HeaderStepper from '../components/HeaderStepper';
import AppColors from '../../../constants/AppColors';
import AddSocialProfile from '../components/AddSocialProfileLinks';
import LinkWithDescription from '../components/LinkWithDescription';
import SocialProfilesList from '../components/SocialProfilesList';
import AddCustomLinkList from '../components/AddCustomLinkList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { addName, skipAboutYou, addProfileLinks, clearData, AboutYouState, checkValidation } from '../redux/aboutYouSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageKeys from '../../../constants/StorageKeys';
import CommonTextInput from '../../../components/textInput/CommonTextInput';
import FontFamily from '../../../constants/FontFamily';

type AboutYouProps = NativeStackScreenProps<RootStackParamList, 'AboutYou'>;

function AboutYouScreen({ navigation }: AboutYouProps): JSX.Element {
    const aboutYou: AboutYouState = useSelector((state: any) => state.aboutYou);
    const dispatch = useDispatch<AppDispatch>();

    // console.log('About You store', aboutYou);

    const onChangeNameField = (name: string) => {
        dispatch(addName(name));
    }

    const onContinueTap = () => {
        dispatch(checkValidation())
    }

    const skipBtnTap = () => {
        dispatch(skipAboutYou());
        navigation.replace('AddServices');
    }

    useEffect(() => {
        if (aboutYou.validated == true) {
            dispatch(addProfileLinks());
        }
    }, [aboutYou.validated])

    useEffect(() => {
        if (aboutYou.data != null) {
            navigation.replace('AddServices');
            dispatch(clearData());
        }
    }, [aboutYou.data])

    useEffect(() => {
        LocalStorage.GetData(StorageKeys.NAME).then((name) => {
            if (name != null) {
                dispatch(addName(name));
            }
        });
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='About you' step={2} skipButton={true} skipBtnTap={skipBtnTap} />
                    <CommonDivider />
                </View>
                <ScrollView>
                    <View style={[styles.mainBody,]}>
                        <View>
                            <Text style={styles.name}>Name</Text>
                            <View style={{ height: 8 }}></View>
                            <CommonTextInput
                                value={aboutYou.name}
                                errorText={aboutYou.error.nameError}
                                placeholder='Your Name'
                                onChangeText={(value) => { onChangeNameField(value) }}
                            />
                        </View>
                        <View style={{ height: 24 }}></View>
                        <AddSocialProfile />
                        <View style={{ height: 16 }}></View>
                        <SocialProfilesList />
                        <View style={{ height: 24 }}></View>
                        <LinkWithDescription />
                        <View style={{ height: 24 }}></View>
                        <AddCustomLinkList />
                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            aboutYou.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Continue' onPress={onContinueTap} />
                        }

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
        color: AppColors.WHITE
    },
    name: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default AboutYouScreen;
