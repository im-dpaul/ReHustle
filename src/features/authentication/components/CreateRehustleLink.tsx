import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";

function CreateRehustleLink(props: { onChangeText: ((text: string) => void) }): JSX.Element {

    const [inputValue, setInputValue] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.rehustleLink}>https://rehustle.co/</Text>
            <View>
                <TextInput
                    style={styles.textInputBox}
                    underlineColorAndroid="transparent"
                    value={inputValue}
                    onChangeText={(value) => { setInputValue(value), props.onChangeText(value) }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderColor: AppColors.PRIMARY_COLOR,
        borderWidth: 1,
        flexDirection: 'row',
    },
    rehustleLink: {
        color: AppColors.WHITE,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        backgroundColor: AppColors.PRIMARY_COLOR,
        textAlignVertical: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    userID: {
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_MEDIUM,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlignVertical: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    textInputBox: {
        height: 40,
        width: 200,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
});

export default CreateRehustleLink;