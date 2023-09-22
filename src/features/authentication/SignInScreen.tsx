import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import ReHustleTitle from '../../components/text/ReHustleTitle';
import SignInText from './components/SignInText';
import GoogleSignInButton from '../../components/buttons/GoogleSignInButton';
import SignUpWithEmailText from './components/SignUpWithEmailText';
import CommonTextInput from '../../components/textInput/CommonTextInput';
import RememberMe from './components/RememberMe';
import TextButton from '../../components/buttons/TextButton';
import CommonButton from '../../components/buttons/CommonButton';
import DontHaveAccountRegister from './components/DontHaveAccountRegister';
import CommonStatusBar from '../../components/layouts/CommonStatusBar';
import AppColors from '../../constants/AppColors';

function SignInScreen(): JSX.Element {

    const setRememberMe = (value: boolean) => {
        console.log(value);
    }

    const onChangeEmailField = (value: string) => {
        // console.log(value);
    }

    const onChangePasswordField = (value: string) => {
        // console.log(value);
    }

    const onGoogleSignIn = () => { }

    const onSignUp = () => { }

    const onRegisterTap = () => { }

    const onForgetPasswordTap = () => { }

    return (
        <SafeAreaView>
            <CommonStatusBar />
            <ScrollView>
                <View style={styles.mainBody}>
                    <ReHustleTitle />
                    <View style={{ height: 34 }}></View>
                    <SignInText />
                    <View style={{ marginVertical: 30 }}>
                        <GoogleSignInButton onPress={onGoogleSignIn} />
                    </View>
                    <SignUpWithEmailText signIn={true} />
                    <View style={{ height: 36 }}></View>
                    <CommonTextInput placeholder='Email address' onChangeText={((value) => onChangeEmailField(value))} />
                    <View style={{ height: 16 }}></View>
                    <CommonTextInput placeholder='Password' onChangeText={((value) => onChangePasswordField(value))} />
                    <View style={{ height: 18 }}></View>

                    <View style={styles.checkBoxRow}>
                        <RememberMe setRememberMe={((value) => setRememberMe(value))} />
                        <TextButton text='Forgot Password?' onPress={onForgetPasswordTap} />
                    </View>

                    <View style={{ marginVertical: 24 }}>
                        <CommonButton title='Sign In' onPress={onSignUp} />
                    </View>
                    <DontHaveAccountRegister onPress={onRegisterTap} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        paddingHorizontal: 24,
        paddingVertical: 38,
        flex: 1,
        color: AppColors.WHITE
    },
    checkBoxRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default SignInScreen;
