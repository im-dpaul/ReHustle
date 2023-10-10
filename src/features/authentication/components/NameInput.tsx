import { StyleSheet, Text, View } from "react-native";
import CommonTextInput from "../../../components/textInput/CommonTextInput";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import LocalStorage from "../../../data/local_storage/LocalStorage";
import StorageDataTypes from "../../../constants/StorageDataTypes";
import { useEffect, useState } from "react";

function NameInput(props: { errorText?: string, onNameChange: (value: string) => void }) {

    const [inputValue, setInputValue] = useState('');

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
            <CommonTextInput
                value={inputValue}
                errorText={props.errorText}
                placeholder='Your Name'
                onChangeText={(value) => { setInputValue(value), props.onNameChange(value) }}
            />
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