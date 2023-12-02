import { StyleSheet, Text, TextInput, View } from "react-native";
import AppColors from "../../constants/AppColors";
import FontFamily from "../../constants/FontFamily";

interface RehustleLinkTextInputProps {
    value: string,
    errorText?: string,
    onChangeText: ((text: string) => void)
}

function RehustleLinkTextInput(props: RehustleLinkTextInputProps): JSX.Element {

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.rehustleLink}>https://rehustle.co/</Text>
                <View>
                    <TextInput
                        style={styles.textInputBox}
                        underlineColorAndroid="transparent"
                        value={props.value}
                        onChangeText={(value) => { props.onChangeText(value) }}
                    />
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
    container: {
        borderRadius: 4,
        borderColor: AppColors.PRIMARY_COLOR,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: "center",
        height: 36
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

export default RehustleLinkTextInput;