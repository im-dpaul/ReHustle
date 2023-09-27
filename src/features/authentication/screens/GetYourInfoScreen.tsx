import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CommonButton from '../../../components/buttons/CommonButton';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import CommonDivider from '../../../components/divider/CommonDivider';
import HeaderStepper from '../components/HeaderStepper';
import AppColors from '../../../constants/AppColors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import TwitterProfileWithDescription from '../components/TwitterProfileWithDescription';
import CustomTextInput from '../../../components/textInput/CustomTextInput';
import { TwitterIcon } from '../../../../assets/images';
import FontFamily from '../../../constants/FontFamily';
import { AppDispatch } from '../../../app/store';
import { addTwitterProfile, getTwitterProfile, saveProfile } from '../redux/getYourInfoSlice';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageDataTypes from '../../../constants/StorageDataTypes';

type GetYourInfoProps = NativeStackScreenProps<RootStackParamList, 'GetYourInfo'>;

function GetYouInfoScreen({ navigation }: GetYourInfoProps): JSX.Element {
    const getYourInfoReducer = useSelector((state: any) => state.getYourInfo);
    const dispatch = useDispatch<AppDispatch>();

    // console.log("getYourInfo store ", getYourInfoReducer);

    const onChangeTwitterProfile = (value: string) => {
        let itemList = (value.split('/'));
        let userName = itemList.at(itemList.length - 1);
        dispatch(addTwitterProfile(userName));
        dispatch(getTwitterProfile());
    }

    const onContinueTap = () => {
        dispatch(saveProfile());
    }

    const skipBtnTap = async () => {
        await LocalStorage.SetData(StorageDataTypes.PROFILE_IMAGE, "");
        navigation.push('AboutYou');
    }

    useEffect(() => {
        if (getYourInfoReducer.data != null) {
            if (getYourInfoReducer.data._id != null) {
                navigation.replace('AboutYou');
            }
        }
    }, [getYourInfoReducer.data])

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
                        <CustomTextInput
                            onChangeText={(val) => { onChangeTwitterProfile(val) }}
                            placeholder='https://twitter.com/'
                            initialValue='https://twitter.com/'
                            prefixIcon={TwitterIcon}
                        />
                    </View>
                </ScrollView>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            getYourInfoReducer.loading
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
});

export default GetYouInfoScreen;
