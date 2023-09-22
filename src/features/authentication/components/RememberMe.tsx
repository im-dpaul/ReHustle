import { StyleSheet, Text, View } from "react-native";
import CheckBox from "../../../components/checkbox/CheckBox";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function RememberMe(props: { setRememberMe: (value: boolean) => void }): JSX.Element {
    return (
        <View style={styles.container}>
            <CheckBox onChangeValue={props.setRememberMe} />
            <View style={{ width: 10 }}></View>
            <Text style={styles.text}>Remember me</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.NUNITO_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default RememberMe;