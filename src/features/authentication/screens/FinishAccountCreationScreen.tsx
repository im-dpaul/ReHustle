import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppColors from '../../../constants/AppColors';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import HeaderStepper from '../components/HeaderStepper';
import CommonDivider from '../../../components/divider/CommonDivider';
import { CelebrationEmoji, DancingEmoji } from '../../../../assets/images';
import ProfileLinkAndDescription from '../components/ProfileLinkAndDescription';
import CommonButton from '../../../components/buttons/CommonButton';
import CopyLinkButton from '../../../components/buttons/CopyLinkButton';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageDataTypes from '../../../constants/StorageDataTypes';
import { finishCreation, clearData } from "../redux/finishAccountCreationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store'
import Clipboard from '@react-native-community/clipboard';

type FinishAccountCreationProps = NativeStackScreenProps<RootStackParamList, 'FinishAccountCreation'>;

function FinishAccountCreationScreen({ navigation }: FinishAccountCreationProps): JSX.Element {

    const finishCreationReducer = useSelector((state: any) => state.finishAccountCreation);
    const dispatch = useDispatch<AppDispatch>();

    // console.log('FinishAccountCreation', finishCreationReducer);

    const [userName, setUserName] = useState('rehustle.co/');
    LocalStorage.GetData(StorageDataTypes.USER_NAME).then((value) => {
        let localVal = 'rehustle.co/';
        if (value != null) {
            localVal = `rehustle.co/${value}`;
        }
        setUserName(localVal);
    });

    const onFinishTap = () => {
        dispatch(finishCreation());
    }

    const skipBtnTap = () => {
        // navigation.popToTop()
        // navigation.replace('Services');
    }

    const copyLink = () => {
        Clipboard.setString(`${userName}`)
    }

    useEffect(() => {
        if (finishCreationReducer.data != null) {
            if (finishCreationReducer.data._id != "") {
                navigation.replace('Services');
                dispatch(clearData(null));
            }
        }
    }, [finishCreationReducer.data])

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='You’re all set !' step={4} textSuffixImage={CelebrationEmoji} skipButton={false} skipBtnTap={() => skipBtnTap()} />
                    <CommonDivider />
                </View>
                <View style={styles.mainBody}>
                    <View style={{ marginVertical: 24 }}>
                        <Image style={styles.imageStyle} source={DancingEmoji} />
                    </View>
                    <ProfileLinkAndDescription linkUrl={userName} />
                    <View style={{ height: 24 }}></View>
                    <CopyLinkButton onCopyLink={copyLink} />
                </View>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            finishCreationReducer.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Finish' onPress={onFinishTap} />
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
        color: AppColors.WHITE,
        flex: 1,
        alignItems: 'center',
    },
    imageStyle: {
        height: 150,
        width: 150,
    },
});

export default FinishAccountCreationScreen;
