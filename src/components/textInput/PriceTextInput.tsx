import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function PriceTextInput(props: {
    placeholder: string,
    editable: boolean,
    value: string,
    errorText?: string,
    onChangeText: ((text: string) => void)
}
): React.JSX.Element {

    const [focus, setFocus] = useState(false);

    return (
        <View>
            <View style={[
                styles.textBox,
                focus ? { borderColor: AppColors.GRAY4 } : {},
                ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
            ]}>
                <View>
                    <Text>₹</Text>
                </View>
                <TextInput
                    style={styles.textInputBox}
                    editable={props.editable}
                    placeholder={props.placeholder}
                    underlineColorAndroid={AppColors.TRANSPARENT}
                    placeholderTextColor={AppColors.GRAY4}
                    keyboardType='numeric'
                    value={props.value}
                    onChangeText={(value) => { props.onChangeText(value) }}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}
                />
                <View style={styles.inrTextBox}>
                    <Text style={styles.inrText}>INR</Text>
                </View>
            </View>
            {
                ((props.errorText ?? 0) != 0)
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.error}>{props.errorText}</Text>
                    </View>
                    : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    textBox: {
        flex: 1,
        flexDirection: "row",
        height: 44,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
        alignItems: "center"
    },
    textInputBox: {
        height: 40,
        color: AppColors.BLACK,
        paddingHorizontal: 12,
        marginRight: 40
    },
    prefixIcon: {
        height: 20,
        width: 20,
    },
    inrTextBox: {
        marginLeft: 'auto',
        marginHorizontal: 10
    },
    inrText: {
        color: AppColors.GRAY3,
        fontFamily: FontFamily.GILROY_SEMIBOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
});

export default PriceTextInput;