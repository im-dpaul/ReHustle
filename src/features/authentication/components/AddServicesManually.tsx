import { StyleSheet, Text, View } from "react-native";
import AppColors from "../../../constants/AppColors";
import FontFamily from "../../../constants/FontFamily";
import CommonDivider from "../../../components/divider/CommonDivider";

function AddServicesManually(): JSX.Element {
    return (
        <View style={styles.signInEmailStack}>
            <View style={styles.line}></View>
            <Text style={styles.addServiceManually}>Add services manually</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    signInEmailStack: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 14,
        alignSelf: 'stretch',
    },
    line: {
        height: 1,
        backgroundColor: AppColors.GRAY6,
        alignSelf: 'stretch'
    },
    addServiceManually: {
        flex: 1,
        color: AppColors.GRAY1,
        fontFamily: FontFamily.GILROY_REGULAR,
        fontSize: 10,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.22,
        position: 'absolute',
        paddingHorizontal: 6,
        backgroundColor: AppColors.WHITE,
    },
});

export default AddServicesManually;