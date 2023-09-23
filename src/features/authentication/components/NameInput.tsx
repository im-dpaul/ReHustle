import { StyleSheet, Text, View } from "react-native";
import CommonTextInput from "../../../components/textInput/CommonTextInput";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function NameInput(props: { onNameChange: (value: string) => void }) {
    return (
        <View>
            <Text style={styles.name}>Name</Text>
            <View style={{ height: 8 }}></View>
            <CommonTextInput placeholder='Your Name' onChangeText={((value) => props.onNameChange(value))} />
        </View>
    );
};

const styles = StyleSheet.create({
    name: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default NameInput;