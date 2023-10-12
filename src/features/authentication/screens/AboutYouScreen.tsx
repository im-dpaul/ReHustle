import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import CommonButton from '../../../components/buttons/CommonButton';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import CommonDivider from '../../../components/divider/CommonDivider';
import HeaderStepper from '../components/HeaderStepper';
import AppColors from '../../../constants/AppColors';
import AddSocialProfile from '../components/AddSocialProfileLinks';
import NameInput from '../components/NameInput';
import LinkWithDescription from '../components/LinkWithDescription';
import SocialProfilesList from '../components/SocialProfilesList';
import AddCustomLinkList from '../components/AddCustomLinkList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { addName, skipAboutYou, addProfileLinks, clearData } from '../redux/aboutYouSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageKeys from '../../../constants/StorageKeys';

type AboutYouProps = NativeStackScreenProps<RootStackParamList, 'AboutYou'>;

function AboutYouScreen({ navigation }: AboutYouProps): JSX.Element {
    const aboutYouReducer = useSelector((state: any) => state.aboutYou);
    const dispatch = useDispatch<AppDispatch>();
    const [err, setError] = useState('');

    // console.log('About You store', aboutYouReducer);

    const onChangeNameField = (name: string) => {
        dispatch(addName(name));
    }

    const onContinueTap = async () => {
        let name = ''
        if (aboutYouReducer.name != '') {
            name = aboutYouReducer.name;
        }
        else {
            const val = await LocalStorage.GetData(StorageKeys.NAME);
            if (val != null) {
                name = val;
            }
        }
        if (name == '') {
            setError('Name is required');
        }
        else {
            setError('');
            dispatch(addProfileLinks());
        }
    }

    const skipBtnTap = () => {
        dispatch(skipAboutYou());
        navigation.replace('AddServices');
    }

    useEffect(() => {
        if (aboutYouReducer.data != null) {
            if (aboutYouReducer.data.message == "OK") {
                navigation.replace('AddServices');
                dispatch(clearData(null));
            }
        }
    }, [aboutYouReducer.data])

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='About you' step={2} skipButton={true} skipBtnTap={skipBtnTap} />
                    <CommonDivider />
                </View>
                <ScrollView>
                    <View style={[styles.mainBody,]}>
                        <NameInput errorText={err} onNameChange={((value) => onChangeNameField(value))} />
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
                            aboutYouReducer.loading
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
});

export default AboutYouScreen;
