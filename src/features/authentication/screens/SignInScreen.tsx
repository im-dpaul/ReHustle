import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReHustleTitle from '../../../components/text/ReHustleTitle';
import SignInText from '../components/SignInText';
import GoogleSignInButton from './../../../components/buttons/GoogleSignInButton';
import SignUpWithEmailText from './.././components/SignUpWithEmailText';
import CommonTextInput from './../../../components/textInput/CommonTextInput';
import RememberMe from './.././components/RememberMe';
import TextButton from './../../../components/buttons/TextButton';
import CommonButton from '../../../components/buttons/CommonButton';
import DontHaveAccountRegister from './../components/DontHaveAccountRegister';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import AppColors from '../../../constants/AppColors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, setEmailAddress, setPassword, setRememberMe, clearData, SigninState, checkValidation } from '../redux/signInSlice';
import { AppDispatch } from '../../../app/store';
import FontFamily from '../../../constants/FontFamily';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignInScreen({ navigation, route }: SignInProps): JSX.Element {

    // let routeParams = route.params;
    // let fromHome: boolean;
    // if (routeParams != undefined) {
    //     fromHome = routeParams.fromHome;
    // }

    const dispatch = useDispatch<AppDispatch>();
    const signInR: SigninState = useSelector((state: any) => state.signIn);

    // console.log("Sign In store ", signInR);

    const changeRememberMe = (value: boolean) => {
        dispatch(setRememberMe(value));
    }

    const onChangeEmailField = (email: string) => {
        dispatch(setEmailAddress(email));
    }

    const onChangePasswordField = (password: string) => {
        dispatch(setPassword(password));
    }

    const onGoogleSignIn = () => { }

    const onSignIn = () => {
        dispatch(checkValidation())
    }

    useEffect(() => {
        if (signInR.validated == true) {
            dispatch(signIn());
        }
    }, [signInR.validated])

    useEffect(() => {
        if (signInR.data != null) {
            if (signInR.setupStage == 0) {
                navigation.replace('GetYourInfo');
            }
            else if (signInR.setupStage == 1) {
                navigation.replace('AboutYou');
            }
            else if (signInR.setupStage == 2) {
                navigation.replace('AddServices');
            }
            else if (signInR.setupStage == 3) {
                navigation.replace('FinishAccountCreation');
            }
            else if (signInR.setupStage == 4) {
                navigation.replace('Services');
            }
            dispatch(clearData());
        }
    }, [signInR.setupStage]);

    const onRegisterTap = () => {
        navigation.replace('CreateAccount')
        dispatch(clearData());
    }

    const onForgetPasswordTap = () => {
        navigation.replace('ForgetPassword')
        dispatch(clearData());
    }

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
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
                    <CommonTextInput
                        value={signInR.emailAddress}
                        placeholder='Email address'
                        errorText={signInR.error.emailError}
                        onChangeText={((value) => onChangeEmailField(value))}
                    />
                    <View style={{ height: 16 }}></View>
                    <CommonTextInput
                        value={signInR.password}
                        placeholder='Password'
                        errorText={signInR.error.passwordError}
                        onChangeText={((value) => onChangePasswordField(value))}
                    />
                    <View style={{ height: 18 }}></View>
                    <View style={styles.checkBoxRow}>
                        {/* <RememberMe setRememberMe={((value) => changeRememberMe(value))} /> */}
                        <TextButton text='Forgot Password?' onPress={onForgetPasswordTap} />
                    </View>
                    <View style={{ height: 24 }}></View>
                    {
                        signInR.loading
                            ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                            : <CommonButton title='Sign In' onPress={onSignIn} />
                    }
                    {
                        (signInR.error.message != '')
                            ? <View style={{ marginTop: 8 }}>
                                <Text style={styles.error}>{signInR.error.message}</Text>
                            </View>
                            : null
                    }
                    <View style={{ height: 24 }}></View>
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
        justifyContent: 'flex-end',
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
});

export default SignInScreen;
