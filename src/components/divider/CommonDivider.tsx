import { StyleSheet, View } from "react-native";
import AppColors from "../../constants/AppColors";

function CommonDivider(props: { height?: number, backgroundColor?: string }): JSX.Element {
    return (
        <View style={[
            styles.divider,
            props.height ? { height: props.height } : {},
            props.backgroundColor ? { backgroundColor: props.backgroundColor } : {},
        ]}></View>
    );
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: AppColors.GRAY6,
    }
});

export default CommonDivider;