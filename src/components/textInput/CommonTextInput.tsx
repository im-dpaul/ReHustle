import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

function CommonTextInput(props: { placeholder: string, errorText?: string, editable?: boolean, onChangeText: ((text: string) => void) }): JSX.Element {
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
                editable={props.editable}
            />
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
    textInputBox: {
        height: 44,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
        color: AppColors.BLACK
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
});

export default CommonTextInput;