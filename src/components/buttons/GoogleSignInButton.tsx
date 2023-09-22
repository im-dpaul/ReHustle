import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GoogleIcon } from "../../../assets/images";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function GoogleSignInButton(props: { onPress: (() => void) }): JSX.Element {
    return (
        <TouchableOpacity onPress={() => { props.onPress() }}>
            <View style={styles.signInGoogleButton}>
                <Image style={styles.imageStyle} source={GoogleIcon} />
                <Text style={styles.signInGoogleText}>
                    Sign up with Google
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
        height: 18,
        width: 18
    },
});

export default GoogleSignInButton;