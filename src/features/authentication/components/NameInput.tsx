import { StyleSheet, Text, TextInput, View } from "react-native";
import CommonTextInput from "../../../components/textInput/CommonTextInput";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";
import { useEffect, useState } from "react";

function NameInput(props: { errorText?: string, onNameChange: (value: string) => void }) {

    const [inputValue, setInputValue] = useState('');
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        LocalStorage.GetData(StorageDataTypes.NAME).then((name) => {
            if ((name != null) && (name.length != 0)) {
                setInputValue(name);
            }
        })
    }, [])

    return (
        <View>
            <Text style={styles.name}>Name</Text>
            <View style={{ height: 8 }}></View>
            <TextInput
                style={[
                    styles.textInputBox,
                    ((props.errorText ?? '') != '') ? { borderColor: AppColors.RED } : {},
                    focus ? { borderColor: AppColors.GRAY4 } : {},
                ]}
                placeholder='Your Name'
                underlineColorAndroid={AppColors.TRANSPARENT}
                placeholderTextColor={AppColors.GRAY4}
                value={inputValue}
                onChangeText={(value) => { setInputValue(value), props.onNameChange(value) }}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
            />
            {
                ((props.errorText ?? '') != '')
                    ? <View style={{ marginTop: 4 }}>
                        <Text style={styles.errorText}>{props.errorText}</Text>
                    </View>
                    : null
            }
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
    textInputBox: {
        height: 44,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY6,
        color: AppColors.BLACK
    },
    errorText: {
        color: AppColors.RED,
        fontFamily: FontFamily.GILROY_BOLD,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
    }
});

export default NameInput;