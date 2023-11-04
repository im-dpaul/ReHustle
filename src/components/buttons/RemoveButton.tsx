import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppColors from "../../constants/AppColors";

function RemoveButton(props: { onPress: () => void }): JSX.Element {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.remove}>
                <View style={styles.minus}></View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    remove: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: AppColors.RED,
        justifyContent: "center",
        alignItems: 'center'
    },
    minus: {
        height: 1,
        width: 8,
        backgroundColor: AppColors.WHITE,
    }
});

export default RemoveButton;