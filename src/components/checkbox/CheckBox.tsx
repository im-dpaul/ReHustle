import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { CheckBoxFilled } from "../../../assets/images";
import AppColors from "../../constants/AppColors";

function CheckBox(props: { onChangeValue: ((value: boolean) => void) }): JSX.Element {

    const [enable, setEnable] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => { setEnable(!enable), props.onChangeValue(!enable) }}>
                {
                    enable ?
                        <Image style={styles.checkBox} source={CheckBoxFilled} />
                        : <View style={styles.emptyCheckBox}></View>
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    checkBox: {
        height: 24,
        width: 24,
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