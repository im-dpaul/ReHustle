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
import { signIn, setEmailAddress, setPassword } from '../redux/signInSlice';
import { AppDispatch } from '../../../app/store';
import LocalStorage from '../../../data/local_storage/LocalStorage';
import StorageDataTypes from '../../../constants/StorageDataTypes';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignInScreen({ navigation }: HomeProps): JSX.Element {

    const dispatch = useDispatch<AppDispatch>();
    const signInReducer = useSelector((state: any) => state.signIn);

    console.log(signInReducer);

    const setRememberMe = (value: boolean) => {
        const r = `${value}`;
        LocalStorage.SetData(StorageDataTypes.REMEMBER_ME, r);
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
                navigation.replace('Home');
            }
        }
    }, [signInReducer]);

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
                        <RememberMe setRememberMe={((value) => setRememberMe(value))} />
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
