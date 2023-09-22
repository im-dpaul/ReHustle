import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function SignUpWithEmailText(props: { signIn: boolean }): JSX.Element {
    const text = props.signIn ? 'Or signin with your email' : 'Or signup with your email';
    return (
        <View style={styles.signInEmailStack}>
            <View style={styles.line}></View>
            <Text style={styles.signInEmailText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    signInEmailStack: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 14,
    },
    line: {
        height: 1,
        backgroundColor: AppColors.GRAY6,
        alignSelf: 'stretch'
    },
    signInEmailText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.NUNITO_BOLD,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.22,
        position: 'absolute',
        paddingHorizontal: 6,
        backgroundColor: AppColors.WHITE,
    },
});

export default SignUpWithEmailText;