import { StyleSheet, View } from "react-native";
import AppColors from "../../constants/AppColors";

function CommonDivider(): JSX.Element {
    return (
        <View style={styles.divider}></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: AppColors.GRAY6,
    }
});

export default CommonDivider;