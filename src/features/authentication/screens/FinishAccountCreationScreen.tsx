import React from 'react';
import {
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

type FinishAccountCreationProps = NativeStackScreenProps<RootStackParamList, 'FinishAccountCreation'>;

function FinishAccountCreationScreen({ navigation }: FinishAccountCreationProps): JSX.Element {

    const onFinishTap = () => {
        navigation.popToTop()
        navigation.replace('Home');
    }

    const skipBtnTap = () => {
        navigation.popToTop()
        navigation.replace('Home');
    }

    const copyLink = () => { }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='You’re all set !' step={4} textSuffixImage={CelebrationEmoji} skipButton={true} skipBtnTap={() => skipBtnTap()} />
                    <CommonDivider />
                </View>
                <View style={styles.mainBody}>
                    <View style={{ marginVertical: 24 }}>
                        <Image style={styles.imageStyle} source={DancingEmoji} />
                    </View>
                    <ProfileLinkAndDescription linkUrl='rehustle.co/iamrc' />
                    <View style={{ height: 24 }}></View>
                    <CopyLinkButton onCopyLink={copyLink} />
                </View>
                <View>
                    <CommonDivider />
                    <View style={{ margin: 24 }}>
                        <CommonButton title='Finish' onPress={onFinishTap} />
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
