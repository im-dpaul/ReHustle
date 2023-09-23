import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import GoogleSignInButton from '../../components/buttons/GoogleSignInButton';
import SignUpWithEmailText from './components/SignUpWithEmailText';
import CommonTextInput from '../../components/textInput/CommonTextInput';
import CommonButton from '../../components/buttons/CommonButton';
import AlreadyHaveAccountLogin from './components/AlreadyHaveAccountLogin';
import CreateRehustleLink from './components/CreateRehustleLink';
import RehustleTextAndDescription from './components/RehustleTextAndDescription';
import CommonStatusBar from '../../components/layouts/CommonStatusBar';
import CommonDivider from '../../components/divider/CommonDivider';
import HeaderStepper from './components/HeaderStepper';
import AppColors from '../../constants/AppColors';

function CreateAccountScreen(): JSX.Element {

    const onChangeEmailField = (value: string) => {
        // console.log(value);
    }

    const onChangePasswordField = (value: string) => {
        // console.log(value);
    }

    const onChangeLinkField = (value: string) => {
        // console.log(value);
    }

    const onGoogleSignIn = () => { }

    const onSignUp = () => { }

    const onLoginTap = () => { }

    return (
        <SafeAreaView>
            <CommonStatusBar />
            <ScrollView>
                <View>
                    <HeaderStepper title='Create your account' step={1} />
                    <CommonDivider />
                </View>
                <View style={styles.mainBody}>
                    <View style={{ height: 24 }}></View>
                    <RehustleTextAndDescription />
                    <View style={{ height: 18 }}></View>
                    <CreateRehustleLink onChangeText={((value) => onChangeLinkField(value))} />
                    <View style={{ height: 22 }}></View>
                    <View style={{ marginVertical: 30 }}>
                        <GoogleSignInButton onPress={onGoogleSignIn} />
                    </View>
                    <SignUpWithEmailText signIn={false} />
                    <View style={{ height: 36 }}></View>
                    <CommonTextInput placeholder='Email address' onChangeText={((value) => onChangeEmailField(value))} />
                    <View style={{ height: 16 }}></View>
                    <CommonTextInput placeholder='Password' onChangeText={((value) => onChangePasswordField(value))} />
                    <View style={{ marginVertical: 24 }}>
                        <CommonButton title='Sign In' onPress={onSignUp} />
                    </View>
                    <AlreadyHaveAccountLogin onPress={onLoginTap} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingBottom: 38,
        flex: 1,
        color: AppColors.WHITE
    },
});

export default CreateAccountScreen;
