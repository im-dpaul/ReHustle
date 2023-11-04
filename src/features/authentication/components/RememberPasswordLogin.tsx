import { StyleSheet, Text, View } from "react-native";
import TextButton from "../../../components/buttons/TextButton";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function RememberPasswordLogin(props: { onPress: (() => void) }): React.JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.dontHaveAccountText}>Remember your password? </Text>
            <TextButton text='Login' onPress={props.onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    dontHaveAccountText: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.NUNITO_REGULAR,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default RememberPasswordLogin;