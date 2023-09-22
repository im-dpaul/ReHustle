import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function CommonButton(props: { title: string, onPress: (() => void) }): JSX.Element {
    return (
        <TouchableOpacity onPress={() => { props.onPress() }}>
            <View style={styles.button}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: AppColors.PRIMARY_COLOR,
        borderRadius: 4,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: AppColors.WHITE,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        letterSpacing: 0.22,
        alignSelf: 'center',
    },
});

export default CommonButton;