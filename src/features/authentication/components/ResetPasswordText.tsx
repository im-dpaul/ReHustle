import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function ResetPasswordText(): React.JSX.Element {
    return (
        <View>
            <Text style={styles.signInText}>
                Reset Password
            </Text>
            <Text style={styles.signInDescriptionText}>
                Reset password of your Rehustle account to manage services and profile. You will receive a link on the email to reset the password.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    signInText: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.NUNITO_REGULAR,
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        paddingBottom: 5,
    },
    signInDescriptionText: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.NUNITO_REGULAR,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default ResetPasswordText;