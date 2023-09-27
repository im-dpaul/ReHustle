import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import GoogleSignInButton from '../../../components/buttons/GoogleSignInButton';
import SignUpWithEmailText from './../components/SignUpWithEmailText';
import CommonTextInput from '../../../components/textInput/CommonTextInput';
import CommonButton from '../../../components/buttons/CommonButton';
import AlreadyHaveAccountLogin from './../components/AlreadyHaveAccountLogin';
import CreateRehustleLink from '../components/CreateRehustleLink';
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
import { createAccount, setEmailAddress, setPassword, setUserName } from "../redux/createAccountSlice";

type CreateAccountProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

function CreateAccountScreen({ route }: CreateAccountProps): JSX.Element {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const createAccountReducer = useSelector((state: any) => state.createAccount);
    const dispatch = useDispatch<AppDispatch>();

    console.log("Create Account store", createAccountReducer);

    const onChangeEmailField = (email: string) => {
        dispatch(setEmailAddress(email));
    }

    const onChangePasswordField = (password: string) => {
        dispatch(setPassword(password));
    }

    const onChangeLinkField = (userName: string) => {
        dispatch(setUserName(userName));
    }

    const onGoogleSignIn = () => { }

    const onSignUp = () => {
        dispatch(createAccount());
    }

    const onLoginTap = () => { navigation.replace('SignIn'); }

    useEffect(() => {
        if (createAccountReducer.data != null) {
            if (createAccountReducer.data.message == "OK") {
                navigation.replace('GetYourInfo');
            }
        }
    }, [createAccountReducer]);

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
                        {
                            createAccountReducer.loading
                                ? <ActivityIndicator size={'large'} color={AppColors.PRIMARY_COLOR} />
                                : <CommonButton title='Sign Up' onPress={onSignUp} />
                        }
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
