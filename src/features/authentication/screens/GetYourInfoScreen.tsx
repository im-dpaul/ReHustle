import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, } from 'react-native';
import CommonButton from '../../../components/buttons/CommonButton';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import CommonDivider from '../../../components/divider/CommonDivider';
import HeaderStepper from '../components/HeaderStepper';
import AppColors from '../../../constants/AppColors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import TwitterProfileWithDescription from '../components/TwitterProfileWithDescription';
import FontFamily from '../../../constants/FontFamily';
import { AppDispatch } from '../../../app/store';
import { GetYourInfoState, addTwitterProfile, getTwitterProfile, saveProfile, skipProfile, clearData } from '../redux/getYourInfoSlice';
import TextInputWithIcon from '../../../components/textInput/TextInputWithIcon';
import { TwitterIcon } from '../../../../assets/images';

type GetYourInfoProps = NativeStackScreenProps<RootStackParamList, 'GetYourInfo'>;

function GetYouInfoScreen({ navigation }: GetYourInfoProps): JSX.Element {
    const getYourInfo: GetYourInfoState = useSelector((state: any) => state.getYourInfo);
    const dispatch = useDispatch<AppDispatch>();

    // console.log("getYourInfo store ", getYourInfo);

    const onChangeTwitterProfile = (value: string) => {
        dispatch(addTwitterProfile(value));
        dispatch(getTwitterProfile());
    }

    const onContinueTap = () => {
        dispatch(saveProfile());
    }

    const skipBtnTap = async () => {
        dispatch(skipProfile());
        navigation.replace('AboutYou');
        dispatch(clearData())
    }

    useEffect(() => {
        if (getYourInfo.data != null) {
            navigation.replace('AboutYou');
            dispatch(clearData())
        }
    }, [getYourInfo.data])

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='Get your information' step={1} skipButton={true} skipBtnTap={skipBtnTap} />
                    <CommonDivider />
                </View>
                <ScrollView>
                    <View style={[styles.mainBody,]}>
                        <TwitterProfileWithDescription />
                        <View style={{ height: 24 }}></View>
                        <Text style={styles.twitterText}>Twitter</Text>
                        <View style={{ height: 8 }}></View>
                        <TextInputWithIcon
                            placeholder='https://twitter.com/'
                            value={getYourInfo.twitterProfile}
                            errorText={getYourInfo.error.twitterApiError}
                            prefixIcon={
                                <View>
                                    <TwitterIcon style={styles.prefixIconStyle} />
                                </View>
                            }
                            onChangeText={(val) => { onChangeTwitterProfile(val) }}
                        />
                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            getYourInfo.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Continue' onPress={onContinueTap} />
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 24,
        flex: 1,
        color: AppColors.WHITE
    },
    twitterText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    prefixIconStyle: {
        maxHeight: 28,
        maxWidth: 28
    }
});

export default GetYouInfoScreen;
