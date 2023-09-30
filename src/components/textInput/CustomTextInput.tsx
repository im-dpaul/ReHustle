import { useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";

function CustomTextInput(props: {
    placeholder: string,
    initialValue?: string,
    errorText?: string,
    prefixIcon?: ImageSourcePropType,
    prefixIconTap?: () => void,
    onChangeText: ((text: string) => void)
}
): JSX.Element {

    let initVal = (props.initialValue != null) ? props.initialValue : "";
    const [inputValue, setInputValue] = useState(initVal);
    const [focus, setFocus] = useState(false);

    return (
        <View style={[styles.textBox, focus ? { borderColor: AppColors.GRAY4 } : {},]}>
            {
                props.prefixIcon != null
                    ? <View>
                        <TouchableOpacity onPress={props.prefixIconTap}>
                            <Image style={styles.prefixIcon} source={props.prefixIcon} />
                        </TouchableOpacity>
                    </View>
                    : null
            }
            <TextInput
                style={[
                    styles.textInputBox,
                    ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
                    props.prefixIcon != null ? { paddingHorizontal: 12, marginRight: 12, } : {},
                ]}
                placeholder={props.placeholder}
                underlineColorAndroid={AppColors.TRANSPARENT}
                placeholderTextColor={AppColors.GRAY4}
                value={inputValue}
                onChangeText={(value) => { setInputValue(value), props.onChangeText(value) }}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
            />
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
        color: AppColors.BLACK
    },
    prefixIcon: {
        height: 20,
        width: 20,
    }
});

export default CustomTextInput;