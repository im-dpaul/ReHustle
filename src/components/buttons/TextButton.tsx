import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function TextButton(props: { text: string, onPress: (() => void) }): JSX.Element {
    return (
        <View>
            <TouchableOpacity onPress={() => { props.onPress() }}>
                <Text style={styles.text}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: AppColors.PRIMARY_COLOR,
        fontFamily: FontFamily.NUNITO_REGULAR,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
});

export default TextButton;