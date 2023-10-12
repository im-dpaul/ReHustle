import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

interface TextInputProps {
    value: string,
    placeholder: string,
    errorText?: string,
    editable?: boolean,
    prefixIcon?: any,
    suffixIcon?: any,
    prefixIconTap?: () => void,
    suffixIconTap?: () => void,
    onChangeText: ((text: string) => void)
}

function TextInputWithIcon(props: TextInputProps): JSX.Element {
    const [focus, setFocus] = useState(false);

    return (
        <View>
            <View style={[styles.textBox,
            ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
            focus ? { borderColor: AppColors.GRAY4 } : {},]}>
                {
                    props.prefixIcon != null
                        ? <View style={styles.prefixIconBox}>
                            <TouchableOpacity onPress={props.prefixIconTap}>
                                {
                                    props.prefixIcon
                                }
                            </TouchableOpacity>
                        </View>
                        : null
                }
                <TextInput
                    style={[
                        styles.textInputBox,
                        ((props.errorText ?? 0) != 0) ? { borderColor: AppColors.RED } : {},
                    ]}
                    placeholder={props.placeholder}
                    underlineColorAndroid={AppColors.TRANSPARENT}
                    placeholderTextColor={AppColors.GRAY4}
                    value={props.value}
                    onChangeText={(value) => { props.onChangeText(value) }}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}
                    editable={props.editable}
                />
                {
                    props.suffixIcon != null
                        ? <View style={styles.suffixIconBox}>
                            <TouchableOpacity onPress={props.suffixIconTap}>
                                {props.suffixIcon}
                            </TouchableOpacity>
                        </View>
                        : null
                }
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
        alignItems: "center",
    },
    textInputBox: {
        height: 40,
        flex: 1,
        color: AppColors.BLACK,
    },
    prefixIcon: {
        height: 20,
        width: 20,
    },
    prefixIconBox: {
        alignItems: 'center',
        marginRight: 8
    },
    suffixIconBox: {
        alignItems: 'center',
        marginLeft: 8,
    },
    error: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '400'
    }
});

export default TextInputWithIcon;