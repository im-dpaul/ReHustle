import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";
import { CheckBoxFilled } from "../../../assets/images/svg_index";

function CheckBox(props: { onChangeValue: ((value: boolean) => void) }): JSX.Element {

    const [enable, setEnable] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => { setEnable(!enable), props.onChangeValue(!enable) }}>
                {
                    enable ?
                        <CheckBoxFilled style={styles.checkBox} />
                        : <View style={styles.emptyCheckBox}></View>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    checkBox: {
        maxHeight: 24,
        maxWidth: 24,
    },
    emptyCheckBox: {
        height: 24,
        width: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: AppColors.GRAY4,
    },
});

export default CheckBox;