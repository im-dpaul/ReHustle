import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";
import { GoogleIcon } from "../../../assets/images";

type GoogleSignInButtonProps = { signin: boolean, onPress: (() => void) }

function GoogleSignInButton(props: GoogleSignInButtonProps): JSX.Element {
    return (
        <TouchableOpacity onPress={() => { props.onPress() }}>
            <View style={styles.signInGoogleButton}>
                <GoogleIcon style={styles.imageStyle} />
                <Text style={styles.signInGoogleText}>
                    {
                        props.signin
                            ? 'Sign In with Google'
                            : 'Sign Up with Google'
                    }
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    signInGoogleButton: {
        backgroundColor: AppColors.GRAY7,
        borderRadius: 24,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInGoogleText: {
        color: AppColors.GRAY4,
        fontFamily: FontFamily.NUNITO_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.22,
        paddingLeft: 10
    },
    imageStyle: {
        minHeight: 18,
        minWidth: 18
    },
});

export default GoogleSignInButton;