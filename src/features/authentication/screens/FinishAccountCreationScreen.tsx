import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AppColors from '../../../constants/AppColors';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import HeaderStepper from '../components/HeaderStepper';
import CommonDivider from '../../../components/divider/CommonDivider';
import ProfileLinkAndDescription from '../components/ProfileLinkAndDescription';
import CommonButton from '../../../components/buttons/CommonButton';
import CopyLinkButton from '../../../components/buttons/CopyLinkButton';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageKeys from '../../../constants/StorageKeys';
import { finishCreation, clearData, FinishAccountCreationState } from "../redux/finishAccountCreationSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store'
import Clipboard from '@react-native-community/clipboard';
import { DancingFigure, PartyingFace } from '../../../../assets/images';

type FinishAccountCreationProps = NativeStackScreenProps<RootStackParamList, 'FinishAccountCreation'>;

function FinishAccountCreationScreen({ navigation }: FinishAccountCreationProps): JSX.Element {

    const finishCreationR: FinishAccountCreationState = useSelector((state: any) => state.finishAccountCreation);
    const dispatch = useDispatch<AppDispatch>();

    // console.log('FinishAccountCreation', finishCreationR);

    const [userName, setUserName] = useState('rehustle.co/');
    LocalStorage.GetData(StorageKeys.USER_NAME).then((value) => {
        let localVal = 'rehustle.co/';
        if (value != null) {
            localVal = `rehustle.co/${value}`;
        }
        setUserName(localVal);
    });

    const onFinishTap = () => {
        dispatch(finishCreation());
    }

    const copyLink = () => {
        Clipboard.setString(`${userName}`)
    }

    useEffect(() => {
        if (finishCreationR.data != null) {
            navigation.replace('Services');
            dispatch(clearData());

        }
    }, [finishCreationR.data])

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper
                        title='You’re all set !'
                        step={4}
                        textSuffixImage={<View style={{ justifyContent: 'center' }}><PartyingFace /></View>}
                        skipButton={false} />
                    <CommonDivider />
                </View>
                <View style={styles.mainBody}>
                    <View style={{ marginVertical: 24 }}>
                        <DancingFigure style={styles.imageStyle} />
                    </View>
                    <ProfileLinkAndDescription linkUrl={userName} />
                    <View style={{ height: 24 }}></View>
                    <CopyLinkButton onCopyLink={copyLink} />
                </View>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        {
                            finishCreationR.loading
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
        maxHeight: 150,
        maxWidth: 150,
    },
});

export default FinishAccountCreationScreen;
