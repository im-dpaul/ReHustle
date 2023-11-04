import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import GoogleSignInButton from '../../../components/buttons/GoogleSignInButton';
import SignUpWithEmailText from './../components/SignUpWithEmailText';
import CommonTextInput from '../../../components/textInput/CommonTextInput';
import CommonButton from '../../../components/buttons/CommonButton';
import AlreadyHaveAccountLogin from './../components/AlreadyHaveAccountLogin';
import RehustleLinkTextInput from '../../../components/textInput/RehustleLinkTextInput';
import RehustleTextAndDescription from '../components/RehustleTextAndDescription';
import CommonStatusBar from '../../../components/layouts/CommonStatusBar';
import CommonDivider from '../../../components/divider/CommonDivider';
import HeaderStepper from '../components/HeaderStepper';
import AppColors from '../../../constants/AppColors';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { createAccount, setEmailAddress, setPassword, setUserName, clearData, CreateAccountState, checkValidation, googleSignup, userNameValidation } from "../redux/createAccountSlice";
import FontFamily from '../../../constants/FontFamily';

type CreateAccountProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

function CreateAccountScreen({ route }: CreateAccountProps): React.JSX.Element {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const createAccountR: CreateAccountState = useSelector((state: any) => state.createAccount);
    const dispatch = useDispatch<AppDispatch>();

    // console.log("Create Account store", createAccountR);

    const onChangeEmailField = (email: string) => {
        dispatch(setEmailAddress(email));
    }

    const onChangePasswordField = (password: string) => {
        dispatch(setPassword(password));
    }

    const onChangeLinkField = (userName: string) => {
        dispatch(setUserName(userName));
    }

    const onGoogleSignUp = () => {
        dispatch(userNameValidation())
        if (createAccountR.userName != '') {
            dispatch(googleSignup())
        }
    }

    const onSignUp = () => {
        dispatch(checkValidation())
    }

    const onLoginTap = () => {
        navigation.replace('SignIn');
        dispatch(clearData());
    }

    useEffect(() => {
        if (createAccountR.validated == true) {
            dispatch(createAccount());
        }
    }, [createAccountR.validated])

    useEffect(() => {
        if (createAccountR.data != null) {
            navigation.replace('GetYourInfo');
            dispatch(clearData());
        }
    }, [createAccountR.data]);

    return (
        <SafeAreaView style={{ backgroundColor: AppColors.WHITE, flex: 1 }}>
            <CommonStatusBar />
            <ScrollView>
                <View style={{ height: 74 }}>
                    <HeaderStepper title='Create your account' step={1} />
                    <CommonDivider />
                </View>
                <View style={styles.mainBody}>
                    <View style={{ height: 24 }}></View>
                    <RehustleTextAndDescription />
                    <View style={{ height: 18 }}></View>
                    <RehustleLinkTextInput
                        value={createAccountR.userName}
                        errorText={createAccountR.error.userNameError}
                        onChangeText={((value) => onChangeLinkField(value))}
                    />
                    <View style={{ height: 22 }}></View>
                    <View style={{ marginVertical: 30 }}>
                        <GoogleSignInButton signin={false} onPress={onGoogleSignUp} />
                        {
                            (createAccountR.error.googleSignUpError != '')
                                ? <View style={{ marginTop: 8 }}>
                                    <Text style={styles.error}>{createAccountR.error.googleSignUpError}</Text>
                                </View>
                                : null
                        }
                    </View>
                    <SignUpWithEmailText signIn={false} />
                    <View style={{ height: 36 }}></View>
                    <CommonTextInput
                        value={createAccountR.emailAddress}
                        placeholder='Email address'
                        errorText={createAccountR.error.emailError}
                        onChangeText={((value) => onChangeEmailField(value))}
                    />
                    <View style={{ height: 16 }}></View>
                    <CommonTextInput
                        value={createAccountR.password}
                        placeholder='Password'
                        errorText={createAccountR.error.passwordError}
                        onChangeText={((value) => onChangePasswordField(value))}
                    />
                    <View style={{ height: 24 }}></View>
                    {
                        createAccountR.loading
                            ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                            : <CommonButton title='Sign Up' onPress={onSignUp} />
                    }
                    {
                        (createAccountR.error.message != '')
                            ? <View style={{ marginTop: 8 }}>
                                <Text style={styles.error}>{createAccountR.error.message}</Text>
                            </View>
                            : null
                    }
                    <View style={{ height: 24 }}></View>
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
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
});

export default CreateAccountScreen;
