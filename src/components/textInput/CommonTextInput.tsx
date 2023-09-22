import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import AppColors from "../../constants/AppColors";

function CommonTextInput(props: { placeholder: string, onChangeText: ((text: string) => void) }): JSX.Element {
    const [inputValue, setInputValue] = useState('');

    return (
        <View>
            <TextInput
                style={styles.textInputBox}
                placeholder={props.placeholder}
                underlineColorAndroid={AppColors.TRANSPARENT}
                placeholderTextColor={AppColors.GRAY4}
                value={inputValue}
                onChangeText={(value) => { setInputValue(value), props.onChangeText(value) }}
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
        borderColor: AppColors.GRAY6
    },
});

export default CommonTextInput;