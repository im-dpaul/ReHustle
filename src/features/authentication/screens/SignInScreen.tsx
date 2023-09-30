import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
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
import { signIn, setEmailAddress, setPassword, setRememberMe, clearData } from '../redux/signInSlice';
import { AppDispatch } from '../../../app/store';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignInScreen({ navigation, route }: SignInProps): JSX.Element {

    let routeParams = route.params;
    let fromHome: boolean;
    if (routeParams != undefined) {
        fromHome = routeParams.fromHome;
    }

    const dispatch = useDispatch<AppDispatch>();
    const signInReducer = useSelector((state: any) => state.signIn);

    // console.log("Sign In store ", signInReducer);

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
        dispatch(signIn());
    }

    useEffect(() => {

        if (signInReducer.data != null) {
            if (signInReducer.data.message == "OK") {
                if (signInReducer.setupStage == '') {
                    navigation.replace('SignIn');
                }
                else if (signInReducer.setupStage == '0') {
                    navigation.replace('GetYourInfo');
                }
                else if (signInReducer.setupStage == '1') {
                    navigation.replace('AboutYou');
                }
                else if (signInReducer.setupStage == '2') {
                    navigation.replace('AddServices');
                }
                else if (signInReducer.setupStage == '3') {
                    navigation.replace('FinishAccountCreation');
                }
                else if (signInReducer.setupStage == '4') {
                    navigation.replace('Services');
                }
                else {
                    navigation.replace('SignIn');
                }
                dispatch(clearData(null));
            }
        }

    }, [signInReducer.setupStage]);

    const onRegisterTap = () => { navigation.replace('CreateAccount') }

    const onForgetPasswordTap = () => { }

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
                    <CommonTextInput placeholder='Email address' onChangeText={((value) => onChangeEmailField(value))} />
                    <View style={{ height: 16 }}></View>
                    <CommonTextInput placeholder='Password' onChangeText={((value) => onChangePasswordField(value))} />
                    <View style={{ height: 18 }}></View>

                    <View style={styles.checkBoxRow}>
                        <RememberMe setRememberMe={((value) => changeRememberMe(value))} />
                        <TextButton text='Forgot Password?' onPress={onForgetPasswordTap} />
                    </View>

                    <View style={{ marginVertical: 24 }}>
                        {
                            signInReducer.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Sign In' onPress={onSignIn} />
                        }
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
