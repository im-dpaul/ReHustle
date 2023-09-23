import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import CommonButton from '../../components/buttons/CommonButton';
import CommonStatusBar from '../../components/layouts/CommonStatusBar';
import CommonDivider from '../../components/divider/CommonDivider';
import HeaderStepper from './components/HeaderStepper';
import AppColors from '../../constants/AppColors';
import { CelebrationEmoji, DancingEmoji, Link2, } from '../../../assets/images';
import CopyLinkButton from '../../components/buttons/CopyLinkButton';
import ProfileLinkAndDescription from './components/ProfileLinkAndDescription';

function FinishAccountCreationScreen(): JSX.Element {

    const onContinueTap = () => { }

    const skipBtnTap = () => { }

    const copyLink = () => { }

    return (
        <View style={{ flex: 1 }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 72 }}>
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
                        <CommonButton title='Continue' onPress={onContinueTap} />
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
