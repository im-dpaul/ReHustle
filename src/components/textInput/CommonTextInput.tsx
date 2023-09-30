import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AppColors from "../../constants/AppColors";

function CommonTextInput(props: { placeholder: string, errorText?: string, onChangeText: ((text: string) => void) }): JSX.Element {
    const [inputValue, setInputValue] = useState('');
    const [focus, setFocus] = useState(false);

    return (
        <View>
            <TextInput
                style={[
                    styles.textInputBox,
                    ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
                    focus ? { borderColor: AppColors.GRAY4 } : {},
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
    textInputBox: {
        height: 44,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
        color: AppColors.BLACK
    },
});

export default CommonTextInput;