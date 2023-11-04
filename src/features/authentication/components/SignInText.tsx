import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function SignInText(): JSX.Element {
    return (
        <View>
            <Text style={styles.signInText}>
                Sign In
            </Text>
            <Text style={styles.signInDescriptionText}>
                The quickest way to get started is using your Google account, but you can also sign in manually.
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

export default SignInText;