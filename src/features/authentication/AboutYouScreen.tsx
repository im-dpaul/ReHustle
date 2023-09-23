import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import CommonButton from '../../components/buttons/CommonButton';
import CommonStatusBar from '../../components/layouts/CommonStatusBar';
import CommonDivider from '../../components/divider/CommonDivider';
import HeaderStepper from './components/HeaderStepper';
import AppColors from '../../constants/AppColors';
import AddSocialProfile from './components/AddSocialProfileLinks';
import NameInput from './components/NameInput';
import LinkWithDescription from './components/LinkWithDescription';
import SocialProfilesList from './components/SocialProfilesList';
import AddCustomLinkList from './components/AddCustomLinkList';

function AboutYouScreen(): JSX.Element {

    const onChangeNameField = (value: string) => { }

    const onContinueTap = () => { }

    const skipBtnTap = () => {

    }

    return (
        <View style={{ flex: 1 }}>
            <CommonStatusBar />
            <View style={{ flex: 1 }}>
                <View style={{ height: 72 }}>
                    <HeaderStepper title='About you' step={2} skipButton={true} skipBtnTap={skipBtnTap} />
                    <CommonDivider />
                </View>
                <ScrollView>
                    <View style={[styles.mainBody,]}>
                        <NameInput onNameChange={((value) => onChangeNameField(value))} />
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
        paddingVertical: 24,
        flex: 1,
        color: AppColors.WHITE
    },
});

export default AboutYouScreen;
